module.exports = task

var path = require('path')
  , join = path.join
  , copy = require('directory-copy')

function task(pliers) {

  pliers('copy', 'structure', function (done) {

    copy(
      { src: join(__dirname, '..', 'source', 'static')
      , dest: join(__dirname, '..', 'static')
      , logger: pliers.logger
      , excludes: [/^\./, /^stylus\/$/]
      }, function (err) {
        if (err) {
          pliers.logger.error('Failed to copy static assets')
          pliers.logger.error(err.message)
        }
        done()
      }).on('log', function (msg, level) { pliers.logger[level](msg) })

  })

}
