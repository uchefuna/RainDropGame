
//variables to check how many rain drops the play collects
let rainDropValue01 = 0, rainDropValue02 = 0, rainDropValue03 = 0, rainDropValue04 = 0, rainDropValue05 = 0, rainDropValue06 = 0, rainDropValue07 = 0, rainDropValue08 = 0, rainDropValue09 = 0, rainDropValue10 = 0;

//variables for the Modal
let usrName, keysCycles = 0, usrAttempts = 5;

//variable to get number of cycles to play the game
let rainCycles = 0;

//variable to count number of rain dropped
let rainDropsCnt = 0;

//variable to count number of rain drop the player collected
let rainDropCollect = 0;

//an array used to award prizes when the play reached a certain level
const rainReward = ["Bronze", "Silver", "Gold", "Platinum"];

//getting the elements of the HTML
const playStart = document.getElementById('playstart');
const rainBoxes = document.querySelectorAll('.rainboxes');
const htmlConsole1 = document.querySelectorAll('.displ1');
const htmlConsole2 = document.querySelectorAll('.displ2');
const rainScores = document.querySelectorAll('.raininfo');
const modalBox = document.querySelectorAll('.modalbox');

//variable used to start and stop the game
let stopRain = false;

playStart.focus();

//click functionality of the HTML
window.onclick = event => {
  calculatorLogic(event);

  if (!stopRain) {
    if (event.target == playStart) {
      initProcess();
    }

    if (event.target == modalBox[4]) {
      modalBox[1].style.overflowY = "auto";
    }
    else if (event.target == modalBox[6]) {
      console.log("You cancelled the Modal.");
      htmlConsole1[11].innerHTML =
        "You cancelled the Modal.";
      modalRmoval(), playStart.focus();
    }
    else if (event.target == modalBox[5]) {
      if (modalBox[2].textContent === 'Passcode' || modalBox[2].textContent === 'PlayCycle') {
        passCycles(modalBox[3].value);
        modalBox[3].value = '';
      } else if (modalBox[2].textContent === 'Username') {
        usrNameInput(modalBox[3].value);
        modalBox[3].value = '';
      }
    }
  }
}

let remdivChild; //variabl to remove the div child

//function to initialize the game
function initProcess() {
  console.clear(), claerHTMLDisplay();
  modalBoxCall('Passcode', 'Enter the Passcode');

  let twowords1 = "Enter the passcode to continue.";
  console.log(twowords1);
  htmlConsole1[11].innerHTML = twowords1;

  modalBox[0].animate(
    [
      { top: "-300px", opacity: "0" },
      { top: "0", opacity: "0.5" },
    ],
    {
      duration: 170,
    }
  );

  setTimeout(function () {
    // let divChild1 = document.createElement('div');
    let divChild = document.getElementById('modalcontent').appendChild(document.createElement('div'));
    remdivChild = divChild;
    divChild.style.cssText = 'text-align: center; height: 50px; background-color: #444343;';

    let paraChild = divChild.appendChild(document.createElement('p'));
    paraChild.innerHTML = 'Passcode: ';
    paraChild.style.cssText = 'color: #fffffffb; font-size: 1.4em; letter-spacing: 2px; margin: 0; padding: 3% 0 0;';

    let spanChild;
    spanChild = paraChild.appendChild(document.createElement('span'));
    spanChild.innerHTML = '2831';
    spanChild.style.cssText = 'color: #ffdb11f8;';
    spanChild = paraChild.appendChild(document.createElement('span'));
    spanChild.innerHTML = ' | ';
    spanChild.style.cssText = 'color: #ff2111f8;';
    spanChild = paraChild.appendChild(document.createElement('span'));
    spanChild.innerHTML = 'Username: ';
    spanChild = paraChild.appendChild(document.createElement('span'));
    spanChild.innerHTML = 'UCHE';
    spanChild.style.cssText = 'color: #ffdb11f8;';
  }, 700);
}

//function to clear display of the HTML
function claerHTMLDisplay() {
  for (i = 0; i < htmlConsole1.length; i++) {
    htmlConsole1[i].innerHTML = '';
  }
  for (i = 0; i < htmlConsole2.length; i++) {
    htmlConsole2[i].innerHTML = '';
  }
  for (i = 0; i < rainScores.length; i++) {
    rainScores[i].innerHTML = '';
  }
}

//function to call the Modal box
function modalBoxCall(lebel, inputspace) {
  document.body.style.overflow = "hidden";
  document.body.style.height = "100%";
  modalBox[0].style.display = "block";
  modalBox[2].textContent = lebel;
  modalBox[3].placeholder = inputspace;
  modalBox[3].focus();
}

//function to remove the Modal box
function modalRmoval() {
  modalBox[0].animate({
    opacity: [1, 0.5, 0],
    top: ['0px', '-100px', '-300px', '-500px', '-1000px'],
  }, 350);

  setTimeout(function () {
    modalBox[0].style.display = "none";
    remdivChild.remove();
  }, 320)
}

//listening event to use the ENTER buttton to start the game
playStart.addEventListener('keydown', event => {
  if (event.code === 'Enter') {
    event.preventDefault();
    if (!stopRain) {
      initProcess();
    }
  }
});

//listening events to use the ENTER buttton after inputting values
modalBox[3].addEventListener('keydown', event => {
  if (event.code === 'Enter') {
    event.preventDefault();
    if (modalBox[3].value === '') {
      console.log("You cancelled the Modal.");
      htmlConsole1[11].innerHTML =
        "You cancelled the Modal.";
      modalRmoval(), playStart.focus();
    } else if (modalBox[2].textContent === 'Passcode' || modalBox[2].textContent === 'PlayCycle') {
      passCycles(modalBox[3].value);
      modalBox[3].value = '';
    } else if (modalBox[2].textContent === 'Username') {
      usrNameInput(modalBox[3].value);
      modalBox[3].value = '';
    }
  }
});

//listening events to mouseover the rain drops and score points
function rainEvents(rainbox, rainDropValue, displaybox, i) {
  rainbox.addEventListener('mouseover', event => {
    if (stopRain) {
      rainDropValue++
      let twowords5 = "rain collected(Skybox" + i + "): " + rainDropValue;
      console.log(twowords5);
      displaybox.innerHTML = twowords5;
      console.log(rainDropCollect);
      rainScores[2].innerHTML = rainDropCollect;

      //rewards
      rainDropCollect++
      switch (rainDropCollect) {
        case (2 * rainCycles):
          console.log(rainReward[0]);
          rainScores[3].innerHTML = rainReward[0];
          break;
        case (4 * rainCycles):
          console.log(rainReward[1]);
          rainScores[3].innerHTML = rainReward[1];
          break;
        case (6 * rainCycles):
          console.log(rainReward[2]);
          rainScores[3].innerHTML = rainReward[2];
          break;
        case (8 * rainCycles):
          console.log(rainReward[3]);
          rainScores[3].innerHTML = rainReward[3];
          break;
      }
    }
  });
}

//listening events functions for the 10 raind rop boxes
rainEvents(rainBoxes[0], rainDropValue01, htmlConsole2[1], 1);
rainEvents(rainBoxes[1], rainDropValue02, htmlConsole2[2], 2);
rainEvents(rainBoxes[2], rainDropValue03, htmlConsole2[3], 3);
rainEvents(rainBoxes[3], rainDropValue04, htmlConsole2[4], 4);
rainEvents(rainBoxes[4], rainDropValue05, htmlConsole2[5], 5);
rainEvents(rainBoxes[5], rainDropValue06, htmlConsole2[6], 6);
rainEvents(rainBoxes[6], rainDropValue07, htmlConsole2[7], 7);
rainEvents(rainBoxes[7], rainDropValue08, htmlConsole2[8], 8);
rainEvents(rainBoxes[8], rainDropValue09, htmlConsole2[9], 9);
rainEvents(rainBoxes[9], rainDropValue10, htmlConsole2[10], 10);

//function to get input values of the passcode and number of cycles
function passCycles(modalInputVal) {
  keysCycles = parseInt(modalInputVal);

  let twowords1, twowords2, twowords3;
  if (isNaN(keysCycles)) {
    if (modalBox[2].textContent === 'Passcode') {
      twowords1 = modalInputVal.toString().length == 1 ? 'value' : 'values';
      twowords2 = " entered is not a number. Please start again and enter a number.";

      twowords3 = "Input " + twowords1 + twowords2;
      console.log(twowords3);
      htmlConsole1[11].innerHTML = twowords3;
      playStart.focus(), modalRmoval();
      return;
    } else {
      htmlConsole1[12].innerHTML = '';
      twowords1 = modalInputVal.toString().length == 1 ? 'cycle' : 'cycles';
      twowords2 = " entered is not a number. Please enter number between 50 - 500 to start the game.";

      twowords3 = "Input " + twowords1 + twowords2;
      console.log(twowords3);
      htmlConsole1[11].innerHTML = twowords3;
    }
  } else {
    if (modalBox[2].textContent === 'Passcode') {
      if (modalInputVal != '2831') {
        twowords1 = "Passcode entered is incorrect. Please start again and enter the correct passcode.";
        console.log(twowords1);
        htmlConsole1[11].innerHTML = twowords1;
        playStart.focus(), modalRmoval();
        return;
      } else {
        twowords1 = "The passcode is correct! Please enter rhe username to continue.";
        console.log(twowords1);
        htmlConsole1[11].innerHTML = twowords1;
        modalBoxCall('Username', 'Enter the username');
      }
    } else {
      htmlConsole1[12].innerHTML = '';
      if (keysCycles < 50) {
        twowords1 = "Number of cycles entered is below 50. Please enter more than 50 cycles to start the game.";
        console.log(twowords1);
        htmlConsole1[11].innerHTML = twowords1;
      } else {
        rainCycles = parseInt(modalInputVal);
        twowords1 = "You've " + rainCycles + " cyles to play.";
        console.log(twowords1);
        htmlConsole1[11].innerHTML = twowords1;
        twowords1 = "The game will start in three seconds.";
        console.log(twowords1);
        htmlConsole1[12].innerHTML = twowords1;
        modalRmoval();

        setTimeout(function () {
          startRainDrop();
        }, 3000)
      }
    }
  }
}

//function to get input value of the username
function usrNameInput(usrName) {
  let twowords1, twowords2;
  if (usrName.toLowerCase() == 'uche') {
    twowords1 = "The username is: " + usrName + ". That's correct! You can now enter the cycles amount to play the game (50 - 500).";
    console.log(twowords1);
    htmlConsole1[11].innerHTML = twowords1;
    htmlConsole1[12].innerHTML = '';

    usrName = '';
    usrAttempts = 5;
    modalBoxCall('PlayCycle', 'Enter game cycles');
  } else {
    twowords1 = "Wrong username entered. Please try again and enter the correct usename.";
    console.log(twowords1);
    htmlConsole1[11].innerHTML = twowords1;
    modalBox[3].focus();

    usrAttempts--;
    if (usrAttempts == 0) {
      twowords1 = "You used all the atempts required.";
      console.log(twowords1);
      htmlConsole1[12].innerHTML = twowords1;
      twowords1 = "Wrong entry 5 times. Please start all over again.";
      console.log(twowords1);
      htmlConsole2[11].innerHTML = twowords1;
      usrName = '';
      usrAttempts = 5;
      modalRmoval(), playStart.focus();
      return;
    } else {
      twowords1 = usrAttempts == 1 ? ' attempt ' : ' attempts ';
      twowords2 = usrAttempts + twowords1 + 'remaining.';
      console.log(twowords2);
      htmlConsole1[12].innerHTML = twowords2;
    }
  }
}
function goRandom() {
  const interval = [2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900];
  for (let i = interval.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = interval[i];
    interval[i] = interval[j];
    interval[j] = k;
  }
  return interval;
}

//function to start the game after correct passcode and username input
function startRainDrop() {
  if (!stopRain) {
    stopRain = true;
    console.clear(), claerHTMLDisplay();
    let twowords1 = "Game started.";
    console.log(twowords1);
    htmlConsole1[0].innerHTML = twowords1;
    twowords1 = "stopRain is: " + stopRain;
    console.log(twowords1);
    htmlConsole2[0].innerHTML = twowords1;

    for (i = 0; i < rainBoxes.length; i++) {
      rainBoxes[i].style.display = 'block';
    }

    rainDropValue01 = 0, rainDropValue02 = 0, rainDropValue03 = 0, rainDropValue04 = 0, rainDropValue05 = 0, rainDropValue06 = 0, rainDropValue07 = 0, rainDropValue08 = 0, rainDropValue09 = 0, rainDropValue10 = 0, rainDropCollect = 0, rainDropsCnt = 0;

    let interval = goRandom();

    rainAdventure01(rainCycles, interval[0]), rainAdventure02(rainCycles, interval[1]), rainAdventure03(rainCycles, interval[2]), rainAdventure04(rainCycles, interval[3]), rainAdventure05(rainCycles, interval[4]), rainAdventure06(rainCycles, interval[5]), rainAdventure07(rainCycles, interval[6]), rainAdventure08(rainCycles, interval[7]), rainAdventure09(rainCycles, interval[8]), rainAdventure10(rainCycles, interval[9]);

  }
}

//function to end the game after completed number of the cycles
function endRainDorp() {
  stopRain = false;
  for (i = 0; i < rainBoxes.length; i++) {
    rainBoxes[i].style.display = 'none';
  }
}

let a = []; // an array to write 1 cycle of the droplet
function rainAnimateTimer(rainAdventure, displaybox, rainbox, rainDrop, rainDropRate, num) {
  let rainDelay = Math.floor(Math.random() * 100) + rainDropRate;

  rainbox.animate(
    [
      // keyframes
      { top: "0" },
      { top: "560px" },
    ],
    {
      // timing options
      duration: rainDelay,
      // iterations: Infinity,
    }
  );

  setTimeout(function () {
    rainbox.style.display = "none";

    rainDrop--;
    let twowords1 = "raindrop" + num + ": " + rainDrop;
    console.log(twowords1);
    displaybox.innerHTML = twowords1;

    rainDropsCnt++;
    console.log(rainDropsCnt);
    rainScores[0].innerHTML = rainDropsCnt;

    // checking that all droplets has completed a cycle
    for (i = 0; i < 10; i++) {
      if (num == i + 1) {
        a[i] = 'a' + i;
      }

      if (a[0] == 'a0' && a[1] == 'a1' && a[2] == 'a2' && a[3] == 'a3' && a[4] == 'a4' && a[5] == 'a5' && a[6] == 'a6' && a[7] == 'a7' && a[8] == 'a8' && a[9] == 'a9') {
        a = [];
        keysCycles--;
        if (keysCycles == 0) {
          endRainDorp();
        }
        htmlConsole1[13].innerHTML = "raincycles: " + rainCycles;
        htmlConsole2[13].innerHTML = "keyscycles: " + keysCycles;
      }
    }
  }, rainDelay);

  setTimeout(function () {
    let interval = goRandom();
    rainAdventure(rainDrop, interval[num - 1]);
    if (stopRain) {
      rainbox.style.display = 'block';
      rainbox.focus()
    } else {
      rainbox.style.display = "none";
    }
  }, rainDelay + 500);
}

//------- 10 individual function of the rain drop -----------------------
function rainAdventure01(rainDrop01, interval) {
  if (stopRain) {
    rainAnimateTimer(rainAdventure01, htmlConsole1[1], rainBoxes[0], rainDrop01, interval, 1);
  }
}

function rainAdventure02(rainDrop02, interval) {
  if (stopRain) {
    rainAnimateTimer(rainAdventure02, htmlConsole1[2], rainBoxes[1], rainDrop02, interval, 2);
  }
}

function rainAdventure03(rainDrop03, interval) {
  if (stopRain) {
    rainAnimateTimer(rainAdventure03, htmlConsole1[3], rainBoxes[2], rainDrop03, interval, 3);
  }
}

function rainAdventure04(rainDrop04, interval) {
  if (stopRain) {
    rainAnimateTimer(rainAdventure04, htmlConsole1[4], rainBoxes[3], rainDrop04, interval, 4);
  }
}

function rainAdventure05(rainDrop05, interval) {
  if (stopRain) {
    rainAnimateTimer(rainAdventure05, htmlConsole1[5], rainBoxes[4], rainDrop05, interval, 5);
  }
}

function rainAdventure06(rainDrop06, interval) {
  if (stopRain) {
    rainAnimateTimer(rainAdventure06, htmlConsole1[6], rainBoxes[5], rainDrop06, interval, 6);
  }
}

function rainAdventure07(rainDrop07, interval) {
  if (stopRain) {
    rainAnimateTimer(rainAdventure07, htmlConsole1[7], rainBoxes[6], rainDrop07, interval, 7);
  }
}

function rainAdventure08(rainDrop08, interval) {
  if (stopRain) {
    rainAnimateTimer(rainAdventure08, htmlConsole1[8], rainBoxes[7], rainDrop08, interval, 8);
  }
}

function rainAdventure09(rainDrop09, interval) {
  if (stopRain) {
    rainAnimateTimer(rainAdventure09, htmlConsole1[9], rainBoxes[8], rainDrop09, interval, 9);
  }
}

function rainAdventure10(rainDrop10, interval) {
  if (stopRain) {
    rainAnimateTimer(rainAdventure10, htmlConsole1[10], rainBoxes[9], rainDrop10, interval, 10);
  }
}
//-----------------------------------------------------------------------

//------------------- STANDARD CALCULATOR ----------------------------
const keyValues = document.querySelectorAll('.calbody input');
const calDisplay = document.querySelector('.caldisply p');

let equalKey;
let onOffKeys = false;
let stopCal = false;
htmlConsole2[14].innerHTML =
  'The Calculator is OFF';
calDisplay.innerHTML = "<span style='color:red;'>" + 'OFF' + "</span>";

function calculatorLogic(event) {
  for (i = 0; i < keyValues.length; i++) {
    if (event.target == keyValues[i]) {
      if (keyValues[i].value == 'ON' || keyValues[i].value == 'OFF') {
        if (keyValues[i].value == 'ON') { stopCal = true; calDisplay.innerHTML = "<span style='color:gold;'>" + keyValues[i].value + "</span>"; }
        else if (keyValues[i].value == 'OFF') { stopCal = false; calDisplay.innerHTML = "<span style='color:red;'>" + keyValues[i].value + "</span>"; }
        htmlConsole2[14].innerHTML =
          'The Calculator is ' + keyValues[i].value;

        onOffKeys = true;
      }

      if (stopCal && keyValues[i].value != 'ON' && keyValues[i].value != 'OFF') {
        keyValues[i].style.cssText = 'background-color: rgba(108, 28, 139, 0.247);';
        colorClick();

        if (onOffKeys) {
          htmlConsole2[14].innerHTML = '';
          calDisplay.innerHTML = '';
          onOffKeys = false;
        }

        if (keyValues[i].value == 'AC') {
          htmlConsole2[14].innerHTML = '';
          calDisplay.innerHTML = '';
        } else if (keyValues[i].value == '%' || keyValues[i].value == 'M+' || keyValues[i].value == 'M-') {
          htmlConsole2[14].innerHTML += '';
          calDisplay.innerHTML += '';
        } else if (keyValues[i].value == 'DC') {
          htmlConsole2[14].innerHTML = htmlConsole2[14].innerHTML.toString().slice(0, -1);
          calDisplay.innerHTML = calDisplay.innerHTML.toString().slice(0, -1);
        } else if (keyValues[i].value == '=') {
          equalKey = '=';
          htmlConsole2[14].innerHTML = eval(htmlConsole2[14].innerHTML);
          if (Number.isInteger(eval(calDisplay.innerHTML)))
            calDisplay.innerHTML = eval(calDisplay.innerHTML);
          else
            calDisplay.innerHTML = eval(calDisplay.innerHTML).toPrecision(8);
        } else {
          if ((equalKey === '=') && (keyValues[i].value != '/' && keyValues[i].value != '*' && keyValues[i].value != '+' && keyValues[i].value != '-')) {
            htmlConsole2[14].innerHTML = '';
            calDisplay.innerHTML = '';
          }
          if (calDisplay.innerHTML.length < 14) {
            calDisplay.innerHTML += keyValues[i].value;
          }
          htmlConsole2[14].innerHTML += keyValues[i].value;
          console.log(calDisplay.innerHTML.length)
          equalKey = '';
        }
      }
    }
  }
}

function colorClick() {
  setTimeout(function () {
    for (i = 0; i < keyValues.length; i++) {
      keyValues[i].style.cssText = 'background-color: #e7a120d8;';
      let equalKey = document.querySelector('.calbody div .equalsign');
      equalKey.style.cssText = 'background-color: #a82222;';
    }
  }, 200)
}

//-----------------------------------------------------------------