var Hapi = require('hapi');
var rot13 = require('rot13-transform');
var fs = require('fs');
var path = require('path');
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2]) || 8080
});

server.route({
  path: '/',
  method: 'GET',
  handler: function(req, reply) {
    reply(fs.createReadStream(path.join(__dirname, 'rot13.txt'))
          .pipe(rot13()));
  }
});

server.start();
