/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var re = require('./connection');
//console.log(re.databases);

re.databases['oriunda']
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

re.databases['terranorte']
        .query('EXEC flota').spread(
        function (response) {
            console.log(response);
        }
);