from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .db_connections import db
from datetime import datetime


@csrf_exempt
def get_lesson(request):
    """
    GET /lesson/?subject=English&chapter=Alphabet A&level=1
    Always returns text, quiz, and flashcards arrays (even if empty)
    """
    if request.method == "GET":
        level = int(request.GET.get("level", 1))
        subject = request.GET.get("subject")
        chapter = request.GET.get("chapter")

        lesson = db.lessons.find_one(
            {
                "level": level,
                "subject": subject,
                "chapter": chapter
            },
            {"_id": 0}  # hide MongoDB _id
        )

        if not lesson:
            # Return defaults instead of null
            lesson = {
                "subject": subject or "",
                "chapter": chapter or "",
                "text": [],
                "flashcards": [],
                "quiz": {"question": "", "options": [], "answer": ""},
                "level": level
            }

        else:
            # Ensure missing fields are filled
            lesson["text"] = lesson.get("text", [])
            lesson["flashcards"] = lesson.get("flashcards", [])
            lesson["quiz"] = lesson.get(
                "quiz",
                {"question": "", "options": [], "answer": ""}
            )

        return JsonResponse(lesson, safe=False)

    return JsonResponse({"error": "Only GET allowed"}, status=405)