const api_key = `c0d7f45c0789925317225c4d805d1a2a`;

let zipFromEl = document.querySelector('#zip-search-form');
let zipCodeEl = $('#location');
let currentDateEl = $('#current-date');

var zipCode = '';
let latitude = 0;
let lon = 0;

var rightNow = dayjs().format('MMM DD, YYYY');
currentDateEl.text(rightNow);



/**
 * TODO: Store and Retrieve Zip Code from Local Storage
 */

// get lon & lat

function getLatAndLon() {
    let weatherApi = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&units=imperial&appid=${api_key}`;

    fetch(weatherApi).then((response) => {
        response.json().then((data) => {
            console.log(data);
            console.log("HI")
            latitude = data.city.coord.lat
            lon = data.city.coord.lon.toFixed(2);
        })
        console.log(latitude)
    })
}

function isValidUSZip(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip);
}

function searchZip() {
    

    let getLatLonApi = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&units=imperial&appid=${api_key}`;

    fetch(getLatLonApi).then((response) => {
        response.json().then((data) => {
            console.log(data.city.coord.lat)
            lat = data.city.coord.lat
            lon = data.city.coord.lon.toFixed(2);
        })
        console.log(lat)
        console.log(lon)
    })
    // let weatherApi = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&units=imperial&appid=${api_key}`;
    let weatherApi = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${api_key}`
    console.log(weatherApi)

    // fetch(weatherApi).then((response) => {
    //     if (response.ok) {
    //         response.json().then((data) => {
    //             console.log(data);
    //             // console.log(data)
    //             // create function for setting current weather and pass into it data
    //             currentWeather(data);
    //             // create function for 5 day forecast and pass into it data
    //             fiveDayForecast(data);
    //         })
    //     } else {
    //         throw new Error(response.statusText);
    //     }
    // }).catch(console.error);
}

function currentWeather(data) {
    console.log("do something");
    
}

function fiveDayForecast(resp) {
    console.log("this if five day forecast")
    let weatherEl = document.querySelector('#weather');

    let day0 = []
    let day1;
    let day2;
    let day3;
    let day4;

    for (let i = 0; i <= resp.list.length; i++) {
        respDate = dayjs.unix(resp.list[i].dt).format('ddd');
        if (respDate === day[i]) {
            return;
        } else {
            day[i] = respDate;
            if (idx <= 4) {
                var unixFormat = dayjs.unix(day.dt).format('ddd');
                let weatherType = day.weather[0].description.toUpperCase();
                let temp = day.main.temp;
                let feelsLike = day.main.feels_like;
                let humidity = day.main.humidity;
                
                // return `<section class="p-4 m-1 border border-primary rounded bg-info">${date} <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"> Temp Humidity </section>`
                
                
                return `<section class="p-4 m-1 border border-primary rounded">
                    <h5 class="card-title">${unixFormat}</h5>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
                    <div class="card-body">
                        <h6 class="card-title">${weatherType} Current Temp: ${temp}</h6>
                        <p class="card-text"> Feels Like: ${feelsLike} Humidity: ${humidity}</p>
                    </div>
                </section>`
            }
        }
    }

    // weatherEl.innerHTML = resp.list
    //     .map((day, idx) => {
    //         console.log(day)
    //         if (idx <= 4) {
    //             // let date = new Date(day.dt * 1000);
    //             var unixFormat = dayjs.unix(day.dt).format('ddd');
    //             let weatherType = day.weather[0].description.toUpperCase();
    //             let temp = day.main.temp;
    //             let feelsLike = day.main.feels_like;
    //             let humidity = day.main.humidity;
                
    //             // return `<section class="p-4 m-1 border border-primary rounded bg-info">${date} <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"> Temp Humidity </section>`
                
                
    //             return `<section class="p-4 m-1 border border-primary rounded">
    //                 <h5 class="card-title">${unixFormat}</h5>
    //                 <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
    //                 <div class="card-body">
    //                     <h6 class="card-title">${weatherType} Current Temp: ${temp}</h6>
    //                     <p class="card-text"> Feels Like: ${feelsLike} Humidity: ${humidity}</p>
    //                 </div>
    //             </section>`
    //         }
    // }).join(' ');
}



var formSubmitHandler = function(event) {
    event.preventDefault();

    zipCode = zipCodeEl.val();

    let isValidZipCode = isValidUSZip(zipCode);

    if (isValidZipCode) {  
        // if valid, run call, list zip code, store in local storage
        // searchZip()
        getLatAndLon()
    } else {
        // look into how to display error near/under the input field
        console.log("Please enter a valid US zip code")
    }
}


// submitBtn.addEventListener("click", searchZip)


/**
 * TODO: Call weather app service and provide zip code
 */

// zipSearchForm.on('submit', searchZip);
zipFromEl.addEventListener('submit', formSubmitHandler);
// submitScoreBtn.addEventListener("click", submitScore)