/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

let baseURL='http://api.openweathermap.org/data/2.5/weather?zip=';//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
let ApiKey='efb19710cfa48fd6e0b7d90ae5b99191';

//click event listener to add function to the generate button.
document.getElementById('generate').addEventListener('click',Generate);

function Generate(event)
{
    const ZipCode= document.getElementById('zip').value;
    const feelings=document.getElementById('feelings').value;
    //get the weather here.
    GetWeatherData(baseURL,ZipCode,ApiKey).then(function(data){
        console.log("hhh");
        postData(' /add',{date:newDate, temp:data.main.temp, content:feelings})
        UpdateUI();

})
};

const GetWeatherData = async(baseURL, ZipCode, ApiKey)=>{
    const response= await fetch(baseURL+ZipCode+`&appid=${ApiKey}`);
    try {
            const data=await response.json();
            return data;
    } catch(error)
    {
        console.log("error");
    }
}

const postData = async(url = '', data = {})=>{
    console.log(data);
    console.log("akjlsdhfkjlasdh");
    const response= await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers: {
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
    });
    try {
        const newData= await response.json();
        console.log(newData);
        return newData;
    } catch(error)
    {
        console.log("error");
    }
}

const UpdateUI= async() => {
    const request= await fetch('/all');
    try{
        const Data= await request.json();
        document.getElementById('date:').innerHTML=`Date: ${Data[0].date}`;
        document.getElementById('temp:').innerHTML=`Temprature: ${Data[0].temp}`;
        document.getElementById('content:').innerHTML=`I feel: ${Data[0].content}`;

    }catch(error)
    {
        console.log("error");
    }
}


