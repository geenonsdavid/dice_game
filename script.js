/**  fonction qui retourne un nombre aléatoire entre 1 et 6 */
function random() {
    var randomNumber = Math.trunc(Math.random()*6 +1);
    return randomNumber;
}

/** init variable */
var newGame = true;
if (newGame){
    var currentScore1 = 0;
    var currentScore2 = 0;
    var totalScore1 = 0;
    var totalScore2 = 0;
    var newGame = false;
    var player = 1;
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
    if (player == 1 ){
         currentScore1 = currentScore1 + result_roll;
         showScore(currentScore1,1,false);

    }
    else {
        currentScore2 = currentScore2 + result_roll;
        showScore(currentScore2,2,false);
    }
   
    console.log(currentScore1);
    
}

/** fonction to change player*/
function nextPlayer(){
    if (player == 1){
        /** increase total score player 1 */
        totalScore1 = totalScore1 + currentScore1;
        /** init current score player 1 at 0 */
        currentScore1 = 0;
        showScore(0,1,false);
        showScore(totalScore1,1,true);
        /** change player */
        player = 2;
    }else {
        /** increase total score player 2 */
        totalScore2 = totalScore2 + currentScore2;
        /** init current score player 2 at 0 */
        currentScore2 = 0;
        showScore(0,2,false);
        showScore(totalScore2,2,true);
        /** change player */
        player = 1;
    }
}

/** générer un nombre alétoire en cliquant sur btn_roll */
const btnRoll = document.getElementById('btn_roll');
btnRoll.addEventListener('click',roll);

/** button hold */
const btn_hold = document.getElementById('btn_hold');
btn_hold.addEventListener('click',nextPlayer);


