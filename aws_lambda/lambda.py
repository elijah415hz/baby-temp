import json
from pymongo import MongoClient
import os
DB_URI = os.environ.get("DB_URI")

def lambda_handler(event, context):
    #
    with MongoClient(DB_URI) as client:
        db = client.babytempdb
        temperatures = {
            'labels': [],
            'inside': [],
            'outside': []
            }
        for temp in db.temperatures.find():
            temp['timestamp'] = temp['timestamp'].strftime("%-I:%M %p")
            temperatures['labels'].append(temp['timestamp'])
            temperatures['inside'].append(temp['room_temp'])
            temperatures['outside'].append(temp['outside_temp'])
    return {
        'statusCode': 200,
        'body': json.dumps(temperatures)
    }