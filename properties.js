var merge = require('lodash.merge')
  , defaultStylesheets = require('./defaults/stylesheets.json')
  , defaultPages = require('./defaults/pages.json')
  , properties =
      { port: (process.env.PORT || 6100)
      , numProcesses: 1
      , projectTitle: 'Static Site Template'
      , stylesheets: defaultStylesheets
      , pages: defaultPages

      // DOCUMENT HEAD
      // Makes up default `<title>` element which appear in browser tabs
      , browserTitle: 'Static Site Template'
      , browserStrapline: 'The starting point for static projects'

      // Standard Meta Tags
      , metaCreator: 'Clock Limited - www.clock.co.uk'
      , metaPublisher: '' // E.g: Client Parent Brand – http://www.clientparentbrand.com
      , metaAuthor: null // Blank, unless single author site: Firstname Lastname – http://twitter.com/username
      , metaDescription: 'Default Meta Description'
      , metaKeywords: 'Default, Meta, Keywords'

      // Device specifics
      , iosProjectTitle: 'Static Site' // 11-13 Chatracters
      , msTileProjectTitle: 'Static Site Template' // Up to 20 characters
      , msTileBackground: '#0095da'

      // ANALYTICS
      , domain: ''
      , analytics: ''
      }
  , environmentProperties =
      { development:
        {} // { stylesheets: merge([], baseStylesheets, ['test']) }
      , testing:
        {}
      , staging:
        {}
      , production:
        { numProcesses: 8
        }
      }

module.exports = function getProperties (environment) {

  properties.env = environment = environment || process.env.NODE_ENV || 'development'

  if (environmentProperties[environment] === undefined) {
    throw new RangeError('No properties for environment \'' + environment + '\'')
  }
  return merge({}, properties, environmentProperties[environment])
}
