const apiKey = "99b593697b019ab752078e672aa58c35";

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  getWeather(city);
});

async function getWeather(city) {
  const weatherDisplay = document.getElementById("weatherDisplay");

  if (!city) {
    weatherDisplay.innerHTML = "<p>Please enter a city name from Bihar.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
      return;
    }

    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    weatherDisplay.innerHTML = `
      <h2>${name}, Bihar</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
      <p><strong>${description}</strong></p>
      <p>🌡️ Temperature: ${temp}°C</p>
      <p>💨 Wind Speed: ${speed} m/s</p>
      <p>💧 Humidity: ${humidity}%</p>
    `;
  } catch (error) {
    weatherDisplay.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
  }
}
