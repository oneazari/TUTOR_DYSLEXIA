from django.urls import path
from .views import log_interaction
from .auth import signup, login
from .lessons import add_lesson, get_lessons
from .quiz import add_quiz, get_quiz, submit_quiz



urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('logs/', log_interaction),
    path('add-lesson/', add_lesson),
    path('lessons/', get_lessons),
    path('add-quiz/', add_quiz),
    path('quiz/', get_quiz),
    path('submit-quiz/', submit_quiz),
]
