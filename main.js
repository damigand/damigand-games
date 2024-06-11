import '@/style.css';

import { headerSection } from '~c/HeaderComponent/header.js';
import { game, gameEnum, changeGameButtons } from '~c/GameComponent/game.js';

var currentGame = gameEnum.RPS;

document.querySelector('#app').innerHTML = `
   ${headerSection()}
   <main>
      ${game(currentGame)}
   </main>
`;

changeGameButtons();
