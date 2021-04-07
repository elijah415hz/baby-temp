# CozyBaby
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
![Contents](https://img.shields.io/github/languages/top/elijah415hz/cozy-baby)
![Last-Commit](https://img.shields.io/github/last-commit/elijah415hz/cozy-baby)

## Description
CozyBaby is my custom solution to monitor the temperature in my baby's room. We live in an old building with manual heat controls, so every night we look at the predicted low temperature for the night, then try to guess what level to set the heaters at and how warmly to dress him. I wanted to see how cold it really is in there, and how much the heat fluctuates based on the outside temperature.

My solution was this app!

The inside temperature is gathered by a RaspberryPi 0W with an AdaFruit temperature sensor that uploads to an Atlas MongoDB instance. That code is found in the "raspberry_pi" folder and on the RaspberryPi is called by cron every hour. The backend is handled by an AWS Lambda function, equipped with two Lambda Layers enabling the use of numpy and pandas. The code for that is found in the "aws_lambda" folder. Finally, the front end is hosted on netlify at https://cozy-baby.netlify.app and the code for that is found in "react_frontend."

This was in concept one of the simpler apps I've created, but allowed me to explore using a RaspberryPi and dive into the world of serverless functions.

## Table of Contents
* [Usage](#Usage)
* [Stack](#Stack)
* [Installation](#Installation)
* [License](#License)

## Usage
Very simple! Just go to https://cozy-baby.netlify.app and take a look!

## Stack
CozyBaby is built with Python, MongoDB, React, Typescript, ChartJS, and AWS Lambda Functions

## Installation
Getting both the RaspberryPi and the AWS Lambda Function/Layers set up is fairly involved and is well documented elsewhere. If you're really interested in my setup, feel free to contact me and I can give you a tutorial! The first step is buying all the right gear for the RaspberryPi! 

## License
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) 

This application is covered by the [MIT license](https://lbesson.mit-license.org/).
