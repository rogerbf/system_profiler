const system_profiler = require('./lib/bin.js')
// const parse = require('./lib/parser.js')

system_profiler()
  // .then(data => Promise.resolve(parse(data)))
  .then(data => {
    console.log(
      data
        .split('\n')
        .filter(line => line.length > 0)
        .map(line => {
          if (line.slice(0, 6) === '      ') {
            return 'KEY/VALUE PAIR ' + line
          } else {
            return 'HEADER           ' + line
          }
        })
    )
  })
  .catch(err => console.error(error))

/*
header: 4 spaces
kv pair: 6 spaces
*/
