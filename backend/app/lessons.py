from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .db_connections import lessons_collection
from bson import ObjectId


@csrf_exempt
def add_lesson(request):
    if request.method == "POST":
        data = json.loads(request.body)

        lesson = {
            "title": data["title"],
            "content": data["content"],
            "difficulty": data["difficulty"]
        }

        lessons_collection.insert_one(lesson)

        return JsonResponse({"message": "Lesson added successfully"})

    return JsonResponse({"error": "Invalid request"}, status=405)


def get_lessons(request):
    lessons = list(lessons_collection.find())

    for lesson in lessons:
        lesson["_id"] = str(lesson["_id"])

    return JsonResponse(lessons, safe=False)
