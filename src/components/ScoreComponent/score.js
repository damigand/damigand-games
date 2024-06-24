import './score.css';
import { gameEnum } from '~c/GameComponent/game.js';

export var circleScore = 0;
export var crossScore = 0;

export var rpsPlayerScore = 0;
export var rpsIAScore = 0;

export function drawScore(cssClass, html) {
    return `
      <div class="${cssClass}-score">
         ${html}
      </div>
   `;
}

export function updateScore(game, player) {
    switch (game) {
        case gameEnum.THREEINROW:
            if (player) {
                crossScore++;
                localStorage.setItem('TIR-crossScore', crossScore);
                return crossScore;
            } else {
                circleScore++;
                localStorage.setItem('TIR-circleScore', circleScore);
                return circleScore;
            }
        case gameEnum.RPS:
            if (player) {
                rpsPlayerScore++;
                localStorage.setItem('RPS-playerScore', rpsPlayerScore);
                return rpsPlayerScore;
            } else {
                rpsIAScore++;
                localStorage.setItem('RPS-IAScore', rpsIAScore);
                return rpsIAScore;
            }
        case gameEnum.Memory:
            break;
    }
}

export async function loadScore(game) {
    switch (game) {
        case gameEnum.THREEINROW:
            circleScore = localStorage.getItem('TIR-circleScore') || 0;
            crossScore = localStorage.getItem('TIR-crossScore') || 0;
            return;
        case gameEnum.RPS:
            rpsPlayerScore = localStorage.getItem('RPS-playerScore');
            rpsIAScore = localStorage.getItem('RPS-IAScore');
            return;
        case gameEnum.Memory:
            break;
    }
}
