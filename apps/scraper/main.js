var data = require('./config/oriunda');
var parser = require('./parser');
var connection = require('./connection');

exports.group = function (callback) {
    connection.get(data.group, function (value) {
        parser.getParsed(value, function (result) {
            //console.log(JSON.stringify(result));
            callback(JSON.stringify(result));
        });
    });
};

exports.device = function (id, callback) {
    data.device.qs['device'] = id;
    connection.get(data.device, function (value) {
        parser.getParsed(value, function (result) {
            //console.log(JSON.stringify(result));
            callback(result);
        });
    });
};

//data.device.qs['device'] = 352544070751905;
//setInterval(
//        function () {
//            connection.get(data.group, function (value) {
//                //console.log(value);
//                parser.getParsed(value, function (result) {
//                    console.log(JSON.stringify(result));
//                });
//            });
//        }
//, 9000);