const system_profiler = require('./lib/bin.js')

system_profiler()
  .then(data => {
    console.log(
      data
        .split('\n')
        .slice(1)
        .filter(line => line.length > 0)
        .map(line => {
          return {
            indentation: line.slice(0, line.match(/\w/).index).length,
            text: line.trim()
          }
        })
    )
  })
  .catch(err => console.error(error))
