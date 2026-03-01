from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .db_connections import db
import json


@csrf_exempt
def get_lessons(request):
    """
    GET /lessons/?level=1&subject=Science
    """
    if request.method == "GET":
        level = request.GET.get("level")
        subject = request.GET.get("subject")

        query = {}
        if level:
            query["level"] = int(level)
        if subject:
            query["subject"] = subject

        lessons = list(db.lessons.find(query, {"_id": 0}))
        return JsonResponse({"lessons": lessons})

    return JsonResponse({"error": "Only GET allowed"}, status=405)


@csrf_exempt
def add_lesson(request):
    if request.method == "POST":
        lesson = json.loads(request.body)
        db.lessons.insert_one(lesson)
        return JsonResponse({"status": "lesson added"}, status=201)

    return JsonResponse({"error": "Only POST allowed"}, status=405)