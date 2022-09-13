/** init variable */
var newGame = true;
if (newGame){
    var currentScore1 = 0;
    var currentScore2 = 0;
    var newGame = false;
};







/**  fonction qui retourne un nombre aléatoire entre 1 et 6 */
function random() {
    var randomNumber = Math.trunc(Math.random()*6 +1);
    return randomNumber;
}

/** fonction pour lancer le dés */
function roll(){
    var result_roll = random();
    /** récupére display dice*/
    const dice = document.getElementById('dice');
    /** modify background with result roll */
    dice.setAttribute("style", "background-image: url(./image/" + result_roll + ".svg)");
    /** shox currentScore1 */
    currentScore1 = currentScore1 + result_roll;
    document.getElementById('currentScore1').textContent = currentScore1;
    console.log(currentScore1);
}


/** générer un nombre alétoire en cliquant sur btn_roll */
const btnRoll = document.getElementById('btn_roll');
btnRoll.addEventListener('click',roll);


