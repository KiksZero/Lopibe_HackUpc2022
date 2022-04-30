const Phrase = "holaaaaaaa"

let NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;

function initBoard() {
    	let board = document.getElementById("game-board");
        let row = document.createElement("div");
        row.className = "letter-row";
        //frase boxes
        for (let j = 0; j < Phrase.length; j++) {
            let box = document.createElement("div")
            box.addEventListener("click", function() {letterClicked(j);});
            box.id = "phrase"+j;
            box.className = "letter-box";
            row.appendChild(box);
    		}
    	//input boxes
    	let row2 = document.createElement("div");
    	row2.className = "letter-row";
    	for (let i = 0; i < Phrase.length; i++) {
            let box = document.createElement("div")
            box.id = "input"+i;
            box.className = "letter-box";
            row2.appendChild(box);
    		}
        board.appendChild(row);
        board.appendChild(row2);
}

document.addEventListener("keyup", (e) => {

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

function insertLetter (pressedKey) {
    if (nextLetter === Phrase.length) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[1]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box2")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[1]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box2")
    currentGuess.pop()
    nextLetter -= 1
}


function letterClicked(letter){
	 let box = document.getElementById("phrase"+letter);
	 box.textContent = Phrase[letter];
	 box.classList.add("filled-box");
}

function ocultarLetra(letter){
    let box = document.getElementById("phrase"+letter);
    box.textContent = "";
    box.classList.remove("filled-box");
}

function getranking() {

}

function showranking() {

}

function newranking() {
    let a = getranking();

}

function showpalabra(s) {
    console.log(s);
    
}

function calculate(s) {
    return Math.floor(Math.random()*s.length);
}

function cambioletra(solucion, oculta) {
    var oc = oculta
    let letra = calculate(solucion);
    while (!(solucion[letra] >= 'a' && solucion[letra] <= 'z') || (solucion[letra] >= 'A' && solucion[letra] <= 'Z') && oculta[letra] != solucion[letra]) letra = calculate(solucion);
    letterClicked(letra);
    setTimeout(function(){
        ocultarLetra(letra);
    }, 1000);
}

initBoard();

setInterval(function(){
    cambioletra("holaaaaaaa", "          ");
}, 2000);


