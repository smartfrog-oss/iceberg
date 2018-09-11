'use strict'

const { schema } = require('../orm/endpoint.model')

const { runRegression, getAllShots, acceptChange } = require('../services/execute.service')

exports.register = function(server, options, next) {
  const { endpoint } = server.collections()
  server.route([
    {
    path: '/',
    method: 'GET',
    config: { description: 'get all the endpoint items' },
    async handler(req, rep) {
      const rows = await endpoint.find({})
      rep(rows)
    }
  },
  {
    path: '/{id}',
    method: 'GET',
    config: { description: 'get a specific endpoint item' },
    async handler(req, rep) {
      const row = await endpoint.findOne({ where: { id: req.params.id }})
      if(!row) return rep({})
      const data = {endpoint: row, shots: getAllShots(row.url) }
      rep(data)
    }
  },
  {
    path: '/run/{id}',
    method: 'GET',
    config: { description: 'run test on endpoint' },
    async handler(req, rep) {
      const row = await endpoint.findOne({ where: { id: req.params.id }})
      await endpoint.update(req.params.id, {status: 'running', lastCheck: new Date().toLocaleString()})
      const details = await runRegression(row.url)
      let status = true
      Object.keys(details[row.url]).forEach(key => {
        status = status && details[row.url][key].match
      })

      await endpoint.update(req.params.id, { status, details: details[row.url] })
      rep(status)
    }
  },
  {
    path: '/',
    method: 'POST',
    config: {
      description: 'set a new endpoint item',
      validate: { payload: schema }
    },
    async handler(req, rep) {
      const toCreate = {...req.payload, lastCheck: new Date().toLocaleString()}
      const row = await endpoint.create(toCreate)
      rep(row)
    }
  },
  {
    path: '/accept/{id}/{breakpoint}',
    method: 'POST',
    config: {
      description: 'set fishy as legit'
    },
    async handler(req, rep) {
      const {id, breakpoint} = req.params
      const row = await endpoint.findOne({ where: { id }})
      if(!row) return rep(false)
      const result = acceptChange(row.url, breakpoint)
      rep(result)
    }
  }
  , {
    path: '/{id}',
    method: 'PUT',
    config: {
      description: 'update a specific endpoint item',
      validate: { payload: schema }
    },
    async handler(req, rep) {
      rep(status)
    }

  }, {
    path: '/{id}',
    method: 'DELETE',
    config: { description: 'delete a specific endpoint item' },
    async handler(req, rep) {
      await endpoint.destroy(req.params.id)
      const row = await endpoint.findOne({ where: { id: req.params.id }})
      rep(row)
      }
    }
  ])

  next()
}

exports.register.attributes = {
  name: 'endpoint'
}


