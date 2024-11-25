// script.js
const API_KEY = 'e16b2e461e1931ea00a72bb550339ce1'; // Replace with your OpenWeather API key.

const getWeatherBtn = document.getElementById('get-weather-btn');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const errorMessage = document.getElementById('error-message');

const cityNameEl = document.getElementById('city-name');
const weatherDescriptionEl = document.getElementById('weather-description');
const temperatureEl = document.getElementById('temperature');
const weatherIconEl = document.getElementById('weather-icon');

getWeatherBtn.addEventListener('click', async () => {
    // Adds a click event listener to the "Get Weather" button.
// When the button is clicked, the provided function is executed.
  const city = cityInput.value.trim();
//   Retrieves the value entered in the input box and removes leading/trailing whitespace using .trim().

  if (!city) {
    showError('Please enter a city name.');
    return;
    // Checks if the city is empty. If it is, displays an error message and stops further execution using return.
  }

  try {
    clearDisplay();
    // Calls a helper function to reset the UI, hiding any previous weather data or error messages.
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error('City not found!');

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
});

function displayWeather(data) {
  weatherDisplay.classList.remove('hidden');
  errorMessage.classList.add('hidden');

  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  weatherDescriptionEl.textContent = data.weather[0].description;
  temperatureEl.textContent = `Temperature: ${data.main.temp}°C`;
  weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

function showError(message) {
  weatherDisplay.classList.add('hidden');
  errorMessage.classList.remove('hidden');
  errorMessage.textContent = message;
}

function clearDisplay() {
  weatherDisplay.classList.add('hidden');
  errorMessage.classList.add('hidden');
}


