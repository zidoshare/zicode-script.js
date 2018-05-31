var parseClassName = require('./parseClassName')
var addImport = require('./addImport')
var readProperties = require('./readProperties')
function createToMapFunction(src, opt) {
  if (typeof opt == 'number') {
    opt = {
      line: opt
    }
  }
  if (opt.line == null) {
    console.error('must set line number')
    return
  }
  opt = {
    ...{
      funcName: 'toMap',
    },
    ...opt,
  }
  src = src.replace(/(\r|\n)*$/, '')
  var funcName = opt.funcName
  var line = opt.line
  var className = parseClassName(src)
  var properties = readProperties(src)
  var lines = src.split('\n')

  var template = `/**\n*map ${className} \n*\n* @return new map contains not null value\n*/\npublic Map<String,Object> ${funcName}() {\n Map<String,Object> map = new HashMap<String,Object>(${properties.length});\n`

  properties.forEach(prop => {
    template += `if(this.${prop.name} != null) {\nmap.put("${prop.name}",this.${prop.name});\n}\n`
  })
  template += 'return map;\n}'
  lines.splice(line, 0, template)
  var result = lines.join('\n')
  result = addImport(result, 'java.lang.String')
  result = addImport(result, 'java.util.HashMap')
  result = addImport(result, 'java.util.Map')
  return result
}

function createFromMapFunction(src, opt) {
  if (typeof opt == 'number') {
    opt = {
      line: opt
    }
  }
  if (opt.line == null) {
    console.error('must set line number')
    return
  }
  opt = {
    ...{
      funcName: 'fromMap',
      returnThis: false,
    },
    ...opt,
  }
  src = src.replace(/(\r|\n)*$/, '')
  var funcName = opt.funcName
  var line = opt.line
  var className = parseClassName(src)
  var properties = readProperties(src)
  var lines = src.split('\n')
  var returnName = 'void'
  if (opt.returnThis) {
    returnName = className
  }
  var template = `/**\n*map ${className} \n*\n* @param map other map contains properties\n*/\npublic ${returnName} ${funcName}(Map<String,Object> map) {\n `

  properties.forEach(prop => {
    template += `if(map.get("${prop.name}") != null) {\nthis.${prop.name} = (${prop.type})map.get("${prop.name}");\n}\n`
  })
  if (opt.returnThis) {
    template += 'return this;\n'
  }
  template += '}\n'
  lines.splice(line, 0, template)
  var result = lines.join('\n')
  result = addImport(result, 'java.lang.String')
  result = addImport(result, 'java.util.Map')
  return result
}

module.exports = {
  createFromMapFunction,
  createToMapFunction,
}