var request = require('request');
var url = 'http://192.168.1.203/rest';

exports.getClientes = function (id, callback) {
    connect({
        method: 'GET',
        uri: url + '/clientesDia/' + id
    }, function (value) {
        callback(JSON.parse(value));
    });
};

function connect(options, callback) {
    request(options, function (error, response, body) {
        callback(body);
    });
}


