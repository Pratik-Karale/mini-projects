// getting all card divs
let cards = Array.from(document.getElementsByClassName("card"));
let counter = document.querySelector("#counter>span");
let winnerOverlay = document.querySelector("#winner-overlay");
let loserOverlay = document.querySelector("#loser-overlay");

//chosen Emoji array
let emoArr = [
  "🎅",
  "👮‍",
  "🚴‍",
  "👍",
  "👎",
  "🎭",
  "🎁",
  "👑",
  "⚽",
  "🏐",
  "🏆",
  "🎮",
  "♠",
  "📸",
  "📺",
  "⏰",
  "💣",
  "📽",
  "🍕",
  "🍔",
  "🥐",
  "🍩",
  "🧁",
  "🍎",
  "🍓",
  "🍀",
  "🚀",
  "⛄",
  "🌏",
  "💮",
  "☢",
  "💥",
];

//play sounds like bg music and on card flips
function playSound(musicType) {}

// user matched double cards in the entire game go here
let userMatchedCards = [];

//temporary max 2 card inputs go here
let clickedIndexes = [];

//makes random array with 16 but double emojis
function ShuffleArr(array) {
  // randomizing array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  // choosing first 8 random emojis and making its double
  array = array.slice(0, 8);
  array = array.concat(array);

  //randomizing the double but duplicate array
  for (let k = array.length - 1; k > 0; k--) {
    const l = Math.floor(Math.random() * (k + 1));
    [array[k], array[l]] = [array[l], array[k]];
  }
  return array;
}

// adds 2 emojis of same type each but randomly in the html
function addEmos(shuffledArr) {
  shuffledArr.forEach((emoji, count) => {
    document.querySelectorAll(".card>.back")[count].innerText = emoji;
  });
}

function clickAndMatchCards(count) {
  // first click or second click kept in memory and likewise [firstInp,2ndInp]
  clickedIndexes.push(count);

  // checks whether userclicked cards are not double clicked and are different
  // and of course more then 1 card is clicked for matching 2 cards
  if (clickedIndexes.length !== 1 && clickedIndexes[0] !== clickedIndexes[1]) {
    let card1 = cards[clickedIndexes[0]];
    let card2 = cards[clickedIndexes[1]];

    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
    }, 600);

    if (card1.innerText === card2.innerText) {
      userMatchedCards.push(clickedIndexes[0]);
      userMatchedCards.push(clickedIndexes[1]);
      card1.classList.add("found");
      card2.classList.add("found");
      setTimeout(() => {
        card1.style.zIndex = -1;
        card2.style.zIndex = -1;
      }, 500);
    }

    clickedIndexes = [];
  }
}

//adding click events
function addClickEvents() {
  cards.forEach((card, count) => {
    card.addEventListener("click", () => {
      card.classList.add("visible");
      clickAndMatchCards(count);
    });
  });
}

function countDown() {
  setInterval(() => {
    counter.innerText = +counter.innerText - 1;
    resultMaker();
  }, 1000);
}

// restart and resets all game values
function resetGameInfo() {
  cards.forEach((card) => {
    card.classList.remove("found");
    card.classList.remove("visible");
    card.style.zIndex = 0;
  });
  // addClickEvents();
  counter.innerText = 25;
  userMatchedCards = [];
  clickedIndexes = [];
  winnerOverlay.classList.remove("show-overlay");
  winnerOverlay.classList.add("hidden-overlay");
  loserOverlay.classList.remove("show-overlay");
  loserOverlay.classList.add("hidden-overlay");
  gameBoardReady();
}

//shows winner screen and asks for a restart
function userWon() {
  winnerOverlay.classList.add("show-overlay");
  winnerOverlay.classList.remove("hidden-overlay");
  winnerOverlay.addEventListener(
    "click",
    () => {
      resetGameInfo();
    },
    {
      once: true,
    }
  );
}

//shows loser screen and asks for a restart
function userLost() {
  loserOverlay.classList.add("show-overlay");
  loserOverlay.classList.remove("hidden-overlay");
  loserOverlay.addEventListener(
    "click",
    () => {
      resetGameInfo();
    },
    {
      once: true,
    }
  );
}

// makes result of losing or winning and continuosly changes the timer
function resultMaker() {
  if (userMatchedCards.length === 16) userWon();
  else if (counter.innerText == 0) userLost();
}

function gameBoardReady() {
  let shuffledArr = ShuffleArr(emoArr);
  addEmos(shuffledArr);
}

addClickEvents(); //also calls matching and clicking function
countDown();
gameBoardReady();
