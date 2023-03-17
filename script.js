/** crée une nouvelle parti au changement de la page  */
window.onload = function exampleFunction() {
  newGame();
}

/** init variable */
var finishScore = 100;
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
const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");
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
  id: 1,
  currentScore: 0,
  totalScore: 0,
  select: true
}
var player2 = {
  name: "PLAYER 2",
  id: 2,
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



// roll dice
function rollDice() {
  // select player who launch dice
  if (player1.select) {
    var { name, currentScore, totalScore } = player1;
  } else {
    var { name, currentScore, totalScore } = player2;
  }

  // random number between 1 and 6
  var result = Math.trunc(Math.random() * 6 + 1);

  // listen sound roll dice
  var audio = new Audio('./sound/roll.wav');
  audio.play();
  // display result dice  when sound end  
  audio.addEventListener('ended', function () {
    // display dice result in svg
    displayDice.setAttribute("style", "background-image: url(./image/" + result + ".svg)");// result = 1
    if (result === 1) {
      if (totalScore === (finishScore-1)) {
        winnerIs(name);
      }
      else {
        displayFlash();
        initScore(totalScore, currentScore);
        changePlayer();
      }

    } else {
      currentScore = currentScore + result;
      totalScore = totalScore + result;
      if (totalScore > finishScore) {
        initScore(totalScore, currentScore);
        displayFlash();
        display();
        changePlayer();
      } else {
        updateScore(currentScore, totalScore);
        display();
      }

    }
  });



}
//
function initScore(totalScore, currentScore) {
  totalScore = totalScore - currentScore;
  currentScore = 0;
  updateScore(currentScore, totalScore);
}

// change player
function changePlayer() {

  // check winner
  winnerIs();

  player1.select = !player1.select;
  player2.select = !player2.select;
  player1.currentScore = 0;
  player2.currentScore = 0;

  /**show result */
  display();

  /** change select player */
  if (player1.select) {
    displayPlayer2.setAttribute("style", "color: #BBBBBB;font-weight: 200;");
    displayPlayer1.setAttribute("style", "color: #000000;");
    select1.setAttribute("style", "display: block;");
    select2 .setAttribute("style", "display: none;");
  } else {
    displayPlayer1.setAttribute("style", "color: #BBBBBB;font-weight: 200;");
    displayPlayer2.setAttribute("style", "color: #000000;");
    select1.setAttribute("style", "display: none;");
    select2 .setAttribute("style", "display: block;");
    
  }
}

// display winner
function winnerIs() {
  if (player1.totalScore == finishScore) {
    alert("winner is " + player1.name);
    newGame();
  } else if (player2.totalScore == finishScore) {
    alert("winner is " + player2.name);
    newGame();
  }
}

// update score
function updateScore(currentScore, totalScore) {
  if (player1.select) {
    player1.currentScore = currentScore;
    player1.totalScore = totalScore;
  } else {
    player2.currentScore = currentScore;
    player2.totalScore = totalScore;
  }

}

// display scores
function display() {
  displayCurrentScore1.textContent = player1.currentScore;
  displayCurrentScore2.textContent = player2.currentScore;
  displayTotalScore1.textContent = player1.totalScore;
  displayTotalScore2.textContent = player2.totalScore;
}

function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// flash display when result dice = 1 or result dice>100
async function displayFlash() {
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



