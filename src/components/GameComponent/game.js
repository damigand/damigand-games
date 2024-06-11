import './game.css';
import { rpsGame } from '~c/RPSGameComponent/rps.js';
import { bingoGame } from '~c/BingoComponent/bingo.js';
import { memoryGame } from '~c/MemoryGameComponent/memory.js';
import { threeInRowGame } from '~c/ThreeInRowComponent/threeinrow.js';

export const gameEnum = {
   RPS: 'Rock, Paper, Scissors',
   Bingo: 'Bingo Game',
   Memory: 'Memory Cards',
   THREEINROW: 'Three in a row',
};

var currentGame = gameEnum.RPS;

export function game(game) {
   return `
        <section class="game-section">
            <img class="previous-game hidden" src="left-arrow.png" />
            <div class="current-game">
               ${playGame(game)}
            </div>
            <img class="next-game" src="right-arrow.png" />
        </section>
   `;
}

//Función para cambiar de juego. Parámetro boolean "direction"
//para saber si va a la derecha (true) o izquierda (false);
function changeGame(direction) {
   const currentGameIndex = getCurrentGameIndex();
   var nextGameIndex;
   if (direction) {
      nextGameIndex = currentGameIndex + 1;
   } else {
      nextGameIndex = currentGameIndex - 1;
   }

   if (nextGameIndex < Object.keys(gameEnum).length && nextGameIndex >= 0) {
      currentGame = getGameByIndex(nextGameIndex);

      document.querySelector('.current-game').innerHTML = playGame(currentGame);

      return nextGameIndex;
   }
}

//función que añade los "listeners" necesarios de los botones para cambiar de juego,
//así como esconder los botones cuando se llega a uno de los dos extremos.
export function changeGameButtons() {
   const previousGame = document.querySelector('.previous-game');
   const nextGame = document.querySelector('.next-game');
   const length = Object.keys(gameEnum).length - 1;

   var result;

   previousGame.addEventListener('click', (event) => {
      result = changeGame(false);

      if (result < length) {
         nextGame.classList.remove('hidden');
      }

      if (result == 0) {
         previousGame.classList.add('hidden');
      }
   });

   nextGame.addEventListener('click', (event) => {
      result = changeGame(true);

      if (result > 0) {
         previousGame.classList.remove('hidden');
      }
      if (result == length) {
         nextGame.classList.add('hidden');
      }
   });
}

//Funcion que devuelve el "article" correspondiente del juego mediante parámetro
function playGame(game) {
   currentGame = game;

   switch (game) {
      case gameEnum.RPS:
         return rpsGame(gameEnum.RPS);

      case gameEnum.Bingo:
         return bingoGame(gameEnum.Bingo);

      case gameEnum.Memory:
         return memoryGame(gameEnum.Memory);

      case gameEnum.THREEINROW:
         return threeInRowGame(gameEnum.THREEINROW);
   }
}

//Funcion que obtiene el nombre del juego, esencialmente para el "header".
export function getGame() {
   return currentGame;
}

//Función para obtener un valor del enumerado mediante un index.
function getGameByIndex(index) {
   return Object.values(gameEnum)[index];
}

//Función para obtener el index del juego actual.
//Usado para calcular el index del siguiente juego.
//Esta estructura de métodos permite navegar por un enumerado
//de juegos con cualquier longitud.

function getCurrentGameIndex() {
   const currentGameIndex = Object.values(gameEnum).indexOf(currentGame);
   return currentGameIndex;
}
