const jsonServer = require('json-server')
import { Express } from 'express'

import { handleAuthorization } from './authz'

import * as fs from 'fs'
import * as https from 'https'

import {handleAuthentication} from './auth'

const server: Express = jsonServer.create()
const router = jsonServer.router('test.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.post('/login', handleAuthentication)
server.use('/vehicle', handleAuthorization)


server.use(router)

const options = {
  cert: fs.readFileSync('./keys/cert.pem'),
  key: fs.readFileSync('./keys/key.pem')
}

https.createServer( options, server).listen(3001, () => {
  console.log('JSON Server is running on https://localhost:3001')
})