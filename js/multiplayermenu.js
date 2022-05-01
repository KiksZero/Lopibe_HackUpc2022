function createMatch(){
    var name = document.getElementById("name-input").value;
    if (name == "") notice('A name must be provided.', 1);
    else {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var id = this.responseText;
                window.location.href = "/multiplayer.html?name="+name+"&id="+id;
            }
        };
        http.open('POST', 'http://144.24.196.175:8080/LoPibe/duelos');
        http.setRequestHeader("Access-Control-Allow-Origin","*");
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.send(JSON.stringify({'name1': name}));
    }
}

function enterMatch(){
    var id = document.getElementById("id-input").value;
    var name = document.getElementById("name-input").value;
    if (name == "") notice('A name must be provided.', 1);
    else if (id == "") notice('A match code must be provided. If you do not have a match code, click "Create Match"', 1);
    else {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                window.location.href = "/multiplayer.html?name="+name+"&id="+id;
            }
        };
        http.open('PUT', 'http://144.24.196.175:8080/LoPibe/duelos/start');
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.setRequestHeader("Access-Control-Allow-Origin","*");
        http.send(JSON.stringify({'name2': name, "id": id}));
    }
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