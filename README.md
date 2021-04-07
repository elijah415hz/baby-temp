# CozyBaby
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
![Contents](https://img.shields.io/github/languages/top/elijah415hz/cozy-baby)
![Last-Commit](https://img.shields.io/github/last-commit/elijah415hz/cozy-baby)

![Screenshot](screenshot.png)

## Table of Contents
* [Usage](#Usage)
* [Stack](#Stack)
* [Installation](#Installation)
* [License](#License)

## Description
CozyBaby is my custom solution to monitor the temperature in my baby's room. We live in an old building with manual heat controls, so every night we look at the predicted low temperature for the night, then try to guess what level to set the heaters at and how warmly to dress him. I wanted to see how cold it really is in there, and how much the heat fluctuates based on the outside temperature. I realized that this problem gave me the perfect excuse to buy another Raspberry Pi! (I already have a Zero W that has served as a wireless print server, and is now a BlueTooth receiver for my stereo). 
After some initial research, I settled on using a Raspberry Pi Zero W with an AdaFruit PCT2075 temperature sensor. I don't have a soldering iron, so I went the solder-free route by purchasing a hammer header for the Pi, a STEMMA QT cable, and SparkFun STEMMA QT shim to connect everything together. Every hour, the Raspberry Pi reads the temperature from the sensor, gets the outdoor temperature from Open Weather API, and then uploads both values to an Atlas MongoDB instance. The code for the Raspberry Pi is found in the "raspberry_pi" folder. 
The backend is handled by an AWS Lambda function, equipped with two Lambda Layers enabling the use of NumPy and Pandas. While it involved a few extra steps, I wanted to include Pandas, as I'll eventually have quite a large amount of data here, and Pandas offers some performance gains when working with large datasets. The code for that is found in the "aws_lambda" folder. 
Finally, the React front end is hosted on netlify at https://cozy-baby.netlify.app and the code for that is found in "react_frontend."

This was in concept one of the simpler apps I've created, but allowed me to explore using a Raspberry Pi and dive into the world of serverless functions.

## Usage
Very simple! Just go to https://cozy-baby.netlify.app and take a look!

## Stack
CozyBaby is built with Python, MongoDB, React, Typescript, ChartJS, React-ChartJS-2, AWS Lambda Functions, AWS Lambda Layers, 

## Installation
Most of the work of getting this app working was in the setup of the Raspberry Pi and the AWS Lambda. Having successfully fumbled my way through it, hopefully the following description can help anyone hoping to replicate this app locally, or set up something similar.
First step - Acquiring the materials:
I purchased everything from AdaFruit because I've had good results from them before, but there are many other great vendors as well.
1. [Raspberry Pi Zero W](https://www.adafruit.com/product/3400). I don't need much processing power, so I decided to keep things small and cheap with the Pi Zero. The W model has a built in WiFi card, which makes connecting to your wireless network a breeze.
2. [MicroSD card](https://www.adafruit.com/product/2820). I didn't have a spare one lying around, so I bought one with Raspbian Buster Lite pre-flashed. It's not so much trouble to flash your own image, but since I had to buy a card anyway, why not save myself a step!
3. [PCT2075 Temperature Sensor](https://www.adafruit.com/product/4369). This is where the magic happens. On the product page AdaFruit also has great resources on how to get this little sensor set up with any board. They're documentation is great and was my main source of information for this part of the project.
4. [Hammer Header](https://www.adafruit.com/product/3662). AdaFruit also sells a Pi Zero W with a pre-soldered header. If you have a soldering iron, you can also forgo a header and just solder wires directly to the board.
5. [STEMMA QT 4-pin cable](https://www.adafruit.com/product/4210). This connects your Pi and PCT2075. It's a nice little standardized plug that saves soldering and looking at pin-out diagrams. For my setup I plugged this cable into the SHIM below. For going the soldering route, you can either buy STEMMA QT cable that just has loose wires on one end to solder onto the Pi, or just forgo the plug entirely and solder on both ends using whatever wire you have lying around.
6. [STEMMA QT SHIM](https://www.adafruit.com/product/4463). The final piece in my setup here. This just slots onto the header of the Pi and has a little STEMMA QT plug. I liked going this route for my setup because it eliminates the possibility of not soldering the wires correctly, or putting them in the wrong place. As I get more comfortable with these types of projects I'll probably choose to go the slightly cheaper route.

Speaking of cost, If you've been clicking on the links above you've noticed that this is not an expensive setup. I think all told my final bill was around $40. Amazing! 

We are missing just two things that I assume pretty much everyone has lying around the house in our modern era. A micro USB cable and a power supply. I've just used on of the multitude of cables and power supplies that I have lying around from old phones and kindles and other devices. Do just make sure that it's a 5V power supply. Anywhere from 1 to 2.5 Amps seems to be fine. 

Getting both the RaspberryPi and the AWS Lambda Function/Layers set up is fairly involved and is well documented elsewhere. If you're really interested in my setup, feel free to contact me and I can give you a tutorial! The first step is buying all the right gear for the RaspberryPi! 

## License
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) 

This application is covered by the [MIT license](https://lbesson.mit-license.org/).
