$(function () {// setting up jquery
//declaring globals
var APIKey = 'f0c135be83c5554c16fc27029a94d4c7';
var search = $('#search-button');
var clear = $('#clear-button');
var city = "";
var savedCityBlock = $('#saved-cities');

//function creation secition
function handleSavedCity(event){
    var btnClicked = $(event.target);
    city  = btnClicked.attr('id');

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey+"&units=imperial";
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey +"&units=imperial";
    var icon = "";

    $('#search-bar').val("");

    fetch(queryURL)
        .then(function(response){
        if (response.status === 200){ 
            return response.json();
        }
        })
        .then(function (data){
            $('#city-name').text(city);
            $('#today-temp').text(data.main.temp);
            $('#today-wind').text(data.wind.speed);
            $('#today-humidity').text(data.main.humidity);
            icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            $('#today-icon').attr('src', icon);
            apiConnected = true;
        })
  
        fetch(forecastURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var forecast = document.getElementById('fiveday-forecast');
            forecast.innerHTML = "";
            for (var i = 1; i < 34; i++)
            {
                var day = data.list[i];
                if (i === 1 || i === 9 || i === 17 || i === 25 || i === 33){
                icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
                var formatDate = dayjs(day.dt_txt).format('M/D/YYYY')

                    var newDay = `<div id="day-of-week" class="col-2 me-4">
                    <p id="future-day">${formatDate}</p>
                    <img src="${icon}" alt="" id="future-icon">
                    <p>Temp: <span id="future-temp">${day.main.temp}</span><span>F</span></p>
                    <p>Wind: <span id="future-wind">${day.wind.speed}</span><span>MPH</span></p>
                    <p>Humidity: <span id="future-humidity">${day.main.humidity}</span><span>%</span></p>
                </div>`;
                forecast.innerHTML += newDay;
                }
            }
        })
}


function createNewButton(cityName){
    return `<button class="btn btn-secondary mt-1 savedCity" id="${cityName}">${cityName}</button>`;
}


function loadSavedCities() {
    var savedCities = JSON.parse(localStorage.getItem('SavedCities'));

    var savedCitiesHTML = document.getElementById('saved-cities');
    
    if (localStorage.getItem('SavedCities') === null)
    {
        return
    }

    for (var i = 0; i < savedCities.length; i++)
    {
        savedCitiesHTML.innerHTML += savedCities[i];
    }
}

function findCity (){
    city  = $('#search-bar').val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey+"&units=imperial";
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey +"&units=imperial";
    var icon = "";
    var savedCitiesHTML = document.getElementById('saved-cities');

    $('#search-bar').val("");

    fetch(queryURL)
        .then(function(response){
        if (response.status === 200){ 
            return response.json();
        }
        })
        .then(function (data){
            $('#city-name').text(city);
            $('#today-temp').text(data.main.temp);
            $('#today-wind').text(data.wind.speed);
            $('#today-humidity').text(data.main.humidity);
            icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            $('#today-icon').attr('src', icon);
            apiConnected = true;
        })
  
        fetch(forecastURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var forecast = document.getElementById('fiveday-forecast');
            forecast.innerHTML = "";
            for (var i = 1; i < 34; i++)
            {
                var day = data.list[i];
                if (i === 1 || i === 9 || i === 17 || i === 25 || i === 33){
                icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
                var formatDate = dayjs(day.dt_txt).format('M/D/YYYY')

                    var newDay = `<div id="day-of-week" class="col-2 me-4">
                    <p id="future-day">${formatDate}</p>
                    <img src="${icon}" alt="" id="future-icon">
                    <p>Temp: <span id="future-temp">${day.main.temp}</span><span>F</span></p>
                    <p>Wind: <span id="future-wind">${day.wind.speed}</span><span>MPH</span></p>
                    <p>Humidity: <span id="future-humidity">${day.main.humidity}</span><span>%</span></p>
                </div>`;
                forecast.innerHTML += newDay;
                }
            }
        })

        savedCitiesHTML.innerHTML += createNewButton(city);

        if (localStorage.getItem('SavedCities') === null)
        {
            var cities = [];
            cities.push(createNewButton(city));
            var citiesTemp = JSON.stringify(cities)
            localStorage.setItem('SavedCities', citiesTemp);
        }
        else {
            var cities = JSON.parse(localStorage.getItem('SavedCities'));
            cities.push(createNewButton(city));
            var citiesTemp = JSON.stringify(cities);
            localStorage.setItem('SavedCities', citiesTemp);
        }

}

function clearLocalStorage(){
    localStorage.clear();
    savedCityBlock.html('');
}

//function decleration for use
search.on('click', findCity)
clear.on('click', clearLocalStorage)
loadSavedCities();
savedCityBlock.on('click', '.savedCity', handleSavedCity);

});