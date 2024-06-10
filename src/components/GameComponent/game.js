import './game.css';
import { rpsGame } from '~c/RPSGameComponent/rps.js';
import { bingoGame } from '~c/BingoComponent/bingo.js';
import { memoryGame } from '~c/MemoryGameComponent/memory.js';
import { threeInRowGame } from '~c/ThreeInRowComponent/threeinrow.js';

export const gameEnum = {
   RPS: 'Rock, Paper, Scissors',
   Bingo: 'Bingo',
   Memory: 'Memory Cards',
   THREEINROW: 'Three in a row',
};

var currentGame = gameEnum.RPS;

export function game() {
   return `
        
   `;
}
