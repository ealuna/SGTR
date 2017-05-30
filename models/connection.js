/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var sequelize = require('sequelize');
var config = require('../config/databases');
//console.log(databases);
var dbnames = Object.keys(config);
var db = {};
//console.log(dbnames);
for (var i = 0; i < dbnames.length; i++) {
    var database = dbnames[i];
    db[database] = new sequelize(
            config[database].name,
            config[database].user,
            config[database].password,
            {
                host: config[database].host,
                dialect: config[database].type,
                pool: {
                    max: 5,
                    min: 0,
                    idle: 5000
                }
            }
    );
}
exports.databases = db;