var express = require('express');
var router = express.Router();
var rootdir = __dirname + '/views';

router.get('/login', function (request, response) {
    response.sendFile(rootdir + '/index.html');
});

router.get('/prueba', function (request, response) {
    response.sendFile(rootdir + '/fleteros.html');
});

router.get('/prueba2', function (request, response) {
    response.sendFile(rootdir + '/test.html');
});

router.post('/get/:db/:task', function (request, response) {
    var conn = require('./models/connection');
    //console.log(request);
    conn.databases[request.params['db']]
            .query('EXEC ' + request.params['task']).spread(
            function (res) {
                response.send(res);
            });
});

router.post('/get/:db/:task/:id', function (request, response) {
    var conn = require('./models/connection');
    conn.databases[request.params['db']]
            .query('EXEC ' + request.params['task'] + ' ' + request.params['id']).spread(
            function (res) {
                response.send(res);
            }
    );
//    console.log(request);
//    response.send(rootdir + '/test.html');
});

router.get('/mapa', function (request, response) {
    response.sendFile(rootdir + '/funciona.html');
});

router.post('/login', function (request, response) {

});

router.get(/^(.+)$/, function (request, response) {
    response.status(404).send('404 not found');
});

exports.route = router;