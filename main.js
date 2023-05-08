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

let completed = false;
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
      const result = Math.round(operate(y, operant, x) * 100) / 100;

      if (checkVar(result) && checkVar(x)) {
        if (x === 0 && operant === "/") {
          clear();
          display.textContent = "Cant";
        } else {
          oldDisplay.textContent = y + operant + x + "=";
          y = result;
          x = null;
          display.textContent = result;
          completed = true;
        }
      }
    } else {
      const result = Math.round(operate(y, operant, x) * 100) / 100;
      if (completed) {
        oldDisplay.textContent = y + operant;
        display.textContent = "";
        x = null;
        completed = false;
      }
      if (checkVar(result) && checkVar(x)) {
        if (x === 0 && operant === "/") {
          clear();
          display.textContent = "FUck you";
        } else {
          operant = temp;
          oldDisplay.textContent = result + operant;
          y = result;
          x = null;
          display.textContent = "";
        }
      } else {
        if (!y) {
          y = 0;
        }
        if (checkVar(x)) {
          y = x;
          x = null;
          operant = temp;
          oldDisplay.textContent = y + temp;
          display.textContent = "";
        }
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

function checkVar(x) {
  if (x === null || x === undefined || isNaN(x)) {
    return false;
  } else {
    return true;
  }
}
