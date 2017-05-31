var data = require('./config/oriunda');
var request = require('request');

var login = data.login;

function post(options, callback) {
    request(login, function (error, response, body) {
        if (!error) {
            var cookie = response.headers['set-cookie'].toString();
            options.headers['cookie'] = cookie;
            callback(options);
        } else {
            console.log('Error de conexión con Sinergy');
            console.log(error);
        }
    });
}

exports.get = function (options, callback) {
    request(options, function (error, response, body) {
        if (body === 'LOGOUT\n' || error) {
            console.log(error);
            post(options, function (result) {
                request(result, function (error, response, body) {
                    if (!error) {
                        callback(body);
                    } else {
                        console.log('Error de conexión con Sinergy');
                        console.log(error);
                    }
                });
            });
        } else {
            callback(body);
        }
    });
};
