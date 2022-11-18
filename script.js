let apiKey = "81c012b926634fca41d6e3b2ad98d52b";
let requestBtn = document.querySelector("#sreachBtn");
let inputCity = document.querySelector("#inputCity");
let geoBtn = document.querySelector(".geoBtn");
let infoText = document.querySelector(".infoText");
requestBtn.addEventListener("click", async function requestApi() {
  let city = inputCity.value;
  try {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await axios.get(api);
    displayWait(response);
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

function displayMessage(info) {}
