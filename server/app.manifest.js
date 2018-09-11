'use strict'

const manifest = {
  server: {
    connections: {
      routes: {
        cors: true
      }
    }
  },
  connections: [{
    port: process.env.PORT,
    host: process.env.HOST,
    labels: ['app']
  }],
  registrations: [{
    plugin: 'blipp'
  },
  {
    plugin: '../client/build/dev-server',
  }]
}

module.exports = manifest