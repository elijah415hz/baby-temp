# Make sure to locally run the below shell command to install library
# sudo pip3 install adafruit-circuitpython-pct2075

from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import os
import requests
import board
import busio
import adafruit_pct2075
import time

load_dotenv()
DB_URI = os.environ.get("DB_URI")
LAT = os.environ.get("LATITUDE")
LON = os.environ.get("LONGITUDE")
KEY = os.environ.get("APP_ID")

def get_room_temp():
    i2c = busio.I2C(board.SCL, board.SDA)
    pct = adafruit_pct2075.PCT2075(i2c)
    celcius = pct.temperature
    farenheit = (celcius * 1.8) + 32 
    return farenheit
    
def get_outside_temp():
    weatherURL = f"https://api.openweathermap.org/data/2.5/onecall?lat={LAT}&lon={LON}&exclude=hourly,minutely&units=imperial&appid={KEY}"
    response = requests.get(weatherURL)
    weather = response.json()
    outside_temp = weather['current']['temp']
    return outside_temp

def upload_to_db(timestamp, room_temp, outside_temp):
    print(f"{timestamp} \nOutside: {outside_temp} \nInside: {room_temp}") 
    with MongoClient(DB_URI) as client:
        db = client.babytempdb
        db.temperatures.insert_one({"timestamp": timestamp, "room_temp": room_temp, "outside_temp": outside_temp})
    return

upload_to_db(datetime.now(), get_room_temp(), get_outside_temp())
