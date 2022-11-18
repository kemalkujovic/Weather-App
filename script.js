let apiKey = "81c012b926634fca41d6e3b2ad98d52b";
let requestBtn = document.querySelector("#sreachBtn");
let inputCity = document.querySelector("#inputCity");
let geoBtn = document.querySelector(".geoBtn");
let infoText = document.querySelector(".infoText");
let weatherSection = document.querySelector(".weather");
let weatherImg = document.querySelector(".iconWeather");
requestBtn.addEventListener("click", async function requestApi() {
  let city = inputCity.value;
  try {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await axios.get(api);
    await displayWait(response);
    displayMessage(response.data);
  } catch (error) {
    if (error.request.status === 404) {
      infoText.innerHTML = `${inputCity.value} it's not valid city`;
      infoText.classList.add("displayMessageError");
    }
  }
});
async function displayWait(res) {
  infoText.innerHTML = "Waiting...";
  infoText.classList.replace("displayMessageError", "displayMessage");
}
geoBtn.addEventListener("click", async function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(succesFull, onError);
  } else {
    alert("Your browser not support Geo api");
  }
});
async function succesFull(position) {
  displayWait();
  infoText.style.display = "block";
  const { latitude, longitude } = position.coords;
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  const response = await axios.get(api);
  displayMessage(response.data);
}
function onError(error) {
  infoText.innerHTML = error.message;
  infoText.classList.add("displayMessageError");
}

function displayMessage(info) {
  console.log(info);
  const city = info.name;
  const country = info.sys.country;
  const { description, id } = info.weather[0];
  const { feels_like, humidity, temp } = info.main;
  if (id == 800) {
    weatherImg.src = "icon/clear.svg";
  } else if (id >= 200 && id <= 232) {
    weatherImg.src = "icon/storm.svg";
  } else if (id >= 600 && id <= 622) {
    weatherImg.src = "icon/snow.svg";
  } else if (id >= 701 && id <= 781) {
    weatherImg.src = "icon/haze.svg";
  } else if (id >= 801 && id <= 804) {
    weatherImg.src = "icon/cloud.svg";
  } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
    weatherImg.src = "icon/rain.svg";
  }

  weatherSection.style.display = "flex";
  document.querySelector(".input-container").style.display = "none";
  weatherSection.querySelector(".numb").innerHTML = `${Math.floor(temp)}°C`;
  weatherSection.querySelector(".descripton").innerHTML = description;
  weatherSection.querySelector(".location").innerText = `${city}, ${country}`;
  weatherSection.querySelector(".descripton").innerHTML = description;
  weatherSection.querySelector(".left-card span").innerHTML = `${Math.floor(
    feels_like
  )}°C`;
  weatherSection.querySelector(".right-card span").innerHTML = `${humidity}%`;
}
