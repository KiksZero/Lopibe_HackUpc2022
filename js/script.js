const Phrase = "holaaaaaaa";

let NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let timer = 40;
let puntuacion = 0;

function initBoard() {
    	let board = document.getElementById("game-board");
        let row = document.createElement("div");
        row.className = "letter-row";
        //frase boxes
        for (let j = 0; j < Phrase.length; j++) {
            let box = document.createElement("div");
            box.addEventListener("click", function() {letterClicked(j);});
            box.id = "phrase"+j;
            box.className = "letter-box";
            row.appendChild(box);
    		}
    	//input boxes
    	let row2 = document.createElement("div");
    	row2.className = "letter-row";
    	for (let i = 0; i < Phrase.length; i++) {
            let box = document.createElement("div");
            box.id = "input"+i;
            box.className = "letter-box";
            row2.appendChild(box);
    		}
        board.appendChild(row);
        board.appendChild(row2);
}

//Escribir con teclados
document.addEventListener("keyup", (e) => {

    let pressedKey = String(e.key);
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter();
        return;
    } else if (pressedKey === "Enter") {
        checkGuess();
        return;
    }

    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
        return;
    } else {
        insertLetter(pressedKey);
    }
});


document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 
    if (key === "↩") {
        key = "Enter"
    }
    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

function insertLetter (pressedKey) {
    if (nextLetter === Phrase.length) {
        return;
    }
    pressedKey = pressedKey.toLowerCase();

    let row = document.getElementsByClassName("letter-row")[1];
    let box = row.children[nextLetter];
    box.textContent = pressedKey;
    box.classList.add("filled-box2");
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[1];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box2");
    currentGuess.pop();
    nextLetter -= 1;
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
    let letra = calculate(solucion);
    while (!(solucion[letra] >= 'a' && solucion[letra] <= 'z') || (solucion[letra] >= 'A' && solucion[letra] <= 'Z') && oculta[letra] != solucion[letra]) letra = calculate(solucion);
    letterClicked(letra);
    setTimeout(function(){
        ocultarLetra(letra);
    }, 1000);
}

initBoard();
showPuntuacion();
var timeInterval = setInterval(function(){
    updateTimer();}, 1000);

var phraseInterval = setInterval(function(){
    cambioletra("holaaaaaaa", "          ");
}, 2000);

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[1];
    let guessString = '';

    for (const val of currentGuess) {
        guessString += val;
    }

    if (guessString.length != Phrase.length) {
        alert("Not enough letters!");
    } else if (Phrase != guessString) {
        alert("Cagaste");
    } else if (guessString === Phrase) {
        alert("You guessed right! Game over!");
        newPuntuacion();
    } 

    currentGuess = [];
    nextLetter = 0;
    for (let i = 0; i < Phrase.length; i++) {
        let box = document.getElementById("input"+i);
        box.classList.remove("filled-box2");
        box.textContent = '';
    }
}


function saveGame(){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("funciona");
        }
    };
    http.open('POST', 'http://localhost:8080/LoPibe/games');
    http.setRequestHeader("Access-Control-Allow-Origin","*");
    http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    var name = "hola";
    var scoreDate = Date.now();
    http.send(JSON.stringify({'playerName': name , 'score': puntuacion, 'scoreDate': scoreDate}));
}

function showPhrase() {
    setTimeout(500);
    for (let i = 0; i < Phrase.length; ++i) {
        letterClicked(i);
    }
}

function updateTimer() {
    if (timer === 0) {
        alert("Too slow...");
        clearInterval(timeInterval);
        clearInterval(phraseInterval);
        showPhrase();
        saveGame();
    }
    else {
        --timer;
        let timerView = document.getElementById("timer");
        timerView.textContent = timer;
    }
}

function showPuntuacion() {
    let scoreView = document.getElementById("score");
    scoreView.textContent = puntuacion;
}

function newPuntuacion() {
    puntuacion += 10*timer;
    showPuntuacion();
}