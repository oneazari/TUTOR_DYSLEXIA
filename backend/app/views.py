from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime

# 🚀 FIX: We added users_collection here! 
# Also check if your db_connections file calls it 'interaction_logs' or 'interaction_collection'
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

# --- 3. LOG USER INTERACTIONS ---
@csrf_exempt
def log_interaction(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            value = data.get("value", 0)
            metric = data.get("metric")
            
            staring_too_long = (metric == 'cursorDwellTime' and value > 3000)
            thinking_too_long = (metric == 'clickLatency' and value > 5000)
            is_struggling = staring_too_long or thinking_too_long
            
            log_entry = {
                "metric": metric,
                "value": value,
                "element_id": data.get("id"),
                "username": data.get("username", "student_user"),
                "is_struggling": is_struggling,
                "timestamp": datetime.now()
            }
            
            interaction_collection.insert_one(log_entry)
            return JsonResponse({"status": "success", "struggling": is_struggling}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)

# --- 4. LOGIN USER ---
@csrf_exempt
@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            # 🕵️ This line is a 'Super-Decoder' for the incoming data
            raw_data = request.body.decode('utf-8')
            print(f"📦 What React sent (Raw): {raw_data}") # LOOK FOR THIS IN TERMINAL

            data = json.loads(raw_data)
            username = data.get("username")
            
            if not username:
                print("❌ No username in the box!")
                return JsonResponse({"error": "Empty name"}, status=400)

            # 🔎 Check MongoDB
            user = users_collection.find_one({"username": username}, {"_id": 0})

            if user:
                print(f"✅ Found existing user: {username}")
                return JsonResponse(user, status=200)
            else:
                print(f"✨ Creating brand new user: {username}")
                new_user = {"username": username, "level": "Level 1", "stars": 0}
                users_collection.insert_one(new_user.copy())
                return JsonResponse(new_user, status=201)

        except Exception as e:
            print(f"🔥 Error during login: {e}")
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Wrong method"}, status=405)