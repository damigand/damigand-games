import './threeinrow.css';

const currentGame = [];

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
   var elements = '';
   var cellCounter = 1;
   for (var a = 1; a < 4; a++) {
      for (var b = 1; b < 4; b++) {
         elements += drawBoardCell(a, b, cellCounter);
         cellCounter++;
      }
   }
   return `
    <div class="threeinrow-cells">
      ${elements}
      </div>
   `;
}

function drawBoardCell(row, column, cell) {
   const id = 'cell-' + cell;
   currentGame.push({ id: id, symbol: '' });

   return `
      <div class="cell row-${row} col-${column}" id="${id}">
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
         const id = event.target.id;
         const currentCell = currentGame.find((c) => c.id == id);

         if (!currentCell) {
            return;
         }

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

            const classes = event.target.classList.value.split(' ');
            const row = classes[1].split('-')[1];
            const col = classes[2].split('-')[1];

            checkWin(currentTurn, row, col);

            currentCell.symbol = currentTurn;
            currentTurn = !currentTurn;

            crossStart.classList.toggle('d-none');
            circleStart.classList.toggle('d-none');
         }
      });
   });
}

const winningMap = ['123', '456', '789', '147', '258', '369', '159', '357'];

//player = true - X, player = false - O
function checkWin(player, row, column) {
   //Chequear ganador.
}
