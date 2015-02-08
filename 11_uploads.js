var Hapi = require('hapi');
var Joi = require('joi');
var concat = require('concat-stream');
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2]) || 8080
});

server.route({
  path: '/upload',
  method: 'POST',
  handler: function(req, reply) {
    console.error(req.payload.file);
    req.payload.file.pipe(concat(function(file) {
      reply({
        description: req.payload.description,
        file: {
          data: file.toString(),
          filename: req.payload.file.hapi.filename,
          headers: req.payload.file.hapi.headers
        }
      })
    }));
  },
  config: {
    payload: {
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data'
    }
  }
});

server.start();
