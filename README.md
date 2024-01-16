# crt-scheduler
# Campus Response Team Scheduler App


An app used by the Campus Response Team for users to keep track of their individual hours, certifications, shifts, and more.

This application allows the structure of having a primary, secondary, and rookie responder in each shift in a simple and more visible way. It also provides information about a person's certifications, and team policies.

Made by: Andy Huang
Contact: a73huang@uwaterloo.ca

CRT scheduling contact:
crtsched@uwaterloo.ca


## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)


## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database (local or cloud-based)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/campus-response-scheduler.git

Navigate to the project directory:
    
    ```
    cd campus-response-scheduler

Install dependencies:
    
    ```
    npm install

Set up environment variables:

Create a .env file in the root directory.
Define the necessary environment variables (e.g., MongoDB connection string, API keys).

Start the application:
    
    ```
    npm run start-both

The app should now be accessible at http://localhost:5173. 
The server will be hosted on https://localhost:3000 by default


Running the docker container:

docker-compose up --build

Make sure to modify the Username in the mongo initialization script to be your WATID username. 

