var http = require('http');
var url = require('url');

var log = function(msg) {
  console.log(new Date().toISOString() + " : ", msg);
}

http.createServer(function(request, response) {

  log("Created server");

  var u = url.parse(request.url);

  log(u);

  var opts = {
    hostname: u.host,
    port: u.port || 80,
    path: u.pathname,
    method: request.method,
    headers: request.headers
  };

  log(opts);

  var proxy = http.request(opts, function(proxyRequest) {
    response.writeHead(proxyRequest.statusCode, proxyRequest.headers);

    // pipe client to server response
    proxyRequest.pipe(response);
  });

  // pipe server to client request
  request.pipe(proxy);

}).listen(8080);
