const buttons = document.querySelectorAll("button");
const numButtons = document.querySelectorAll(".nums");
const inputDisplay = document.querySelector("input");

let currentInput = "";
let contentStorageOne = "";
let contentStorageTwo = "";
let operatorStorage = "";

// Clears every data stored
const clear = function () {
    currentInput = "";
    contentStorageOne = "";
    contentStorageTwo = "";
    operatorStorage = "";
    inputDisplay.value = "0";
}

// It clears the current input and display without clearing the stored data
const temClear = function () {
    currentInput = "";
    inputDisplay.value = "0";
}

// function that works like a backspace
const back = function () {
    if (currentInput === 1) {
        inputDisplay.value = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
        inputDisplay.value = currentInput; 
    }
}

// Conditional logic for mathematical operations
const operation = function () {
    if (contentStorageOne !== "" && contentStorageTwo !== "" && operatorStorage === "+") {
        const result = parseInt(contentStorageOne) + parseInt(contentStorageTwo);
        inputDisplay.value = result;

        contentStorageOne = result.toString();
        contentStorageTwo = "";
        operatorStorage = "";
        currentInput = "";
    } else if (contentStorageOne !== "" && contentStorageTwo !== "" && operatorStorage === "-") {
        const result = parseInt(contentStorageOne) - parseInt(contentStorageTwo);
        inputDisplay.value = result;

        contentStorageOne = result.toString();
        contentStorageTwo = "";
        operatorStorage = "";
        currentInput = "";
    } else if (contentStorageOne !== "" && contentStorageTwo !== "" && operatorStorage === "×") {
        const result = parseInt(contentStorageOne) * parseInt(contentStorageTwo);
        inputDisplay.value = result;

        contentStorageOne = result.toString();
        contentStorageTwo = "";
        operatorStorage = "";
        currentInput = "";
    } else if (contentStorageOne !== "" && contentStorageTwo !== "" && operatorStorage === "÷") {
        const result = parseInt(contentStorageOne) / parseInt(contentStorageTwo);
        inputDisplay.value = result;

        contentStorageOne = result.toString();
        contentStorageTwo = "";
        operatorStorage = "";
        currentInput = "";
    }
}

buttons.forEach(button => {
    button.addEventListener("click", function () {
        const buttonText = button.textContent;
        
        if(!isNaN(buttonText)) {
            currentInput = currentInput + buttonText;
            inputDisplay.value = currentInput;

            if (operatorStorage === "") {
                contentStorageOne = currentInput;
            } else {
                contentStorageTwo = currentInput;
            }
            console.log(`${contentStorageOne}, ${contentStorageTwo}`)
        } else if (buttonText === "+") {
            operatorStorage = buttonText;
            temClear();
        } else if (buttonText === "-") {
            operatorStorage = buttonText;
            temClear();
        } else if (buttonText === "×") {
            operatorStorage = buttonText;
            temClear();
        } else if (buttonText === "÷") {
            operatorStorage = buttonText;
            temClear();
        } else if (buttonText === "=") {
            operation();
        } else if (buttonText === "←") {
            back();
        } else if (buttonText === "C") {
            clear();
        }
    })
})