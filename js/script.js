// @ts-nocheck
const simonBtn = document.getElementById("simonBtn");
const output = document.querySelector(".content");
const underOutput = document.querySelector(".underContent");

const limit = 5;
const min = 1;
const max = 99;

simonBtn.addEventListener("click", play);

function play() {
    let outputStr = "";
    let counter = 0;
    const simonArray = getRandomArray(limit, min, max);
    console.log(simonArray);
    let playerArray = [];
    for (let i = 0; i < simonArray.length; i++) {
        outputStr += `[${simonArray[i]}]`;
        if (i + 1 < simonArray.length) outputStr += " - ";
    }
    output.innerHTML = outputStr;
    // @ts-ignore
    countdown(underOutput, limit);
    setTimeout(function () {
        output.innerHTML = "";
        underOutput.innerHTML = "";
        playerArray = arrayInput(limit);
        for (let i = 0; i < playerArray.length; i++) {
            const arrayCell = document.createElement("span");
            let arrayCellClass;
            if (simonArray.includes(playerArray[i])) {
                arrayCellClass = "correct";
                counter++;
            }
            else {
                arrayCellClass = "wrong";
            }
            arrayCell.className = arrayCellClass;
            arrayCell.innerHTML = `[${playerArray[i]}]`;
            output.append(arrayCell);
            if (i + 1 < playerArray.length) output.innerHTML += " - ";
        }
        underOutput.innerHTML = `Punteggio: ${counter}/${limit}`
    }, limit * 1000);
}

/**
 * Stampa dentro il target il countdown.
 * @param {HTMLDivElement} target 
 * @param {Number} duration 
 */
function countdown(target, duration) {
    let count = duration;
    const clock = setInterval(function () {
        target.innerHTML = `Game starts in ${count--}...`;
        if (count < 1) clearInterval(clock);
    }, 1000);
    target.innerHTML = `Game starts in ${count--}...`;
}

function arrayInput(size) {
    const array = [];
    let number;
    for (let i = 0; i < size; i++) {
        do {
            number = parseInt(prompt(`Inserisci il ${i + 1}° numero:`));
            if (isNaN(number)) alert("Devi inserire un numero valido!");
        }
        while (isNaN(number));
        array.push(number);
    }
    return array;
}

/**
 * Restituisce un array contenente valori random compresi tra min e max.
 * @param {Number} length 
 * @param {Number} min 
 * @param {Number} max 
 */
function getRandomArray(size, min, max) {
    const randomArray = [];
    while (randomArray.length < size) {
        const randomNum = getRandomNumber(min, max);
        if (!randomArray.includes(randomNum)) {
            randomArray.push(randomNum);
        }
    }
    return randomArray;
}

/**
 * Restituisce un numero random compreso tra min e max.
 * @param {Number} min 
 * @param {Number} max 
 * @returns 
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}