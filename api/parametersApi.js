const request = require('request');

//const server = 'http://m9249';
const server = 'http://10.8.66.4';

const api = 'ltsapi/api/parametros';

const parameters = {};

parameters.getSimple =  (popid, callback) => {
    let url = `${server}/${api}/${popid}`;
    request.get(url, (err, data, body) =>  {
        if (err){
            return callback(err);
        }
        return callback(null, JSON.parse(body));
    });        
}

parameters.getComplete =  (popid, station, position, callback) => {
    if (!station || !position){
        return callback("Please provide station and position");
    }
    let url = `${server}/${api}/${popid}?station=${station}&position=${position}`;
    request.get(url, (err, data, body) =>  {
        if (err){
            return callback(err);
        }
        return callback(null, JSON.parse(body));
    }); 
}

function doRequest(url){
    return;
}

module.exports = parameters;