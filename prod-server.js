const compression = require('compression');
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(compression());

// If an incoming request uses a protocol other than HTTPS,
// redirect that request to the same url but with HTTPS.
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      const redirectUrl = ['https://', req.get('Host'), req.url].join('');

      return res.redirect(redirectUrl);
    }

    next();
  }
}

// Add forceSSL to server's middleware
if(process.env.SSL_REDIRECT_ENABLED !== 'false') {
  app.use(forceSSL());
}

// Run the app by serving the static files from the dist directory
app.use(express.static(__dirname + '/build'));

// For all GET requests, send back index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

// Start the app
var port = process.env.PORT || 3000;
app.listen(port);

console.log("Listening on port", port);
