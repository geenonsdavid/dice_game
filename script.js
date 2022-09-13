function Player(name, currentScore,totalScore,select){
    this.name = name;
    this.currentScore = currentScore;
    this.totalScore = totalScore;
    this.select = select;
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
var newGame = true;
if (newGame){
    var newGame = false; 
    document.getElementsByClassName('playerName')[1].setAttribute("style","color: #BBBBBB;font-weight: 200;");
};

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
    /** récupére display dice*/
    const dice = document.getElementById('dice');

    /** modify background with result roll */
    dice.setAttribute("style", "background-image: url(./image/" + result_roll + ".svg)");

    /** show currentScore */
    if (player1.select){
        player1.currentScore = player1.currentScore + result_roll;
        
         showScore(player1.currentScore,1,false);
    }
    else {
        player2.currentScore = player2.currentScore + result_roll;
        showScore(player2.currentScore,2,false);
    }
}

/** fonction to change player*/
function nextPlayer(){
    if (player1.select){
        /** increase total score player 1 */
        player1.totalScore = player1.totalScore + player1.currentScore;
        /** init current score player 1 at 0 */
        player1.currentScore = 0;
        showScore(0,1,false);
        showScore(player1.totalScore,1,true);
        /** change player */
        player1.select = false;
        player2.select = true;
        /** change select player */
        document.getElementById('selectPlayer').setAttribute("style","justify-content: end;");
        /** change color name player 2 */
        document.getElementsByClassName('playerName')[0].setAttribute("style","color: #BBBBBB;font-weight: 200;");
        document.getElementsByClassName('playerName')[1].setAttribute("style","color: #000000;");
    }else {
        /** increase total score player 2 */
        player2.totalScore = player2.totalScore + player2.currentScore;
        /** init current score player 2 at 0 */
        player2.currentScore = 0;
        showScore(0,2,false);
        showScore(player2.totalScore,2,true);
        /** change player */
        player1.select = true;
        player2.select = false;
        /** change select player */
        document.getElementById('selectPlayer').setAttribute("style","justify-content: left;");
        /** change color name player 1 */
        document.getElementsByClassName('playerName')[1].setAttribute("style","color: #BBBBBB; font-weight: 200");
        document.getElementsByClassName('playerName')[0].setAttribute("style","color: #000000;");
    }
}

/** générer un nombre alétoire en cliquant sur btn_roll */
const btnRoll = document.getElementById('btn_roll');
btnRoll.addEventListener('click',roll);


/** button hold */
const btn_hold = document.getElementById('btn_hold');
btn_hold.addEventListener('click',nextPlayer);