from flask import Flask, jsonify
from pymongo import MongoClient
from datetime import datetime
import os

FLASK_DB_URI = os.environ.get("FLASK_DB_URI")

client = MongoClient(FLASK_DB_URI)
db = client.babytempdb
app = Flask(__name__, static_folder='../build', static_url_path="/")

@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/temperatures")
def get_temps():
    temperatures_cursor = db.temperatures.find()
    temperatures = []
    for row in temperatures_cursor:
        row.pop('_id')
        temperatures.append(row)
    return jsonify(temperatures)

if __name__ == "__main__":
    app.run()