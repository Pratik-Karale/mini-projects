//selectors
let quoteElem = document.querySelector("#quote");
let authorElem = document.querySelector("#author");
let favListCloseBtn = document.querySelector(".close-btn");
let favListOpenBtn = document.querySelector(".favs-list-btn");
let favList = document.querySelector(".fav-quotes-list-container");
let copyBtn = Array.from(document.querySelectorAll(".copy-btn"));
let favBtn = Array.from(document.querySelectorAll(".fav-btn"));

//evt listeners
window.addEventListener("load", () => {
  updateFavList();
  loadBackground("https://source.unsplash.com/1600x900/?nature");
  randomQuote();
});

favListOpenBtn.addEventListener("click", favToggleList);
favListCloseBtn.addEventListener("click", favToggleList);
copyBtn.forEach((btn) => btn.addEventListener("click", copyText));

favBtn.forEach((btn) => btn.addEventListener("click", toggleFavQuote));

//functions
async function loadBackground(link) {
  document.querySelector("body").style.background = `url(${link})`;
}

async function randomQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();

  quoteElem.innerText = data.content;
  authorElem.innerText = data.author;
}

function copyText(evt) {
  let quote = evt.target.parentElement.parentElement.children[0].innerText;
  let author = evt.target.parentElement.parentElement.children[1].innerText;
  navigator.clipboard.writeText(`${quote}~${author}`);
  alert("copied");
}

function favToggleList() {
  let displayFavList = getComputedStyle(favList)["display"];
  if (displayFavList === "flex") favList.style.display = "none";
  else if (displayFavList === "none") favList.style.display = "flex";
}

function toggleFavQuote(evt) {
  let favBtnClicked = evt.target;
  let quote = evt.target.parentElement.parentElement.children[0].innerText;
  let author = evt.target.parentElement.parentElement.children[1].innerText;
  let favQuotesLocal = JSON.parse(localStorage.getItem("favQuotes"));
  // deleting quote from the list
  if (favBtnClicked.classList.contains("favorated"))
    delete favQuotesLocal[quote];
  // adding quote to the list
  else favQuotesLocal[quote] = author;
  favBtnClicked.classList.toggle("favorated");

  localStorage.setItem("favQuotes", JSON.stringify(favQuotesLocal));
  updateFavList();
}

function updateFavList() {
  copyBtn.forEach((btn) => btn.removeEventListener("click", copyText));

  favBtn.forEach((btn) => btn.removeEventListener("click", toggleFavQuote));
  if (localStorage.getItem("favQuotes") === null) {
    localStorage.setItem("favQuotes", "{}");
  }
  favList.innerHTML = "";
  favList.appendChild(favListCloseBtn);
  let favQuotesLocal = JSON.parse(localStorage.getItem("favQuotes"));
  for (let quote in favQuotesLocal) {
    let quoteContainerString = `
    <div class="quote-container">
        <div id="quote">${quote}</div>
        <div id="author">${favQuotesLocal[quote]}</div>
        <div class="extra-btns">
          <button class="copy-btn">
            <i class="fa fa-clipboard" aria-hidden="true"></i>
          </button>
          <button class="fav-btn favorated">
            <i class="fa fa-star" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    `;
    let quoteContainerElem = new DOMParser()
      .parseFromString(quoteContainerString, "text/html")
      .querySelector("div");
    favList.appendChild(quoteContainerElem);
  }
  copyBtn = Array.from(document.querySelectorAll(".copy-btn"));
  favBtn = Array.from(document.querySelectorAll(".fav-btn"));

  copyBtn.forEach((btn) => btn.addEventListener("click", copyText));

  favBtn.forEach((btn) => btn.addEventListener("click", toggleFavQuote));
  if (favList.children.length < 2) {
    let h1 = document.createElement("h1");
    h1.innerText = "Hmmm...looks like You dont have any favorite quotes yet.";
    favList.appendChild(h1);
  }
}
