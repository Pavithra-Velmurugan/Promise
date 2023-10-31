document.addEventListener("DOMContentLoaded", function () {
  const countries = [
    { name: "Afghanistan", code: "AF" },
    { name: "Aland Islands", code: "AX" },
    { name: "Albania", code: "AL" },
  ];

  // Function to create a Bootstrap card
  function createCard(countryData) {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-sm-12");

    card.innerHTML = `
          <div class="card">
              <img class="card-img-top" src="${countryData.flag}" alt="${countryData.name} Flag">
              <div class="card-body">
                  <h5 class="card-title">${countryData.name}</h5>
                  <p class="card-text">Capital: ${countryData.capital}</p>
                  <p class="card-text">Lat/Lng: ${countryData.latlng}</p>
                  <p class="card-text">Region: ${countryData.region}</p>
                  <p class="card-text">Country Code: ${countryData.countryCode}</p>
                  <button class="btn btn-primary" data-country-code="${countryData.code}">Click for weather</button>
              </div>
          </div>
          
      `;

    document.getElementById("card-container").appendChild(card);

    // Add an event listener to the "Click for weather" button
    const weatherButton = card.querySelector("button");
    weatherButton.addEventListener("click", function () {
      fetchWeatherData(this.getAttribute("data-country-code"));
    });
  }

  // Function to fetch country data and create cards
  function fetchCountryData(country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then((response) => response.json())
      .then((data) => {
        const countryData = data[0];
        createCard({
          name: countryData.name.common,
          flag: countryData.flags.png,
          capital: countryData.capital,
          latlng: countryData.latlng.join(", "),
          region: countryData.region,
          countryCode: countryData.cca2,
          code: country,
        });
      });
  }

  // Function to fetch weather data
  function fetchWeatherData(countryCode) {
    // Use your OpenWeatherMap API key
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${countryCode}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        alert(`Weather Data for ${countryCode}: ${JSON.stringify(data)}`);
      });
  }

  // Fetch data and create cards for each country
  countries.forEach((country) => fetchCountryData(country.name));
});
const flagImg = document.createElement("img");
flagImg.src = "https://restcountries.com/data/afg.svg";
flagImg.alt = "Afghanistan Flag";
