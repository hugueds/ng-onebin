const request = require('request');

//const server = 'http://m9249';
const server = 'http://10.8.66.4';

const api = 'ltsapi/api/mix';

const mix = {};

mix.getSimple =  (date, callback) => {
    let url = `${server}/${api}/simple`;   
    request.get({url : url, qs : date}, (err, data, body) =>  {
        if (err){
             callback(err);
        }
         callback(null, JSON.parse(body));
    });        
}

mix.getComplete = (callback) => {
    let url = `${server}/${api}/complete`;
    request.get(url, (err, data, body) =>  {
        if (err){
            callback(err);
        }
        callback(null, JSON.parse(body));
    }); 
}

mix.getEntrance = (config, callback) => {
    let url = `${server}/${api}/entrance`;
    request.get({url : url, qs: config}, (err, data, body) =>{
         if (err){
            callback(err);
        }
        callback(null, JSON.parse(body));
    });
}




function doRequest(url){
    return;
}

module.exports = mix;
