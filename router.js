var express = require('express');
var router = express.Router();
var rootdir = __dirname + '/public/';

router.get('/login', function (request, response) {
    response.sendFile(rootdir + 'index.html');
});

router.get(/^(.+)$/, function (request, response) {
    response.status(404).send('404 not found');
});

exports.route = router;

//module.exports = function (app) {
//
//    // devolver todos los Personas
//    app.get('/api/persona', Controller.getPersona);
//    // Crear una nueva Persona
//    app.post('/api/persona', Controller.setPersona);
//    // Modificar los datos de una Persona
//    app.put('/api/persona/:persona_id', Controller.updatePersona);
//    // Borrar una Persona
//    app.delete('/api/persona/:persona_id', Controller.removePersona);
//    // application 
//    app.get('*', function (req, res) {
//        res.sendfile('./angular/index.html'); // Carga única de la vista
//    });
//};
