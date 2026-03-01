from mongoengine import *

class Lesson(Document):
    level = IntField(required=True)
    subject = StringField(required=True)
    chapter = StringField(required=True)

    text = ListField(StringField())
    flashcards = ListField(DictField())

    quiz = DictField()

    meta = {
        "collection": "lessons"
    }


class UserProgress(Document):
    username = StringField(required=True)
    current_level = IntField(default=1)

    # example:
    # { "Science": { "Living and Non-Living Things": 8 } }
    scores = DictField()

    meta = {
        "collection": "user_progress"
    }