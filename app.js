var clusterMaster = require('clustered')
  , domain = require('domain')
  , http = require('http')
  , app = require('./server')()
  , properties = require('./properties.js')()
  , getRoutes = require('./lib/get-accessible-routes')
  , routes = getRoutes(properties.pages)

clusterMaster(function () {

  var serverDomain = domain.create()

  serverDomain.run(function () {

    var server = http.createServer(function (req, res) {

      var resd = domain.create()
      resd.add(req)
      resd.add(res)

      resd.on('error', function (error) {
        console.error('Error', error, req.url)
        resd.dispose()
      })

      return app(req, res)
    }).listen(process.env.PORT || properties.port, function () {
      console.log(
      [ ''
      , '  Connect server listening on http://localhost:' + server.address().port
      , ''
      , '  Available routes:'
      , '  `' + Object.keys(routes).join('`, \n  `') + '`'
      , ''
      ].join('\n')
      )
    })
  })

},
{ size: properties.numProcesses}
)
