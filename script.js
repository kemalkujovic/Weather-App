let apiKey = "81c012b926634fca41d6e3b2ad98d52b";
let requestBtn = document.querySelector("#sreachBtn");
let inputCity = document.querySelector("#inputCity");
let geoBtn = document.querySelector(".geoBtn");
requestBtn.addEventListener("click", async function requestApi() {
  let city = inputCity.value;
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const response = await axios.get(api);
  displayMessage(response.data);
});

geoBtn.addEventListener("click", async function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(succesFull, onError);
  } else {
    alert("Your browser not support Geo api");
  }
});
async function succesFull(position) {
  const { latitude, longitude } = position.coords;
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  const response = await axios.get(api);
  displayMessage(response.data);
}
function onError(error) {
  console.log(error);
}

function displayMessage(info) {
  console.log(info);
}
