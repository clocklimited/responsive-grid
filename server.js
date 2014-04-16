module.exports = serve

var fs = require('fs')
  , express = require('express')
  // , versionator = require('versionator')
  // , mappedVersion = versionator.createMapped(require(__dirname + '/static-file-map.json'))
  , properties = require('./properties')()
  , getRoutes = require('./lib/get-accessible-routes')
  , routes = getRoutes(properties.pages)
  , inDevelopmentMode = properties.env === 'development'
  // One month static file expire on non-development
  , staticContentExpiry = inDevelopmentMode ? 0 : 2592000000

function serve() {

  function router(req, res, next) {
    var route = routes[req.url]
    if (route) {
      if (route === 'index') fs.createReadStream(__dirname + '/' + route + '.html').pipe(res)
      else fs.createReadStream(__dirname + '/' + route + '/index.html').pipe(res)
    } else if (req.url === '/_health') {
      res.send(200)
    } else {
      next()
    }
  }

  function notFound(req, res, next) {
    var readStream = fs.createReadStream(__dirname + '/error/not-found/index.html')
    res.status(404)
    readStream.pipe(res)
    readStream.on('error', function () {
      next()
    })
  }

  function compressFilter(req, res) {
    return (/svg|json|text|javascript/).test(res.getHeader('Content-Type'))
  }

  function setCacheHeaders(req, res, next) {
    res.set(
      { 'Cache-Control': 'max-age=' + staticContentExpiry
      , 'Expires': staticContentExpiry
      })
    next()
  }

  var app = express()
    // .use(mappedVersion.middleware)
    .use(express.logger('dev'))
    .use(setCacheHeaders)
    .use('/responsive-grid', router)
    // Gzip Compression for static assets
    .use('/responsive-grid', express.compress({ filter: compressFilter }))
    .use('/responsive-grid', express.static(__dirname + '/', { maxAge: staticContentExpiry }))
    .use(notFound)

  return app
}
