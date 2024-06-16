import '@/style.css';

import { headerSection } from '~c/HeaderComponent/header.js';
import { game, gameEnum, currentGame, changeGameButtons } from '~c/GameComponent/game.js';
import { threeInRowListeners } from '~c/ThreeInRowComponent/threeinrow.js';
import { rpsListeners } from '~c/RPSGameComponent/rps.js';

document.querySelector('#app').innerHTML = `
   ${headerSection()}
   <main>
      ${game()}
   </main>
`;

changeGameButtons();

switch (currentGame) {
    case gameEnum.THREEINROW:
        threeInRowListeners();
    case gameEnum.RPS:
        rpsListeners();
        break;
    case gameEnum.Bingo:
        break;
    case gameEnum.Memory:
        break;
}
