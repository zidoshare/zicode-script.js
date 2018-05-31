
var importRegxp = /\s*import\s+([.\w]+)\s*;/gm

function addImport(src, className) {
  var currentClassNameRegExp = new RegExp(`\\s*import\\s+${className}\\s*;`, 'g')
  if (currentClassNameRegExp.test(src)) {
    currentClassNameRegExp.lastIndex = 0
    return src
  }
  var cap
  var index
  while (cap = importRegxp.exec(src)) {
    index = importRegxp.lastIndex
  }
  src = src.substring(0, index) + `\nimport ${className};` + src.substring(index, src.length)
  importRegxp.lastIndex = 0
  return src
}

module.exports = addImport