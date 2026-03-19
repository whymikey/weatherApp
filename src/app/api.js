async function fetchWeatherData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("error");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getWeather(city, apiKey) {
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
