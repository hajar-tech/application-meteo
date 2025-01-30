const apiKey = '29e9dfb943b9e5cd7938a503cf15babc';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const daysApi = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';
const searchCity=document.querySelector('.bar-search .search');
const searchBtn = document.querySelector('.btn')
const days = document.getElementsByClassName('footer');

//foction d'affichage du météo principale
async function getWeather(city) {
   const response = await fetch(apiUrl +city+`&appid=${apiKey}`);
    var data = await response.json();
    document.querySelector('.name-city').innerHTML=data.name;
    document.querySelector('.temp').innerHTML=Math.round(data.main.temp)+" °C";
    document.querySelector('.humidity').innerHTML=data.main.humidity+" %";
    document.querySelector('.wind').innerHTML=data.wind.speed+" km/h";
    document.querySelector('.weather-icon').src=` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`   
}

//fonction pour la prévision météo des 5 prochains jours
async function getFiveDaysWeather(city) {
    const forcastResponse = await fetch(daysApi +city+`&appid=${apiKey}`);
    var forcastData = await forcastResponse.json();
    console.log(forcastData);
    const days = forcastData.list.filter((item) => item.dt_txt.includes("12:00:00"));
    const daysNames = ["first", "second", "third", "fourth", "fifth"];
    for (let i = 0; i < daysNames.length; i++) {
        document.querySelector(`#${daysNames[i]}-day-name`).innerHTML= new Date(days[i].dt_txt).toLocaleDateString("en-US", { weekday: "long" });
        document.querySelector(`#${daysNames[i]}-day-temp`).innerHTML= Math.round(days[i].main.temp)+" °C";
        document.querySelector(`.icon-${daysNames[i]}-day`).src=` https://openweathermap.org/img/wn/${days[i].weather[0].icon}@2x.png`;
    } }

//appel de la fonction getWeather
    searchBtn.addEventListener('click', ()=>{
        getWeather(searchCity.value.trim() );
        getFiveDaysWeather(searchCity.value.trim())
     })

    //localisation automatique
    function geoFindMe() {

        navigator.geolocation.getCurrentPosition((position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            getWeatherByCoordinates(latitude, longitude);
            getFiveDaysWeatherByCoordinates(latitude, longitude);
        });
    
}

async function getWeatherByCoordinates(latitude, longitude) {
   
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        // update elements with weather data
        document.querySelector('.name-city').innerHTML=data.name;
        document.querySelector('.temp').innerHTML=Math.round(data.main.temp)+" °C";
        document.querySelector('.humidity').innerHTML=data.main.humidity+" %";
        document.querySelector('.wind').innerHTML=data.wind.speed+" km/h";
        document.querySelector('.weather-icon').src=` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` 
   
}

async function getFiveDaysWeatherByCoordinates(latitude, longitude) {
    
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
        const forcastData = await forecastResponse.json();
        console.log(forcastData);

        const days = forcastData.list.filter((item) => item.dt_txt.includes("12:00:00"));
    const daysNames = ["first", "second", "third", "fourth", "fifth"];
    for (let i = 0; i < daysNames.length; i++) {
        document.querySelector(`#${daysNames[i]}-day-name`).innerHTML= new Date(days[i].dt_txt).toLocaleDateString("en-US", { weekday: "long" });
        document.querySelector(`#${daysNames[i]}-day-temp`).innerHTML= Math.round(days[i].main.temp)+" °C";
        document.querySelector(`.icon-${daysNames[i]}-day`).src=` https://openweathermap.org/img/wn/${days[i].weather[0].icon}@2x.png`;
    } }
   
// loaading automatic page
window.addEventListener('load', geoFindMe);

// mise en situation du brief
// const daysHover= document.querySelectorAll(".day-name");

//     daysHover.forEach((element) => {
//         element.addEventListener('mouseover',()=>{
//             element.style.display="none";
//             alert("function work");
//         }) 
//     })
