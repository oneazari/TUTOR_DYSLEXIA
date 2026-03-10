from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime
# Ensure these match your db_connections.py file exactly
from .db_connections import interaction_collection, lessons_collection, users_collection 

# --- 1. GET ALL LESSONS ---
@csrf_exempt
def get_lessons(request):
    try:
        lessons = list(lessons_collection.find({}, {"_id": 0}))
        return JsonResponse(lessons, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# --- 2. GET A SINGLE LESSON ---
@csrf_exempt
def get_lesson(request, lesson_id=None):
    try:
        target_id = lesson_id or request.GET.get('id')
        lesson = lessons_collection.find_one({"id": target_id}, {"_id": 0})
        if lesson:
            return JsonResponse(lesson)
        return JsonResponse({"error": "Lesson not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# --- 3. ADAPTIVE LOGIC: STRUGGLE HANDLER ---
@csrf_exempt
def handle_struggle(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            user = users_collection.find_one({"username": username})
            
            if not user:
                return JsonResponse({"error": "User not found"}, status=404)

            # Logic: Move down one level if possible (e.g., Level 4 -> Level 3)
            current_lvl = int(user.get("level", "Level 1").split(" ")[1])
            new_lvl = max(1, current_lvl - 1)
            new_lvl_str = f"Level {new_lvl}"

            users_collection.update_one({"username": username}, {"$set": {"level": new_lvl_str}})
            
            # Fetch simpler content for the student
            easier_lesson = lessons_collection.find_one({"level": new_lvl}, {"_id": 0})
            
            return JsonResponse({
                "status": "adapted",
                "new_level": new_lvl_str,
                "lesson": easier_lesson
            })
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

# --- 4. LOG INTERACTIONS (Behavioral Tracker) ---
@csrf_exempt
def log_interaction(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            value = data.get("value", 0)
            metric = data.get("metric") # e.g., 'cursorDwellTime'
            
            # Adaptive Thresholds
            is_struggling = (metric == 'cursorDwellTime' and value > 3000)
            
            log_entry = {
                "username": data.get("username", "student_user"),
                "metric": metric,
                "value": value,
                "is_struggling": is_struggling,
                "timestamp": datetime.now()
            }
            interaction_collection.insert_one(log_entry)
            return JsonResponse({"status": "success", "struggling": is_struggling}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

# --- 5. LOGIN USER ---
@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            user = users_collection.find_one({"username": username}, {"_id": 0})

            if user:
                return JsonResponse(user, status=200)
            else:
                new_user = {"username": username, "level": "Level 1", "stars": 0}
                users_collection.insert_one(new_user.copy())
                return JsonResponse(new_user, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)