const system_profiler = require('./lib/bin.js')
const parse = require('./lib/parser.js')

system_profiler()
  // .then(data => Promise.resolve(parse(data)))
  .then(data => process.stdout.write(data))
  .catch(err => console.error(error))
