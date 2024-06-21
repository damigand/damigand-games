import './rps.css';

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

export function rpsGame(game) {
    return `
     <article class="game-rps spacing">
         <div class="rps-score">
            ${drawScore()}
         </div>
         <div class="rps-play">
            ${drawGame()}
         </div>
     </article>
   `;
}

function drawScore() {}

function drawGame() {
    return `
    <div class="rps-result">
      <div class="rps-player">
        <span> TÚ </span>
        <img class="rps-player-option" src="question.png"/>
      </div>
      <span>VS</span>
      <div class="rps-ia">
        <span> IA </span>
        <img class="rps-ia-option" src="question.png" />
      </div>
    </div>
    <div class="rps-play-button">
      <img src="play.png" />
    </div>
    <div class="rps-options">
      <div class="rps-rock rps-option">
        <img src="rock.png" />
      </div>
      <div class="rps-scissors rps-option">
        <img src="scissors.png" />
      </div>
      <div class="rps-paper rps-option">
        <img src="paper.png" />
      </div>
    </div>
  `;
}

export function rpsListeners() {
    const rock = document.querySelector('.rps-rock');
    const scissors = document.querySelector('.rps-scissors');
    const paper = document.querySelector('.rps-paper');

    const playerOptionImg = document.querySelector('.rps-player-option');

    rock.addEventListener('click', (event) => {
        playerOption = enumOptions.rock;
        playerOptionImg.src = 'rock.png';
    });
    scissors.addEventListener('click', (event) => {
        playerOption = enumOptions.scissors;
        playerOptionImg.src = 'scissors.png';
    });
    paper.addEventListener('click', (event) => {
        playerOption = enumOptions.paper;
        playerOptionImg.src = 'paper.png';
    });

    const playButton = document.querySelector('.rps-play-button');
    playButton.addEventListener('click', (event) => {
        if (playerOption) playGame();
    });
}

function playGame() {
    var index = Math.floor(Math.random() * 3);
    iaOption = getOptionByIndex(index);

    const iaOptionImg = document.querySelector('.rps-ia-option');

    switch (iaOption) {
        case enumOptions.paper:
            iaOptionImg.src = 'paper.png';
            break;
        case enumOptions.rock:
            iaOptionImg.src = 'rock.png';
            break;
        case enumOptions.scissors:
            iaOptionImg.src = 'scissors.png';
            break;
    }

    const result = checkResult(playerOption, iaOption);

    switch (result) {
        case enumResults.playerWin:
            console.log('¡Gana el jugador!');
            break;
        case enumResults.iaWin:
            console.log('¡Gana la IA!');
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
