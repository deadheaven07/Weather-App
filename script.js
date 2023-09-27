// AgroMonitoring API endpoint
const apiUrl = "https://api.agromonitoring.com/agro/1.0/weather";

// Get references to HTML elements
const cityInput = document.getElementById("cityInput");
const fetchWeatherBtn = document.getElementById("fetchWeatherBtn");
const weatherForecast = document.getElementById("weatherForecast");

// Function to fetch weather data
async function fetchWeatherData(city) {
    try {
        const response = await fetch(`${apiUrl}?city=${city}&appid=YOUR_API_KEY`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Function to display weather forecast
function displayWeatherForecast(city, forecast) {
    weatherForecast.innerHTML = `
        <h2>Weather Forecast for ${city}</h2>
        <p>Date: ${forecast.dt}</p>
        <p>Temperature: ${forecast.temperature}°C</p>
        <p>Humidity: ${forecast.humidity}%</p>
        <p>Weather Description: ${forecast.weather.description}</p>
    `;
}

// Event listener for the "Fetch Weather" button
fetchWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    try {
        const weatherData = await fetchWeatherData(city);
        if (weatherData.forecasts && weatherData.forecasts.length > 0) {
            const forecast = weatherData.forecasts[0]; // Get the first forecast
            displayWeatherForecast(city, forecast);
        } else {
            weatherForecast.innerHTML = "No forecast data available.";
        }
    } catch (error) {
        weatherForecast.innerHTML = "Error fetching weather data.";
    }
});
