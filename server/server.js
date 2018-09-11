'use strict'

require('./env')
require('./hooks')

const path = require('path')
const { compose } = require('glue')
const Hoek = require('hoek')

const manifests = new Map([['API', require('./api.manifest')], ['APP', require('./app.manifest')]])
const servers = new Map()
const composeOptions = { relativeTo: path.resolve(__dirname) }

if (!process.env.NO_API) composer('API')
if (!process.env.NO_UI) composer('APP')

async function composer(id) {
  const manifest = manifests.get(id)
  const server = await compose(manifest, composeOptions)

  servers.set(id, server)
  if (module.parent) return // no need to start server for TEST
  server.start(console.log)
}

module.exports = (serverId) => servers.get(serverId)
