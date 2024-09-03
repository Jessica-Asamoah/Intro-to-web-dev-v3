const inputDivs = document.querySelectorAll(".input-div")
const oneDiv = document.querySelector(".input-div")
const loadingDiv = document.querySelector(".info-bar")
const ANSWER_LENGTH = 5;
const WORD_URL = "https://words.dev-apis.com/word-of-the-day"
const VALID_WORD_URL = "https://words.dev-apis.com/validate-word"

const divsPerRow = 5;
const totalRows = 6;

let done = false;
let isLoading = true;

// allows only alphabets as input
function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

// to get the string from the divs
function getInputFromRow(rowIndex) {
    const start = rowIndex * divsPerRow;
    const end = start + divsPerRow;
    let result = '';

    for (let i = start; i < end; i++) {
        result += inputDivs[i].textContent;
    }

    return result;
}

// every logic that needs to be done on the string enetered by the user
function handleRetrievedString(str, rowIndex) {
    async function findWord() {    
        const isLastRow = rowIndex === totalRows - 1;

        const validation = { // object be sent to POST
            "word": str
        };
        isLoading = true;
        setLoading(true);
        const response = await fetch(VALID_WORD_URL, { // POST request for word validation
            method: "POST",
            body: JSON.stringify(validation)
        });
        const inputDivsArray = Array.from(inputDivs);  // changes this from nodelist to an array so I can use the slice function
        const start = rowIndex * divsPerRow;
        const end = start + divsPerRow;
        const rowDivs = inputDivsArray.slice(start, end);
        // fetching the word of the day
        const promise = await fetch(WORD_URL);
        const processedResponse = await promise.json();
        isLoading = false;
        setLoading(false);
        const word2 = processedResponse.word;
        const map = makeMap(word2);
       
        const validRespose = await response.json()
        if (validRespose.validWord === true) { // to take these actions if the word is valid
            for (let i = 0; i < str.length; i++) {  //  logic for correct characters in right position
                const letter1 = str[i];
                const divIndex = rowIndex * divsPerRow + i;
                const oneDiv = inputDivs[divIndex];
                if (letter1 === word2[i]) {
                    oneDiv.classList.add('correct-position')
                    map[letter1]--; // to handle repeating characters
                }
            } 
            for (let i = 0; i < str.length; i++) {  // logic for correct characters but wrong positions
                const letter1 = str[i];
                const divIndex = rowIndex * divsPerRow + i;
                const oneDiv = inputDivs[divIndex];
                if (letter1 === word2[i]) {
                    // do nothing
                } else if (word2.includes(letter1) && map[letter1] > 0) {
                    oneDiv.classList.add('wrong-position') 
                    map[letter1]--;
                } else {
                    oneDiv.classList.add('neutral')
                }
            }
        } else {  // handle invalid word
            rowDivs.forEach(inputDiv => inputDiv.classList.add('invalid-word'));
            rowDivs.forEach(inputDiv => {
                inputDiv.addEventListener("animationend", () => {
                    inputDiv.classList.remove('invalid-word');
                }, { once: true });
            });
        }
        // logic to handle win or lose
        if (processedResponse.word === str) {
            alert(`You Win! The word of the day is: ${str}`)
            document.querySelector('.game').classList.add("winner")
            done = true;
        } else if (isLastRow === true) {
            alert(`You lose! The word of the day is ${processedResponse.word}`)
            done = true;
        }
    }
    findWord()
}

inputDivs.forEach((inputDiv, index) => {
    inputDiv.addEventListener('keydown', function (event) {
        event.preventDefault();
        const isLastDivInRow = (index + 1) % divsPerRow === 0;

        if (done) {
            // do nothing
            return;
        }

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
            const rowInput = getInputFromRow(currentRow);
            const nextDivIndex = (currentRow + 1) * divsPerRow;
            if (rowInput.length !== ANSWER_LENGTH) {
                // Do nothing
                return;
            } else if (nextDivIndex < inputDivs.length) {
                inputDivs[nextDivIndex].focus();
            }
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
// for spinner
function setLoading(isLoading) {
    loadingDiv.classList.toggle('show', isLoading);
}
// to handle repetition of characters
function makeMap (array) {
    const obj = {};
    for (i = 0; i < array.length; i++) {
        const letter = array[i]
        if (obj[letter]) {
            obj[letter]++;
        } else {
            obj[letter] = 1;
        }
    }
    return obj;
}