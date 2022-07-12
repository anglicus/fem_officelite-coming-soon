// constants to make calculations easier
const DAYS_IN_MS = 24 * 60 * 60 * 1000;
const HOURS_IN_MS = 60 * 60 * 1000;
const MINUTES_IN_MS = 60 * 1000;

// for demo purposes, arbitrarily set the launch date to 48 days in the future
const DAY_INTERVAL = 48;

// initialize two dates
var visitDate = new Date(); // now
var launchDate = new Date(); // the launch date

// set launch date to midnight 48 days from now
launchDate.setDate(visitDate.getDate() + DAY_INTERVAL);
launchDate.setHours(0,0,0,0);

// set the launch date display
const countdownDate = document.querySelector(".countdown__date");
countdownDate.textContent = launchDate.getDate() + " " + launchDate.toLocaleString('default', {month: "short"}) + " " + launchDate.getFullYear();

console.log("Today's date:", visitDate);
console.log("Launch date:", launchDate);

// get exact time difference
var launchIntervalMS = launchDate - visitDate;
console.log(launchIntervalMS);

// button functions
const buttonNone = document.querySelector(".button-none");
buttonNone.addEventListener("click", function() {
  window.location.href=`sign-up.html?plan=none&timeleft=${launchIntervalMS}`;
});

const buttonBasic = document.querySelector(".button-basic");
buttonBasic.addEventListener("click", function() {
  window.location.href=`sign-up.html?plan=basic-pack&timeleft=${launchIntervalMS}`;
});

const buttonPro = document.querySelector(".button-pro");
buttonPro.addEventListener("click", function() {
  window.location.href=`sign-up.html?plan=pro-pack&timeleft=${launchIntervalMS}`;
});

const buttonUltimate = document.querySelector(".button-ultimate");
buttonUltimate.addEventListener("click", function() {
  window.location.href=`sign-up.html?plan=ultimate-pack&timeleft=${launchIntervalMS}`;
});

// every second calculate the remaining time and update the display
const INTERVAL_FUNCTION = setInterval(function() { 
    // get timer element values and set the display
    var remainder = 0;
    const launchIntervalDays = parseInt(launchIntervalMS / DAYS_IN_MS);
    remainder = launchIntervalMS % DAYS_IN_MS;
    const countdownDays = document.querySelector(".countdown__days");
    countdownDays.textContent = launchIntervalDays;

    const launchIntervalHours = parseInt(remainder / HOURS_IN_MS);
    remainder = remainder % HOURS_IN_MS
    const countdownHours = document.querySelector(".countdown__hours");
    countdownHours.textContent = launchIntervalHours;

    const launchIntervalMinutes = parseInt(remainder / MINUTES_IN_MS);
    remainder = remainder % MINUTES_IN_MS
    const countdownMinutes = document.querySelector(".countdown__minutes");
    countdownMinutes.textContent = launchIntervalMinutes;

    const launchIntervalSeconds = parseInt(remainder / 1000);
    const countdownSeconds = document.querySelector(".countdown__seconds");
    countdownSeconds.textContent = launchIntervalSeconds;

    // decrement the timer, unless it's already fully elapsed
    if (launchIntervalMS > 0) {
      launchIntervalMS -= 1000;
    }

}, 1000);
