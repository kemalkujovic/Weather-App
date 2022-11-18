let apiKey = "81c012b926634fca41d6e3b2ad98d52b";
console.log(apiKey);
let requestBtn = document.querySelector("#sreachBtn");
requestBtn.addEventListener("click", async function requestApi() {
  let inputCity = document.querySelector("#inputCity");
  let city = inputCity.value;
  console.log(city);
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  console.log(api);
  const response = await axios.get(api);
  console.log(response);
});
