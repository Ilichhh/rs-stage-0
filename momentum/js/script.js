import playListData from './playList.js';

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

const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playList = document.querySelector('.play-list');
const trackLength = document.querySelector('.length');
const progressBar = document.querySelector('.progress');
const currentTime = document.querySelector('.current');
const timeline = document.querySelector('.timeline');
const trackName = document.querySelector('.track-name');
const volumeBtn = document.querySelector(".volume-btn");
const volumeSlider = document.querySelector('.volume-slider');

let randomNum;
let isPlay = false;
let playNum = 0;


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


// Audio player
const audio = new Audio();

function playAudio() {
  audio.src = playListData[playNum].src;
  audio.currentTime = 0;
  audio.play();
  playBtn.classList.add('pause');

  playList.childNodes.forEach(e => {
    e.className = 'play-item';
    e.firstChild.className = 'player-icon play-current';
  });
  playList.childNodes[playNum].classList.add('item-active');
  trackName.textContent = playListData[playNum].title;

  let playCurrentBtn = document.querySelectorAll('.play-current')[playNum];
  playCurrentBtn.classList.add('pause');
  isPlay = true;
}

function pauseAudio() {
  audio.pause();
  playBtn.classList.remove('pause');
  let playCurrentBtn = document.querySelectorAll('.play-current')[playNum];
  playCurrentBtn.classList.remove('pause');
  isPlay = false;
}

function toggleAudio() {
  isPlay ? pauseAudio() : playAudio();
}

function playNext() {
  playNum++;
  if (playNum >= playListData.length) {
    playNum = 0;
  }
  playAudio();
}

function playPrev() {
  playNum--;
  if (playNum < 0) {
    playNum = playListData.length - 1;
  }
  playAudio();
}

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

function updateCurrentPlayTime() {
  progressBar.style.width = `${audio.currentTime / audio.duration * 100}%`;
  currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
}

function updateTimeline(e) {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}

function playChosenTrack(index) {
  if (playNum === index) {
    toggleAudio();
  } else {
    playNum = index;
    playAudio();
  }
}

function toggleVolume() {
  audio.muted = !audio.muted;
  volumeBtn.classList.toggle('icono-volumeMedium');
  volumeBtn.classList.toggle('icono-volumeMute');
}

function changeVolume(e) {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  document.querySelector('.volume-percentage').style.width = `${newVolume * 100}%`;
}

playListData.forEach((e, index) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = e.title;
  playList.append(li);

  const playCurrentBtn = document.createElement('button');
  playCurrentBtn.classList.add('player-icon', 'play-current');
  li.prepend(playCurrentBtn);
  playCurrentBtn.addEventListener('click', () => playChosenTrack(index));
})


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

playBtn.addEventListener('click', toggleAudio);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);

audio.addEventListener('ended', playNext);
audio.addEventListener('loadeddata',() => trackLength.textContent = getTimeCodeFromNum(audio.duration));

setInterval(updateCurrentPlayTime, 500);
timeline.addEventListener('click', updateTimeline);

volumeBtn.addEventListener('click', toggleVolume);
volumeSlider.addEventListener('click', changeVolume);

