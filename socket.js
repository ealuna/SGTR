var scraper = require('./apps/scraper/main');
var interval;

exports.emitDevice = function (socket, id) {
    clearInterval(interval);
    setIntervalAndExecute(function () {
        scraper.device(id, function (value) {            
            socket.emit('mapa', value[0]);
        });
    }, 10000);
};

exports.emitGroup = function (socket) {
    clearInterval(interval);
    setIntervalAndExecute(function () {
        try {
            scraper.group(function (value) {
                socket.emit('mapa', value);
            });
        } catch (error) {
            console.log('Error: ' + error);
        }
    }, 10000);
};

function setIntervalAndExecute(fn, t) {
    fn();
    interval = setInterval(fn, t);
}