const system_profiler = require('./lib/bin.js')
const inspect = require('util').inspect

system_profiler('SPUSBDataType')
  .then(data => {

    const processed = data
      .split('\n')
      .reduce((accumulator, line, i, arr) => {
        if (line.length > 0) {
          if (line[line.length - 1] === ':') {
            return accumulator.concat(
              `"${accumulator[accumulator.length - 1] === '\n' ? '}' : ''}${line.trim().slice(0, -1)}" : {`
              )
          }
          else {
            return accumulator.concat(
              `"${line.slice(0, line.indexOf(':')).trim()}":"${line.slice(line.indexOf(':') + 1).trim()}",`
            )
          }
        }
        else {
          return accumulator
        }
      }, '').concat('}')

    console.log(processed)

  })
  .catch(err => console.error(error))
