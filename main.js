import '@/style.css';

import { headerSection } from '~c/HeaderComponent/header.js';
import { game, gameEnum, changeGameButtons } from '~c/GameComponent/game.js';
import { threeInRowListeners } from '~c/ThreeInRowComponent/threeinrow.js';

var currentGame = gameEnum.THREEINROW;

document.querySelector('#app').innerHTML = `
   ${headerSection()}
   <main>
      ${game(currentGame)}
   </main>
`;

changeGameButtons();
threeInRowListeners();
