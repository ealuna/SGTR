var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

exports.iniciar = function (route) {
    server.listen(8027, function () {
        console.log("Servidor corriendo en el puerto 8027");
    });
    app.use('/', route);
};

//
//io.on('connection', function(socket) {  
//  console.log('Alguien se ha conectado con Sockets');
//  socket.on('new-message', function(data) {
//    messages.push(data);
//    io.sockets.emit('messages', messages);
//  });
//});