const child = require('child_process')
const zlib = require('zlib')
const { promisify } = require('util')

const exec = promisify(child.exec)
const gzip = promisify(zlib.gzip)

const compile = async (source, output) => {
  const bin = (await exec('npm bin')).stdout.replace(/\n/g, '')
  const cmd = `${bin}/webpack-cli ${source} --output ${output}`
  return exec(cmd)
}

exports.compile = compile

const counts = async data => {
  const compiled = data.length
  const gzipped = (await gzip(data)).length
  return { compiled, gzipped }
}
exports.counts = counts

const shield = (label, size) => {
  let color
  if (size > 500 * 1000) {
    color = 'red'
  }
  if (size < 500 * 1000) {
    color = 'yellow'
  }
  if (size < 100 * 1000) {
    color = 'yellowgreen'
  }
  if (size < 10 * 1000) {
    color = 'green'
  }
  if (size < 5000) {
    color = 'brightgreen'
  }
  const message = Math.round(size / 1000) + 'k'
  return `https://img.shields.io/badge/${label}%20bundle-${message}-${color}`
}
exports.shield = shield

const badges = sizes => {
  return {
    compiled: shield('compiled', sizes.compiled),
    gzipped: shield('gzipped', sizes.gzipped)
  }
}
exports.badges = badges
