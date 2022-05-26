const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
// timer
let countdown;
const timerDisplay = document.querySelector('.display__time-left');

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

// function startGame() {
//   scoreBoard.textContent = 0;
//   timeUp = false;
//   score = 0;
//   peep();
//   setTimeout(() => timeUp = true, 10000)
// }

function bonk(e) {
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));

// countdown functions
function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now(); // when the timer starts
  const then = now + seconds * 1000;  // how long you want to run the timer for
  displayTimeLeft(seconds);   // 1. let it run immediately once

  // every single second, display the amount of time left
  countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now())/1000);

      // check if we should stop it
      if (secondsLeft < 0) {
          clearInterval(countdown);
          alert("Time's up!");
          return;
      }
      // displaying time left
      displayTimeLeft(secondsLeft);   // 2. and once again every second
  }, 1000);
}

// converting mins to seconds
function displayTimeLeft(seconds) {
const minutes = Math.floor(seconds / 60);
const remainderSeconds = seconds % 60;
const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
document.title = display;
timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const minutes = end.getMinutes();
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 15000)  // pass the 15 seconds data-time here
}

document.querySelector('.startBtn').addEventListener('click', startTimer);