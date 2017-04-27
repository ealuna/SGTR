var express = require('express');
var router = express.Router();
var rootdir = __dirname + '/views/';

router.get('/login', function (request, response) {
    response.sendFile(rootdir + '/index.html');
});

router.get('/mapa', function (request, response) {
    response.sendFile(rootdir + '/funciona.html');
});

router.post('/login', function(request, response){
    
});

router.get(/^(.+)$/, function (request, response) {
    response.status(404).send('404 not found');
});

exports.route = router;