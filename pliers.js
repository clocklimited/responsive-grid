module.exports = tasks

var path = require('path')
  , join = path.join
  , exec = require('child_process').exec
  , properties = require('./properties')()

function tasks(pliers) {

  function notify(message, title) {
    title = title || properties.projectTitle
    exec('osascript -e \'display notification "' + message + '" with title "' + title + '"\'')
  }

  // Tasks
  require('./pliers/css-render')(pliers)
  require('./pliers/jade-render')(pliers, properties)
  require('./pliers/structure')(pliers)
  require('./pliers/copy')(pliers)

  // Define the filesets
  pliers.filesets('css', join(__dirname, 'source', 'static', 'stylus', '**/*.styl'))
  pliers.filesets('resources',
    join(__dirname, 'source', 'static', '**/*'),
    join(__dirname, 'source', 'static', 'stylus', '**/*.styl'))
  pliers.filesets('jade', join(__dirname, 'source', 'templates', '**/*.jade'))

  pliers('build', 'copy', 'css', 'jade')

  pliers('watch', 'build', function () {

    pliers.watch(pliers.filesets.css, function () {
      pliers.run('css', function () {
        if (notify) notify('CSS updated')
      })
    })

    pliers.watch(pliers.filesets.resources, function () {
      pliers.run('copy', function () {
        if (notify) notify('Resources updated')
      })
    })

    pliers.watch(pliers.filesets.jade, function () {
      pliers.run('jade', function () {
        if (notify) notify('Jade updated')
      })
    })

    pliers.exec('node app')

  })

}
