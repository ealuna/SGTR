var fs = require('fs');

exports.login = JSON.parse(fs.readFileSync(__dirname+'/login.json', 'utf8'));
exports.group = JSON.parse(fs.readFileSync(__dirname+'/group.json', 'utf8'));
exports.device = JSON.parse(fs.readFileSync(__dirname+'/device.json', 'utf8'));
