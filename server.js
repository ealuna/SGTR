var express = require('express');
var server = express();

server.use(express.static('public'));

exports.iniciar = function (route) {
    server.listen(8027, function () {
        console.log("Servidor corriendo en el puerto 8027");
    });
    server.use('/', route);
};


