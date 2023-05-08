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

const numberButtons = document.getElementById("numbers");
const operants = document.getElementById("operators");
const operantButtons = operants.querySelectorAll("button");
const numbers = numberButtons.querySelectorAll("button");
const equal = document.getElementById("equal");
const display = document.getElementById("display");
const oldDisplay = document.getElementById("oldDisplay");

const clearBtn = document.getElementById("clear");

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (completed) {
      display.textContent = "";
      oldDisplay.textContent = "";
      completed = false;
    }

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
    let tempOperant = button.textContent;

    if (tempOperant === "=") {
      const result = operate(y, operant, x); // Convert the value to a number

      if (result) {
        const fullEquation = y + operant + x;
        oldDisplay.textContent = fullEquation;

        document.getElementById("display").textContent = result;
        completed = true;
      }
    } else {
      operant = tempOperant;
      if (operantPressed === true) {
        y = operate(y, operant, x);
        oldDisplay.textContent = y + operant;
        display.textContent = "";
        operantPressed = false;
      } else {
        const fullEquation = display.textContent + operant;
        oldDisplay.textContent = fullEquation;
        display.textContent = "";
        y = x;
        operantPressed = true;
      }
    }
  });
});

clearBtn.addEventListener("click", () => {
  x = null;
  y = null;
  operant = null;
  oldDisplay.textContent = "";
  display.textContent = "";
  operantPressed = false;
});
