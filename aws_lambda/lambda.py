import json
from pymongo import MongoClient
import os
DB_URI = os.environ.get("DB_URI")


def lambda_handler(event, context):
    with MongoClient(DB_URI) as client:
        db = client.babytempdb
        temperatures = []
        for temp in db.temperatures.find():
            temp.pop('_id')
            temp['timestamp'] = temp['timestamp'].strftime("%d-%m-%Y")
            temperatures.append(temp)
    return {
        'statusCode': 200,
        'body': json.dumps(temperatures)
    }