import '@/style.css';

import { headerSection } from '~c/HeaderComponent/header.js';
import { game } from '~c/GameComponent/game.js';

document.querySelector('#app').innerHTML = `
   ${headerSection()}
   <main>
      ${game()}
   </main>
`;
