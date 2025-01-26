const apiKey = '29e9dfb943b9e5cd7938a503cf15babc';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const daysApi = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';
// const localeUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}';
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



     async function geoFindMe() {
        const status = document.querySelector("#status");
        const mapLink = document.querySelector("#map-link");

        // Réinitialisation de l'interface utilisateur
        mapLink.href = "";
        mapLink.textContent = "";

        // Vérification si la géolocalisation est supportée
        if (!navigator.geolocation) {
            status.textContent = "Géolocalisation non supportée par votre navigateur";
            console.error("Géolocalisation non supportée");
            return;
        }

        // Affichage d'un message de localisation en cours
        status.textContent = "Localisation en cours…";

        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            // Mise à jour de l'interface utilisateur avec le lien de la carte
            status.textContent = "Localisation obtenue";
            mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            mapLink.textContent = `Voir ma position sur la carte`;

            // Appel API OpenWeatherMap pour récupérer les données météo
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&lang=fr`);
                if (!response.ok) {
                    throw new Error("Problème lors de la récupération des données météo.");
                }

                const data = await response.json();
                console.log(data);

                // Mise à jour de l'interface avec les données météo
                document.querySelector('.name-city').textContent = data.name;
                document.querySelector('.temp').textContent = Math.round(data.main.temp) + " °C";
                document.querySelector('.humidity').textContent = data.main.humidity + " %";
                document.querySelector('.wind').textContent = data.wind.speed + " km/h";
                document.querySelector('.weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            } catch (error) {
                console.error("Erreur lors de la récupération des données météo :", error);
                status.textContent = "Impossible de récupérer les données météo.";
            }

        }, () => {
            status.textContent = "Impossible de récupérer votre localisation";
            console.error("Impossible de récupérer la localisation");
        });
    }

    document.querySelector("#find-me").addEventListener("click", geoFindMe);


// //fonction pour la geolocalisation
// async function geoFindMe() {
     
//     const status = document.querySelector("#status");
//     const mapLink = document.querySelector("#map-link");
  
//     mapLink.href = "";
//     mapLink.textContent = "";
  
//     function success(position) {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
      
//         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//         fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             document.querySelector('.name-city').innerHTML=data.name;
//             document.querySelector('.temp').innerHTML=Math.round(data.main.temp)+" °C";
//             document.querySelector('.humidity').innerHTML=data.main.humidity+" %";
//             document.querySelector('.wind').innerHTML=data.wind.speed+" km/h";
//             document.querySelector('.weather-icon').src=` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            
//             // Update your UI with the weather data here
//         });
      
//         status.textContent = "";
//         mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
//         mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

       
//       }
      
  
//     function error() {
//       status.textContent = "Unable to retrieve your location";
//       console.error("Unable to retrieve your location");
//     }
  
//     if (!navigator.geolocation) {
//       status.textContent = "Geolocation is not supported by your browser";
//       console.error("Geolocation is not supported by your browser");
//     } else {
//       status.textContent = "Locating…";
//       navigator.geolocation.getCurrentPosition(success, error);
//     }
//   }
  
//   document.querySelector("#find-me").addEventListener("click", () => {
//     geoFindMe();
    
//   });
      






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




 




