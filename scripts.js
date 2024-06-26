// Use query selectors to access elements by their class and store them in variables
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "5d24d8150c9cae72f4cd96993ca7195e"; // API key for OpenWeatherMap API

// function to create weather card using innerHTML
const createWeatherCard = (cityName, weatherItem, index) => {
    // parse date string to a date object
    const date = new Date(weatherItem.dt_txt.split(" ")[0]);
    // format the date to be MM/DD/YYY
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    
    if(index === 0) { // HTML for the main weather card
        return `<div class="details">
                    <h2>${cityName} (${formattedDate})</h2>
                    <h6>Temperature Fahrenheit: ${((weatherItem.main.temp - 273.15) * 9/5 + 32).toFixed(2)}°F</h6>
                    <h6>Temperature Celcius: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { // HTML for the other five day forecast card
        return `<li class="card">
                    <h2>${cityName} (${formattedDate})</h2>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>Temp F: ${((weatherItem.main.temp - 273.15) * 9/5 + 32).toFixed(2)}°F</h6>
                    <h6>Temp C: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}

// function to get weather details (name, latitude, longitude) from our weather API
const getWeatherDetails = (cityName, latitude, longitude) => {
    // construct the API URL using the provided lat, lon and API_KEY
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    // fetch weather data from the API
    fetch(WEATHER_API_URL)
    // parse the response as JSON
    .then(response => response.json())
    // process the JSON data
    .then(data => {
        // Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        // Clearing previous weather data
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";

        // Creating weather cards and adding them to the DOM
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}

// function to get city's coordinates
// TODO: Make search bar suggest cities as the user types
const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    // Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (!data.length) return alert(`No coordinates found for ${cityName}`);
            const { lat, lon, name } = data[0];
            getWeatherDetails(name, lat, lon);
        }).catch(() => {
            alert("An error occurred while fetching the coordinates!");
        });
}

// function to get the user's coordinates
const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; // Get coordinates of user location
            // Get city name from coordinates using reverse geocoding API
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL).then(response => response.json()).then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                alert("An error occurred while fetching the city name!");
            });
        },
        error => { // Show alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                alert("Geolocation request error. Please reset location permission.");
            }
        });
}

// function to fetch city suggestions based on user input
const fetchCitySuggestions = (inputValue) => {
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${API_KEY}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const suggestions = data.map(city => city.name);
            updateCitySuggestions(suggestions);
        })
        .catch(() => {
            console.error("Error fetching city suggestions");
        });
}

// Function to update the city suggestions list in the UI
const updateCitySuggestions = (suggestions) => {
    const suggestionsList = document.querySelector(".city-suggestions");
    suggestionsList.innerHTML = "";

    suggestions.forEach(city => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add("suggestion");
        suggestionItem.textContent = city;
        suggestionsList.appendChild(suggestionItem);

        // Add click event listener to suggestion items to populate the input field with the selected city
        suggestionItem.addEventListener("click", () => {
            cityInput.value = city;
            suggestionsList.innerHTML = "";
            getCityCoordinates();
        });
    });
}

// event listener for keyup event on cityInput
cityInput.addEventListener("keyup", () => {
    const inputValue = cityInput.value.trim();
    if (inputValue.length >= 2) {
        fetchCitySuggestions(inputValue);
    }
});

locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());