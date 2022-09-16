/** crée une nouvelle parti au changement de la page  */
window.onload = function exampleFunction() {
  newGame();
}

/** crée un objet player */
class Player{
    constructor(name, currentScore,totalScore,select){
        this.name = name;
        this.currentScore = currentScore;
        this.totalScore = totalScore;
        this.select = select;
    }
}
 
/** instance two players */
let player1 = new Player("PLAYER 1",0,0,true);
let player2 = new Player("PLAYER 2",0,0,false);

/**  fonction qui retourne un nombre aléatoire entre 1 et 6 */
function random() {
    var randomNumber = Math.trunc(Math.random()*6 +1);
    return randomNumber;
}

/** init variable */
const displayCurrentScore1 = document.getElementById("currentScore1");
const displayCurrentScore2 = document.getElementById("currentScore2");
const displayTotalScore1 = document.getElementById("totalScore1");
const displayTotalScore2 = document.getElementById("totalScore2");
const displayPlayer1 = document.getElementsByClassName('playerName')[0];
const displayPlayer2 = document.getElementsByClassName('playerName')[1];
const displayDice = document.getElementById('dice');
const selectPLayer = document.getElementById("selectPlayer");
const btnRoll = document.getElementById('btn_roll');
const btn_hold = document.getElementById('btn_hold');
const btn_newGame = document.getElementById('btn_newGame')

/** listen btn_roll */
btnRoll.addEventListener('click',roll);
/** listen button hold */
btn_hold.addEventListener('click',nextPlayer);
/** listen btn_newGame */
btn_newGame.addEventListener('click',newGame);


function newGame(){
    player1.currentScore.textContent = 0;
    player1.totalScore.textContent = 0;
    player2.currentScore.textContent = 0;
    player2.totalScore.textContent = 0;
    player1.winner = false;
    player2.winner = false;
    player1.select = true;
    player2.select = false; 
    showScore(0,1,true);
    showScore(0,2,true);
    showScore(0,1,false);
    showScore(0,1,false);
    displayPlayer1.setAttribute("style","color:#000000");
    displayPlayer2.setAttribute("style","color: #BBBBBB;font-weight: 200;");
}


/** function to show score */
function showScore(score,player,total){
    if (total == false){
    document.getElementById('currentScore'+ player).textContent = score;
} else{
    document.getElementById('totalScorePlayer' + player).textContent =score;
}
}

/** fonction pour roll dice */
function roll(){
    var result_roll = random();

    /** modify background with result roll */
    displayDice.setAttribute("style", "background-image: url(./image/" + result_roll + ".svg)");
    
    /** check if result roll not egal 1 */
    if (result_roll != 1){
        /** display current score */
    if(player1.select){
        player1.currentScore = player1.currentScore + result_roll;
        displayCurrentScore1.textContent = player1.currentScore;
    }else{
        player2.currentScore = player2.currentScore + result_roll;
        displayCurrentScore2.textContent = player2.currentScore;
    }
    
    }else{
        /** init current score */
        if(player1.select){
            player1.currentScore = 0;
            displayCurrentScore1.textContent = player1.currentScore;
        }else{
            player2.currentScore = 0;
            displayCurrentScore2.textContent = player2.currentScore;
        }
        /** change player */
        changePlayer();
    }   
} 

/** fonction to change player */
function nextPlayer(){
    if (player1.select){
        /** increase total score player 1 */
        player1.totalScore = player1.totalScore + player1.currentScore;
        if (player1.totalScore > 100){
            player1.totalScore = player1.totalScore - player1.currentScore;
        }
        /** init current score player 1 at 0 */
        player1.currentScore = 0;
        displayCurrentScore1.textContent = 0;
        /** showScore(score name, 1 or 2, ) */
        showScore(player1.totalScore,1,true);
        /** winner is */
        winnerIs();
        /** change player */
        changePlayer();
    }else {
        /** increase total score player 1 */
        player2.totalScore = player2.totalScore + player2.currentScore;
        if (player2.totalScore > 100){
            player2.totalScore = player2.totalScore - player2.currentScore;
        }
        /** init current score player 2 at 0 */
        player2.currentScore = 0;
        displayCurrentScore2.textContent = 0;
        showScore(player2.totalScore,2,true);
         /** winner is */
         winnerIs();
        /** change player */
        changePlayer();
    }
}

function changePlayer(){
        player1.select = !player1.select;
        player2.select = !player2.select;
        /** change select player */
        if (player1.select){
            displayPlayer2.setAttribute("style","color: #BBBBBB;font-weight: 200;");
            displayPlayer1.setAttribute("style","color: #000000;");
            selectPLayer.setAttribute("style","justify-content: start;");
        } else {
            displayPlayer1.setAttribute("style","color: #BBBBBB;font-weight: 200;");
            displayPlayer2.setAttribute("style","color: #000000;");
            selectPLayer.setAttribute("style","justify-content: end;");
        } 
}

function winnerIs(){
    if (player1.totalScore == 100){
        alert("winner is " + player1.name);
     }else if (player2.totalScore == 100){
        alert("winner is " + player2.name)
     } 
}

