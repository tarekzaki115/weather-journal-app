/* Global Variables */

//the url and api key
let url = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let api = 'ffd4f9d84f2ac723a0790536a8e40c41';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//event listener
document.getElementById('generate').addEventListener('click', btnFunction);






/* functions */

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

//get data and print info on screen
function btnFunction(e){

    //getting and storing user input
    const zipNumber = document.getElementById('zip').value;
    const journalData = document.getElementById('feelings').value;

    if(zipNumber =='' || journalData ==''){
        
        if(zipNumber =='' && journalData ==''){
            console.log('error');
            alert('please enter your zip number and tell us how you feel today :)');
        }else if (zipNumber == ''){
            console.log('error');
            alert('please enter your zip number');
        }else if (journalData == ''){
            console.log('error');
            alert('please tell us how you feel today :)');
        }
    }else{
        forecast(url, zipNumber, api)
        .then(function(data){
        console.log(data);
        postData('/add', {date:newDate, temp:data.list[0].main.temp, content:journalData})
        updateUi();
        })
    
    }


}


//get the forecast from the openweathermap website 
const forecast = async (baseURL, zip, key)=>{

    const res = await fetch(baseURL+zip+'&appid='+key);
    try{
        const data = await res.json();
        return data;
    }catch(error){
        console.log('error', error);
    }
}


//updates the UI
const updateUi = async ()=>{
    const request = await fetch('/all');

    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = 'Date: '+ allData.date;
        document.getElementById('temp').innerHTML = 'Temperature: '+ allData.temp+' Kelvin';
        document.getElementById('content').innerHTML = 'Feeling: '+ allData.content;
    }catch(error){
        console.log('error', error);
    }
}