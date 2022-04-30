function getRanking(params) {
    alert();
    http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };
    http.open('GET', 'http://144.24.196.175:8080/LoPibe/games'); // Método post y url invocada
    http.setRequestHeader("Access-Control-Allow-Origin","144.24.196.175:80");
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); // Establecer cabeceras de petición
    http.send(); // Envio de parámetros usando POST
}