module.exports = function getAccessibleRoutes(pages) {
  var allRoutes = {}
  pages.forEach(function (page) {
    if (!page.hidden) {
      var routes = page.route
      if (!routes) {
        routes = [ '/' + page.template ]
      }
      if (!Array.isArray(routes)) {
        routes = [ routes ]
      }
      routes.forEach(function (route) {
        allRoutes[route] = page.template
      })

    }
  })
  return allRoutes
}
