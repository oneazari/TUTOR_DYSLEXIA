from django.urls import path
from .views import get_lessons, get_lesson, log_interaction
from .auth import signup, login
from .quiz import add_quiz, get_quiz, submit_quiz

urlpatterns = [
    # Auth
    path("signup/", signup, name="signup"),
    path("login/", login, name="login"),

    # Lessons
    path("lessons/", get_lessons, name="get_lessons"),   # React frontend fetches all lessons
    path('lessons/<str:lesson_id>/', get_lesson, name='get_lesson'),
    path("lesson/", get_lesson, name="get_lesson"),      # Fetch a single lesson (by subject/chapter)

    # Log interactions
    path("log/", log_interaction, name="log_interaction"),

    # Quizzes
    path("add-quiz/", add_quiz, name="add_quiz"),
    path("quiz/", get_quiz, name="get_quiz"),
    path("submit-quiz/", submit_quiz, name="submit_quiz"),
]