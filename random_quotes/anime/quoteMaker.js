let quoteElem = document.querySelector("#quote");
let authorElem = document.querySelector("#author");

async function randomQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  quoteElem.innerText = data.content;
  authorElem.innerText = data.author;
}
function randomAnimeQuote() {
  fetch("https://animechan.vercel.app/api/random")
    .then((response) => response.json())
    .then((obj) => {
      quoteElem.innerText = obj.quote;
      authorElem.innerText = `~${obj.character} (${obj.anime})`;
    });
}
randomAnimeQuote();
