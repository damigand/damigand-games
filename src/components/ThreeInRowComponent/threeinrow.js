import './threeinrow.css';

const winningMap = ['123', '456', '789', '147', '258', '369', '159', '357'];
var currentGame = [];
var winnerCells = [];
var circleScore = 0;
var crossScore = 0;
//Turno. 1 = X, 0 = O
var currentTurn;
var hasGameStarted = false;

export function threeInRowGame() {
   loadGame();
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
        <p>${circleScore}</p>
      </div> 
      <p> - </p>
      <div class="player-2">
       <p>${crossScore}</p>
        <img src="cross.png" />
      </div>
    </div>
   `;
}

function drawBoard() {
   var elements = '';
   var cellCounter = 1;
   if (!currentGame || currentGame.length < 1) {
      for (var a = 1; a < 4; a++) {
         for (var b = 1; b < 4; b++) {
            elements += drawBoardCell(a, b, cellCounter);
            cellCounter++;
         }
      }
   } else {
      for (const cell of currentGame) {
         elements += drawBoardCell(cell.row, cell.column, cellCounter, cell.symbol, true, cell);
         cellCounter++;
      }
   }
   return `
      <div class="threeinrow-cells">
         ${elements}
      </div>
   `;
}

function drawBoardCell(row, column, cellNumber, symbol = -1, loading = false, cell) {
   const id = 'cell-' + cellNumber;
   if (!loading) {
      currentGame.push({ id: id, symbol: -1, row: row, column: column });
      return `
         <div class="cell row-${row} col-${column}" id="${id}">
         </div>
      `;
   } else {
      var imgString = '';
      if (symbol == 1) imgString = `<img class="cross" src="cross.png" />`;

      if (symbol == 0) imgString = `<img class="circle" src="circle.png" />`;

      const winnerCell = winnerCells.some((x) => x.id == cell.id);

      return `
         <div class="cell ${winnerCell ? 'winner-cell' : ''} row-${row} col-${column}" id="${id}">
            ${imgString}
         </div>
      `;
   }
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

export function threeInRowListeners() {
   //Elegir turno
   const circleStart = document.querySelector('#circle');
   const crossStart = document.querySelector('#cross');
   const title = document.querySelector('.threeinrow-turns h3');

   circleStart.addEventListener('click', (event) => {
      currentTurn = 0;
      hasGameStarted = true;

      crossStart.classList.add('d-none');
      title.textContent = 'Turno de';

      localStorage.setItem('TIR-gameStarted', hasGameStarted);
      localStorage.setItem('TIR-currentTurn', currentTurn);
   });

   crossStart.addEventListener('click', (event) => {
      currentTurn = 1;
      hasGameStarted = true;

      circleStart.classList.add('d-none');
      title.textContent = 'Turno de';

      localStorage.setItem('TIR-gameStarted', hasGameStarted);
      localStorage.setItem('TIR-currentTurn', currentTurn);
   });

   //Poner una cruz o un círculo.
   const cells = document.querySelectorAll('.game-threeinrow .cell');
   cells.forEach((cell) => {
      cell.addEventListener('click', (event) => {
         const id = event.target.id;
         const currentCell = currentGame.find((c) => c.id == id);

         console.log(typeof hasGameStarted);

         if (!currentCell) {
            return;
         }

         if (hasGameStarted) {
            if (currentTurn == 1) {
               cell.innerHTML = `
                  <img class="cross" src="cross.png" />
                `;
            } else if (currentTurn == 0) {
               cell.innerHTML = `
                <img class="circle" src="circle.png" />
                `;
            }

            const cellId = event.target.id.split('-')[1];

            currentCell.symbol = currentTurn;

            checkWin(currentTurn, cellId);

            currentTurn = currentTurn == 0 ? 1 : 0;
            crossStart.classList.toggle('d-none');
            circleStart.classList.toggle('d-none');

            localStorage.setItem('TIR-currentTurn', currentTurn);
            localStorage.setItem('TIR-currentGame', JSON.stringify(currentGame));
         }
      });
   });
}

//player = true - X, player = false - O
function checkWin(player, cellId) {
   //Chequear ganador.
   const possibleWins = winningMap.filter((x) => x.includes(cellId));

   for (const possibleWin of possibleWins) {
      const matchingCells = possibleWin.split('');

      //No resto 1 al index porque luego lo uso para hacer una query con los IDs
      //de las celdas. El index 0 corresponde a "cell-1", y así sucesivamente.
      const firstIndex = matchingCells[0];
      const secondIndex = matchingCells[1];
      const thirdIndex = matchingCells[2];

      const firstWinningCell = currentGame[firstIndex - 1];
      const secondWinningCell = currentGame[secondIndex - 1];
      const thirdWinningCell = currentGame[thirdIndex - 1];

      //El 1 lo resto manualmente aquí, para luego tener el index limpio en la query.
      const firstCellSymbol = firstWinningCell.symbol;
      const secondCellSymbol = secondWinningCell.symbol;
      const thirdCellSymbol = thirdWinningCell.symbol;

      if (firstCellSymbol == player && firstCellSymbol != -1 && secondCellSymbol == player && thirdCellSymbol == player) {
         const firstCellDiv = document.querySelector(`#cell-${firstIndex}`);
         const secondCellDiv = document.querySelector(`#cell-${secondIndex}`);
         const thirdCellDiv = document.querySelector(`#cell-${thirdIndex}`);

         firstCellDiv.classList.add('winner-cell');
         secondCellDiv.classList.add('winner-cell');
         thirdCellDiv.classList.add('winner-cell');

         winnerCells.push(firstWinningCell);
         winnerCells.push(secondWinningCell);
         winnerCells.push(thirdWinningCell);

         localStorage.setItem('TIR-winnerCells', JSON.stringify(winnerCells));

         finishGame(player);
         return;
      }
   }
}

function finishGame(winner) {
   //Reiniciamos las variables del juego y añadimos el punto
   currentTurn = -1;
   hasGameStarted = false;

   localStorage.setItem('TIR-currentTurn', currentTurn);
   localStorage.setItem('TIR-gameStarted', hasGameStarted);

   //Cambiar aspectos visuales
   if (winner == 1) {
      var score = document.querySelector('.player-2 p');
      crossScore++;
      score.textContent = crossScore;
      localStorage.setItem('TIR-crossScore', crossScore);
   } else {
      var score = document.querySelector('.player-1 p');
      circleScore++;
      score.textContent = circleScore;
      localStorage.setItem('TIR-circleScore', circleScore);
   }

   const turnsDiv = document.querySelector('.threeinrow-turns');

   //Lo hago de esta manera para poder meter el listener en "restart".
   const winnerDiv = document.createElement('div');
   const winnerTitle = document.createElement('h3');
   const winnerImg = document.createElement('img');
   const restartButton = document.createElement('a');

   restartButton.addEventListener('click', (event) => {
      currentGame.splice(0, currentGame.length);

      resetGame();
      const game = document.querySelector('.current-game');
      game.innerHTML = `${threeInRowGame()}`;
      threeInRowListeners();

      localStorage.setItem('TIR-currentGame', JSON.stringify(currentGame));
   });

   winnerTitle.textContent = 'Ha ganado el jugador';
   winnerImg.src = winner == 1 ? 'cross.png' : 'circle.png';
   restartButton.textContent = 'Jugar otra vez';

   winnerImg.classList.add(winner == 1 ? 'cross' : 'circle');
   winnerDiv.classList.add('threeinrow-winner');
   restartButton.classList.add('dir-restart');

   winnerDiv.appendChild(winnerTitle);
   winnerDiv.appendChild(winnerImg);
   winnerDiv.appendChild(restartButton);

   turnsDiv.replaceChildren(winnerDiv);
}

function loadGame() {
   circleScore = localStorage.getItem('TIR-circleScore') || 0;
   crossScore = localStorage.getItem('TIR-crossScore') || 0;

   currentTurn = localStorage.getItem('TIR-currentTurn') || -1;
   hasGameStarted = JSON.parse(localStorage.getItem('TIR-gameStarted')) || false;

   const currentGameData = localStorage.getItem('TIR-currentGame');
   const currentGameParsedData = JSON.parse(currentGameData);

   currentGame = currentGameParsedData ? currentGameParsedData : [];

   const winnerCellsData = localStorage.getItem('TIR-winnerCells');
   const winnerCellParsedData = JSON.parse(winnerCellsData);

   winnerCells = winnerCellParsedData ? winnerCellParsedData : [];

   //cargar aspecto del último panel
   //cargar los listeners
}

function resetGame() {
   currentTurn = -1;
   hasGameStarted = false;
   currentGame = [];
   winnerCells = [];

   localStorage.setItem('TIR-currentTurn', currentTurn);
   localStorage.setItem('TIR-gameStarted', hasGameStarted);
   localStorage.setItem('TIR-currentGame', JSON.stringify(currentGame));
   localStorage.setItem('TIR-winnerCells', JSON.stringify(winnerCells));
}
