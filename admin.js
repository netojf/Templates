let API_URL = "http://159.65.189.208/"
let END_POINTS = {
    banners: 'banners',
    videos: 'videos',
    condominios: 'condominios',
    artigos: 'artigos'
}

/**
 * Executa um request GET passando a resposta para o callback 
 * @param {String} url - define a url do request
 * @param {Boolean} async  - define se a função é assíncrona
 * @param {Function} callback  - função  que será executada com os dados da resposta
 */
function ajaxGetRequest(url, async, callback) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Allow", "GET, PUT, PATCH, DELETE, HEAD, OPTIONS");
    myHeaders.append('Access-Control-Allow-Origin', "http://127.0.0.1:5500/index.html");
    myHeaders.append("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, HEAD, OPTIONS");
    myHeaders.append("origin", "http://127.0.0.1:5500/index.html");



    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
    };

    fetch("http://159.65.189.208/banners/", requestOptions)
        .then(function (response) {
            debugger
            console.log(response);
            return response.json();
        })
        .then(
            function (jsonResponse) {
                console.log(jsonResponse);
            }
        )
        .catch(error => console.log('error', error));

}

function printToLog(params) {
    console.log(params);
}

document.addEventListener('DOMContentLoaded', (e) => {
    ajaxGetRequest(API_URL + END_POINTS.banners, true, printToLog)
})