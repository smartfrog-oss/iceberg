'use strict'
const _joi = require('waterline-joi')

const model = {
  identity: 'endpoint',
  connection: 'appDB',
  migrate: 'safe',
  attributes: {
    status: {
      type: 'string',
      defaultsTo: 'never run'
    },
    details: {
      type: 'json',
      defaultsTo: { mobile: { match: false }, laptop: { match: false }, laptopL: { match: false }, tablet: { match: false } }
    },
    lastCheck: {
      type: 'string'
    },
    url: {
      type: 'string',
      required: true,
      unique: 'true'
    },
    name: {
      type: 'string',
      required: true
    },
    id: {
      type: 'string',
      primaryKey: true,
      autoIncrement: true
    }
  }
}

module.exports = model

module.exports.schema = _joi(model.attributes)
