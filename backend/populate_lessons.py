from pymongo import MongoClient

# Connect to local MongoDB
client = MongoClient("mongodb://localhost:27017/")  # adjust if using different host/port
db = client["lessons"]  # database
lessons_collection = db["lessons"]  # collection

# Level 1 lessons: English A–E, Science Basics, Maths Basics
lessons = [
    # English Alphabet A–E
    {
        "level": 1,
        "subject": "English",
        "chapter": "Alphabet A",
        "text": ["A for Apple.", "Apple starts with the letter A.", "Say A slowly: aaa."],
        "flashcards": [{"word": "Apple", "image": "apple.png"}, {"word": "Ant", "image": "ant.png"}],
        "quiz": {"questions":[{"q":"What letter does Apple start with?","options":["A","B","C"],"answer":"A"}]}
    },
    {
        "level": 1,
        "subject": "English",
        "chapter": "Alphabet B",
        "text": ["B for Ball.", "Ball starts with the letter B.", "Say B slowly: bbb."],
        "flashcards": [{"word": "Ball", "image": "ball.png"}, {"word": "Bat", "image": "bat.png"}],
        "quiz": {"questions":[{"q":"What letter does Ball start with?","options":["A","B","C"],"answer":"B"}]}
    },
    {
        "level": 1,
        "subject": "English",
        "chapter": "Alphabet C",
        "text": ["C for Cat.", "Cat starts with the letter C.", "Say C slowly: ccc."],
        "flashcards": [{"word": "Cat", "image": "cat.png"}, {"word": "Cup", "image": "cup.png"}],
        "quiz": {"questions":[{"q":"What letter does Cat start with?","options":["A","B","C"],"answer":"C"}]}
    },
    {
        "level": 1,
        "subject": "English",
        "chapter": "Alphabet D",
        "text": ["D for Dog.", "Dog starts with the letter D.", "Say D slowly: ddd."],
        "flashcards": [{"word": "Dog", "image": "dog.png"}],
        "quiz": {"questions":[{"q":"What letter does Dog start with?","options":["C","D","E"],"answer":"D"}]}
    },
    {
        "level": 1,
        "subject": "English",
        "chapter": "Alphabet E",
        "text": ["E for Egg.", "Egg starts with the letter E.", "Say E slowly: eee."],
        "flashcards": [{"word":"Egg","image":"egg.png"}],
        "quiz": {"questions":[{"q":"What letter does Egg start with?","options":["D","E","F"],"answer":"E"}]}
    },

    # Science Basics
    {
        "level": 1,
        "subject": "Science",
        "chapter": "Basics",
        "text": ["Welcome to Science Basics!", "Plants need water and sunlight.", "Animals need food and water."],
        "flashcards": [{"word":"Plant","image":"plant.png"}, {"word":"Animal","image":"animal.png"}],
        "quiz": {"questions":[{"q":"What does a plant need to grow?","options":["Water","Chocolate","Shoes"],"answer":"Water"}]}
    },

    # Maths Basics
    {
        "level": 1,
        "subject": "Maths",
        "chapter": "Basics",
        "text": ["Welcome to Maths Basics!", "We will learn numbers 1 to 10.", "Example: 1 + 1 = 2"],
        "flashcards": [{"word":"1","image":"1.png"}, {"word":"2","image":"2.png"}],
        "quiz": {"questions":[{"q":"What is 1 + 1?","options":["1","2","3"],"answer":"2"}]}
    }
]

# Insert all lessons
for lesson in lessons:
    # Avoid duplicate: update if chapter already exists
    lessons_collection.update_one(
        {"subject": lesson["subject"], "chapter": lesson["chapter"]},
        {"$set": lesson},
        upsert=True
    )
    print(f"Inserted/Updated: {lesson['subject']} - {lesson['chapter']}")

print("All Level 1 lessons populated successfully!")