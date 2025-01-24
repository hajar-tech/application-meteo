const apiKey = '29e9dfb943b9e5cd7938a503cf15babc';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const daysApi = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';
const locleUrl =
const searchCity=document.querySelector('.bar-search .search');
const searchBtn = document.querySelector('.btn')
const days = document.getElementsByClassName('footer');

async function getWeather(city) {
    const response = await fetch(apiUrl +city+`&appid=${apiKey}`);
    var data = await response.json();
    document.querySelector('.name-city').innerHTML=data.name;
    document.querySelector('.temp').innerHTML=Math.round(data.main.temp)+" °C";
    document.querySelector('.humidity').innerHTML=data.main.humidity+" %";
    document.querySelector('.wind').innerHTML=data.wind.speed+" km/h";
    document.querySelector('.weather-icon').src=` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    
    

    
}

async function getFiveDaysWeather(city) {
    const forcastResponse = await fetch(daysApi +city+`&appid=${apiKey}`);
    var forcastData = await forcastResponse.json();
    console.log(forcastData);

    // const forecastFooter = document.querySelector(".footer");
    const days = forcastData.list.filter((item) => item.dt_txt.includes("12:00:00"));
    const daysNames = ["first", "second", "third", "fourth", "fifth"];
    for (let i = 0; i < daysNames.length; i++) {
        document.querySelector(`#${daysNames[i]}-day-name`).innerHTML= new Date(days[i].dt_txt).toLocaleDateString("en-US", { weekday: "long" });
        document.querySelector(`#${daysNames[i]}-day-temp`).innerHTML= Math.round(days[i].main.temp)+" °C";
        document.querySelector(`.icon-${daysNames[i]}-day`).src=` https://openweathermap.org/img/wn/${days[i].weather[0].icon}@2x.png`;
    } }

    searchBtn.addEventListener('click', ()=>{
        getWeather(searchCity.value.trim() );
        getFiveDaysWeather(searchCity.value.trim())
     })

//fonction pour la geolocalisation
  
      






    // document.querySelector('#first-day-name').innerHTML= new Date(days[0].dt_txt).toLocaleDateString("en-US", { weekday: "long" });
    // document.querySelector('#second-day-name').innerHTML=new Date(days[1].dt_txt).toLocaleDateString("en-US", { weekday: "long" });
    // document.querySelector('#third-day-name').innerHTML=new Date(days[2].dt_txt).toLocaleDateString("en-US", { weekday: "long" });
    // document.querySelector('#fourth-day-name').innerHTML=new Date(days[3].dt_txt).toLocaleDateString("en-US", { weekday: "long" });
    // document.querySelector('#fifth-day-name').innerHTML=new Date(days[4].dt_txt).toLocaleDateString("en-US", { weekday: "long" });

    // document.querySelector('#first-day-temp').innerHTML= Math.round(days[0].main.temp)+" °C";
    // document.querySelector('#second-day-temp').innerHTML=Math.round(days[1].main.temp)+" °C";
    // document.querySelector('#third-day-temp').innerHTML=Math.round(days[2].main.temp)+" °C";
    // document.querySelector('#fourth-day-temp').innerHTML=Math.round(days[3].main.temp)+" °C";
    // document.querySelector('#fifth-day-temp').innerHTML=Math.round(days[4].main.temp)+" °C";
    
    // document.querySelector('.icon-first-day').src=` https://openweathermap.org/img/wn/${days[0].weather[0].icon}@2x.png`    
    // document.querySelector('.icon-second-day').src=` https://openweathermap.org/img/wn/${days[1].weather[0].icon}@2x.png`    
    // document.querySelector('.icon-third-day').src=` https://openweathermap.org/img/wn/${days[2].weather[0].icon}@2x.png`    
    // document.querySelector('.icon-fourth-day').src=` https://openweathermap.org/img/wn/${days[3].weather[0].icon}@2x.png`    
    // document.querySelector('.icon-fifth-day').src=` https://openweathermap.org/img/wn/${days[4].weather[0].icon}@2x.png`    




 




