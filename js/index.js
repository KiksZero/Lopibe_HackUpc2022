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
        if(i == 1) child.innerHTML = "<td align='center'><img id='oro' class='corona' src=images/oro.png>" + i;
        else if(i == 2) child.innerHTML = "<td align='center'><img class='corona' src=images/plata.png>" + i;
        else if(i == 3) child.innerHTML = "<td align='center'><img class='corona' src=images/bronce.png>" + i;
        else child.innerHTML = "<td align='center'><img class='corona' src=images/transparente.png>" + i;
        child.innerHTML += "</td><td align='center'>" + node.playerName + "</td><td align='center'>" + node.score + "</td><td align='center'>" + node.scoreDate + "</td>";
        element.appendChild(child);
        if (i == 5) break;
    }
    document.getElementById("oro").addEventListener("click", () => {
        document.getElementById("audio").play();
    })
}

