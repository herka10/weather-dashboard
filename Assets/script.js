/*
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index (*** no longer free to use)
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
*/

// select elements
    // form
    // input
    // ul

// listen to submit event
    // get city out of input
    // fetch cities 
        // show city in ul


var form = document.querySelector('form')
var input = document.getElementById('search-input')
var ul = document.querySelector('list-group')
var moment = moment()

var storedCity = JSON.parse(localStorage.getItem("city")) || []

function renderCity(city) {
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=50eda01c6654e53ed26f9a15174442c6&units=imperial&timezone_offset')
    
        .then(function(response) {
            return response.json()
        })

        .then(function(json) {
            console.log('test:', json)
            // renderWeather(json.coord.lat, json.coord.lon)
            var icon = 'http://openweathermap.org/img/w/' + json.list[0].weather[0].icon + '.png'
            var weatherTodayBody = document.getElementById('weatherToday')            
            weatherTodayBody.innerHTML = ""
            var iconImgEl = document.createElement('img')
            var currentTempEl = document.createElement('H4')
            var currentDateEl = document.createElement('H4')
            var cityNameEl = document.createElement('H2')
            var dateToday = moment.format('M/DD/YYYY')
            var windEl = document.createElement('H4')
            var humidityEl = document.createElement('H4')


            cityNameEl.textContent = json.city.name
            currentDateEl.textContent = dateToday
            currentTempEl.textContent = "Temp: " + json.list[0].main.temp + "° F"
            windEl.textContent = "Wind Speed: " + json.list[0].wind.speed + " MPH"
            humidityEl.textContent = "Humidity: " + json.list[0].main.humidity + "%"
            iconImgEl.setAttribute('src', icon)
            iconImgEl.textContent = icon

            weatherTodayBody.appendChild(cityNameEl)
            weatherTodayBody.appendChild(currentDateEl)
            weatherTodayBody.appendChild(iconImgEl)
            weatherTodayBody.appendChild(currentTempEl)
            weatherTodayBody.appendChild(windEl)
            weatherTodayBody.appendChild(humidityEl)
            
            
            //local storage
            var searchHistory = document.getElementById("searchHistory")
            var cityButton = document.getElementById("cityBtn")

            console.log('flag', storedCity)
            console.log('cityNameEl.innerText', cityNameEl.innerText)
            storedCity.push(cityNameEl.innerText)
            console.log(storedCity)

            localStorage.setItem("city", JSON.stringify(storedCity))
            //localStorage.setItem("temp", currentTempEl.innerText)

            

            //currentDateEl.addEventListener
            
            //cityButton.textContent = storedCity
            
            

            
            input.value = ""
            addToLocalStorage()
        })
}

// function checkLocalStorage(city) {
//     const keys = localStorage.getItem("city")
//     let cityExists = false
//     if (keys) {
//         const keyData = JSON.parse(keys)
//         cityExists = keyData.find(key => 
//     }
// }

function addToLocalStorage() {
    if(storedCity.length !== 0){
        for (let i = 0; i < storedCity.length; i++) {
            const element = storedCity[i];
            var currentDateEl = document.createElement("button")
            currentDateEl.classList.add("cityList")
            currentDateEl.textContent = element
            searchHistory.appendChild(currentDateEl)    
        }
        
        // if (localStorage.getItem("storedCity") === null) {
        //     return
        // }

        // document.querySelector(".cityList").addEventListener("click", function(){
        //     console.log('this', this.innerText)
        // })

        var cityHistory = document.querySelectorAll(".cityList")
        cityHistory.forEach(cityList => cityList.addEventListener("click", function() {
            renderCity(this.innerText)
            renderWeather(this.innerText)
        }))
        
        // .addEventListener("click", function(){
        //     renderCity(this.innerText)
        //     renderWeather(this.innerText)
        // })
    }
}


// function renderIndex(lat, lon) {
//     fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=appid=50eda01c6654e53ed26f9a15174442c6&units=imperial&timezone_offset`)
//         .then(function(index) {
//             return index.json()
//         })
//         .then(function(json) {
//             console.log('renderIndex', json)
//         })
// } (Can't use function because the API isn't free to use)


function renderWeather(city) {
    console.log('test renderWeather: hello')
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=50eda01c6654e53ed26f9a15174442c6&units=imperial&timezone_offset&per_page=10&sort=')
    
        .then(function(response) {
            return response.json()
        })

        .then(function(fiveDay) {
            //console.log('fiveDay', fiveDay)
            var fiveDayBody = document.getElementById('fiveDay')
            fiveDayBody.innerHTML = ""

            for (var i = 0; i < fiveDay.list.length; i++) {
                var data = fiveDay.list[i]
                var timeStamp = data.dt_txt.split(" ")[1]

                if (timeStamp === "00:00:00") { 
                    var icon = 'http://openweathermap.org/img/w/' + fiveDay.list[0].weather[0].icon + '.png'
                    var iconImgEl = document.createElement('img')
                    var tempEl = document.createElement('H4')
                    var dateEl = document.createElement('H4')
                    //var theDate = moment.format('M/DD/YYYY')
                    var windEl = document.createElement('H4')
                    var humidityEl = document.createElement('H4')

                    fiveDayBody.classList.add('card-body')
                    tempEl.textContent = "Temp: " + fiveDay.list[0].main.temp + "° F"                
                    dateEl.textContent = data.dt_txt.split(" ")[0]
                    windEl.textContent = "Wind Speed: " + fiveDay.list[0].wind.speed + " MPH"
                    humidityEl.textContent = "Humidity: " + fiveDay.list[0].main.humidity + "%"
                    iconImgEl.setAttribute('src', icon)
                    iconImgEl.textContent = icon

                    fiveDayBody.appendChild(iconImgEl)
                    fiveDayBody.appendChild(dateEl)
                    fiveDayBody.appendChild(tempEl)
                    fiveDayBody.appendChild(windEl)
                    fiveDayBody.appendChild(humidityEl)

                }
            
            } 
        }) 
}

function handleSubmit(event) {
    event.preventDefault()
    var city = input.value
    renderCity(city)
    renderWeather(city)
    // renderIndex(city)
}

form.addEventListener("submit", handleSubmit)

//localStorage.setItem("renderCity", renderCity.toString());

//var compressedRenderCity = localStorage.getItem("renderCity");

//var renderCity = eval('(' + compressedRenderCity + ')');

//enderCity();

