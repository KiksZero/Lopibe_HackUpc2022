function getRanking(params) {
    http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //añadir ranking
        }
    };
    http.open('GET', 'http://144.24.196.175:8080/lopibes/services/games'); // Método post y url invocada
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); // Establecer cabeceras de petición
    http.send(); // Envio de parámetros usando POST
}