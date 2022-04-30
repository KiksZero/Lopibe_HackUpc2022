function getRanking(params) {
    http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            generateTable(this.responseText);
        }
    };
    http.open('GET', 'http://144.24.196.175:8080/LoPibe/games');
    http.setRequestHeader("Access-Control-Allow-Origin","*");
    http.send();
}

function generateTable(text){
    var json = JSON.parse(text);
    var element = document.getElementById("ranking-table");
    for (node of json){
        var child = document.createElement("div");
        child.innerHTML = node.playerName + " " + node.score + " " + node.scoreDate;
        element.appendChild(child);
    }
}