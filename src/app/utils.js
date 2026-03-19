export function getWeatherImg({ weather }) {
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
