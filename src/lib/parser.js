const plist = require('plist')

module.exports = xml => {
  return plist.parse(xml)
}
