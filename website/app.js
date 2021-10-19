/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


//the url and api key
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';

let apiKey = '&appid=ffd4f9d84f2ac723a0790536a8e40c41';




//post data function
const postData = async (url = '', data = {})=>{
    console.log(data);

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
        },

        body: JSON.stringify(data)
    });

    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log('error', error);
    }
}




//event listener
document.getElementById('generate').addEventListener('click', respondToClick);

//function that responds to click by getting data from the text area
//then getting the weather info
//then posting the data
//then updating the UI
function respondToClick(e){

    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey)
    .then(function(data){
        console.log(data);

        postData('/add', {date:newDate, temp:data.list[0].main.temp, content:feelings})
        updateUi();
    })
};





//get weather info from the weather api
const getWeather = async (baseURL, zip, key)=>{

    const res = await fetch(baseURL+zip+key);
    try{
        const data = await res.json();
        return data;
    }catch(error){
        console.log('error', error);
    }
}





//updateUI function updates the UI
const updateUi = async ()=>{
    const request = await fetch('/all');

    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `temperature: ${allData[0].temp}`;
        document.getElementById('content').innerHTML = `I feel: ${allData[0].content}`;
    }catch(error){
        console.log('error', error);
    }
}