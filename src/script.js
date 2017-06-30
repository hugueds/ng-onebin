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

const springList = [
    '1377668', '2137282', '1889728', '1398988', '1377712', 
    '2285560', '1547824', '2292978', '1893989', '1377674', 
    '1377672', '2171739', '1931547',  '2137285', '1893986'
]; // Cadastrar em um banco de dados com quantidade padrão / min / max

const boogieList = [
    '1486738', '1486739', '1485728', '2322229', 
    '2322228', '2454947', '2623830'
]; // Cadastrar em um banco de dados com quantidade padrão / min / max

var popids = [];
var currentPopid = 0;
var currentVehicle = 0;
var socket = io.connect(socketServer);
var taktInstance;
var negative = false;

window.onload = function () {
    init();
}

function init() {
    getTodayPopIds();
    socketInit();    
}

function test() {
    let testPopid = 491446;
    getParametros(testPopid);
}

function getParametros(popid, callback) {
    let url = parametersApi
        .replace(/{popid}/, popid)
        .replace(/{station}/, '01')
        .replace(/{position}/, '1');

    request(url, function (err, data) {
        if (err) {
            return console.error(err);
        }
        return Promise.resolve(data);       
    })
}

function getTodayPopIds() {
    let date = new Date().toISOString().replace(/-/g, '').slice(0, 8);
    let url = mixApi.simple.replace(/{date}/, date);     
    request(url, function (err, data) {
        localStorage.setItem('popids', data);        
        popids = JSON.parse(data);
        updatePopidTable();
    });
}

function updatePopidTable() {

    while (popidsBox.firstChild) {
        popidsBox.removeChild(popidsBox.firstChild);
    }

    popids.map((pop, index) => {
        let popRow = document.createElement('div');
        popRow.className += 'popid-row ';
        if (index == 0) {
            popRow.className += 'active-popid';
            currentPopid = pop;
        }
        popRow.innerText = pop;
        popidsBox.appendChild(popRow);
    });
}

function verifySequence(produced) {
    if (currentVehicle < produced) {
        // popids.shift();
        updatePopidTable();
        getParametros(popids[0]);
    }
    currentVehicle = produced;
}



function socketInit(){
    socket.on('connect', function(){
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

