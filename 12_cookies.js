var Hapi = require('hapi');
var Boom = require('boom');
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2]) || 8080
});

server.route({
  path: '/set-cookie',
  method: 'GET',
  handler: function(req, reply) {
    reply('success')
    .state('session', {
      key: 'makemehapi'
    });
  },
  config: {
    state: {
      parse: true,
      failAction: 'log'
    }
  }
});

server.route({
  path: '/check-cookie',
  method: 'GET',
  handler: function(req, reply) {
    var session = req.state.session;
    console.error(session);
    //if (session) {
      //return reply({user: 'hapi'});
    //}
    reply({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Invalid cookie value'
    })
    //reply(Boom.unauthorized());
  },
  config: {
    state: {
      parse: true,
      failAction: 'log'
    }
  }
});

server.state('session', {
  path: '/{path*}',
  domain: 'localhost',
  encoding: 'base64json',
  ttl: 10
});

server.start();
