const API_KEY = 'BQY83wwAzmLPC7QOMFQAW95IRaEc9QDX';
const { createProxyMiddleware: proxy } = require('http-proxy-middleware')

module.exports = app => {
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
}