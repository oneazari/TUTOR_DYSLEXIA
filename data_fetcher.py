from pymongo import MongoClient

class DataFetcher:
    def __init__(self, uri="mongodb://localhost:27017/", db_name="tutor_db"):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.collection = self.db["eye_metrics"]

    def get_latest_metrics(self, student_id):
        # Fetch the most recent record for this specific student
        record = self.collection.find_one(
            {"student_id": student_id}, 
            sort=[("_id", -1)]
        )
        if not record:
            return None
        
        return {
            "dwell": record.get("dwell_time_trial", 0),
            "saccade": record.get("mean_sacc_ampl_trial", 0),
            "fixations": record.get("n_fix_trial", 0),
            "regressions": record.get("ratio_progress_regress_trial", 0)
        }