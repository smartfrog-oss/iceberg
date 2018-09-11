'use strict'

const Waterline = require('waterline')
const orm = new Waterline()
const path = require('path')
const endpointModel = require('./endpoint.model.js')
const Hoek = require('hoek')

const inMemoryOnly = process.env.NODE_ENV == 'test' ? true : false
const dbPath = process.env.DB_USE == 'red-blue' ? path.resolve(__dirname, '../../nedb-red-blue') : path.resolve(__dirname, '../../nedb')
const config = {

  adapters: {
    nedb: require('waterline-nedb')
  },

  connections: {
    appDB: {
      adapter: 'nedb',
      dbPath,
      inMemoryOnly // Enable in memory (no file access) mode.
    }
  }
}

const Endpoint = Waterline.Collection.extend(endpointModel)
orm.loadCollection(Endpoint)

orm.initialize(config, (err, models) => Hoek.assert(!err, err))

exports.register = function (server, options, next) {
  server.decorate('server', 'collections', () => orm.collections)
  next()
}

exports.register.attributes = {
    name: 'orm'
}