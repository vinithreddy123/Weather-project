// Replace 'your_actual_api_key' with your actual API key from WeatherAPI
const API_KEY = ' da0842881d7b44f6aea104427242812 ';
const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=`;

document.getElementById('getWeather').addEventListener('click', () => {
  const city = document.getElementById('city').value.trim();

  if (city === '') {
    alert('Please enter a city name.');
    return;
  }

  const url = `${API_URL}${city}&hours=24`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then((data) => displayWeatherInfo(data))
    .catch((error) => {
      alert(error.message);
    });
});

function displayWeatherInfo(data) {
  const weatherInfoContainer = document.getElementById('weatherInfo');
  weatherInfoContainer.innerHTML = ''; // Clear previous data

  const hours = data.forecast.forecastday[0].hour;

  hours.forEach((hour) => {
    const time = new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const temperature = `${hour.temp_c}°C`;
    const condition = hour.condition.text;
    const icon = hour.condition.icon;

    const weatherItem = `
      <div class="weather-item">
        <img src="${icon}" alt="${condition}" title="${condition}" width="50" height="50">
        <p><strong>${time}</strong> - ${temperature} - ${condition}</p>
      </div>
    `;

    weatherInfoContainer.innerHTML += weatherItem;
  });
}
