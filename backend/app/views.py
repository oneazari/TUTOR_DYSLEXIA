from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .db_connections import db
from datetime import datetime


@csrf_exempt # Necessary for React to POST without a CSRF token in development
def log_interaction(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Prepare the document based on your schema [cite: 31, 33, 36, 39]
            log_entry = {
                "user_id": data.get("user_id", "Michael_01"),
                "content_id": data.get("content_id", "lesson_01"),
                "metrics": {
                    "cursor_dwell_time": data.get("dwellTime", 0),
                    "click_latency": data.get("clickLatency", 0),
                    "saccade_pattern": data.get("saccades", [])
                },
                "timestamp": datetime.now()
            }
            
            # Insert into MongoDB InteractionLogs collection [cite: 27]
            db.interaction_logs.insert_one(log_entry)
            
            return JsonResponse({"status": "success", "message": "Log saved!"}, status=201)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)
    
    return JsonResponse({"status": "error", "message": "Only POST allowed"}, status=405)