import './threeinrow.css';

export function threeInRowGame(game) {
   return `
        <article class="game-threeinrow spacing">
            <h1>${game}</h1>
            <h2>${game}</h2>
            <h3>${game}</h3>
            <p>${game}</p>
        </article>
      `;
}
