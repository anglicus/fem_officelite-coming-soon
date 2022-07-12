/* This page uses a custom menu designed to behave like a select element, but 
    more styleable, so as to overcome the limitations of native select elements

    However, in order to retain some accessibility features, a native select element
    is still included, and is programmed to interact with the custom select in these ways:

>> FROM NATIVE SELECT ELEMENT TO CUSTOM SELECT
  -- The native select element will be invisible, but still selectable through tab
      -thus screen readers should still respond to it correctly

  -- When the native select comes into/out of focus, the custom select will receive/lose a CSS class of "focus"
      -this will give the user a visual indication that they have selected the element

  -- When using the keyboard to navigate the native select, the native select options will appear
      and be selectable as normal
  
  -- When an option is selected via the native select element, the custom select will update

      
>> FROM CUSTOM SELECT TO NATIVE SELECT ELEMENT
  -- When clicking on an option in the custom select the corresponding option will
      be set to selected status in the native select element
*/

// (invisible) native select element
const selectElement = document.getElementById("signup-select");
const selectOptions = document.querySelectorAll(".select-option");

// custom select menu
const customSelectDiv = document.querySelector(".custom-select-menu");
const customSelectMenu = document.querySelector(".custom-select-menu__option-list");
const customSelectOptions = document.querySelectorAll(".custom-select-menu__option");
const customSelectCurrent = document.querySelector(".custom-select-menu__current-selection");
const customSelectArrowDown = document.querySelector(".custom-select-menu__arrow-down");


//    ============== manipulation of custom select ====================== //
//    =================================================================== //

  // ** OPENING AND CLOSING the custom select menu **
  // if the custom select menu is open and a click falls outside of it, close it
window.addEventListener("click", (e) => {
  if (!customSelectDiv.contains(e.target) && !customSelectMenu.classList.contains("options-closed")) {
    customSelectMenu.classList.add("options-closed");
    customSelectArrowDown.classList.remove("inverted");
  }
});
  // open the custom select submenu when clicking the currently displayed selection
customSelectCurrent.addEventListener("click", ()=> {
   if (customSelectMenu.classList.contains("options-closed")) {
     customSelectMenu.classList.remove("options-closed");
     customSelectArrowDown.classList.add("inverted");
   } else {
     customSelectMenu.classList.add("options-closed");
     customSelectArrowDown.classList.remove("inverted");
   }
});

  // ** SELECTING AN OPTION in the custom select menu using the mouse
  // when clicking an option from the custom select menu,
  // change the displayed selected option
  // and the option selected in the native select element
  // then close the custom select menu options list
customSelectOptions.forEach((option) => {
  option.addEventListener('click', ()=> {
    const optionValue = option.getAttribute("data-value");
    updateCustomSelect(optionValue);
    updateNativeSelect(optionValue);
    customSelectMenu.classList.add("options-closed");
    customSelectArrowDown.classList.remove("inverted");
  });
});

  // ** function to update the display and selected options of the custom select
function updateCustomSelect(optionValue) {
  console.log("*CALL -updateCustomSelect-, parameter: ", optionValue);
  customSelectOptions.forEach((option)=> {
    if (option.getAttribute("data-value") == optionValue) {
      customSelectCurrent.innerHTML = option.innerHTML;
      option.classList.add("selected");
      option.querySelector(".custom-select-menu__option-check").classList.add("checked");
    } else {
      option.classList.remove("selected");
      option.querySelector(".custom-select-menu__option-check").classList.remove("checked");
    }
  });
}

  // ** function to update the native select based on results of custom select
function updateNativeSelect(optionValue) {
  console.log("*CALL -updateNativeSelect-, parameter: ", optionValue);
  for (var opt, j = 0; opt = selectOptions[j]; j++) {
    if (opt.value == optionValue) {
      selectElement.selectedIndex = j;
      break;
    }
  }
}


//    ============== manipulation of native select ====================== //
//    =================================================================== //
  // ** FOCUS **
  // when the select element is in/out of focus
  // add/remove .focus class to the custom select menu
  selectElement.addEventListener("focus", ()=> {
    customSelectCurrent.classList.add("focus");
  })
  
  selectElement.addEventListener("blur", ()=> {
    customSelectCurrent.classList.remove("focus");
  });


// when an option is chosen manually through the select element
// update the custom select menu
selectElement.addEventListener("change", ()=> {
  console.log("*EVENT -select change-");
  updateCustomSelect(selectElement.value);
});


// when redirected from plan buttons on index page,
// parse the URL and preselect the option associated with that button
const planSelected = getUrlVars()["plan"];
updateCustomSelect(planSelected);
updateNativeSelect(planSelected);


//    ======================== Timer ==================================== //
//    =================================================================== //
// get the time left for the timer and update the display
var launchIntervalMS = parseInt(getUrlVars()["timeleft"]);
console.log(launchIntervalMS);

// initialize two dates
var visitDate = new Date(); // now
var launchDate = new Date(); // the launch date
launchDate.setMilliseconds(visitDate.getMilliseconds() + launchIntervalMS);

console.log("Today's date:", visitDate);
console.log("Launch date:", launchDate);

// set the launch date display
const countdownDate = document.querySelector(".countdown__date");
countdownDate.textContent = launchDate.getDate() + " " + launchDate.toLocaleString('default', {month: "short"}) + " " + launchDate.getFullYear();


// every second calculate the remaining time and update the display
  // constants to make calculations easier
  const DAYS_IN_MS = 24 * 60 * 60 * 1000;
  const HOURS_IN_MS = 60 * 60 * 1000;
  const MINUTES_IN_MS = 60 * 1000;

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


//    ======================== Helper function ========================== //
//    ======================== to get URL params ======================== //
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}



//    ======================== Form validation============================ //
//    =================================================================== //
const form = document.querySelector(".signup-form");
const nameField = document.querySelector(".signup-form__name");
const emailField = document.querySelector(".signup-form__email");
const phoneField = document.querySelector(".signup-form__phone");


nameField.addEventListener('invalid', e => {
    e.preventDefault();
    nameField.nextElementSibling.classList.add('display-error');
    nameField.classList.add('invalid');
});

emailField.addEventListener('invalid', e => {
  e.preventDefault();
  emailField.nextElementSibling.classList.add('display-error');
  emailField.classList.add('invalid');
});

phoneField.addEventListener('invalid', e => {
  e.preventDefault();
  phoneField.nextElementSibling.classList.add('display-error');
  phoneField.classList.add('invalid');
});

form.addEventListener('submit', e => {
    e.preventDefault();
    // as this is just a mockup, no code for actually submitting data
  
    inputFields = document.querySelectorAll('input');
    inputFields.forEach(field => {
        field.classList.remove('invalid');
    });
    errorIcons = document.querySelectorAll('.signup-form__cross');
    errorIcons.forEach(icon => {
        icon.classList.remove('display-error');
    })
})