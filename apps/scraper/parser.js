var parser = require('xml2js').Parser();

exports.getParsed = function (value, callback) {
    parser.parseString(value, function (error, result) {
        dataParser(result, function (parsed) {
            callback(parsed);
        });
    });
};

function dataParser(result, callback) {
    var data = result['MapData']['DataSet'];
    var arrayDevices = [];
    for (var i = 0; i < data.length; i++) {
        var arrayData = data[i]['P'].toString().split("|");
        var devices = {
            iddevice: data[i]['$'].id.toString(),
            vehicle: arrayData[0],
            desc: arrayData[1].replace(/.*?\(|\)/g, ''),
            date: arrayData[3],
            time: arrayData[4],
            status: arrayData[6].replace(/\\u([\d\w]{4})/gi,
                    function (match, grp) {
                        return String.fromCharCode(parseInt(grp, 16));
                    }),
            lat: parseFloat(arrayData[8]),
            lon: parseFloat(arrayData[9]),
            dir: arrayData[20].replace(/\\u([\d\w]{4})/gi,
                    function (match, grp) {
                        return String.fromCharCode(parseInt(grp, 16));
                    }).replace(/\"/g, '')
        };
        arrayDevices.push(devices);
    }
    callback(arrayDevices);
}
