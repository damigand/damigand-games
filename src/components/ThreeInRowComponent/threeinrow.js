import './threeinrow.css';

export function threeInRowGame(game) {
   return `
        <article class="game-threeinrow spacing">
            <div class="threeinrow-score">
              ${drawScore()}
            </div>
            <div class="threeinrow-board">
              ${drawBoard()}
            </div>
            <div class="threeinrow-turns">
              ${drawTurns()}
            </div>
        </article>
      `;
}

function drawScore() {
   return `
    <h3>Puntuación</h3>
    <div class="score-board">
      <div class="player-1">
        <img src="circle.png" />
        <p>0</p>
      </div> 
      <p> - </p>
      <div class="player-2">
       <p>0</p>
        <img src="cross.png" />
      </div>
    </div>
   `;
}

function drawBoard() {
   return `
    <div class="threeinrow-cells">
        <div class="cell" id="cell1">
        </div>
        <div class="cell" id="cell2">
        </div>
        <div class="cell" id="cell3">
        </div>
        <div class="cell" id="cell4">
        </div>
        <div class="cell" id="cell5">
        </div>
        <div class="cell" id="cell6">
        </div>
        <div class="cell" id="cell7">
        </div>
        <div class="cell" id="cell8">
        </div>
        <div class="cell" id="cell9">
        </div>
      </div>
   `;
}

function drawTurns() {
   return `
      <h3>¿Quién comienza el juego? </h3>
        <div class="choose-turn">
        <div class="cross-start" id="circle">
          <img src="circle.png" />
        </div>
        <div class="cirlce-start" id="cross">
          <img src="cross.png" />
        </div>
      </div>
   `;
}

//Turno. true = X, false = O
var currentTurn;
var hasGameStarted = false;

export function threeInRowListeners() {
   //Elegir turno
   const circleStart = document.querySelector('#circle');
   const crossStart = document.querySelector('#cross');
   const title = document.querySelector('.threeinrow-turns h3');

   circleStart.addEventListener('click', (event) => {
      currentTurn = false;
      hasGameStarted = true;

      crossStart.classList.add('d-none');
      title.textContent = 'Turno de';
   });

   crossStart.addEventListener('click', (event) => {
      currentTurn = true;
      hasGameStarted = true;

      circleStart.classList.add('d-none');
      title.textContent = 'Turno de';
   });

   //Poner una cruz o un círculo.
   const cells = document.querySelectorAll('.game-threeinrow .cell');
   cells.forEach((cell) => {
      cell.addEventListener('click', (event) => {
         if (hasGameStarted) {
            if (currentTurn == true) {
               cell.innerHTML = `
                  <img class="cross" src="cross.png" />
                `;
            } else {
               cell.innerHTML = `
                <img class="circle" src="circle.png" />
                `;
            }
            currentTurn = !currentTurn;
            crossStart.classList.toggle('d-none');
            circleStart.classList.toggle('d-none');
         }
      });
   });
}
