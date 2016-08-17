const system_profiler = require('./lib/bin.js')

system_profiler()
  .then(data => {
    console.log(
      data
        .split('\n')
        .filter(line => line.length > 0)
    )
  })
  .catch(err => console.error(error))

/*
header: 4 spaces
kv pair: 6 spaces
*/
