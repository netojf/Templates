let API_URL = "http://159.65.189.208/"
let END_POINTS = {
    banners: 'banners/',
    videos: 'videos/',
    condominios: 'condominios/',
    artigos: 'artigos/',
    servico: 'servicos/'
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
    myHeaders.append('Access-Control-Allow-Origin', "http://127.0.0.1:5500/");
    myHeaders.append("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, HEAD, OPTIONS");
    myHeaders.append("origin", "http://127.0.0.1:5500/");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
    };

    fetch("http://159.65.189.208/banners/", requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(
            function (jsonResponse) {
                callback(jsonResponse)
            }
        )
        .catch(error => console.log('error', error));

}

/**
 * Adiciona itens ao carousel principal
 * @param {Array} params - array de objetos com caminho para imagem
 */
function addBannerToCarousel(params) {
    Array.from(params).forEach((param) => {
        //adicionando indicator

        var carouselItem = document.createElement('div')
        var img = document.createElement('img')
        img.src = param.imagem
        carouselItem.appendChild(img)
        document.querySelector('#mainbanner >  .carousel-inner').appendChild(carouselItem);

        carouselItem.classList.add('carousel-item')
        if (Array.from(params).indexOf(param) == 0) {
            carouselItem.classList.add('active');
            var indicator = document.createElement('button');
            indicator.type = "button";
            indicator.dataset.bsTarget = "#mainbanner";
            indicator.dataset.bsSlideTo = "0";
            indicator.classList.add('active');
            indicator.ariaCurrent = true;
            indicator.ariaLabel = "Indicator";
            document.querySelector("#mainbanner > .carousel-indicators").appendChild(indicator)

        } else {
            var lastIndex = Number(document.querySelector('#mainbanner > .carousel-indicators > button:last-child').dataset.bsSlideTo);
            var newIndicator = document.querySelector('#mainbanner > .carousel-indicators > button:last-child').cloneNode(true);
            newIndicator.dataset.bsSlideTo = parseInt(lastIndex + 1);
            document.querySelector('#mainbanner > .carousel-indicators').appendChild(newIndicator);
        }

    })

    console.log(params);
}

function addCondomioCard(params) {
    debugger
    console.log(params);
}

function addServicoCard(params) {
    debugger
    Array.from(params).forEach((param) => {
        var servicoCard = document.createElement('div');
        var img = document.createElement('img')
        img.src = param.imagem
        var title = document.createElement('h6')
        title.textContent = param.descricao
        var span = document.createElement('span')
        span.textContent = param.descricao
        servicoCard.appendChild(img)
        servicoCard.appendChild(title)
        servicoCard.appendChild(span)

        document.querySelector('#servicos').appendChild(servicoCard)
        servicoCard.classList.add('custom-card')
    })

}

function addVideo(params) {
    debugger
    console.log(params);
}

document.addEventListener('DOMContentLoaded', (e) => {
    for (const [key, value] of Object.entries(END_POINTS)) {
        var url = API_URL + value;

    }
    ajaxGetRequest(API_URL + END_POINTS.banners + '?format=api', true, addBannerToCarousel)
    ajaxGetRequest(API_URL + END_POINTS.condominios + '?format=api', true, addCondomioCard)
    ajaxGetRequest(API_URL + END_POINTS.servico + '?format=api', true, addServicoCard)
    ajaxGetRequest(API_URL + END_POINTS.videos + '?format=api', true, addVideo)

})