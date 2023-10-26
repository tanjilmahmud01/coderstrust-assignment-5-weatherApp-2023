const searchBtn = document.getElementById("searchbtn");

const fetchWeather = async (city) => {
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6137618f163a7faabb6066fd36974f4d`;

  const res = await fetch(API);
  const data = await res.json();
  showWeather(data);
};

const showWeather = (data) => {
  console.log(data);

  const sunriseDateObj = new Date(data.sys.sunrise * 1000);
  const sunsetDateObj = new Date(data.sys.sunset * 1000);
  const sunrise = sunriseDateObj.toLocaleTimeString();
  const sunset = sunsetDateObj.toLocaleTimeString();

  console.log(sunrise, sunset);

  const cityName = data.name;
  const countryCode = data.sys.country;
  const temperature = (data.main.temp - 273.15).toFixed(2);
  const temperatureFeelsLike = (data.main.feels_like - 273.15).toFixed(2);
  const weatherCondition = data.weather[0].description;
  const iconID = data.weather[0].icon;

  const weatherIcon = `https://openweathermap.org/img/wn/${iconID}@2x.png`;

  document.getElementById("countryCode").innerText = countryCode;
  document.getElementById("cityName").innerText = cityName;
  document.getElementById("temp-real").innerText = temperature;
  document.getElementById("temp-feels-like").innerText = temperatureFeelsLike;
  document.getElementById("weatherCondition").innerText = weatherCondition;
  document.getElementById("weatherIcon").setAttribute("src", `${weatherIcon}`);
  document.getElementById("sunrise").innerText = sunrise;
  document.getElementById("sunset").innerText = sunset;
};

const getWeather = () => {
  const city = document.getElementById("citySearch").value;

  fetchWeather(city);
  document.getElementById("weatherCard").classList.add("block");
};

searchBtn.addEventListener("click", getWeather);
