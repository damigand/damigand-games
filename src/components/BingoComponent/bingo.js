import './bingo.css';

export function bingoGame(game) {
   return `
        <article class="game-bingo spacing">
            <h1>${game}</h1>
            <h2>${game}</h2>
            <h3>${game}</h3>
            <p>${game}</p>
        </article>
      `;
}
