var data = require('./config/terranorte');
var request = require('request');

var login = data.login;

function post(options, callback) {
    request(login, function (error, response, body) {
        var cookie = response.headers['set-cookie'].toString();
        options.headers['cookie'] = cookie;
        callback(options);
    });
}

exports.get = function (options, callback) {
    request(options, function (error, response, body) {
        if (body == 'LOGOUT\n') {
            post(options, function (result) {
                request(result, function (error, response, body) {
                    callback(body);
                });
            });
        } else {
            callback(body);
        }
    });
};

