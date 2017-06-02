var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var scraper = require('./apps/scraper/main');
var pass = require('./socket');
var conn = require('./connection');
var conn2 = require('./models/connection');
var compression = require('compression');

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('public'));
app.use(compression());

exports.iniciar = function (route) {
    server.listen(8027, function () {
        console.log("Servidor corriendo en el puerto 8027");
    });
    app.use('/', route);
};

//io.of('/mapa').on('connection', function (socket) {
//    conn.getFlota(function (value) {
//        socket.emit('flota', value);
//    });
//    setIntervalAndExecute(function () {
//        scraper.device('352544070752390', function (value) {
//            console.log(value[0].vehicle);
//            socket.emit('mapa', {
//                status: value[0].status,
//                position: {lat: value[0].lat
//                    , lng: value[0].lon}
//            });
//        });
//    }, 10000);
//});
io.of('/mapa').on('connection', function (socket) {
//    conn.getFlota(function (value) {
//        socket.emit('flota', value);
//    });
    socket.emit('databases', conn2.dbnames);
    setIntervalAndExecute(function () {
        scraper.group(function (value) {
            socket.emit('flota', JSON.parse(value));
        });
    }, 10000);
});

io.of('/clientes').on('connection', function (socket) {
    socket.on('clientes', function (value) {
        conn2.databases['terranorte']
                .query('EXEC clientesDia ' + value).spread(
                function (res) {
                    socket.emit('cli', res);
                });
    });
});

io.of('/rutas').on('connection', function (socket) {
    conn2.databases['terranorte']
            .query('EXEC rutasDia').spread(
            function (res) {
                socket.emit('rut', res);
            });
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


//socket.on('device', function (id) {
////    messages.push(data);
////    io.sockets.emit('messages', messages);
//});

function emitDevice(socket, id) {
    setIntervalAndExecute(function () {
        try {
            scraper.device(id, function (value) {
                socket.emit('mapa', value[0]);
            });
        } catch (error) {
            console.log('Error: ' + error);
        }
    }, 10000);
}

function emitGroup(socket) {
    setIntervalAndExecute(function () {
        try {
            scraper.group(function (value) {
                socket.emit('mapa', value);
            });
        } catch (error) {
            console.log('Error: ' + error);
        }
    }, 10000);
}

app.post('/post/:db/resultado', function (request, response) {
    //var conn = require('./models/connection');
    console.log(request.body);
    //response.send(request.body);
    var result = request.body;
     conn2.databases['terranorte']
            .query('EXEC saveresult' 
            + ' @numcam = ' + result.idtransporte
            + ', @idcliente = ' + result.idcliente
            + ', @resultado = ' + result.estado
            + ', @planilla = ' + result.planilla
            ).spread(
            function (err, res) {
                console.log(err);
                io.of('/mapa').emit('prueba', request.body);
            });  
    
    
    //io.of('/mapa').emit('prueba', request.body);
    response.send(request.body);
});