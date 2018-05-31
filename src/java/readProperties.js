var propertyRexp = /^\s*private\s+(?!(static|final))(transient|volatile|\s+)*(\w+)\s+(\w+).*;$/gm
function readProperties(src) {
  var properties = []
  var cap
  while ((cap = propertyRexp.exec(src)) != null) {
    properties.push({
      type: cap[3],
      name: cap[4]
    })
  }
  propertyRexp.lastIndex = 0
  return properties
}

module.exports = readProperties