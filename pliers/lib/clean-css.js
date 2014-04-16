module.exports = function() {
  return function(style){
    style = this || style;

    style.on('end', function(err, css){
      return require('clean-css')().minify(css);
    })
  }
}
