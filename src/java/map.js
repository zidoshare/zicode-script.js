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
      valueType: 'Object',
    },
    ...opt,
  }
  src = src.replace(/(\r|\n)*$/, '')
  var funcName = opt.funcName
  var line = opt.line
  var className = parseClassName(src)
  var properties = readProperties(src)
  var lines = src.split('\n')

  var template = `/**\n*map ${className} \n*\n* @return new map contains not null value\n*/\npublic Map<String,${opt.valueType}> ${funcName}() {\n Map<String,${opt.valueType}> map = new HashMap<>(${properties.length});\n`

  properties.forEach(prop => {
    template += `if(this.${prop.name} != null) {\n`
    if (opt.valueType == 'Object' || prop.type == 'String') {
      template += `map.put("${prop.name}",this.${prop.name});\n`
    } else if (prop.type == 'Date') {
      template += `map.put("${prop.name}",this.${prop.name}.getTime() + "");\n`
    } else {
      template += `map.put("${prop.name}",this.${prop.name}.toString());\n`
    }
    template += `}\n`
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
      valueType: 'Object',
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
  var template = `/**\n*map ${className} \n*\n* @param map other map contains properties\n*/\npublic ${returnName} ${funcName}(Map<String,${opt.valueType}> map) {\n `

  properties.forEach(prop => {
    if (opt.valueType == 'Object') {
      template += `if(map.get("${prop.name}") != null) {\nthis.${prop.name} = (${prop.type})map.get("${prop.name}");\n}\n`
    }
    else {
      template += `if(map.get("${prop.name}") != null) {\n`
      if (prop.type == 'String') {
        template += `this.${prop.name} = map.get("${prop.name}");\n`
      } else if (prop.type == 'Date') {
        template += `this.${prop.name} = new Date(Long.valueOf(map.get("${prop.name}")));\n`
      } else if (prop.type == 'Long' || prop.type == 'Integer' || prop.type == 'Byte' || prop.type == 'Float') {
        template += `this.${prop.name} = ${prop.type}.valueOf(map.get("${prop.name}"));\n`
      }
      template += `}\n`
    }
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