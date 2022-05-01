let player1
let player2
let score1
let score2


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
let id = getQueryVariable("id");

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
		winnerscore= score1;
	}
	else if (score1 < score2) {
	 document.getElementById("score2").classList.add("winnerscore");
	 document.getElementById("winner").textContent = "And the winner is ... "+ player2 +"!!";
		winnerscore= score2;
	}

	var winnerView = document.getElementById("score1");
	winnerView.style.height = 400*(score1/winnerscore) + "px";
	var winnerView = document.getElementById("score2");
	winnerView.style.height = 400*(score2/winnerscore) + "px";
}

function getResults(){
	var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			var json = JSON.parse(this.responseText);
			player1 = json.name1;
			player2 = json.name2;
			score1 = json.result1;
			score2 = json.result2;
            alert(this.responseText);
			initialize();
        }
    };
    http.open('GET', 'http://144.24.196.175:8080/LoPibe/duelos?id='+id);
    http.setRequestHeader("Access-Control-Allow-Origin","*");
    http.send();
}

getResults();
