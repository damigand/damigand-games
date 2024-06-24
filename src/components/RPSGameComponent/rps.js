import './rps.css';
import { drawScore, updateScore, loadScore, rpsPlayerScore, rpsIAScore } from '~c/ScoreComponent/score.js';
import { gameEnum } from '~c/GameComponent/game.js';

const enumOptions = {
    rock: 'Rock',
    paper: 'Paper',
    scissors: 'Scissors',
};

const enumResults = {
    playerWin: true,
    iaWin: false,
    tie: 0,
};

var playerOption;
var iaOption;

export function rpsGame() {
    loadGame();
    return `
    <article class="game-rps spacing">
        ${drawScore('rps', scoreHTML())}
        <div class="rps-play">
        ${drawGame()}
        </div>
    </article>
   `;
}

function scoreHTML() {
    return `
    <h3>Puntuación</h3>
    <div class="score-board">
      <div class="player-1">
        <span>TÚ</span>
        <p>${rpsPlayerScore}</p>
      </div> 
      <p> - </p>
      <div class="player-2">
       <span>IA</span>
        <p>${rpsIAScore}</p>
      </div>
    </div>
   `;
}

function drawGame() {
    return `
    <div class="rps-result">
      ${drawResults()}
    </div>
    <div class="rps-play-button">
      <img src="play.png" />
    </div>
    <div class="rps-options">
      ${drawOptions()}
    </div>
  `;
}

function drawResults() {
    return `
        <div class="rps-player">
            <span> TÚ </span>
            <div class="rps-player-option">
                <img class="rps-player-img" src="question.png"/>
            </div>
        </div>
        <span>VS</span>
        <div class="rps-ia">
            <span> IA </span>
            <div class="rps-ia-option">
                <img class="rps-ia-img" src="question.png"/>
            </div>
        </div>
      `;
}

function drawOptions() {
    return `
        <div class="rps-rock rps-option">
            <img src="rock.png" />
        </div>
        <div class="rps-scissors rps-option">
            <img src="scissors.png" />
        </div>
        <div class="rps-paper rps-option">
            <img src="paper.png" />
        </div>
    `;
}

export function rpsListeners() {
    const rock = document.querySelector('.rps-rock');
    const scissors = document.querySelector('.rps-scissors');
    const paper = document.querySelector('.rps-paper');

    const playerOptionImg = document.querySelector('.rps-player-img');
    const iaOptionImg = document.querySelector('.rps-ia-img');

    //Selecciona la opción y cambia aspectos visuales
    rock.addEventListener('click', (event) => {
        playerOption = enumOptions.rock;
        playerOptionImg.src = 'rock.png';
        playerOptionImg.parentElement.classList.add('rps-rock');
        playerOptionImg.parentElement.classList.remove('rps-paper');
        playerOptionImg.parentElement.classList.remove('rps-scissors');

        iaOptionImg.src = 'question.png';
        iaOptionImg.parentElement.classList.remove('rps-paper');
        iaOptionImg.parentElement.classList.remove('rps-scissors');
        iaOptionImg.parentElement.classList.remove('rps-rock');
    });
    scissors.addEventListener('click', (event) => {
        playerOption = enumOptions.scissors;
        playerOptionImg.src = 'scissors.png';
        playerOptionImg.parentElement.classList.add('rps-scissors');
        playerOptionImg.parentElement.classList.remove('rps-rock');
        playerOptionImg.parentElement.classList.remove('rps-paper');

        iaOptionImg.src = 'question.png';
        iaOptionImg.parentElement.classList.remove('rps-paper');
        iaOptionImg.parentElement.classList.remove('rps-scissors');
        iaOptionImg.parentElement.classList.remove('rps-rock');
    });
    paper.addEventListener('click', (event) => {
        playerOption = enumOptions.paper;
        playerOptionImg.src = 'paper.png';
        playerOptionImg.parentElement.classList.add('rps-paper');
        playerOptionImg.parentElement.classList.remove('rps-rock');
        playerOptionImg.parentElement.classList.remove('rps-scissors');

        iaOptionImg.src = 'question.png';
        iaOptionImg.parentElement.classList.remove('rps-paper');
        iaOptionImg.parentElement.classList.remove('rps-scissors');
        iaOptionImg.parentElement.classList.remove('rps-rock');
    });

    const playButton = document.querySelector('.rps-play-button');
    playButton.addEventListener('click', (event) => {
        if (playerOption) playGame();
    });
}

function playGame() {
    var index = Math.floor(Math.random() * 3);
    iaOption = getOptionByIndex(index);

    const iaOptionImg = document.querySelector('.rps-ia-img');

    switch (iaOption) {
        case enumOptions.paper:
            iaOptionImg.src = 'paper.png';
            iaOptionImg.parentElement.classList.add('rps-paper');
            iaOptionImg.parentElement.classList.remove('rps-scissors');
            iaOptionImg.parentElement.classList.remove('rps-rock');
            break;
        case enumOptions.rock:
            iaOptionImg.src = 'rock.png';
            iaOptionImg.parentElement.classList.add('rps-rock');
            iaOptionImg.parentElement.classList.remove('rps-scissors');
            iaOptionImg.parentElement.classList.remove('rps-paper');
            break;
        case enumOptions.scissors:
            iaOptionImg.src = 'scissors.png';
            iaOptionImg.parentElement.classList.add('rps-scissors');
            iaOptionImg.parentElement.classList.remove('rps-paper');
            iaOptionImg.parentElement.classList.remove('rps-rock');
            break;
    }

    const result = checkResult(playerOption, iaOption);

    var scoreResult;
    switch (result) {
        case enumResults.playerWin:
            scoreResult = updateScore(gameEnum.RPS, true);
            const playerScore = document.querySelector('.rps-score .player-1 p');
            playerScore.innerHTML = scoreResult;

            break;
        case enumResults.iaWin:
            scoreResult = updateScore(gameEnum.RPS, false);
            const iaScore = document.querySelector('.rps-score .player-2 p');
            iaScore.innerHTML = scoreResult;

            break;
        case enumResults.tie:
            console.log('¡Empate!');
            break;
    }
}

//Función que comprueba quién gana la partida. true - player, false - ia, 0 - empate
//mediante dos switch anidados.
function checkResult(player, ia) {
    switch (player) {
        case enumOptions.paper:
            switch (ia) {
                case enumOptions.paper:
                    return enumResults.tie;

                case enumOptions.rock:
                    return enumResults.playerWin;

                case enumOptions.scissors:
                    return enumResults.iaWin;
            }
            break;

        case enumOptions.rock:
            switch (ia) {
                case enumOptions.paper:
                    return enumResults.iaWin;

                case enumOptions.rock:
                    return enumResults.tie;

                case enumOptions.scissors:
                    return enumResults.playerWin;
            }
            break;

        case enumOptions.scissors:
            switch (ia) {
                case enumOptions.paper:
                    return enumResults.playerWin;

                case enumOptions.rock:
                    return enumResults.iaWin;

                case enumOptions.scissors:
                    return enumResults.tie;
            }
            break;
    }
}

//Función para obtener un valor del enumerado mediante un index.
function getOptionByIndex(index) {
    return Object.values(enumOptions)[index];
}

function loadGame() {
    loadScore(gameEnum.RPS);
}
