import "./style.css";
import { fetchWeatherData } from "./app/api";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const container = document.querySelector(".container");
const mainWeatherImg = document.querySelector(".weather__img");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherTemperature = document.querySelector(".weather__temperature");
const weatherType = document.querySelector(".weather__description");
const weatherInput = document.querySelector(".search__input");
const weatherInputButton = document.querySelector(".btn");
const weatherDetails = document.querySelector(".weather__details");

function renderWeather(data) {
  if (!data.isValid) {
    weatherDetails.style.display = "none";
    container.classList.add("expanded");
    mainWeatherImg.src = "./src/images/404.png";
    weatherType.textContent = "Oops! Invalid location :/";
    weatherTemperature.textContent = "";
    return;
  }

  mainWeatherImg.src = getWeatherImg(data);
  wind.textContent = `${data.wind} m/s`;
  humidity.textContent = `${data.humidity}%`;
  weatherTemperature.textContent = `${data.temperature}°C`;
  weatherType.textContent = data.weatherDescription;

  weatherDetails.style.display = "flex";
  container.classList.add("expanded");
}

function getWeatherImg({ weather }) {
  switch (weather) {
    case "Clear":
      return "./src/images/clear.png";
    case "Clouds":
      return "./src/images/cloud.png";
    case "Mist":
      return "./src/images/mist.png";
    case "Rain":
      return "./src/images/rain.png";
    case "Snow":
      return "./src/images/snow.png";
    default:
      return "./src/images/404.png";
  }
}

async function showWeather(cityName) {
  const data = await getWeather(cityName);
  renderWeather(data);
}

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetchWeatherData(url);

  if (!response) {
    return {
      isValid: false,
    };
  }

  const weatherData = {
    isValid: true,
    name: response.city.name,
    humidity: response.list[0].main.humidity,
    wind: response.list[0].wind.speed,
    temperature: response.list[0].main.temp,
    weatherDescription: response.list[0].weather[0].description,
    weather: response.list[0].weather[0].main,
  };

  return weatherData;
}

weatherInputButton.addEventListener("click", () => {
  const nameOfCity = weatherInput.value;
  showWeather(nameOfCity);
  weatherInput.value = "";
});

weatherInput.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    const nameOfCity = weatherInput.value;
    showWeather(nameOfCity);
    weatherInput.value = "";
  }
});
