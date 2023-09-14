document.querySelector(".search-bar").value = "kolkata";
let weather = {
  apiKey: "39c7c0264d01d45887cb8a69bd11bb69",
  units: "metric",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=" + this.units + "&appid=" +
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const long = data.coord.lon;
    const lang = data.coord.lat;
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const feels = data.main.feels_like;
    const pr = data.main.pressure;
    document.querySelector(".weather__pressure").innerHTML = pr + "hPa"
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + `${this.units == "imperial" ? "°F" : "°C"}`;
    document.querySelector(".weather__humidity").innerText =
      humidity + "%";
    document.querySelector(".weather__wind").innerText =
      speed + `${this.units == "imperial" ? "MPH" : "M/S"}`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
    document.querySelector(".weather__realfeel").innerHTML = feels + `${this.units == "imperial" ? "&#176F" : "&#176C"}`;









  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};




document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
  time.search();
});

document.querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
      time.search();
    }
  });




document.querySelector(".weather_unit_celsius").addEventListener("click", function () {
  if (weather.units !== "metric") {
    weather.units = "metric";
  }
  weather.search();

})
document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
  if (weather.units !== "imperial") {
    weather.units = "imperial";
  }
  weather.search();


})

weather.fetchWeather("Kolkata");



let time = {
  fetchtime: function (city) {
    fetch("https://timezone.abstractapi.com/v1/current_time/?api_key=106ad886f0df4373a36a13ff4d242305&location=" + city).then((Response) => {
      if (!Response.ok) {
        alert("PLEASE LOAD THE PAGE AGAIN.");
        throw new Error("No DATA found.");
      }
      return Response.json();
    }).then((data1) => this.displaytime(data1));
  },
  displaytime: function (data1) {

    const yr = data1.datetime;


    document.querySelector(".humidity").innerHTML = "DATE : " + yr.slice(0, 10);
    document.querySelector(".updatetime").innerHTML = "TIME : " + yr.slice(11, 19);
  },
  search: function () {
    this.fetchtime(document.querySelector(".search-bar").value);

  },

};
 time.search();


