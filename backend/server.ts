const jsonServer = require('json-server')
const Express = require('express')
const PORT = 3001

import { Request, Response } from 'express'
import { handleAuthorization } from './authz'

import * as fs from 'fs'
import * as https from 'https'

import { handleAuthentication } from './auth'

const server = jsonServer.create()
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

https.createServer( options, server).listen(PORT, () => {
  console.log('JSON-SERVER on port', PORT)
})