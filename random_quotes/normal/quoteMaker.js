let quoteElem = document.querySelector("#quote");
let authorElem = document.querySelector("#author");

async function loadBackground(link) {
  document.querySelector("body").background = link;
}

async function randomQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  quoteElem.innerText = data.content;
  authorElem.innerText = data.author;
}

setTimeout(() => {
  loadBackground("https://source.unsplash.com/1600x900/?nature");
}, 1000);
randomQuote();
