<<<<<<< HEAD
import json
from pymongo import MongoClient
import os
import pandas as pd
DB_URI = os.environ.get("DB_URI")

def lambda_handler(event, context):
    #
    with MongoClient(DB_URI) as client:
        db = client.babytempdb
        mongo_obj = db.temperatures.find()
        temperatures_df = pd.DataFrame(mongo_obj)
        temperatures_df['timestamp'] = temperatures_df['timestamp'].dt.strftime("%-I:%M %p")
        temperatures_df.drop(columns='_id', inplace=True)
        temperatures_df = temperatures_df.transpose()
    return {
        'statusCode': 200,
        'body': temperatures_df.to_json(orient="values")
=======
import json
from pymongo import MongoClient
import os
from datetime import datetime, timedelta
DB_URI = os.environ.get("DB_URI")

def lambda_handler(event, context):
    with MongoClient(DB_URI) as client:
        db = client.babytempdb
        temperatures = {
            0: [],
            1: [],
            2: []
            }
        mongo_obj = db.temperatures.find({'timestamp': {'$gt': datetime.now() - timedelta(days=7)}})
        for row in mongo_obj:
            temperatures[0].append(row['timestamp'].strftime("%-I:%M %p"))
            temperatures[1].append(row['room_temp'])
            temperatures[2].append(row['outside_temp'])
    return {
        'statusCode': 200,
        'body': json.dumps(temperatures)
>>>>>>> 3250a1e2388240253c3d88a4931a996560485709
    }