// getting all elements of the game
let boxList = [...document.querySelectorAll(".box")];
let board = document.querySelector(".game-board");
let startPopup = document.getElementsByClassName("popup")[0];
let resultPopup = document.getElementsByClassName("popup")[1];
// let resultPopup = document.querySelector(".popup");
let onlyUserModeBtn = document.getElementById("userVsUser");
let compModeBtn = document.getElementById("userVsComp");
let handleEvent;

// making logical variables and,
// winning possibility multi - dimensional array
let WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleClass = "o";
let crossClass = "x";
let currentCross = true;
let currentClass = currentCross ? crossClass : circleClass;

function start() {
  let mode;
  onlyUserModeBtn.addEventListener(
    "click",
    () => {
      mode = "onlyUser";
      startPopup.classList.add("remove-start-popup");
      setBoard();
      addBoxClickEvts(mode);
    },
    { once: true }
  );
  compModeBtn.addEventListener(
    "click",
    () => {
      mode = "compMode";
      startPopup.classList.add("remove-start-popup");
      setBoard();
      addBoxClickEvts(mode);
    },
    { once: true }
  );
}

function addBoxClickEvts(nowMode) {
  console.log(nowMode);
  if (nowMode === "onlyUser") {
    handleEvent = handleEventOnlyUsers;
  } else {
    handleEvent = handleEvtComp;
  }
  boxList.forEach((box) => {
    box.addEventListener("click", handleEvent, { once: true });
  });
}
function handleEventOnlyUsers(clickedBoxEvt) {
  clickedBox = clickedBoxEvt.target;
  clickedBox.classList.add(currentClass);
  result();
  swapTurns();
}

function handleEvtComp(clickedBoxEvt) {
  clickedBox = clickedBoxEvt.target;
  if (clickedBox.classList.length === 1) {
    clickedBox.classList.add(currentClass);
    result();
    swapTurns();
    makeRandomMove();
    result();
    swapTurns();
  }
}

function swapTurns() {
  board.classList.toggle(`${currentClass}-board`);
  currentClass = currentCross ? circleClass : crossClass;
  currentCross = !currentCross;
  board.classList.toggle(`${currentClass}-board`);
}

function makeRandomMove() {
  let unusedBoxes = boxList.filter((box) => ![...box.classList][1]);
  let randBox = unusedBoxes[Math.floor(Math.random() * unusedBoxes.length)];
  try {
    randBox.classList.add(currentClass);
  } catch {}
}

function setBoard() {
  if (currentCross) {
    board.classList.add("x-board");
  } else {
    board.classList.add("o-board");
  }
}

function checkWin() {
  return WIN_COMBOS.some((combo) => {
    return combo.every((index) => {
      return [...boxList[index].classList].includes(currentClass);
    });
  });
}

function result() {
  let filledBoxes =
    document.querySelectorAll(".x").length +
    document.querySelectorAll(".o").length;
  if (checkWin()) {
    makeWinnerResult();
    start();
  } else if (filledBoxes === 9) {
    makeTieResult();
    start();
  }
}

function makeWinnerResult() {
  console.log(resultPopup);
  resultPopup.classList.add(`user-win-${currentClass}`);
  addResultEvt();
}
function makeTieResult() {
  resultPopup.classList.add("user-tie");
  addResultEvt();
}

function addResultEvt() {
  resultPopup.addEventListener(
    "click",
    () => {
      resetGame();
    },
    { once: true }
  );
}

function resetGame() {
  //if we dont want to reset the settings by reloading use the code below
  // startPopup.classList.remove("remove-start-popup");
  // board.classList.remove([...board.classList][1]);
  // board.classList.add("x-board");
  // circleClass = "o";
  // crossClass = "x";
  // currentCross = true;
  // currentClass = currentCross ? crossClass : circleClass;
  // boxList.forEach((box) => {
  //   box.removeEventListener(handleEvent, { once: true });
  //   box.classList.remove([...box.classList][1]);
  // });
  // resultPopup.classList.remove([...resultPopup.classList][1]);
  location.reload();
}

start();
