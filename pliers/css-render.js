module.exports = task

var path = require('path')
  , join = path.join
  , renderStylus = require('stylus-renderer')
  , stylus = require('stylus')
  , autoprefixer = require('autoprefixer-stylus')
  // , versionator = require('versionator')
  , stylusMixins = require('stylus-mixins')
  , responsiveGrid = require('responsive-grid')
  , cleancss = require('./lib/clean-css')
  , properties = require('../properties')()
  , debug = properties.env === 'development'
  , middleware = [autoprefixer(), stylusMixins(), responsiveGrid()]

if (!debug) {
  middleware.push(cleancss())
}

function task(pliers) {

  pliers('css', function (done) {
    // var mappedVersion = versionator.createMapped(require(__dirname + '/../static-file-map.json'))

    renderStylus(properties.stylesheets.map(function (file) { return file + '.styl' }),
      { src: join(__dirname, '..', 'source', 'static', 'stylus')
      , dest: join(__dirname, '..', 'source', 'static', 'css')
      , use: middleware
      , stylusOptions: { compress: false, }
      , define:
        { versionPath: function (urlPath) {
            // return new stylus.nodes.Literal('url(' + mappedVersion.versionPath(urlPath.val) + ')')
            return new stylus.nodes.Literal('url(' + urlPath.val + ')')
          }
        }
      }
      , function (err) {
        if (err) {
          pliers.logger.error('Failed to render stylus')
          pliers.logger.error(err.message)
        }
        done()
      }).on('log', function (msg, level) { pliers.logger[level](msg) })
  })
}


