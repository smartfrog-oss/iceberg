'use strict'

const path = require('path')
const resolve = pth => path.resolve(__dirname, '../', pth) 

exports.register = async function(server, options, next) {
  server.route([
    {
      path: '/{param*}',
      method: 'GET',
      config: { description: 'get shot' },
      handler: {
        directory: {
          path: resolve('shots'),
          listing: false
        }
      }
    }
  ])
  next()
}

exports.register.attributes = {
  name: 'shots'
}