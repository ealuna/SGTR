var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var scraper = require('./apps/scraper/main');

app.use(express.static('public'));

exports.iniciar = function (route) {
    server.listen(8027, function () {
        console.log("Servidor corriendo en el puerto 8027");
    });
    app.use('/', route);
};

io.of('/mapa').on('connection', function (socket) {
    console.log('Alguien se ha conectado con Sockets');
    setIntervalAndExecute(function () {
        scraper.device('352544070751905', function (value) {
            socket.emit('mapa', {
                status: value[0].status,
                position: {lat: value[0].lat
                    , lng: value[0].lon}
            });
        });
    }, 10000);
});

function setIntervalAndExecute(fn, t) {
    fn();
    setInterval(fn, t);
}

//
//
//io.on('connection', function(socket) {  
//  console.log('Alguien se ha conectado con Sockets');
//  
//  socket.emit('messages', messages);
//  
//  socket.on('new-message', function(data) {
//    messages.push(data);
//    io.sockets.emit('messages', messages);
//  });
//});