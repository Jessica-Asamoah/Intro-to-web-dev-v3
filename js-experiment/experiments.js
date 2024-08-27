const timesToRepeat = 10;
const character = '😎';
let answer = '';

for (let i = 0; i < timesToRepeat; i++) {
    answer = answer + character
}

console.log(answer)

// padStart can do the same thing
// console.log("".padStart(timesToRepeat, character))