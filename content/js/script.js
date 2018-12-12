
var scores, current, activePlayer, gameplaying;

//function which is exicuting with starting new game
var init = function () {

    scores = [0,0];
    current = 0;
    activePlayer = Math.floor(Math.random() * 2);
    gameplaying = true;
    document.querySelector('.player-0-panel').classList.remove("active");
    document.querySelector('.player-1-panel').classList.remove("active");
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.dice').style.display = "none";
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

}

//function which is change the active player
var changePlayer = function() {

    if (activePlayer == 0){
        activePlayer = 1;
    } else if (activePlayer == 1){
        activePlayer = 0;
    }
    document.querySelector('.player-0-panel').classList.toggle("active");
    document.querySelector('.player-1-panel').classList.toggle("active");
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
}

//function which is exicuting when roll button was clicked
var roll = function () {

    if (gameplaying){
        //1. Roll random number
        var dice;
        dice = Math.floor(Math.random() * 6) + 1;   

        //2. Display the result and set current score
        document.querySelector('.dice').src = 'content/img/dice-' + dice + '.png';
        document.querySelector('.dice').style.display = "inherit";
        current += dice;

        //3.Update current score and sum it if dice is not 1
        if (dice == 1) {
            current = 0;
            document.querySelector('#current-' + activePlayer).textContent = current;
            changePlayer();

        } else {
            document.querySelector('#current-' + activePlayer).textContent = current;
        }
    }

}

//function which is invoked when hold button was clicked
var hold = function() {

    if (gameplaying){
        //Add current score to global score
        scores[activePlayer] += current;

        //Update UI
        document.querySelector('.dice').style.display = "none";
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player win the game
        if(scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameplaying = false;
        } else {
            //Set current score to 0 and switch active player
            current = 0;
            changePlayer();
        }
    }

}


//functions exicution
init();
document.querySelector('.btn-roll').addEventListener('click', roll);
document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-hold').addEventListener('click', hold);