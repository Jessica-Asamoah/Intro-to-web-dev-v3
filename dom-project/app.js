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

const temClear = function () {
    currentInput = "";
    inputDisplay.value = "0";
}

const back = function () {
    inputDisplay.value.substring(0, inputDisplay.value.length()-1)
}

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