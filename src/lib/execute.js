const exec = require('child_process').execFile
const parse = require('./parser.js')

module.exports = (dataType) => {
  if (dataType) {
    return new Promise((resolve, reject) => {
      exec('system_profiler', [ dataType ], { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
        if (err) reject(err)
        resolve(parse(stdout.trim()))
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      exec('system_profiler', { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
        if (err) reject(err)
        resolve(parse(stdout.trim()))
      })
    })
  }
}
