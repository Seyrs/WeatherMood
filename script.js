var appId = 'bcb42cafda271a2eb84b45ee3a3200b8';
var units = 'imperial';


function getsearchMethodValidation(searchTerm) {
  if (Number.isInteger(parseInt(searchTerm)) && searchTerm.length === 5) {
      return 'zip';
    } else {
    return 'q';
    }
}

function searchWeather(searchTerm)  {
  var searchMethod = getsearchMethodValidation(searchTerm);
  fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`)
  .then(response => { 
    return response.json();
  }).then(response => {
    init(response);

  })
}

function init(data) {
 
if(data.weather[0].main =="Clear") {
  document.body.style.backgroundImage = 'url("clear.jpeg")';
  var showMusicPlayer= document.getElementById('music-player-clear');
  showMusicPlayer.style.visibility = 'visible';

} else if(data.weather[0].main =="Clouds") {
  document.body.style.backgroundImage = 'url("cloudy.jpeg")';
} else if(data.weather[0].main =="Rain" || data.weather[0].main =="Drizzle" || data.weather[0].main =="Mist") {
  document.body.style.backgroundImage = 'url("rain.jpeg")';
} else if(data.weather[0].main =="Snow") {
  document.body.style.backgroundImage = 'url("snow.jpeg")';
} else {
  Document.body.style.backgroundImage = 'url("default.jpeg")';
}

var getcityName = document.getElementById('cityName');
getcityName.innerHTML = data.name;

var getTemperature = document.getElementById('temperature');
getTemperature.innerHTML = Math.floor(data.main.temp) + '&#176' + 'F';

var getWeatherDescription = document.getElementById('weatherDescription');
getWeatherDescription.innerHTML = data.weather[0].description;

var getWeatherIcon = document.getElementById('weatherIcon');
getWeatherIcon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';

displayWeatherInfo();
}

function displayWeatherInfo() {
  var weatherContainer = document.getElementById('weather-container');
  weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', ()=>{

var searchTerm = document.getElementById('searchInput').value;

if(searchTerm) {
}
searchWeather(searchTerm);

});




 

