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

// Update the DOM
const updateDOM = (data) => {
  const {
    name,
    main: { temp, humidity },
    wind: { speed },
    weather,
  } = data;
  document.querySelector(".city").innerHTML = name;
  document.querySelector(".temp").innerHTML = `${Math.round(temp)}°C`;
  document.querySelector(".humidity").innerHTML = `${humidity}%`;
  document.querySelector(".wind").innerHTML = `${speed} km/h`;
  updateWeatherIcon(weather[0].main);
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
};

// Update the weather icon
const updateWeatherIcon = (weatherCondition) => {
  const weatherIcons = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
  };

  weatherIcon.src = weatherIcons[weatherCondition];
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
