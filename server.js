// Setup empty JS object to act as endpoint for all routes
projectData = {};

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

const port = 3000;

const server = app.listen(port, listening);


/*routes*/
app.get('/all', gettingData);

app.post('/add', postingData);


/*functions*/

//storing data in server
function postingData(request, response){
    console.log(request.body);
    
    //storing in object projectData
    projectData['temp'] = request.body.temp;
    projectData['content'] = request.body.content;
    projectData['date'] = request.body.date;    
}


//getting data and sending it to the app
function gettingData(request, response){
    //send data to the app endpoint
    response.send(projectData);
}

//printing server number and status
function listening(){
    console.log('server is running');
    console.log(`server running on localhost:${port}`);
}