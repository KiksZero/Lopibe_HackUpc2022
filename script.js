const Phrase = "holaaaa"

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;

function initBoard() {
    	let board = document.getElementById("game-board");
        let row = document.createElement("div")
        row.className = "letter-row"
        for (let j = 0; j < Phrase.length; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
    		}

        board.appendChild(row)
}

initBoard()