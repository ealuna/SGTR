var request = require('request');
var url = 'http://192.168.1.203/rest';

exports.getClientes = function (id, callback) {
    console.log(url + '/clientesDia/' + id);
    connect({
        method: 'GET',
        uri: url + '/clientesDia/' + id
    }, function (value) {
        callback(JSON.parse(value));
    });
};

exports.getFlota = function (callback) {
    connect({
        method: 'GET',
        uri: url + '/flota'
    }, function (value) {
        console.log(value);
        callback(JSON.parse(value));
    });
};

function connect(options, callback) {
    request(options, function (error, response, body) {
        if (!error){
            callback(body);
        }else{
            console.log('No se puede acceder al servidor de datos');
            console.log(error);
        }
    });
}


