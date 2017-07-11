/*Software usando JS Puro como exemplo para rodar em qualquer navegador*/

const socketServer = 'http://10.8.66.81';

const mixApi = {
    "simple": 'http://m9249/ltsapi/api/mix/simple?date={date}',
    "complete": 'http://m9249/ltsapi/api/mix/complete'
}

const parametersApi = 'http://m9249/ltsapi/api/parametros/{popid}?station={station}&position={position}';

const popidsBox = document.getElementById('popids-box');

const taktTime = document.getElementById('takt-value');
const taktStopTime = document.getElementById('takt-stoptime');
const taktProduced = document.getElementById('takt-produced');
const taktObjective = document.getElementById('takt-objective');

const requestedItemBox = document.getElementById('requested-item-box');

const firstPopid = document.getElementById('first-popid');

const testInput1 = document.getElementById('input-test-1');

const springList = [
    '1377668', '2137282', '1889728', '1398988', '1377712',
    '2285560', '1547824', '2292978', '1893989', '1377674',
    '1377672', '2171739', '1931547', '2137285', '1893986'
]; // Cadastrar em um banco de dados com quantidade padrão / min / max

const boogieList = [
    '1486738', '1486739', '1485728', '2322229',
    '2322228', '2454947', '2623830'
]; // Cadastrar em um banco de dados com quantidade padrão / min / max

//LocalStorage
var currentVehicle = 0;
var taktInstance;
var negative = false;
var skidParts = 0;

var socket = io.connect(socketServer);

window.onload = function () {
    init();    
}

function init() {
    //Inicia a tela dizendo que o primeiro popid do dia esta no index 0 (primeiro uso)    
    localStorage.setItem('currentIndex', 0);
    //Busca todos os popids do dia e salva o primeiro como atual
    getTodayPopIds(function (err, popids) {
        updatePopidTable();
        getParametros();
    });    
    socketInit();
}

function test() {
    let popid = testInput1.value;
    console.log(popid);
    getParametros(popid);
}

function getParametros() {
    let popid = localStorage.getItem('currentPopid');
    let url = parametersApi
        .replace(/{popid}/, popid)
        .replace(/{station}/, '01')
        .replace(/{position}/, '1');

    request(url, function (err, data) {
        let parameters = JSON.parse(data);
        if (err) {
            return console.error(err);
        }
        if (parameters.length > 0){
            checkPartNumber(parameters);            
        }
        return Promise.resolve(parameters);
    });
}

function checkPartNumber(parameters){
    parameters.map( p => {
        let isPartMember = boogieList.indexOf(p.OBJ) >= 0 ? true : false ;
        if (isPartMember){
            removePartFromSkid();
        }
    });
}

function removePartFromSkid(){
    skidParts--;
    if (skidParts == 0){
        window.alert("POR FAVOR, TROQUE O SKID");
        updateRequestList();
    }
}

function updateRequestList(){
    let item = document.createElement('div');
    item.className = 'requested-item ';
    item.value = 123;
    requestedItemBox.appendChild(item);
}

function getTodayPopIds(callback) {
    let date = new Date().toISOString().replace(/-/g, '').slice(0, 8);
    let url = mixApi.simple.replace(/{date}/, date);
    request(url, function (err, data) {
        localStorage.setItem('popids', data);
        popids = JSON.parse(data);
        callback(null, popids);
    });
}

function updatePopidTable() {

    while (popidsBox.firstChild) {
        popidsBox.removeChild(popidsBox.firstChild);
    }

    let popids = JSON.parse(localStorage.getItem('popids'));

    let currentPopid = localStorage.getItem('currentPopid');
    let currentIndex = localStorage.getItem('currentIndex');

    if (currentPopid == 'undefined'){        
        localStorage.setItem('currentPopid', popids[0]);
    }

    if (!currentIndex) {
        localStorage.setItem('currentIndex', 0);
        currentIndex = 0;
    }

    popids.map(function (pop, index) {
        let popRow = document.createElement('div');
        popRow.className += 'popid-row ';
        popRow.innerHTML = pop;
        if (index < currentIndex) {
            popRow.className += ' passed-popid';
        } else if (index == currentIndex) {
            popRow.className += ' active-popid';
        } else {
            popRow.className += ' future-popid';
        }
        popidsBox.appendChild(popRow);
    });   


}

function verifySequence(produced) {    

    if (currentVehicle < produced && currentVehicle > 0) {               

        let currentIndex = parseInt(localStorage.getItem('currentIndex'));
        let popids = JSON.parse(localStorage.getItem('popids'));      

        currentIndex++;  

        localStorage.setItem('currentIndex', currentIndex);        
        localStorage.setItem('currentPopid', popids[currentIndex]);

        updatePopidTable();
        getParametros();
    }

    currentVehicle = produced;
}

function updateCurrentPopid() {

    //Primeiro verifica se o popid esta na lista do dia, se não estiver mostrar window.alert
    let selectedPopid = firstPopid.value;    
    let popids = JSON.parse(localStorage.getItem('popids'));
    
    currentIndex = popids.indexOf(selectedPopid);

    if (currentIndex <= -1){
        return window.alert("Popid não se encontra na lista");
    }   

    localStorage.setItem('currentPopid', selectedPopid);    
    localStorage.setItem('currentIndex', currentIndex);  

    updatePopidTable();    
    getParametros();
}

function socketInit() {
    socket.on('connect', function () {
        console.log('Connected to Socket Server: ' + socketServer);
        getTaktInstance(0);
    });
}

function getTaktInstance(instance) {

    setInterval(function () {
        socket.emit('takt-instance', instance);
    }, 1000);

    socket.on('server-takt-instance', function (data) {
        taktInstance = data;
        taktTime.innerText = convertTakt(taktInstance.remainingTime);
        taktObjective.innerText = taktInstance.production
        verifySequence(taktInstance.production);
    });
}

function convertTakt(ms) {
    let hr, min, sec;
    if (ms < 0) {
        negative = true;
        ms = ms * (-1);
    }
    else {
        negative = false;
    }

    hr = 0;
    min = (ms / 1000 / 60) << 0;
    sec = (ms / 1000) % 60;

    if (sec < 10)
        takt = min + ":0" + sec;
    else
        takt = min + ":" + sec;

    if (negative)
        takt = "-" + takt;

    return takt;
}

function request(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        let done = 4;
        let ok = 200;
        if (xhr.readyState == done) {
            if (xhr.status == ok) {
                callback(null, xhr.responseText);
            }
            else {
                callback(xhr.status, null);
            }
        }
    }
}

