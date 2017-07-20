const io = require('socket.io-client');
const server = 'http://10.8.66.81';

const client = io.connect(server);

client.on('connect',() => {
    console.log('Server is connected to Takt server at', server);
});


module.exports = client;

