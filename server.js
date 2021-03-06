const { createServer } = require('http')
const { parse } = require('url')
const { join } = require('path')

const dev = process.env.NODE_ENV !== 'production'

const next = require('next')
const routes = require('./routes')
const port = process.env.PORT || 3000
const app = next({ dev })
const pagesHandler = routes.getRequestHandler(app)

function staticHandler(req, res) {
  const parsedUrl = parse(req.url, true)
  const rootStaticFiles = ['/service-worker.js']
  if (parsedUrl.pathname === '/favicon.ico') {
    const filePath = join(__dirname, 'static', parsedUrl.pathname)
    app.serveStatic(req, res, filePath)
  } else if (rootStaticFiles.includes(parsedUrl.pathname)) {
    const filePath = join(__dirname, '.next', parsedUrl.pathname)
    app.serveStatic(req, res, filePath)
  } else {
    pagesHandler(req, res, parsedUrl)
  }
}

app.prepare().then(() => {
  createServer(staticHandler).listen(port)
  console.log('Listening in port: ' + port)
})
