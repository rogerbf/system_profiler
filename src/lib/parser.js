const separateAttributes = line => {
  if (line[line.length - 1] !== ':') {
    return {
      indentation: line.slice(0, line.match(/\w/).index).length,
      key: line.slice(0, line.indexOf(':')).trim(),
      value: line.slice(line.indexOf(':') + 1).trim(),
      parent: false
    }
  } else {
    return {
      indentation: line.slice(0, line.match(/\w/).index).length,
      key: line.slice(0, line.indexOf(':')).trim(),
      value: {},
      parent: true
    }
  }
}

module.exports = data => {
  let lastParentIndentation = 0
  let unClosedObjects = 0
  const processed = (
  '{'.concat(data.split('\n')
    .filter(line => line.match(/\w/))
    .map(line => separateAttributes(line))
    .reduce((accumulator, current, i, arr) => {
      if (i === 0) {
        if (current.parent) {
          lastParentIndentation = current.indentation
          unClosedObjects++
          return `"${current.key}": {`
        } else {
          return `{ "${current.key}" : "${current.value}" }`
        }
      } else {
        const previous = arr[i - 1]
        const next = arr[i + 1]
        if (previous.parent) {
          if (current.parent) {
            lastParentIndentation = current.indentation
            unClosedObjects++
            return accumulator.concat(`"${current.key}": {`)
          } else {
            if (next !== undefined && next.parent) {
              return accumulator.concat(`"${current.key}" : "${current.value}"`)
            } else {
              return accumulator.concat(`"${current.key}" : "${current.value}",`)
            }
          }
        } else {
          if (current.parent) {
            if (current.indentation >= lastParentIndentation) {
              unClosedObjects++
              return accumulator.concat(`,"${current.key}" : {`)
            } else {
              return accumulator.concat(`}, "${current.key}" : {`)
            }
          } else {
            if (next !== undefined && next.parent) {
              if (next.indentation < current.indentation) {
                unClosedObjects--
                return accumulator.concat(`"${current.key}" : "${current.value}"}`)
              } else {
                return accumulator.concat(`"${current.key}" : "${current.value}"`)
              }
            } else {
              if (next === undefined) {
                return accumulator.concat(`"${current.key}" : "${current.value}"`)
              } else {
                return accumulator.concat(`"${current.key}" : "${current.value}",`)
              }
            }
          }
        }
      }
    }, '')))

  if (unClosedObjects > 0) {
    return JSON.parse(processed.concat(Array(unClosedObjects).fill('}').join('')).concat('}'))
  } else {
    return JSON.parse(processed.concat('}'))
  }
}
