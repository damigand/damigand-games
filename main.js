import '@/style.css';

import { header } from '~c/HeaderComponent/header.js';
import { rpsGame } from '~c/RPSGameComponent/rps.js';
import { bingoGame } from '~c/BingoComponent/bingo.js';
import { memoryGame } from '~c/MemoryGameComponent/memory.js';
import { threeInRowGame } from '~c/ThreeInRowComponent/threeinrow.js';

document.querySelector('#app').innerHTML = `
   ${header}
   <main>
      ${rpsGame}
      ${bingoGame}
      ${memoryGame}
      ${threeInRowGame}
   </main>
`;
