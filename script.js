const apiKey = '29e9dfb943b9e5cd7938a503cf15babc';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
// const daysApi = 'https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric';
const searchCity=document.querySelector('.bar-search .search');
const searchBtn = document.querySelector('.btn')

async function getWeather(city) {
    const response = await fetch(apiUrl +city+`&appid=${apiKey}`);
    var data = await response.json();
    document.querySelector('.name-city').innerHTML=data.name;
    document.querySelector('.temp').innerHTML=Math.round(data.main.temp)+" °C";
    document.querySelector('.humidity').innerHTML=data.main.humidity+" %";
    document.querySelector('.wind').innerHTML=data.wind.speed+" km/h";

    console.log(data);

    // const forcastResponse = await fetch()
}
 searchBtn.addEventListener('click', ()=>{
    getWeather(searchCity.value.trim() );
 })


