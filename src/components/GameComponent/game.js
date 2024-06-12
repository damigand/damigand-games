import './game.css';
import { rpsGame } from '~c/RPSGameComponent/rps.js';
import { bingoGame } from '~c/BingoComponent/bingo.js';
import { memoryGame } from '~c/MemoryGameComponent/memory.js';
import { threeInRowGame, threeInRowListeners } from '~c/ThreeInRowComponent/threeinrow.js';
import { updateHeader } from '~c/HeaderComponent/header';

export const gameEnum = {
   THREEINROW: 'Three in a row',
   RPS: 'Rock, Paper, Scissors',
   Bingo: 'Bingo Game',
   Memory: 'Memory Cards',
};

var currentGame = gameEnum.THREEINROW;
var previousColors;

export function game(game) {
   const colors = getColorsByGame(game);
   previousColors = colors;
   return `
        <section class="game-section ${colors}">
            <div class="current-game">
               ${playGame(game)}
            </div>
            <div class="change-game">
               <img class="previous-game hidden" src="left-arrow.png" />
               <img class="next-game" src="right-arrow.png" />
            </div>
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
function playGame(game, gameChanged = false) {
   currentGame = game;

   switch (game) {
      case gameEnum.RPS:
         updateHeader(currentGame);
         updateGameColors(currentGame);
         //RPS listeners
         return rpsGame(gameEnum.RPS);

      case gameEnum.Bingo:
         updateHeader(currentGame);
         updateGameColors(currentGame);
         //Bingo listeners
         return bingoGame(gameEnum.Bingo);

      case gameEnum.Memory:
         updateHeader(currentGame);
         updateGameColors(currentGame);
         //Memory listeners
         return memoryGame(gameEnum.Memory);

      case gameEnum.THREEINROW:
         updateHeader(currentGame);
         updateGameColors(currentGame);
         if (gameChanged) threeInRowListeners();
         return threeInRowGame(gameEnum.THREEINROW);
   }
}

function updateGameColors(game) {
   const colorClass = getColorsByGame(game);
   const gameSection = document.querySelector('.game-section');
   if (gameSection) {
      gameSection.classList.remove(previousColors);
      gameSection.classList.add(colorClass);
      previousColors = colorClass;
   }
}

function getColorsByGame(game) {
   switch (game) {
      case gameEnum.RPS:
         return 'rps-color';

      case gameEnum.Bingo:
         return 'bingo-color';

      case gameEnum.Memory:
         return 'memory-color';

      case gameEnum.THREEINROW:
         return 'threeinrow-color';
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
//de juegos de cualquier longitud.

function getCurrentGameIndex() {
   const currentGameIndex = Object.values(gameEnum).indexOf(currentGame);
   return currentGameIndex;
}

function getNextGame() {}
