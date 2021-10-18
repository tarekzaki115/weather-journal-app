// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes

const express = require('express');


// Start up an instance of app

const app = express();

/* Middleware*/

const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

const server = app.listen(port, listening);

function listening(){
    console.log('server is running');
    console.log(`server running on localhost:${port}`);
}


//get function
app.get('/all', sendingData);

function sendingData(request, response){
    //send data to the app endpoint
    response.send(projectData);
    projectData = [];
}


//post function
app.post('/add', addingData);

function addingData(request, response){
    console.log(req.body);
    newData = {
        date: request.body.date,
        temp: request.body.temp,
        content: request.body.content
    }

    //push the data to the server endpoint
    projectData.push(newData);
}