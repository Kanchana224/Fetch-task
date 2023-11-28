
const weatherKey = "1946412e1c80ec2c0c7ed221cc24120f";
const url = "https://restcountries.com/v3.1/all";

const container = document.createElement("div");
container.className=("container");
document.body.append(container);

const row = document.createElement("div");
row.className=("row");
container.append(row);

fetch(url)
  .then((data) => data.json())
  .then((countries) => {
    for (let i = 0; i < countries.length; i++) {
      const column = document.createElement("div");
      column.classList.add("col-lg-4", "col-sm-12");
      row.append(column);

      const card = document.createElement("div");
      card.classList.add("card");
      column.append(card);

      card.innerHTML = `<div class="card-header">${countries[i].name.common}</div>
        <img src="${countries[i].flags.png}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Capital: ${countries[i].capital}</h5>
          <h5 class="card-title">Region: ${countries[i].region}</h5>
          <h5 class="card-title">Latlng: ${countries[i].latlng}</h5>
          <h5 class="card-title">Country code: ${countries[i].cca2}</h5>
        </div>
        <button class="btn btn-primary align" data-country-code="${countries[i].cca2}" id="button-${i}">Click for weather</button>`;

      const wbtn = card.querySelector(`#button-${i}`);
      wbtn.addEventListener("click", () => {
        const countryCode = wbtn.getAttribute("data-country-code");
        getWeather(countryCode);
      });
    }
  })
  .catch((error) => {
    console.log("Error fetching countries:", error);
  });

function getWeather(countryCode) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryCode}&appid=${weatherKey}`;
  
  fetch(weatherUrl)
    .then((res) => res.json())
    .then((data) => {
      alert(`Weather in ${countryCode}: ${data.weather[0].description}`);
    })
    .catch((error) => {
      console.log("Error fetching weather:", error);
    });
}