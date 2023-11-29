
const url = "https://restcountries.com/v3.1/all";

const container = document.createElement("div");
container.className = "container";
document.body.append(container);

const title = document.createElement("h1");
title.id = "title";
title.className = "text-center";
title.innerText = "Country Information";
container.append(title);

const row = document.createElement("div");
row.className = "row";
container.append(row);

fetch(url)
  .then((data) => data.json())
  .then((countries) => {
    for (let i = 0; i < countries.length; i++) {
      const column = document.createElement("div");
      column.classList.add("col-lg-4", "col-sm-12","col-md-");
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
        <button class="btn btn-primary align" data-country-code="${countries[i].cca2}" id="button">Click for weather</button>`;

      const wbtn = card.querySelector("#button");
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
  var weatherKey = "93372f2459ba50f22c1705d06dfb73ef";
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryCode}&appid=${weatherKey}`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      var weatherCountryName = weatherData.name;

      if (weatherCountryName === countryCode) {
        alert(
          `Weather in ${weatherData.name}: ${weatherData.main.temp_min} min:deg&c && ${weatherData.main.temp_max} max:deg&c`
        );
      } else {
        alert("Country names do not match.");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert`Error fetching weather data.`;
    });
}