const fs = require('fs')
const { EventEmitter } = require('events')

global.bus = new EventEmitter()

fs.readdir(__dirname + '/', (err, files) => {
  files.filter((file) => file.match(/\.js$/) && !file.match(/index.js/))
        .map((file) => require(`./${file}`))
})
