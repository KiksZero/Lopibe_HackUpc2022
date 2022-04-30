function getPhrase() {
    http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            putText(this.responseText);
        }
    };
    http.open('GET', 'http://127.0.0.1:8080/LoPibe/phrase');
    http.setRequestHeader("Access-Control-Allow-Origin","*");
    http.send();
}

function putText(text){
    var element = document.getElementById("phrase");
    element.innerHTML = text
}
