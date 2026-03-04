from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime
from .db_connections import interaction_collection, lessons_collection 

@csrf_exempt
def get_lessons(request):
    """Fetches all lessons from MongoDB."""
    try:
        lessons = list(lessons_collection.find({}, {"_id": 0}))
        return JsonResponse(lessons, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_lesson(request, lesson_id=None):
    """Fetches a single lesson by ID."""
    try:
        lesson = lessons_collection.find_one({"id": lesson_id}, {"_id": 0})
        if lesson:
            return JsonResponse(lesson)
        return JsonResponse({"error": "Lesson not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def log_interaction(request):
    """Saves user metrics and flags students who are struggling."""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            value = data.get("value", 0)
            metric = data.get("metric")
            
            # Adaptive logic: Struggling if dwell time > 3 seconds
            is_struggling = (metric == 'cursorDwellTime' and value > 3000)
            
            log_entry = {
                "metric": metric,
                "value": value,
                "element_id": data.get("id"),
                "username": data.get("username", "merin_student"),
                "is_struggling": is_struggling,
                "timestamp": datetime.now()
            }
            interaction_collection.insert_one(log_entry)
            return JsonResponse({"status": "success", "struggling": is_struggling}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)