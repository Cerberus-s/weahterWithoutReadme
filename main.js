const API = {
    key: "12003f9a29924e11b4272208221412",
    base: "http://api.weatherapi.com/v1/current.json"
  }
const getInput = document.querySelectorAll(".input-city")
const getTest = document.getElementById("test")
const country = document.querySelector(".country")
const dateLoc = document.querySelector(".date-location")
const image = document.querySelector(".image-temp-info")
const timeLoc = document.querySelector(".time-location")
const tempLoc = document.querySelector(".temp-location")
const stateWeahter = document.querySelector(".state-weahter")
const feelLike = document.querySelector(".feel-like-info")
const humidityInfo = document.querySelector(".humidity-info")
const windInfo = document.querySelector(".wind-info")
const errorInput = document.querySelector(".error-input")
const modulWeather = document.querySelector(".modul-weahter")

function getDay () {
  let options = { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long' }
  let days = new Date().toLocaleString("en-us", options)
  return days
}

async function getWeatherInfo() {
  try {
    let url = await fetch(`${API.base}?key=${API.key}&q=${getTest.value}`)
    const data = await url.json()
    console.log(data)
    country.innerHTML = data.location.name + ", " + data.location.country
    dateLoc.innerHTML = getDay(data.location.localtime)
    timeLoc.innerHTML = data.location.localtime.split(" ").pop()
    image.src = "https:" + data.current.condition.icon
    tempLoc.innerHTML = Math.floor(data.current.temp_c) + "°C"
    stateWeahter.innerHTML = data.current.condition.text
    feelLike.innerHTML = "Feel Like: " + Math.floor(data.current.feelslike_c) + "°C"
    humidityInfo.innerHTML = "Humidity: " + data.current.humidity +"%"
    windInfo.innerHTML = "Wind: " + data.current.wind_kph + "kph"
    errorInput.innerHTML = ""
    modulWeather.classList.remove("modul-weahter-none")
  } catch {
    errorInput.innerHTML = "No matching location found"
    modulWeather.classList.add("modul-weahter-none")
  }
}

getTest.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        getWeatherInfo()
        e.preventDefault()
    }
});




