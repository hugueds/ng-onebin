let ioServer = null;

module.exports = {
    start: function (httpServer) {

        const io = require('socket.io')(httpServer);
        const Message = require('../models/MessageSchema');
        const client = require('../socket/socketClient');
        const request = require('request');

        let lastProduced = 0;        

        io.on('connection', (socket) => {

            socket.on('get mix', (data) => {

            })

            socket.on('get entrance', (data) => {

            })

            socket.on('', (data) => {

            })

            socket.on('', (data) => {

            })

            socket.on('', (data) => {

            })

        });

        ioServer = io;        
    },
    io : function() {
        return ioServer;
    }


};

// Quando um novo produto chega
// Debita-se a quantidade de peças para aquele produto ( com excessão do posto 1 que so atualizara ao receber um novo produto)
// Verifica a sequencia da fila

