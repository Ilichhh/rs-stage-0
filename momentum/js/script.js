import playListData from './playList.js';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const name = document.querySelector('.name');
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
const settingsBlocker = document.querySelector('.blocker');


const langList = document.querySelectorAll('.lang-lable');
const appTogglers = document.querySelectorAll('input[type="checkbox"]');

const coinsList = document.querySelector('.coins-list');
const coinInput = document.querySelector('.new-coin');
const coinError = document.querySelector('.coin-error');

const bgList = document.querySelectorAll('.bg-lable');
const bgTagInput = document.querySelector('.bg-tag');

const taskList = document.querySelector('.task-list');
const taskInput = document.querySelector('.new-task');
const taskIntro = document.querySelector('.todo h2');


let galleryLength;
let randomNum;
let isPlay = false;
let playNum = 0;


const state = {
  lang: 'en',
  photoSource: 'github',
  bgTag: '',
  apps: ['time', 'date','greeting-container', 'player', 'coins-list', 'weather', 'todo', 'quotes-container'],
  coinIDs: ['bitcoin', 'ethereum'],
  tasks: []
}

const greetingTranslation = {
  en: { 
    night: 'Good night',
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
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

const unsplashData = {
  key: 'hHIgsp-kcrFx-JWIia7QFObsLjzilnUhwTbsb7ym3I8',
}
const flickrData = {
  key: '7a9645eb98c831550e33d00870480d48',
}

const weatherData = {
  en: {
    city: 'Minsk',
    windSpeed: 'Wind speed',
    ms: 'm/s',
    humidity: 'Humidity',
    placeholder: '[Enter city]',
    error: 'Error! city not found for',
    errorEmptyString: 'Please, enter city'
  },
  ru: {
    city: 'Минск',
    windSpeed: 'Скорость ветра',
    ms: 'м/с',
    humidity: 'Влажность',
    placeholder: '[Введи город]',
    error: 'Упс! Кажется, не существует города',
    errorEmptyString: 'Пожалуйста, введите город'
  },
  key: '8596f448275a490d36b3d737978cf2df',
}


// Date, Time, Greeting
function showTime() {
  const newDate = new Date();
  const currentTime = newDate.toLocaleTimeString('en-GB');
  time.textContent = currentTime;
}

function showDate(lang) {
  const newDate = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = newDate.toLocaleDateString(`${lang}-GB`, options);
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
  const greetingText = greetingTranslation[lang][timeOfDay];
  const name = document.querySelector('.name');
  greeting.textContent = greetingText;
  name.placeholder = greetingTranslation[lang].placeholder;
}


// Slider
function getRandomNum(galleryLength) {
  return Math.ceil(Math.random() * galleryLength);
}

async function getLinkToImage(photoSource, tag) {
  let url;
  bgTagInput.value.length ? tag = bgTagInput.value : tag = getTimeOfDay();

  if (photoSource === 'github') {
    tag = getTimeOfDay()
    galleryLength = 20;
    if (!randomNum || randomNum > 20) randomNum = getRandomNum(galleryLength);
    const bgNum = randomNum.toString().padStart(2, '0');
    url = `https://raw.githubusercontent.com/ilichhh/stage1-tasks/assets/images/${tag}/${bgNum}.jpg`;
  } else if (photoSource === 'unsplash') {
      const res = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=${unsplashData.key}`);
      const data = await res.json(); 
      url = data.urls.regular;
    } else if (photoSource === 'flickr') {
      const res = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrData.key}&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`);
      const data = await res.json(); 
        galleryLength = data.photos.photo.length - 1;
        if (!randomNum) randomNum = getRandomNum(galleryLength);
        url = data.photos.photo[randomNum].url_l;
      }
  return url;
}

async function setBg(photoSource, tag) {
  const img = new Image();
  img.src = await getLinkToImage(photoSource, tag);
  img.onload = () => {      
    body.style.backgroundImage = `url(${img.src})`;
  };
}

function setPhotoSource(photoSource, tag) {
  if (photoSource === 'github') {
    bgTagInput.classList.add('hidden-bg-option');
  } else {
    bgTagInput.classList.remove('hidden-bg-option');
  }
  state.photoSource = photoSource;
  bgList.forEach((e) => {
    e.className = ('bg-lable');
    if (e.textContent.toLowerCase() === photoSource) e.classList.add('bg-on');
  })

  setBg(photoSource, tag);
}

function getSlideNext() {
  randomNum++;
  if (randomNum > galleryLength) randomNum = 1;
  setBg(state.photoSource, state.bgTag);
}

function getSlidePrev() {
  randomNum--;
  if (randomNum < 1) randomNum = galleryLength;
  setBg(state.photoSource, state.bgTag);
}


// Weather
async function getWeather(lang) {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherData[lang].city}&lang=${lang}&appid=${weatherData.key}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json(); 
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `${weatherData[lang].windSpeed}: ${Math.round(data.wind.speed)} ${weatherData[lang].ms}`;
    humidity.textContent = `${weatherData[lang].humidity}: ${data.main.humidity}%`;
    cityInput.placeholder = weatherData[lang].placeholder;
    weatherError.textContent = ``;
  } catch (err) {
    cityInput.value.length ?
      weatherError.textContent = `${weatherData[lang].error} '${weatherData[lang].city}'!` :
      weatherError.textContent = weatherData[lang].errorEmptyString;
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    windSpeed.textContent = ``;
    humidity.textContent = ``;
  }
}

function changeWeather(lang) {
  weatherData[lang].city = cityInput.value;
  getWeather(lang);
}


// Crypto charts
const cryptoData = {
  en: {
    placeholder: '[Add coin]',
    nameError: 'Please enter full name, e.g. "bitcoin", "dogecoin"...',
    apiError: 'Oops, something has gone wrong.',

  },
  ru: {
    placeholder: '[Добавь монетку]',
    nameError: 'Пожалуйста, введи полное имя, например "bitcoin", "dogecoin"...',
    apiError: 'Похоже, что-то пошло не так.',
  }
}


function createCoinBlock(coin) {
  coinError.textContent = '';
  const coinBlock = document.createElement('div');
  const coinSymbol = document.createElement('span');
  const coinPrice = document.createElement('span');
  const coin24hChange = document.createElement('span');
  coinsList.append(coinBlock);
  coinBlock.append(coinSymbol);
  coinBlock.append(coinPrice);
  coinBlock.append(coin24hChange);
  coinBlock.classList.add('coin', coin.id);
  coinSymbol.classList.add('coin-param', 'coin-label');
  coinPrice.classList.add('coin-param', 'coin-price');
  coin24hChange.classList.add('coin-param', 'coin-24h-change');

  coin.price_change_percentage_24h > 0 ? 
    coin24hChange.classList.add('coin-price-up') : 
    coin24hChange.classList.add('coin-price-down');
  
  const internationalNumberFormat = new Intl.NumberFormat('en-US')

  coinSymbol.textContent = `${coin.symbol.toUpperCase()}:`;
  coinPrice.textContent = `$${internationalNumberFormat.format(coin.current_price)}`;
  coin24hChange.textContent = `${coin.price_change_percentage_24h.toFixed(1)}%`;

  const deleteCoinBtn = document.createElement('button');
  deleteCoinBtn.classList.add('delete-coin-btn', 'icono-crossCircle');
  coinBlock.append(deleteCoinBtn);
  deleteCoinBtn.addEventListener('click', deleteCoin);
}

async function getCryptoPrice(coinIDs) {
  if (Array.isArray(coinIDs)) {
    coinIDs = coinIDs.join('%2C%20');
  }
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIDs}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      data.length ?
        addNewCoin(data) :
        coinError.textContent = cryptoData[state.lang].nameError;
        setTimeout(() => coinError.textContent = '', 8000);
    } catch (err) {
        coinError.textContent = cryptoData[state.lang].apiError;
        setTimeout(() => coinError.textContent = '', 8000);
    }
}

function addNewCoin(data) {
  data.forEach(createCoinBlock);
  if (coinInput.value.length) state.coinIDs.push(coinInput.value);
  coinInput.value = '';
  coinInput.placeholder = cryptoData[state.lang].placeholder;
}

function deleteCoin(e) {
  state.coinIDs = state.coinIDs.filter(coin => coin !== e.target.parentElement.className.split(' ')[1]);
  e.target.parentElement.remove();
}


// Generate quote
async function getQuotes(lang) {  
  const quotes = `assets/quotes-${lang}.json`;
  const res = await fetch(quotes);
  const data = await res.json(); 
  let randomQuoteNum = Math.floor(Math.random() * data.length);
  quote.textContent = data[randomQuoteNum].text;
  data[randomQuoteNum].author !== 'Unknown' ?
    author.textContent = data[randomQuoteNum].author :
    author.textContent = 'unknown author';
    
  changeQuote.classList.add('change-quote-aminated');
}


// Audio player

const audio = new Audio();

function playAudio() {
  if (!audio.src) audio.src = playListData[playNum].src;
  audio.play();

  playBtn.classList.add('fa-pause');
  playList.childNodes.forEach(e => {
    e.className = 'play-item';
    e.firstChild.className = 'player-icon play-current fa fa-play';
  });
  playList.childNodes[playNum].classList.add('item-active');
  trackName.textContent = playListData[playNum].title;

  let playCurrentBtn = document.querySelectorAll('.play-current')[playNum];
  playCurrentBtn.classList.add('fa-pause');
  isPlay = true;
}

function pauseAudio() {
  audio.pause();
  playBtn.classList.remove('fa-pause');
  let playCurrentBtn = document.querySelectorAll('.play-current')[playNum];
  playCurrentBtn.classList.remove('fa-pause');
  isPlay = false;
}

function toggleAudio() {
  isPlay ? pauseAudio() : playAudio();
}

function playNext() {
  playNum++;
  if (playNum >= playListData.length) playNum = 0;
  audio.src = playListData[playNum].src
  playAudio();
}

function playPrev() {
  playNum--;
  if (playNum < 0) playNum = playListData.length - 1;
  audio.src = playListData[playNum].src
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
  playCurrentBtn.classList.add('play-current', 'player-icon', 'fa', 'fa-play');
  li.prepend(playCurrentBtn);
  playCurrentBtn.addEventListener('click', () => playChosenTrack(index));
})


// TD
const tasksData = {
  en: { 
    intro: 'Any plans for today?',
    placeholder: '[Add task]'
  },
  ru: {
    intro: 'Чем займемся сегодня?',
    placeholder: '[Добавь звдачу]'
  }
}

function addNewTask() {
  let value = '';
  taskInput.value.length > 18 ? value = taskInput.value.slice(0, 18) + '...' : value = taskInput.value;
  let newTask = {
    name: value,
    checked: false
  }
  state.tasks.push(newTask);
  displayTasks(state.lang);
  localStorage.setItem('tasks', JSON.stringify(state.tasks));
  taskInput.value = '';
}

function displayTasks(lang) {
  if (!state.tasks.length) {
    taskIntro.textContent = tasksData[lang].intro;
    taskInput.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
  } else {
    taskIntro.textContent = '';
    taskInput.style.borderBottom = 'none';
  }

  let displayTask = '';
  state.tasks.forEach((task, id) => {
    displayTask += `
    <li class="task">
      <input type="checkbox" id="task-${id}" ${task.checked ? 'checked' : ''}>
      <span class="task-ckeckbox"></span>
      <label class="task-name" for="item-${id}">${task.name}</label>
      <button class="delete-task-btn icono-crossCircle"></button>
    </li>
    `;
  taskList.innerHTML = displayTask;
  });

  taskInput.placeholder = tasksData[lang].placeholder;
}

function toggleTaskCheckbox(e) {
  const taskId = +e.target.id.split('-')[1];
  state.tasks[taskId].checked = !state.tasks[taskId].checked;
  localStorage.setItem('tasks', JSON.stringify(state.tasks));
}

function deleteTask(e) {
  if (e.target.classList.contains('delete-task-btn')) {
    state.tasks = state.tasks.filter(task => task.name !== e.target.parentElement.querySelector('.task-name').textContent);
    e.target.parentElement.remove();
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }
}


// Settings
const settingsData = {
  en: {
    header: 'Settings',
    apps: ['Time', 'Data', 'Greeting', 'Player', 'Cryptocurrency prices', 'Weather', 'ToDo', 'Quotes'], 
    bg: 'Background',
    bgTagPlaceholder: '[Enter tag]',
    lang: 'Language'
  },
  ru: {
    header: 'Настройки',
    apps: ['Время', 'Дата', 'Приветствие', 'Плеер', 'Курс криптовалют', 'Погода', 'ToDo', 'Цитаты'], 
    bg: 'Фон',
    bgTagPlaceholder: '[Введи тэг]',
    lang: 'Язык'
  }
}

function toggleSettingsWindow() {
  settingsWindow.classList.toggle('show-settings');
  settingsButton.classList.toggle('spin-settings-logo');
  settingsBlocker.classList.toggle('show-blocker');
}

function setLanguage(lang) {
  state.lang = lang;
  const settingsHeader = document.querySelector('.settings>h2');
  const appsNames = document.querySelectorAll('.app-toggle>.setting-name');
  const bgSettingName = document.querySelector('.bg-settings>.setting-name');
  const langSettingName = document.querySelector('.lang-toggle>.setting-name');
  settingsHeader.textContent = settingsData[lang].header;
  appsNames.forEach((app, i) => app.textContent = settingsData[state.lang].apps[i]);
  bgSettingName.textContent = settingsData[lang].bg;
  langSettingName.textContent = settingsData[lang].lang;

  langList.forEach((e) => {
    e.className = ('lang-lable');
    if (e.textContent.toLowerCase() === lang) e.classList.add('lang-on');
  })

  if (cityInput.value === 'Minsk' || cityInput.value === 'Минск') cityInput.value = weatherData[lang].city;

  generateContent();
  changeWeather(lang);
  getQuotes(lang);
  displayTasks(lang);

  bgTagInput.placeholder = settingsData[state.lang].bgTagPlaceholder;
}

function hideApp (app) {
  app.classList.add('hidden-block');
  state.apps = state.apps.filter(i => i !== app.classList[0])
}

function showApp (app) {
  app.classList.remove('hidden-block');
  state.apps.push(app.classList[0])
}

function toggleApp (toggler) {
  const app = document.querySelector(`.${toggler.target.id}`);
  toggler.target.checked ? showApp(app) : hideApp(app);
}


// Generate content
function generateContent() {
  showTime();
  showDate(state.lang);
  showGreeting(state.lang);
  setTimeout(generateContent, 1000);
}


// Local storage
function setLocalStorage() {
  const name = document.querySelector('.name');
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', cityInput.value);
  localStorage.setItem('coinIDs', state.coinIDs);
  localStorage.setItem('language', state.lang);
  localStorage.setItem('bgTag', bgTagInput.value);
  localStorage.setItem('photoSource', state.photoSource);
  localStorage.setItem('apps', state.apps);
}

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if(localStorage.getItem('city')) {
    cityInput.value = localStorage.getItem('city');
  } else{
    cityInput.value = weatherData[state.lang].city;
  }
  if(localStorage.getItem('coinIDs')) {
    state.coinIDs = localStorage.getItem('coinIDs').split(',');
  }
  if(localStorage.getItem('tasks')) {
    state.tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  if(localStorage.getItem('language')) {
    state.lang = localStorage.getItem('language');
  };
  if(localStorage.getItem('bgTag')) {
    state.bgTag = localStorage.getItem('bgTag');
    bgTagInput.value = state.bgTag;
  };
  if(localStorage.getItem('photoSource')) {
    state.photoSource = localStorage.getItem('photoSource');
  };
  if(localStorage.getItem('apps')) {
    state.apps = localStorage.getItem('apps').split(',');
  };
  setPhotoSource(state.photoSource, state.bgTag);
  setLanguage(state.lang)
  getCryptoPrice(state.coinIDs);

  appTogglers.forEach(toggler => {
    if (!state.apps.includes(toggler.id)) {
      hideApp(document.querySelector(`.${toggler.id}`));
      toggler.checked = false;
    }
  })

}


window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

cityInput.addEventListener('change', () => changeWeather(state.lang));
changeQuote.addEventListener('click', () => getQuotes(state.lang));
changeQuote.addEventListener('animationend', () => changeQuote.classList.remove("change-quote-aminated"));



playBtn.addEventListener('click', toggleAudio);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);

audio.addEventListener('ended', playNext);
audio.addEventListener('loadeddata',() => trackLength.textContent = getTimeCodeFromNum(audio.duration));

setInterval(updateCurrentPlayTime, 500);
timeline.addEventListener('click', updateTimeline);

volumeBtn.addEventListener('click', toggleVolume);
volumeSlider.addEventListener('click', changeVolume);

coinInput.addEventListener('change', () => getCryptoPrice(coinInput.value));

taskInput.addEventListener('change', addNewTask);
taskList.addEventListener('change', toggleTaskCheckbox);
taskList.addEventListener('click', deleteTask);

// Settings listeners
settingsButton.addEventListener('click', toggleSettingsWindow);
appTogglers.forEach(app => app.addEventListener('click', toggleApp));

langList.forEach(lang => {
  lang.addEventListener('click', (e) => setLanguage(e.target.textContent.toLowerCase()));
}) 
bgList.forEach(bg => {
  bg.addEventListener('click', (e) => setPhotoSource(e.target.textContent.toLowerCase(), state.bgTag))
}) 

settingsBlocker.addEventListener('click', () => toggleSettingsWindow());

bgTagInput.addEventListener('change', () => setBg(state.photoSource, bgTagInput.value));
