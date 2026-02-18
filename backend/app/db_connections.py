import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["tutor_dyslexia"]

users_collection = db["users"]
interaction_collection = db["interaction_logs"]
lessons_collection = db["lessons"]
quiz_collection = db["quiz"]
progress_collection = db["progress"]
