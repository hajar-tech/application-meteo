const apiKey = '29e9dfb943b9e5cd7938a503cf15babc';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=marrakech&units=metric';

async function getWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);
}

getWeather();