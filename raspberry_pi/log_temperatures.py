# Make sure to locally run the below shell command to install library
# sudo pip3 install adafruit-circuitpython-pct2075

from pymongo import MongoClient
from datetime import datetime
import os
import requests
# import board
# import busio
# import adafruit_pct2075

DB_URI = os.environ.get("DB_URI")
LAT = os.environ.get("LATITUDE")
LON = os.environ.get("LONGITUDE")
client = MongoClient(DB_URI)
db = client.babytempdb

def get_room_temp():
    i2c = busio.I2C(board.SCL, board.SDA)
    pct = adafruit_pct2075.PCT2075(i2c)
    print(pct.temperatures)
    return pct.temperatures
    
def get_outside_temp():
    weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + LAT + "&lon=" + LON + "&exclude=hourly,minutely&units=imperial&appid=b8490967e1286ac31919deba8dced9fc"
    response = requests.get(weatherURL)
    weather = response.json()
    outside_temp = weather['current']['temp']
    print(outside_temp)
    return outside_temp

def upload_to_db(timestamp, room_temp, outside_temp):
    with MongoClient(DB_URI) as client:
        db = client.babytempdb
        db.temperatures.insert_one({"timestamp": timestamp, "room_temp": room_temp, "outside_temp": outside_temp})
    return
# upload_to_db(datetime.now(), get_room_temp(), get_outside_temp())