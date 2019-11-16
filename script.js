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
    console.log(response);

  })
    .catch(error => {
      alert("Invalid Zipcode or City Name. Please re-enter a zip code or City Name");
    })
}

function init(data) {
  if(data.weather[0].main =="Clear") {
   document.body.style.backgroundImage = 'url("clear.jpeg")';
   var showMusicPlayer= document.getElementById('music-player-clear');
   showMusicPlayer.style.display = 'block';
   selectPic = 'sun';
  } else if(data.weather[0].main =="Clouds" || data.weather[0].main =="smoke" || data.weather[0].main =="haze" || data.weather[0].main =="dust" || data.weather[0].main =="fog" || data.weather[0].main =="sand" || data.weather[0].main =="ash" || data.weather[0].main =="squall") {
   document.body.style.backgroundImage = 'url("cloudy.jpeg")';
   var showMusicPlayer= document.getElementById('music-player-inclement');
   showMusicPlayer.style.display = 'block';
   selectPic = 'clouds';
  } else if(data.weather[0].main =="Rain" || data.weather[0].main =="Drizzle" || data.weather[0].main =="Mist") {
   document.body.style.backgroundImage = 'url("rain.jpeg")';
   var showMusicPlayer= document.getElementById('music-player-rain');
   showMusicPlayer.style.display = 'block';
   selectPic = 'rain';
  } else if(data.weather[0].main =="Snow") {
   document.body.style.backgroundImage = 'url("snow.jpeg")';
   var showMusicPlayer= document.getElementById('music-player-snow');
   showMusicPlayer.style.display = 'block';
   selectPic = 'snow';
  } else if(data.weather[0].main =="thunderstorm" || data.weather[0].main =="tornado") {
   document.body.style.backgroundImage = 'url("storm.jpeg")';
   var showMusicPlayer= document.getElementById('music-player-storm');
   showMusicPlayer.style.display = 'block';
   selectPic = 'storm';
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
  searchPictures(selectPic);

  }
  function displayWeatherInfo() {
   var weatherContainer = document.getElementById('weather-container');
   weatherContainer.style.visibility = 'visible';
  }
  document.getElementById('searchBtn').addEventListener('click', ()=>{
  var searchTerm = document.getElementById('searchInput').value;
  if(searchTerm) {
    searchWeather(searchTerm);
  } else {
  }
  });

  var apiKey = 'LpGRYoMy3u0jMWSHsqfe8CUWKQ9HtnqT';
  var selectPic ='';

  async function searchPictures(selectPic)  {

    const result = await fetch(`http://api.giphy.com/v1/gifs/search?q=${selectPic}&api_key=${apiKey}&limit=25&`)
                                .then(res => res.json())

    if (result) {
      display(result);
    } else {
      alert("No Pics Found");
    }
  
  }

function display(result) {
    var img = document.createElement("img");

    var randomIndex = Math.floor(Math.random() * result.data.length)

    img.src = result.data[randomIndex].images.downsized.url;

    img.style.height = '250px';
    img.style.width = '250px';

    var output = document.getElementsByClassName("output")[0];

    if (output.hasChildNodes()) {
      output.removeChild(output.childNodes[0])
    }

    output.appendChild(img);
};
 
