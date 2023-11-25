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
const displayError = (error) => {
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
};

// Helper function to sanitize HTML
function sanitizeHTML(text) {
  var element = document.createElement("div");
  element.innerText = text;
  return element.innerHTML;
}

// Update the DOM
const updateDOM = (data) => {
  const {
    name,
    main: { temp, humidity },
    wind: { speed },
    weather,
  } = data;
  document.querySelector(".city").innerText = sanitizeHTML(name);
  document.querySelector(".temp").innerText = `${Math.round(temp)}°C`;
  document.querySelector(".humidity").innerText = `${humidity}%`;
  document.querySelector(".wind").innerText = `${speed} km/h`;
  updateWeatherIcon(sanitizeHTML(weather[0].main));
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
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

const init = () => {
  // When press enter
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkWeather(searchInput.value);
    }
  });

  // When button clicked
  searchButton.addEventListener("click", () => {
    checkWeather(searchInput.value);
  });
};

init();
