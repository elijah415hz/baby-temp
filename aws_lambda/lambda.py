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
    }