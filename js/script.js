let phrase = "holaaaaaaaa";
let NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let acertados = [];
let nextLetter = 0;
let ini_timer = 120;
let timer = ini_timer;
let puntuacion = 0;
let playerName = "dummy";
let activo = true;

function getphrase() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            phrase = this.responseText;
        }
    };
    http.open('GET', 'http://144.24.196.175:8080/LoPibe/phrase', false);
    http.setRequestHeader("Access-Control-Allow-Origin","*");
    http.send();
}

function initBoard() {
    activo = true;
    acertados = [];
    getphrase();
	let board = document.getElementById("game-board");
    board.innerHTML = "";
    let row = document.createElement("div");
    row.className = "letter-row row";
    //frase boxes
    for (let j = 0; j < phrase.length; j++) {
        let box = document.createElement("div")
        box.id = "phrase"+j;
        box.className = "letter-box";
        if (!phrase[j].match(/[a-z]/gi)){
            box.classList.add('special-box');
            box.textContent = phrase[j];
        }
        row.appendChild(box);
        acertados.push(0);
	}
	//input boxes
	let row2 = document.createElement("div");
	row2.className = "letter-row row";
	for (let i = 0; i < phrase.length; i++) {
        let box = document.createElement("div")
        box.id = "input"+i;
        box.className = "letter-box2 typing-box";
        if (!phrase[i].match(/[a-z]/gi)){
            box.classList.add('special-box');
            box.textContent = phrase[i];
        }
        row2.appendChild(box);
	}
    board.appendChild(row);
    board.appendChild(document.createElement("hr"));
    board.appendChild(row2);
}

//Escribir con teclados
document.addEventListener("keyup", (e) => {
    if (activo){
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
    if (!phrase[nextLetter].match(/[a-z]/gi)){
        nextLetter += 1;
        currentGuess.push(" ");
    }
    if (nextLetter === phrase.length) {
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
    if (!phrase[nextLetter - 1].match(/[a-z]/gi)){
        currentGuess.pop();
        nextLetter -= 1;
    }
    let row = document.getElementsByClassName("letter-row")[1];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box2");
    currentGuess.pop();
    nextLetter -= 1;
}

function letterClicked(letter){
    if(activo){
        let box = document.getElementById("phrase"+letter);
        box.textContent = phrase[letter];
        box.classList.add("filled-box");
    }
}

function ocultarLetra(letter){
    if (activo){
        let box = document.getElementById("phrase"+letter);
        box.textContent = "";
        box.classList.remove("filled-box");
    }
}

function calculate() {
    var pos = []
    for(var i = 0; i < acertados.length; ++i){
        if(acertados[i] == 0 && (phrase[i].match(/[a-z]/gi)) && !document.getElementById("phrase"+i).matches('.filled-box')) pos.push(i);
    }
    var letra = pos[Math.floor(Math.random()*pos.length)];
    console.log(letra);
    return letra;
}

function cambioletra(solucion, oculta) {
    console.log("entra");
    let letra = calculate();
    letterClicked(letra);
    setTimeout(function(){
        ocultarLetra(letra);
    }, 1000);
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[1];
    let guessString = '';

    for (const val of currentGuess) {
        guessString += val;
    }

    if (guessString.length != phrase.length) {
        notice("Not enough letters!", 1);
    } else if (phrase != guessString) {
        notice("Cagaste", 1);
        clearInterval(timeInterval);
        clearInterval(phraseInterval);
        setTimeout(1000);
        mantenerAciertos();
        updateTimerFallo(); 
        timeInterval = setInterval(function(){updateTimer();}, 1000);       
        phraseInterval = setInterval(function(){
            cambioletra(phrase, "          ");
        }, 1000);
    } else if (guessString === phrase) {
        activo = false;
        notice("You guessed right! Game over!", 0);
        newPuntuacion();
        clearInterval(timeInterval);
        clearInterval(phraseInterval);
        showphrase();
        document.getElementById("button-next").innerHTML="<button id='next' class='btn btn-danger'>Next</button>";
        document.getElementById("next").addEventListener("click", function() {
            siguiente();
        });
    } 

    currentGuess = [];
    nextLetter = 0;
    for (let i = 0; i < phrase.length; i++) {
        let box = document.getElementById("input"+i);
        box.classList.remove("filled-box2");
        box.textContent = '';
    }
}

function saveGame(){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href = "/";
        }
    };
    http.open('POST', 'http://144.24.196.175:8080/LoPibe/games');
    http.setRequestHeader("Access-Control-Allow-Origin","*");
    http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    var scoreDate = Date.now();
    http.send(JSON.stringify({'playerName': playerName , 'score': puntuacion, 'scoreDate': scoreDate}));
}

function showphrase() {
    setTimeout(500);
    for (let i = 0; i < phrase.length; ++i) {
        if (phrase[i].match(/[a-z]/gi)){
            let box = document.getElementById("phrase"+i);
            box.textContent = phrase[i];
            box.classList.add("filled-box");
        }
    }
}

function updateTimerFallo() {
    timer -= 10;
    if (timer < 0) timer = 0;
    showTimer();
}

function updateTimer() {
    if (timer === 0) {
        activo = false;
        notice("Too slow...");
        clearInterval(timeInterval);
        clearInterval(phraseInterval);
        showphrase();
        inputName();
    }
    else {
        --timer;
        showTimer();
    }
}

function showTimer() {
    let timerView = document.getElementById("timer");
    timerView.textContent = "Time: "+timer;
}

function showPuntuacion() {
    let scoreView = document.getElementById("score");
    scoreView.textContent = "Score: "+ puntuacion;
}

function newPuntuacion() {
    puntuacion += 10*timer;
    showPuntuacion();
}

initBoard();
showPuntuacion();
showTimer();
cambioletra(phrase, "          ");

var timeInterval = setInterval(function(){
    updateTimer();}, 1000);

var phraseInterval = setInterval(function(){
    cambioletra(phrase, "          ");
}, 1000);

function notice(notice, status){
    var node = document.getElementById("notice");
    node.innerHTML="<p>"+notice+"<p>";
    if (status == 0) {
        node.className="correct";
    } else {
        node.className="error";
    }
}

function siguiente(){
    initBoard();
    document.getElementById("button-next").innerHTML = "";
    timeInterval = setInterval(function(){
        updateTimer();}, 1000);
    phraseInterval = setInterval(function(){
        cambioletra(phrase, "          ");
    }, 1000);
    notice("", 0);
    timer = ini_timer;
}

function inputName(){
    var node = document.getElementById("input-name");
    node.innerHTML = "<div>Add your score to the ranking! Enter your name:</div><input type='text' style='margin-top: 4px' size=10 id='playerName'><br><button class='btn btn-success' style='margin-top: 4px' id='saveName'>Save</button>";
    document.getElementById("saveName").addEventListener("click", function(){
        playerName = document.getElementById("playerName").value;
        saveGame();
    });
}


function mantenerAciertos(){
    for (let i = 0; i < phrase.length; i++) {
        let box = document.getElementById("phrase"+i);
        if (phrase[i].match(/[a-z]/gi) && phrase[i] == currentGuess[i]){
            box.classList.remove('filled-box');
            box.classList.add('correct-box');
            box.textContent = phrase[i];
            acertados[i] = 1;
        }
	}
}