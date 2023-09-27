document.addEventListener("DOMContentLoaded", () => {
    const apiKey = '597f1a3bceb0b0702f67757d4aeb78ff';
    const weatherInfo = document.getElementById('weatherInfo');
    const locationInput = document.getElementById('locationInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const unitSelector = document.getElementById('unitSelector');

    getWeatherBtn.addEventListener('click', () => {
        const location = locationInput.value;
        const unit = unitSelector.value;
        fetchWeather(location, unit);
    });

    function fetchWeather(location, unit) {
        // Build the API URL
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${'ae45114ef08523f523d3f887ccb62305'}`;

        // Fetch weather data
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data, unit);
                } else {
                    showError(data.message);
                }
            })
            .catch(error => {
                showError("An error occurred. Please try again.");
            });
    }

    function displayWeather(data, unit) {
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} ${unit === 'metric' ? '°C' : '°F'}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
        weatherInfo.style.display = 'block';
    }

    function showError(message) {
        weatherInfo.innerHTML = `<p class="error-message">${message}</p>`;
        weatherInfo.style.display = 'block';
    }
});
