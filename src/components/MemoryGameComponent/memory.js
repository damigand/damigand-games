import './memory.css';

export function memoryGame(game) {
   return `
        <article class="game-memory spacing">
            <h1>${game}</h1>
            <h2>${game}</h2>
            <h3>${game}</h3>
            <p>${game}</p>
        </article>
      `;
}
