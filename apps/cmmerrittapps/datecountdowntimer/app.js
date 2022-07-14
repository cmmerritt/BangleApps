// code can be tested by using the Bangle.js 2 watch emulator with the Espruino IDE: https://www.espruino.com/ide/ 

// create proof of concept with static date
// next steps in README

const Layout = require("Layout");

const targetDate = "Oct 31, 2022";

const goalTime = new Date(targetDate).getTime();

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function displayCountDown() {
  const currentTime = new Date();
  
  let timeLeft = goalTime - currentTime;

  timeLeft--;
  
  if(timeLeft < 0) {
    E.showMessage("It's Your Day!", "Countdown Timer");
    Bangle.buzz();
  }
  
  const days = Math.floor(timeLeft / day);
  const hours = Math.floor((timeLeft % day) / hour);
  const minutes = Math.floor((timeLeft % hour) / minute);
  const seconds = Math.floor((timeLeft % minute) / second);
  
  const timeStringDaysHours = days + " days " + hours + " hours";
  const timeStringMinutesSeconds = minutes + " minutes " + seconds + " seconds";
  
  const untilString = "until " + targetDate;
  
  var layout = new Layout( {
  type:"v", c: [
    {type:"txt", font:"6x8", label:timeStringDaysHours, id:"dayshours" },
    {type:"txt", font:"6x8", label:timeStringMinutesSeconds, id:"minutesseconds" },
    {type:"txt", font:"6x8", label:untilString, id:"until" }
  ]
  });
  g.clear();
  layout.render();
  Bangle.setLCDPower(1);
}

let interval = setInterval(displayCountDown, 1000);