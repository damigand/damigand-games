import './rps.css';

export function rpsGame(game) {
   return `
     <article class="game-rps spacing">
         <h1>${game}</h1>
         <h2>${game}</h2>
         <h3>${game}</h3>
         <p>${game}</p>
     </article>
   `;
}
