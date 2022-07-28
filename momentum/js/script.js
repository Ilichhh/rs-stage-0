const time = document.querySelector('.time');
const date = document.querySelector('.date');


function showTime() {
  const newDate = new Date();
  const currentTime = newDate.toLocaleTimeString('en-GB');
  time.textContent = currentTime;
  showDate();
  setTimeout(showTime, 1000);
}


function showDate() {
  const newDate = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = newDate.toLocaleDateString('en-GB', options);
  date.textContent = currentDate;
}

showTime();

