function getRanking(params) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            generateTableIndex(this.responseText);
        }
    };
    http.open('GET', 'http://144.24.196.175:8080/LoPibe/games');
    http.setRequestHeader("Access-Control-Allow-Origin","*");
    http.send();
}

function generateTableIndex(text){
    var json = JSON.parse(text);
    var element = document.getElementById("ranking-table");
    var i = 0;
    for (node of json){
        i = i + 1;
        var child = document.createElement("tr");
        child.innerHTML = "<td align='center'>" + i + "</td><td align='center'>" + node.playerName + "</td><td align='center'>" + node.score + "</td><td align='center'>" + node.scoreDate + "</td>";
        element.appendChild(child);
        if (i == 5) break;
    }
}
