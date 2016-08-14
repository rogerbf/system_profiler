const exec = require('child_process').execFile

module.exports = () => {
  return new Promise((resolve, reject) => {
    exec('system_profiler', ['-xml'], { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
      if (err) reject(err)
      resolve(stdout.trim())
    })
  })
}
