module.exports = function (server) {

    const io = require('socket.io')(server);
    const Message = require('../models/MessageSchema');
    const client = require('../socket/socketClient');

    var lastProduced = 0;

    io.on('connection', (socket) => {

        console.log("A CLIENT HAS CONNECTED");

        socket.on('get messages', async (data) => {
            try {
                let res = await Message.find({});
                socket.emit('messages', res);
            }
            catch (err) {
                console.error(err);
            }
        });

        socket.on('deliver', async (part) => {            
            try {
                let res = await Message.findByIdAndRemove(part._id);
                console.log(res);
                socket.emit('get messages');
            }catch(err){
                console.error(err);
            }

        })

        socket.on('new product', () => console.log('Novo produto no posto'))

    });      

    setInterval(() => client.emit('takt-instance', 0), 5000)
    setInterval(() => client.emit('takt-instance', 0), 5000)

    client.on('server-takt-instance', (data) => {
        if (lastProduced < data.production){
         
        }        
        
        lastProduced = data.production;
    })

};

//Quando um novo produto chega
//debita-se a quantidade de peças para aquele produto ( com excessão do posto 1 que so atualizara ao receber um novo produto)
//Verifica a sequencia da fila

