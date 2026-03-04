from django.urls import path
# 🚀 Added 'login_user' to the list of imports from .views
from .views import get_lessons, get_lesson, log_interaction, login_user 
from .auth import signup, login
from .quiz import add_quiz, get_quiz, submit_quiz

urlpatterns = [
    # --- Auth & User Memory ---
    path("signup/", signup, name="signup"),
    path("login/", login, name="login"), # This might be your old one
    
    # 🌟 This is the "Memory" path we just built for React!
    path('api/login/', login_user, name='login_user'), 

    # --- Lessons ---
    path("lessons/", get_lessons, name="get_lessons"),
    path('lessons/<str:lesson_id>/', get_lesson, name='get_lesson'),
    path("lesson/", get_lesson, name="get_lesson"),

    # --- Log Interactions (The Tracker) ---
    path("log/", log_interaction, name="log_interaction"),

    # --- Quizzes ---
    path("add-quiz/", add_quiz, name="add_quiz"),
    path("quiz/", get_quiz, name="get_quiz"),
    path("submit-quiz/", submit_quiz, name="submit_quiz"),
]