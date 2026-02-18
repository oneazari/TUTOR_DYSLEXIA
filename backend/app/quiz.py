from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .db_connections import quiz_collection, progress_collection
from bson import ObjectId


@csrf_exempt
def add_quiz(request):
    if request.method == "POST":
        data = json.loads(request.body)

        quiz = {
            "question": data["question"],
            "options": data["options"],
            "correct_answer": data["correct_answer"],
            "difficulty": data["difficulty"]
        }

        quiz_collection.insert_one(quiz)

        return JsonResponse({"message": "Quiz added successfully"})

    return JsonResponse({"error": "Invalid request"}, status=405)


def get_quiz(request):
    difficulty = request.GET.get("difficulty", "easy")

    quizzes = list(quiz_collection.find({"difficulty": difficulty}))

    for quiz in quizzes:
        quiz["_id"] = str(quiz["_id"])
        del quiz["correct_answer"]  # Hide answer

    return JsonResponse(quizzes, safe=False)


@csrf_exempt
def submit_quiz(request):
    if request.method == "POST":
        data = json.loads(request.body)

        quiz = quiz_collection.find_one({"_id": ObjectId(data["quiz_id"])})

        if not quiz:
            return JsonResponse({"error": "Quiz not found"}, status=404)

        score = 1 if data["selected_answer"] == quiz["correct_answer"] else 0

        # Save progress
        progress_collection.insert_one({
            "username": data["username"],
            "quiz_id": data["quiz_id"],
            "score": score,
            "difficulty": quiz["difficulty"]
        })

        return JsonResponse({"score": score})

    return JsonResponse({"error": "Invalid request"}, status=405)
