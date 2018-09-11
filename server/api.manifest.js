'use strict'

const debug = process.env.NODE_ENV == 'test' ? {} : { request: ['error'] }

const manifest = {
  server: {
    debug,
    connections: {
      routes: {
        cors: true
      }
    }
  },
  connections: [{
    port: process.env.PORT|0 + 1,
    host: process.env.HOST,
    labels: ['api']
  }],
  registrations: [{
    plugin: 'blipp'
  },{
    plugin: 'inert'
  },
  {
    plugin: './orm'
  },
  {
    plugin: './api/endpoint.api',
    options: {
      routes: {
        prefix: '/v1/endpoint'
      }
    }
  },
  {
    plugin: './api/shots.api',
    options: {
      routes: {
        prefix: '/public'
      }
    }
  }
  ]
}

module.exports = manifest