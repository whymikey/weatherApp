import "./style.css";
import { getWeather } from "./app/api.js";
import { getWeatherImg } from "./app/utils.js";

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

async function showWeather(cityName) {
  const data = await getWeather(cityName, apiKey);
  renderWeather(data);
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
