let player1 = "Juan"
let player2 = "John"
let score1 = 6599;
let score2 = 10000;


function initialize(){
	var nameView = document.getElementById("players");
	nameView.textContent = player1 + " VS " + player2;
	document.getElementById("player1").textContent = player1;
	document.getElementById("player2").textContent = player2;
	document.getElementById("score1").textContent = score1;
	document.getElementById("score2").textContent = score2;
	if (score1 > score2){
		document.getElementById("score1").classList.add("winnerscore");
		document.getElementById("winner").textContent ="And the winner is ... "+ player1 +"!!";
	}
	else if (score1 < score2) {
	 document.getElementById("score2").classList.add("winnerscore");
	 document.getElementById("winner").textContent = "And the winner is ... "+ player2 +"!!";
	}

	var winnerView = document.getElementById("score1");
	winnerView.style.height = 0.040*score1 + "px";
	var winnerView = document.getElementById("score2");
	winnerView.style.height = 0.040*score2 + "px";
}

initialize();
