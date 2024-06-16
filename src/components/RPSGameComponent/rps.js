import './rps.css';

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
        <img class="rps-player-option" src="rps-empty.png" />
      </div>
      <span>VS</span>
      <div class="rps-ia">
        <span> IA </span>
        <img class="rps-player-option" src="rps-empty.png" />
      </div>
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

    rock.addEventListener('click', (event) => {
        console.log('rock');
    });
    scissors.addEventListener('click', (event) => {
        console.log('scissors');
    });
    paper.addEventListener('click', (event) => {
        console.log('paper');
    });
}
