/** crée une nouvelle parti au changement de la page  */
window.onload = function exampleFunction() {
  newGame();
}

/** init variable */
var lauchGame = true;
const backgroundPlayer1 = document.getElementById("displayPlayer1");
const backgroundPlayer2 = document.getElementById("displayPlayer2");
const displayCurrentScore1 = document.getElementById("currentScore1");
const displayCurrentScore2 = document.getElementById("currentScore2");
const displayTotalScore1 = document.getElementById("totalScorePlayer1");
const displayTotalScore2 = document.getElementById("totalScorePlayer2");
const displayPlayer1 = document.getElementsByClassName('playerName')[0];
const displayPlayer2 = document.getElementsByClassName('playerName')[1];
const displayDice = document.getElementById('dice');
const selectPLayer = document.getElementById("selectPlayer");
const btnRoll = document.getElementById('btn_roll');
const btn_hold = document.getElementById('btn_hold');
const btn_newGame = document.getElementById('btn_newGame')

/** listen btn_roll */
btnRoll.addEventListener('click', rollDice);
/** listen button hold */
btn_hold.addEventListener('click', changePlayer);
/** listen btn_newGame */
btn_newGame.addEventListener('click', newGame);


/** crée un objet player */
var player1 = {
  name: "PLAYER 1",
  currentScore: 0,
  totalScore: 0,
  select: true
}
var player2 = {
  name: "PLAYER 2",
  currentScore: 0,
  totalScore: 0,
  select: false
}


function newGame() {
  player1.totalScore = player1.currentScore = player2.totalScore = player2.currentScore = 0;
  displayPlayer1.setAttribute("style", "color:#000000");
  displayPlayer2.setAttribute("style", "color: #BBBBBB;font-weight: 200;");
  display();
}



/** fonction pour roll dice */
function rollDice() {
  // select player
  if (player1.select) {
    console.log("player 1" + player1);
    var { name, currentScore, totalScore } = player1;
    console.log('cuurentScore ' + currentScore)
  } else {
    var { name, currentScore, totalScore } = player2;

  }

  // random number between 1 and 6
  var result = Math.trunc(Math.random() * 6 + 1);

  // listen sound roll dice
  var audio = new Audio('./sound/roll.wav');
  audio.play();
  // display result roll dice after sound roll dice.
  audio.addEventListener('ended', function () {
    // display Dice
    displayDice.setAttribute("style", "background-image: url(./image/" + result + ".svg)");
  });
  // result = 1
  if (result == 1) {
    // if total score = 99 then winner
    if (totalScore == 99) {
      totalScore = 100;
      updateScore(currentScore, totalScore);
      winnerIs(name);
    }
    // else change Player
    else {
      displayError();
      totalScore = totalScore - currentScore;
      updateScore(currentScore, totalScore);

      changePlayer();
    }

  } else {
    // increase current score
    currentScore = currentScore + result;
    // increase total score
    totalScore = totalScore + result;
    // total score > 100
    if (totalScore > 100) {
      totalScore = totalScore - currentScore;
      currentScore = 0;
      updateScore(currentScore, totalScore);
      displayError();
      display();
      changePlayer();
    } else {
      // update scores
      updateScore(currentScore, totalScore);
      /** display current score */
      display();
    }

  }

}


function changePlayer() {
  winnerIs();
  player1.select = !player1.select;
  player2.select = !player2.select;
  player1.currentScore = 0;
  player2.currentScore = 0;
  display();
  /** change select player */
  if (player1.select) {
    displayPlayer2.setAttribute("style", "color: #BBBBBB;font-weight: 200;");
    displayPlayer1.setAttribute("style", "color: #000000;");
    selectPLayer.setAttribute("style", "justify-content: start;");
  } else {
    displayPlayer1.setAttribute("style", "color: #BBBBBB;font-weight: 200;");
    displayPlayer2.setAttribute("style", "color: #000000;");
    selectPLayer.setAttribute("style", "justify-content: end;");
  }
}

function winnerIs() {
  if (player1.totalScore == 100) {
    alert("winner is " + player1.name);
    newGame();
  } else if (player2.totalScore == 100) {
    alert("winner is " + player2.name);
    newGame();
  }
}

function updateScore(currentScore, totalScore) {
  if (player1.select) {
    player1.currentScore = currentScore;
    player1.totalScore = totalScore;
  } else {
    player2.currentScore = currentScore;
    player2.totalScore = totalScore;
  }

}

function display() {
  displayCurrentScore1.textContent = player1.currentScore;
  displayCurrentScore2.textContent = player2.currentScore;
  displayTotalScore1.textContent = player1.totalScore;
  displayTotalScore2.textContent = player2.totalScore;
}

function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayError() {
  if (player1.select) {
    //displayPlayer1.setAttribute("style","background-color: white;");
    for (let index = 0; index < 5; index++) {
      backgroundPlayer1.setAttribute("style", "background-color: red;");
      await pause(100);
      backgroundPlayer1.setAttribute("style", "background-color: var(--background-player1);");
      await pause(100);
    }

  } else {
    for (let index = 0; index < 5; index++) {
      //displayPlayer2.setAttribute("style","background-color: white;");
      backgroundPlayer2.setAttribute("style", "background-color: red;");
      await pause(100);
      backgroundPlayer2.setAttribute("style", "background-color: white;");
      await pause(100);
    }
  }

}



