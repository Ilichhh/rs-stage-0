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
const volumeBtn = document.querySelector('.volume-btn');
const volumeSlider = document.querySelector('.volume-slider');

const settingsButton = document.querySelector('.settings-button');
const settingsWindow = document.querySelector('.settings');

const langList = document.querySelector('.lang-list');
const appTogglers = document.querySelectorAll('input[type="checkbox"]');

let galleryLength;
let randomNum;
let isPlay = false;
let playNum = 0;


const state = {
  lang: 'en',
  photoSource: 'flickr',
  blocks: ['time', 'date','greeting', 'player', 'weather','quote']
}


function toggleApp (e) {
  const app = document.querySelector(`.${e.target.id}`);
  app.classList.toggle('hidden-block');
}

appTogglers.forEach(app => {
  app.addEventListener('click', toggleApp);
})



// Date, Time, Greeting
const greetingTranslation = {
  en: {
    night: 'Good night',
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evenong',
    placeholder: '[Enter name]'
  },
  ru: {
    night: 'Доброй ночи',
    morning: 'Доброе утро',
    afternoon: 'Добрый день',
    evening: 'Добрый вечер',
    placeholder: '[Введи имя]'
  }
}

function showTime() {
  const newDate = new Date();
  const currentTime = newDate.toLocaleTimeString('en-GB');
  time.textContent = currentTime;
}

function showDate(lang) {
  const newDate = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = newDate.toLocaleDateString(`${state.lang}-GB`, options);
  date.textContent = currentDate;
}

function getTimeOfDay() {
  const newDate = new Date();
  const hours = newDate.getHours();
  const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
  return timesOfDay[Math.floor(hours / 6)];
}

function showGreeting(lang) {
  const timeOfDay = getTimeOfDay();
  const greetingText = greetingTranslation[state.lang][timeOfDay];
  const name = document.querySelector('.name');
  greeting.textContent = greetingText;
  name.placeholder = greetingTranslation[state.lang]['placeholder'];
}


// Slider
function getRandomNum(galleryLength) {
  return Math.ceil(Math.random() * galleryLength);
}

const unsplashData = {
  keyword: 'afternoon',
  key: 'hHIgsp-kcrFx-JWIia7QFObsLjzilnUhwTbsb7ym3I8',
}
const flickrData = {
  keyword: 'afternoon',
  key: '7a9645eb98c831550e33d00870480d48',
}

async function getLinkToImage() {
  let url;
  if (state.photoSource === 'github') {
    galleryLength = 20;
    if (!randomNum) randomNum = getRandomNum(galleryLength);
    const bgNum = randomNum.toString().padStart(2, '0');
    const timeOfDay = getTimeOfDay();
    url = `https://raw.githubusercontent.com/ilichhh/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  } else if (state.photoSource === 'unsplash') {
      const res = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${unsplashData.keyword}&client_id=${unsplashData.key}`);
      const data = await res.json(); 
      url = data.urls.regular;
    } else if (state.photoSource === 'flickr') {
        const res = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrData.key}&tags=${flickrData.keyword}&extras=url_l&format=json&nojsoncallback=1`);
        const data = await res.json(); 
        galleryLength = data.photos.photo.length - 1;
        if (!randomNum) randomNum = getRandomNum(galleryLength);
        url = data.photos.photo[randomNum].url_l;
      }
  return url;
}

async function setBg() {
  const img = new Image();
  img.src = await getLinkToImage();
  img.onload = () => {      
    body.style.backgroundImage = `url(${img.src})`;
  };
}

function getSlideNext() {
  randomNum++;
  if (randomNum > galleryLength) randomNum = 1;
  setBg();
}

function getSlidePrev() {
  randomNum--;
  if (randomNum < 1) randomNum = galleryLength;
  setBg();
}


// Weather
const weatherData = {
  en: {
    city: 'Minsk',
    windSpeed: 'Wind speed',
    ms: 'm/s',
    humidity: 'Humidity',
    placeholder: '[Enter city]',
    error: 'Error! city not found for'
  },
  ru: {
    city: 'Минск',
    windSpeed: 'Скорость ветра',
    ms: 'м/с',
    humidity: 'Влажность',
    placeholder: '[Введи город]',
    error: 'Упс! Кажется, не существует города'
  },
  key: '8596f448275a490d36b3d737978cf2df',
}

async function getWeather(lang) {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherData[state.lang].city}&lang=${state.lang}&appid=${weatherData.key}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json(); 
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `${weatherData[state.lang].windSpeed}: ${Math.round(data.wind.speed)} ${weatherData[state.lang].ms}`;
    humidity.textContent = `${weatherData[state.lang].humidity}: ${data.main.humidity}%`;
    cityInput.placeholder = weatherData[state.lang].placeholder;
    weatherError.textContent = ``;
  } catch (err) {
    weatherError.textContent = `${weatherData[state.lang].error} '${weatherData.city}'!`;
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    windSpeed.textContent = ``;
    humidity.textContent = ``;
  }
}

function changeWeather(lang) {
  weatherData[state.lang].city = cityInput.value;
  getWeather(state.lang);
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
  changeQuote.classList.toggle('spin-logo');
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
  if (playNum >= playListData.length) playNum = 0;
  playAudio();
}

function playPrev() {
  playNum--;
  if (playNum < 0) playNum = playListData.length - 1;
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


// Settings
function toggleSettingsWindow() {
  settingsWindow.classList.toggle('show-element');
  settingsButton.classList.toggle('spin-logo');
}

function changeLanguage(event) {
  if (event.target && !event.target.classList.contains('lang-on')) {
    langList.childNodes.forEach((i) => i.className = 'lang-lable');
    event.target.classList.add('lang-on');
    state.lang = event.target.textContent.toLowerCase();
    generateContent();
    getWeather(state.lang);
  }
}


// Local storage
function setLocalStorage() {
  const name = document.querySelector('.name');
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', cityInput.value);
  localStorage.setItem('language', state.lang);
}

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    const name = document.querySelector('.name');
    name.value = localStorage.getItem('name');
  }
  if(localStorage.getItem('city')) {
    cityInput.value = localStorage.getItem('city');
    changeWeather(state.lang);
  }
  if(localStorage.getItem('language')) {
    state.lang = localStorage.getItem('language');
    getWeather(state.lang);
    langList.childNodes.forEach((i) => {
      i.className = 'lang-lable';
      if (i.textContent.toLowerCase() === state.lang) i.classList.add('lang-on');
    });
  }
}


// Generate content
function generateContent() {
  showTime();
  showDate(state.lang);
  showGreeting(state.lang);
  setTimeout(generateContent, 1000);
}


generateContent();
setBg();
getWeather(state.lang);
getQuotes();


window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

cityInput.addEventListener('change', () => changeWeather(state.lang));
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

settingsButton.addEventListener('click', toggleSettingsWindow);
langList.addEventListener('click', changeLanguage);

