//var data = require('./config/terranorte');
var parser = require('./parser');
var connection = require('./connection');

exports.scrap = function (data, callback) {
    connection.get(data, function (value) {
        parser.getParsed(value, function (result) {
            console.log(JSON.stringify(result));
            callback(JSON.stringify(result));
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