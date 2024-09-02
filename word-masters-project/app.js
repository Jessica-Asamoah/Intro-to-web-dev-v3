const inputDivs = document.querySelectorAll(".input-div")
const oneDiv = document.querySelector(".input-div")
const WORD_URL = "https://words.dev-apis.com/word-of-the-day"
const VALID_WORD_URL = "https://words.dev-apis.com/validate-word"

const divsPerRow = 5;
const totalRows = 6;

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function getInputFromRow(rowIndex) {
    const start = rowIndex * divsPerRow;
    const end = start + divsPerRow;
    let result = '';

    for (let i = start; i < end; i++) {
        result += inputDivs[i].textContent;
    }

    return result;
}

function handleRetrievedString(str, rowIndex) {
    async function findWord() {
        const isLastRow = rowIndex === totalRows - 1;
        const promise = await fetch(WORD_URL);
        const processedResponse = await promise.json();

        const validation = {
            "word": str
        };
        const inputDivsArray = Array.from(inputDivs);
        const start = rowIndex * divsPerRow;
        const end = start + divsPerRow;
        const rowDivs = inputDivsArray.slice(start, end);
    
        const response = await fetch(VALID_WORD_URL, {
            method: "POST",
            body: JSON.stringify(validation)
        });
        const validRespose = await response.json()
        if (validRespose.validWord === true) {
            console.log("Valid word let's move on")
            for (let i = 0; i < str.length; i++) {
                const letter1 = str[i];
                const word2 = processedResponse.word;
                const divIndex = rowIndex * divsPerRow + i;
                const oneDiv = inputDivs[divIndex];
        
                oneDiv.classList.remove('correct-position', 'wrong-position', 'neutral');
        
                if (word2.includes(letter1)) {
                    if (letter1 === word2[i]) {
                        console.log("right letter, right position")
                        oneDiv.classList.add("correct-position")
                    } else {
                        console.log("right letter, wrong position")
                        oneDiv.classList.add("wrong-position")
                    }
                } else {
                    console.log("even worse")
                    oneDiv.classList.add("neutral")
                }
            } 
        } else {
            console.log ("Not a five letter word")
            rowDivs.forEach(inputDiv => inputDiv.classList.add('invalid-word'));
            rowDivs.forEach(inputDiv => {
                inputDiv.addEventListener("animationend", () => {
                    inputDiv.classList.remove('invalid-word');
                }, { once: true });
            });
        }
        
        if (processedResponse.word === str) {
            alert(`You Win! The word of the day is: ${str}`)
        } else if (isLastRow === true) {
            alert(`You lose! The word of the day is ${processedResponse.word}`)
        }
    }
    findWord()
}

inputDivs.forEach((inputDiv, index) => {
    inputDiv.addEventListener('keydown', function (event) {
        event.preventDefault();
        const isLastDivInRow = (index + 1) % divsPerRow === 0;

        if(!isLetter(event.key)) {
            event.preventDefault();
        } else if (isLetter) {
            if (index < inputDivs.length - 1 && !isLastDivInRow) {
                inputDivs[index].textContent = event.key;
                inputDivs[index + 1].focus();
            } else if (isLastDivInRow) {
                inputDiv.textContent = event.key;
            }
        }

        if (event.key === 'Enter' && isLastDivInRow) {
            const currentRow = Math.floor(index / divsPerRow);
            const nextDivIndex = (currentRow + 1) * divsPerRow;
            if (nextDivIndex < inputDivs.length) {
                inputDivs[nextDivIndex].focus();
            }
            const rowInput = getInputFromRow(currentRow);
            handleRetrievedString(rowInput, currentRow);
            

        } else if (event.key === 'Backspace') {
            const prevDivIndex = index - 1;
            if (index <= inputDivs.length - 1) {
                inputDivs[index].textContent = "";
                inputDivs[prevDivIndex].focus();
            }
        }

    })
})

