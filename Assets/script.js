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
var ul = document.querySelector('.list-group')

// fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=50eda01c6654e53ed26f9a15174442c6')

function renderCity(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=50eda01c6654e53ed26f9a15174442c6')

   
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            console.log(json.wind.speed)

            // for (var i = 0; i < json.length; i++) {
            //     var listOfCities = json[i]
                
            //     var li = document.createElement('li')
            //     var a = document.createElement('a')
        
            //     li.classList.add('list-group-items')
            //     a.textContent = json.name
            //     a.href = json.html_url
            //     a.target = '_blank'
        
        
            //     li.appendChild(a)
            //     ul.appendChild(li)
            //     input.value = ""
            // }
        })
        
    
}

function renderWeather(city) {
    console.log('hello from renderWeather', city)
}

function handleSubmit(event) {
    event.preventDefault()
    var city = input.value
    console.log(city)
    renderCity(city)
    renderWeather(city)
}

form.addEventListener('submit', handleSubmit)