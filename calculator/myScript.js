var currentValue = "0";
var inputValue;
var currentOperator;

function updateDisplay(value) {
  document.getElementById("display").innerHTML = value;
}

function allClear() {
  console.log("all clear:" + currentValue);
  currentValue = "0";
  inputValue = null;
  currentOperator = null;
  updateDisplay(currentValue);
}
function input(num) {
  console.log("input:" + num);

  if (currentValue === "0") {
    if (num === ".") {
      currentValue = "0.";
    } else {
      currentValue = "" + num;
    }
    updateDisplay(currentValue);
  } else {
    if (currentOperator) {
      if (inputValue) {
        //check if a decimal has already been input for this value
        if (inputValue.includes(".") && num === ".") return;
        inputValue = inputValue + num;
      } else {
        inputValue = "" + num;
      }
      updateDisplay(inputValue);
    } else {
      //check if a decimal has already been input for this value
      if (currentValue.includes(".") && num === ".") return;
      currentValue = currentValue + num;
      updateDisplay(currentValue);
    }
  }
}
function operator(symbol) {
  console.log("operator:" + symbol);
  var curValue = currentValue || "";
  var curInput = inputValue || "";

  curValue =
    curValue.indexOf(".") > -1 ? parseFloat(curValue) : parseInt(curValue);
  curInput =
    curInput.indexOf(".") > -1 ? parseFloat(curInput) : parseInt(curInput);

  console.log(currentOperator);

  if (currentOperator) {
    //if there is already an operator in play, update the current value and display
    if (currentOperator === "-") {
      currentValue = "" + Math.round((curValue - curInput) * 1e12) / 1e12;
    }
    if (currentOperator === "+") {
      currentValue = "" + Math.round((curValue + curInput) * 1e12) / 1e12;
    }
    if (currentOperator === "÷") {
      currentValue = "" + curValue / curInput;
    }
    if (currentOperator === "x") {
      currentValue = "" + curValue * curInput;
    }
    //reset current operator if it is equals
    if (symbol === "=") currentOperator = null;
    
    inputValue = null;
    console.log(currentValue);
    updateDisplay(currentValue);
  } else {
    currentOperator = symbol;
  }
}
function posNeg() {
  console.log("posNeg:" + currentValue);
  var value = parseInt(currentValue);
  currentValue = "" + value * -1;
  updateDisplay(currentValue);
}
function percent() {
  console.log("percent:" + currentValue);
  currentValue = "" + parseInt(currentValue) / 100;
  updateDisplay(currentValue);
}

Number.prototype.countDecimals = function () {
  if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0; 
}
