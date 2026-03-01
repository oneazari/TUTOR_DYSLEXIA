from django.urls import path
from .views import get_lessons, get_lesson, log_interaction
from .auth import signup, login
from .quiz import add_quiz, get_quiz, submit_quiz
from . import lessons
from . import views   # <-- THIS IMPORT IS REQUIRED

urlpatterns = [
    path("signup/", signup),
    path("login/", login),

    path("log/", log_interaction),

    path("lessons/", get_lessons),   # ✅ React uses this
    path("lesson/", get_lesson),     # optional single lesson

     path('api/lessons/', lessons.get_lessons),        
    path('api/lessons/add_lesson/', lessons.get_lessons),
    path('api/lessons/add_lesson/', views.get_lessons),

    path("add-quiz/", add_quiz),
    path("quiz/", get_quiz),
    path("submit-quiz/", submit_quiz),
]