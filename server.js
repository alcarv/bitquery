const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
const { createProxyMiddleware: proxy } = require('http-proxy-middleware')
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
  app.use(
    '/api',
    (req, res, next) => {
      if (req && req.headers && req.headers.origin) {
        delete req.headers.origin
      }

      next()
    }
  )
  app.use('/api', proxy({ target: 'https://graphql.bitquery.io',
  changeOrigin: true,
  pathRewrite : {  '^/api' : ''  },
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "BQY83wwAzmLPC7QOMFQAW95IRaEc9QDX"
  }
  }))
app.listen(port);