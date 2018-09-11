'use strict'

const fs = require('fs')

function proximify(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, res) => err ? reject(err) : resolve(res))
    })
  }
}

exports.proximify = proximify
exports.readFile = proximify(fs.readFile)
exports.writeFile = proximify(fs.writeFile)
exports.unlink = proximify(fs.unlink)
exports.stat = proximify(fs.stat)
