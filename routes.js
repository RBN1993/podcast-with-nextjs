const routes = (module.exports = require('next-routes')())

// add(nameUrl,formatUrl,targetPage)
routes
  .add('index')
  /* example url: /posta.id */
  .add('channel', '/:slug.:id')
  .add('podcast', '/:slugChannel.:idChannel/:slug.:id', 'podcast')
