const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const cityInput = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let randomNum;


// Date, Time, Greeting
function showTime() {
  const newDate = new Date();
  const currentTime = newDate.toLocaleTimeString('en-GB');
  time.textContent = currentTime;
}

function showDate() {
  const newDate = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = newDate.toLocaleDateString('en-GB', options);
  date.textContent = currentDate;
}

function getTimeOfDay() {
  const newDate = new Date();
  const hours = newDate.getHours();
  const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
  return timesOfDay[Math.floor(hours / 6)];
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay},`;
  greeting.textContent = greetingText;
}


// Slider
function getRandomNum() {
  randomNum = Math.floor(Math.random() * 20);
}

function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = randomNum.toString().padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/ilichhh/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {      
    body.style.backgroundImage = `url(${img.src})`;
  };
}

function getSlideNext() {
  randomNum++;
  if (randomNum > 20) {
    randomNum = 1;
  }
  setBg();
}

function getSlidePrev() {
  randomNum--;
  if (randomNum < 1) {
    randomNum = 20;
  }
  setBg();
}


// Weather
const weatherData = {
  city: 'Minsk',
  lang: 'en',
  key: '8596f448275a490d36b3d737978cf2df',
}

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherData.city}&lang=${weatherData.lang}&appid=${weatherData.key}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json(); 
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  } catch (err) {
    weatherError.textContent = `Error! city not found for '${weatherData.city}'!`;
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    windSpeed.textContent = ``;
    humidity.textContent = ``;
  }
}

function changeWeather() {
  weatherData.city = cityInput.value;
  getWeather();
}


// Generate quote
async function getQuotes() {  
  const quotes = 'assets/quotes.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  let randomQuoteNum = Math.floor(Math.random() * data.length);
  quote.textContent = data[randomQuoteNum].text;
  data[randomQuoteNum].author !== 'Unknown' ?
    author.textContent = data[randomQuoteNum].author :
    author.textContent = '';
}


// Local storage
function setLocalStorage() {
  const name = document.querySelector('.name');
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', cityInput.value);
}

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    const name = document.querySelector('.name');
    name.value = localStorage.getItem('name');
  }
  if(localStorage.getItem('city')) {
    cityInput.value = localStorage.getItem('city');
    changeWeather();
  }
}


// Generate content
function generateContent() {
  showTime();
  showDate();
  showGreeting();
  setTimeout(generateContent, 1000);
}

getRandomNum();
generateContent();
setBg();
getWeather();
getQuotes();

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

cityInput.addEventListener('change', changeWeather);
changeQuote.addEventListener('click', getQuotes);





