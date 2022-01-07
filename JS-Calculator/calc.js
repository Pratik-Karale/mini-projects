function calculator(operator, n1, n2) {
  switch (operator) {
    case "+":
      return n1 + n2;
      break;
    case "*":
      return n1 * n2;
      break;
    case "-":
      return n1 - n2;
      break;
    case "÷":
      return n1 / n2;
      break;
    default:
      break;
  }
}

// function makeNumFormat(numStr) {
//   if (numStr.length < 4) return numStr;
//   let numStrArray = numStr.split("");
//   let newSet = new Set();
//   for (let i = numStrArray.length - 1; i >= 0; i--) {
//     console.log(i);
//     if ((i + 1) % 3 === 0 && i>) {
//       newSet.add(numStr.slice(i, i + 3));
//       console.log([numStr.slice(i), i, numStr[i], numStr]);
//       console.log(newSet);
//     }
//   }

//   return newSet;
// }

let num1;
let num2;
let operator;

let numberBtns = [...document.querySelectorAll(".number-btn")];
let operatorBtns = [...document.querySelectorAll(".operator")];
let delOptBtns = [...document.querySelectorAll(".delete-opts>button")];
let outputPrev = document.querySelector(".sub-output:nth-child(1)");
let outputCurrent = document.querySelector(".sub-output:nth-child(2)");
let answerBtn = document.querySelector(".equal-to-btn");

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let num = btn.innerText;
    if (num === "." && outputCurrent.innerText.includes(num)) return;
    outputCurrent.innerText += num;
  });
});

operatorBtns.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (isNaN(+outputPrev.innerText)) {
      answerBtn.click();
    }
    outputPrev.innerText = outputCurrent.innerText + " " + operator.innerText;
    outputCurrent.innerText = "";
  });
});

answerBtn.addEventListener("click", () => {
  num1 = +outputPrev.innerText.slice(0, outputPrev.innerText.length - 1);
  num2 = +outputCurrent.innerText;
  console.log([num1, num2]);
  operator = outputPrev.innerText[outputPrev.innerText.length - 1];
  result = calculator(operator, num1, num2);
  outputCurrent.innerText = result;
  outputPrev.innerText = "";
});

delOptBtns[0].addEventListener("click", () => {
  outputPrev.innerText = "";
  outputCurrent.innerText = "";
});

delOptBtns[1].addEventListener("click", () => {
  outputCurrent.innerText = outputCurrent.innerText.slice(0, this.length - 1);
  if (outputCurrent.innerText === "") {
    outputPrev.innerText = outputPrev.innerText.slice(0, this.length - 1);
  }
});
