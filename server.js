const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

// manage port
const port = process.env.PORT || 3000

//without express
const { createServer } = require('http')

app.prepare().then(() => {
  createServer(handler).listen(port)
  console.log(`Listening in port: ${port}`)
})
