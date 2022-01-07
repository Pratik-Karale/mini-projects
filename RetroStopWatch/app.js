//selectors
let playBtn = document.querySelector("#play");
let pauseBtn = document.querySelector("#pause");
let resetBtn = document.querySelector("#reset");
let timeElem = document.querySelector("#time");
let timer;
let centisecondStr = "00";
let secondStr = "00";
let minuteStr = "00";
let hourStr = "00";

function play() {
  timer = setInterval(() => {
    centisecondStr = ("0" + (parseInt(centisecondStr) + 1)).slice(-2);
    if (centisecondStr == 99) {
      secondStr = ("0" + (parseInt(secondStr) + 1)).slice(-2);
      centisecondStr = "00";
    }
    if (secondStr == 60) {
      minuteStr = ("0" + (parseInt(minuteStr) + 1)).slice(-2);
      secondStr = "00";
    }
    if (minuteStr == 60) {
      hourStr = ("0" + (parseInt(hourStr) + 1)).slice(-2);
      minuteStr = "00";
    }
    timeElem.innerText =
      hourStr + ":" + minuteStr + ":" + secondStr + ":" + centisecondStr;
  }, 10);
  playBtn.removeEventListener("click", play);
  pauseBtn.addEventListener("click", pause);
}
function pause() {
  clearInterval(timer);
  playBtn.addEventListener("click", play);
}
function reset() {
  centisecondStr = "00";
  secondStr = "00";
  minuteStr = "00";
  hourStr = "00";
  timeElem.innerText = "00:00:00:00";
}

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
