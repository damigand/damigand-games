import './header.css';
import { getGame } from '~c/GameComponent/game.js';

export function headerSection() {
   return `
      <header class="game-header">
         <h1>${getGame()}</h1>
      </header>
   `;
}
