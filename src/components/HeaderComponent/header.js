import './header.css';
import { getGame, gameEnum } from '~c/GameComponent/game.js';

var previousColors;

export function headerSection() {
   const game = getGame();
   const colors = getColorsByGame(game);
   previousColors = colors;

   return `
      <header class="game-header ${colors}">
         <h1>${game}</h1>
      </header>
   `;
}

function getColorsByGame(game) {
   switch (game) {
      case gameEnum.RPS:
         return 'rps-header';

      case gameEnum.Bingo:
         return 'bingo-header';

      case gameEnum.Memory:
         return 'memory-header';

      case gameEnum.THREEINROW:
         return 'threeinrow-header';
   }
}

export function updateHeader(game) {
   const colorClass = getColorsByGame(game);
   const header = document.querySelector('header');
   if (header) {
      header.classList.remove(previousColors);
      header.classList.add(colorClass);

      const title = document.querySelector('header h1');
      title.innerHTML = game;
      previousColors = colorClass;
   }
}
