const firn = require('firn')
const path = require('path')
const fs = require('fs')

const resolve = pth => path.resolve(__dirname, '../', pth)

const legitShotPath = resolve('shots/legit')
const fishyShotPath = resolve('shots/fishy')
const tmpShotPath = fishyShotPath

const config = { legitShotPath, fishyShotPath, tmpShotPath }

async function runRegression(url) {
 const [, res] = await firn(url, config)
 return res
}

function getAllShots(url) {
  return { legit: getShots(url, legitShotPath), fishy: getShots(url, fishyShotPath) }
}

function acceptChange(url, breakpoint) {
  try {
    const imgPath = getShots(url, fishyShotPath)[breakpoint]
    fs.copyFileSync(path.join(fishyShotPath, imgPath), path.join(legitShotPath, imgPath))
    return true

  } catch {
    return false
  }
}

/* utils */
// Copied from firn
function getPaths(url, { suffix = '', base, extension = 'png' } = {}) {
  const { host, pathname } = new URL(url)
  let name = pathname.replace('/', '').replace(/[^a-zA-Z0-9]/g, '_')
  name = name ? name : 'index'
  suffix = suffix ? `@${suffix}` : ''
  const folder = `${host}`
  const file = `${folder}/${name}${suffix}.${extension}`
  return file
}

function getShots(url, base) {
  const breakPoints = ['mobile', 'tablet', 'laptop', 'laptopL']
  const shots = {}
  breakPoints.forEach(suffix => {
    shots[suffix] = getPaths(url, { suffix, base })
  })
  return shots
}



exports.runRegression = runRegression
exports.getAllShots   = getAllShots
exports.acceptChange  = acceptChange