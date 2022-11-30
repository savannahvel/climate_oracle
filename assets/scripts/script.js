const api_key = `c0d7f45c0789925317225c4d805d1a2a`;

let zipFromEl = document.querySelector('#zip-search-form');
let zipCodeEl = $('#location');
let currentDateEl = $('#current-date');

var zipCode = '';

var rightNow = dayjs().format('MMM DD, YYYY');
currentDateEl.text(rightNow);


function isValidUSZip(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip);
}

function recentSearch() {
    let lastSearch = localStorage.getItem('mostRecent');
    if (lastSearch) {
        zipCode = lastSearch;
        getLatAndLon();
    } else {
        zipCode = 97035;
        getLatAndLon();
    }
}

recentSearch()

function saveZipCode() {
    localStorage.setItem("mostRecent", zipCode)
    // write code to display
    let zipListEl = document.querySelector('#zip-list');
    let newZip = document.createElement('li');
    newZip.innerHTML = zipCode;
    zipListEl.appendChild(newZip);
}

function getLatAndLon() {
    saveZipCode()
    let weatherApi = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&units=imperial&appid=${api_key}`;
    fetch(weatherApi)
        .then((response) => response.json())
        .then((data) => {
            let lat = data.city.coord.lat;
            let lon = data.city.coord.lon;
            
            setHero(data)
            getWeather(lat, lon)
    })
}

function setHero(data) {
    console.log(data);
    // clearing instructions if app has been used previously
    let instructions = document.querySelector('#instructions');
    instructions.innerHTML = '';
    let displayLocation = document.querySelector('#city');
    // displayLocation
}


function getWeather(lat, lon) {
    let weatherApi = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${api_key}`

    fetch(weatherApi)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            fiveDayForecast(data)
    })
}


function fiveDayForecast(resp) {
    console.log("this if five day forecast")
    let weatherEl = document.querySelector('#weather');

    weatherEl.innerHTML = resp.daily
        .map((day, idx) => {
            console.log(day)
            if (idx <= 4) {
                var date = dayjs.unix(day.dt).format('ddd');
                let weatherType = day.weather[0].description;
                let tempHigh = day.temp.max;
                let tempLow = day.temp.min;
                let sunrise = dayjs.unix(day.sunrise).format('h:mm a');
                let sunset = dayjs.unix(day.sunset).format('h:mm a');
                
                return `<section class="p-4 m-1 border border-primary rounded bg-info"><b>${date}</b> <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"> <b>${weatherType}</b> High Temp <b>${tempHigh}</b> Low Temp <b>${tempLow}</b> Sunrise <b>${sunrise}</b> Sunset <b>${sunset}</b></section>`
            }
    }).join(' ');
}



var formSubmitHandler = function(event) {
    event.preventDefault();

    zipCode = zipCodeEl.val();

    let isValidZipCode = isValidUSZip(zipCode);

    if (isValidZipCode) {  
        getLatAndLon()
    } else {
        console.log(zipCode)
        console.log("Please enter a valid US zip code")
    }
}

zipFromEl.addEventListener('submit', formSubmitHandler);
