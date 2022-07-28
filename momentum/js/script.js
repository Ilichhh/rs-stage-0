const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const body = document.querySelector('body');
let randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');


// Date and time
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


// Greeting
function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay},`;
  greeting.textContent = greetingText;
}

function setLocalStorage() {
  const name = document.querySelector('.name');
  localStorage.setItem('name', name.value);
}

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    const name = document.querySelector('.name');
    name.value = localStorage.getItem('name');
  }
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


// Generate content
function generateContent() {
  showTime();
  showDate();
  showGreeting();
  setTimeout(generateContent, 1000);
}

getRandomNum();
setBg();
generateContent();

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);