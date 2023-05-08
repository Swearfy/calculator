const numberButtons = document.getElementById("numbers");
const operants = document.getElementById("operators");
const operantButtons = operants.querySelectorAll("button");
const numbers = numberButtons.querySelectorAll("button");
const equal = document.getElementById("equal");
const display = document.getElementById("display");
const oldDisplay = document.getElementById("oldDisplay");

const clearBtn = document.getElementById("clear");
const del = document.getElementById("del");

function add(x, y) {
  return x + y;
}

function sub(x, y) {
  return x - y;
}

function mul(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

let x;
let y;
let operant;

function operate(x, operator, y) {
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return sub(x, y);
    case "*":
      return mul(x, y);
    case "/":
      return divide(x, y);
  }
}

let completed;
let operantPressed = false;

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    let displayNumber = button.textContent;
    if (displayNumber === "." && display.textContent.includes(".", 0)) {
      return;
    }

    display.textContent += displayNumber;
    x = parseFloat(display.textContent);
  });
});

operantButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let temp = button.textContent;

    if (temp === "=") {
      const result = operate(y, operant, x);
      if (result && x) {
        display.textContent = result;
        oldDisplay.textContent = y + operant + x + "=";
        x = null;
        y = result;
      }
    } else {
      const result = operate(y, operant, x);
      if (result && x) {
        operant = temp;
        oldDisplay.textContent = result + operant;
        y = result;
        x = null;
        display.textContent = "";
      } else {
        if (!y) {
          y = 0;
        }
        if (x) {
          y = x;
          x = null;
        }
        operant = temp;
        oldDisplay.textContent = y + temp;
        display.textContent = "";
      }
    }
  });
});

clearBtn.addEventListener("click", () => clear());

del.addEventListener("click", () => {
  display.textContent = display.textContent.toString().slice(0, -1);
});

function clear() {
  x = null;
  y = null;
  operant = null;
  oldDisplay.textContent = "";
  display.textContent = "";
}
