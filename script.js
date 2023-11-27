// API variables
const apiKey = "76766833beef123ef3d83821209b4443";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;

// Setting up elements we want with DOM
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Fetch data from API
const fetchData = async (city) => {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return await response.json();
};

// Handle errors
const displayError = () => {
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
};

function sanitizeHTML(text) {
  const parser = new DOMParser();
  const sanitizedText = parser.parseFromString(text, "text/html").body.textContent;
  return sanitizedText;
}

const updateDOM = (data) => {
  const { name, main, wind, weather } = data;
  const { temp, humidity } = main;
  const { speed } = wind;

  const cityElement = document.querySelector(".city");
  const tempElement = document.querySelector(".temp");
  const humidityElement = document.querySelector(".humidity");
  const windElement = document.querySelector(".wind");
  const weatherElement = document.querySelector(".weather");
  const errorElement = document.querySelector(".error");

  cityElement.innerText = sanitizeHTML(name);
  tempElement.innerText = `${Math.round(temp)}°C`;
  humidityElement.innerText = `${humidity}%`;
  windElement.innerText = `${speed} km/h`;

  updateWeatherIcon(sanitizeHTML(weather[0].main));

  weatherElement.style.display = "block";
  errorElement.style.display = "none";
};

// Update the weather icon
const updateWeatherIcon = (weatherCondition) => {
  const weatherIcons = {
    Clouds: "fa-solid fa-cloud",
    Clear: "fa-regular fa-sun",
    Rain: "fa-solid fa-cloud-showers-heavy",
    Drizzle: "fa-solid fa-cloud-rain",
    Mist: "fa-solid fa-smog",
  };

  weatherIcon.insertAdjacentHTML = `<i class="${weatherIcons[weatherCondition]}"></i>`;
};

// Check weather function
const checkWeather = async (city) => {
  try {
    const data = await fetchData(city);
    updateDOM(data);
  } catch (error) {
    displayError(error);
  }
};

/**
 * Initializes the application by adding event listeners to the document and search button.
 */
const init = () => {
  document.addEventListener("keydown", handleEnterKeyPress);
  searchButton.addEventListener("click", handleSearchButtonClick);
};

const handleEnterKeyPress = (event) => {
  if (event.key === "Enter") {
    checkWeather(searchInput.value);
  }
};

const handleSearchButtonClick = () => {
  checkWeather(searchInput.value);
};

init();
