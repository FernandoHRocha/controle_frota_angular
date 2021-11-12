const https = require('https')
const fs = require('fs')

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('test.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.post('/login', (req, res) => {
  res.json({message: 'ok'})
})

server.use(router)

const options = {
  cert: fs.readFileSync('./keys/cert.pem'),
  key: fs.readFileSync('./keys/key.pem')
}

https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running on :3001')
})