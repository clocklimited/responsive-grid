module.exports = task

var path = require('path')
  , join = path.join
  , jade = require('jade')
  , fs = require('node-fs')
  // , versionator = require('versionator')
  , merge = require('lodash.merge')
  , defaults =
    { jadeOptions:
      { pretty: false
      , basedir: __dirname + '/../source/templates'
      }
    }

function task(pliers, properties) {

  pliers('jade', function (done) {

    // var mappedVersion = versionator.createMapped(require(__dirname + '/../static-file-map.json'))
    properties.pages.forEach(function (p) {
      var options = {
        src: join(__dirname, '..', 'source', 'templates', 'pages')
      , dest: join(__dirname, '..')
      , locals: { properties: properties }
      }
      // , locals: { properties: properties, versionPath: mappedVersion.versionPath }

      // Extend defaults with user options
      options = merge({}, defaults, options)

      var src = join(options.src, p.template + '.jade')
        , dest = join(options.dest, p.template, 'index.html')

      if (p.template === 'index') dest = join(options.dest, 'index.html') // Stops getting `index/` folder

      fs.readFile(src, 'utf8', function (err, data) {
        pliers.logger.debug('Reading ' + src)
        if (err) {
          pliers.logger.error('Failed to render jade:')
          return pliers.logger.error(err.message)
        }
        try {
          pliers.logger.debug('Compiling ' + src)
          var jadeOptions = options.jadeOptions
          jadeOptions.filename = src
          var template = jade.compile(data, jadeOptions)
          if (!p.data) p.data = {}
          p.data = merge({}, options.locals, p.data)

          var folderDest = dest.substring(0, dest.lastIndexOf('/'));

          fs.mkdir(folderDest, 0777, true, function (error) {
            if (!error) {
              pliers.logger.debug('Directory created:')
              pliers.logger.debug(folderDest);

              fs.writeFile(dest, template(p.data), function (err) {
                pliers.logger.debug('Writing ' + src)
                if (!err) {
                  pliers.logger.debug('Rendered ' + p.template + '.jade → ' + p.template + '/index.html')
                  done()
                } else {
                  pliers.logger.error('Failed to render jade:')
                  pliers.logger.error(err.message)
                }
              })
            } else {
              pliers.logger.error('Failed to build directory:')
              pliers.logger.error(err.message)
            }
          })
        } catch (e) {
          pliers.logger.error('Failed to render jade:')
          pliers.logger.error(e.message)
        }

      })

    })

  })

}
