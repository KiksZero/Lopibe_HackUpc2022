let phrase = "";
let currentGuess = [];
let acertados = [];
let nextLetter = 0;
let timer = 120;
let puntuacion = 0;
let player2 = "John";
let activo = true;

// TIMERS
var timeInterval;
var phraseInterval;
var scoreInterval;

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

let player1 = getQueryVariable("name");
let id = getQueryVariable("id");

function initializeNames(){
    var nameView = document.getElementById("players");
    nameView.textContent = player1 + " VS " + player2;
}

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
    initializeNames();
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
    //cambio nuevo: && acertados[letter]==0
    if (activo && acertados[letter]==0){
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
    return letra;
}

function cambioletra() {
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
        timeInterval = setInterval(function(){updateTimer();}, 1000);       
        phraseInterval = setInterval(function(){
            cambioletra();
        }, 1000);
        penalty();

    } else if (guessString === phrase) {
        activo = false;
        notice("You guessed right! Next!", 0);
        newPuntuacion();
        clearInterval(timeInterval);
        clearInterval(phraseInterval);
        showphrase();
        setTimeout(2000);
        siguiente();
        
    } 

    currentGuess = [];
    nextLetter = 0;
    for (let i = 0; i < phrase.length; i++) {
        let box = document.getElementById("input"+i);
        box.classList.remove("filled-box2");
        box.textContent = '';
    }
}

function penalty(){
   var penalty = 5;
   activo = false
   let penaltyview =  document.getElementById("penalty_timer");
   var timeout= setTimeout(function(){
        activo = true;
        clearInterval(penaltyInterval);
        penaltyview.textContent = "";
        notice("",0);
    },5000);
    
    var penaltyInterval = setInterval(function() {
        penaltyview.textContent = "Time left: " + penalty.toFixed(2)+"s";
        penalty -= 0.1;
    }, 100);
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
        window.location.href = "/multiplayer_results.html?id="+id;
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
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    http.open('PUT', 'http://144.24.196.175:8080/LoPibe/duelos/updateResult');

    http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    http.setRequestHeader("Access-Control-Allow-Origin","*");
    http.send(JSON.stringify({'name': player1, "id": id, "puntuacion": puntuacion}));
}

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
    timeInterval = setInterval(function(){
        updateTimer();}, 1000);
    phraseInterval = setInterval(function(){
        cambioletra();
    }, 1000);
    notice("", 0);
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

function getOponentScore(){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("punt-opo").innerHTML = "Rival Score: " + this.responseText;
        }
    };
    http.open('GET', 'http://144.24.196.175:8080/LoPibe/duelos/getResult?name='+player1+'&id='+id);
    http.setRequestHeader("Access-Control-Allow-Origin","*");
    http.send();
}

function waiting(){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			var json = JSON.parse(this.responseText);
            if(player1 == json.name2) {
                player1 = json.name2;
                player2 = json.name1;
            } else {
                player2 = json.name2;
            }
            if(player2 == null){
                waiting();
            } else {
                document.getElementById("keyboard-cont").style.visibility = "visible";
                document.getElementById("match-id").remove();
                document.getElementById("loading-spinner").remove();
                document.getElementById("players").innerHTML = player1 + " vs " + player2;
                init();
            }
        }
    };
    http.open('GET', 'http://144.24.196.175:8080/LoPibe/duelos?id='+id);
    http.setRequestHeader("Access-Control-Allow-Origin","*");
    http.send();
}

function init(){
    initBoard();
    showPuntuacion();
    showTimer();

    timeInterval = setInterval(function(){
        updateTimer();}, 1000);

    phraseInterval = setInterval(function(){
        cambioletra();
    }, 1000);

    scoreInterval = setInterval(function(){
        getOponentScore();
    }, 2000);
}

document.getElementById("match-id").innerHTML = "<h2>Match Code: " + id + "</h2>"; 
document.getElementById("players").innerHTML = player1 + " vs ...";
waiting();