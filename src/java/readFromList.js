var readProperties = require('./readProperties')
var parseClassName = require('./parseClassName')
function readFromList(src, opt) {
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
      funcName: 'readFromList',
      returnThis: false,
      valueType: 'Object',
    },
    ...opt,
  }
  src = src.replace(/[\r\n]*$/g, '')
  if (!src) {
    console.error('no file content')
    return
  }
  var className = parseClassName(src)
  var returnName = 'void'
  if (opt.returnThis) {
    returnName = className
  }
  var properties = readProperties(src)
  var lines = src.split('\n')

  var template = `/**
*read properties from list
*
* @param list the list
**/
public static ${returnName} ${opt.funcName}(List<${opt.valueType}> list,String... fields) {
    ${className} obj = new ${className}();
    int index = 0;
    if(list.size() > fields.length){
        return ${opt.returnThis ? obj : ''};
    }
    for (String field : fields) {
        switch (field) {
`
  template = template + properties.map(prop => {
    if (opt.valueType == 'Object') {
      return `case "${prop.name}":
    obj.${prop.name} = list.get(index++);
    break;`
    } else {
      var str = `case "${prop.name}":\n`
      if (prop.type == 'String') {
        str += `obj.${prop.name} = list.get(index++);\n`
      } else if (prop.type == 'Date') {
        str += `obj.${prop.name} = new Date(Long.valueOf(list.get(index++)));\n`
      } else if (prop.type == 'Long' || prop.type == 'Integer' || prop.type == 'Byte' || prop.type == 'Float') {
        str += `obj.${prop.name} = ${prop.type}.valueOf(list.get(index++));\n`
      }
      str += `break;`
      return str
    }

  }).join('\n')
  template += '\n}\n}\n'
  if (opt.returnThis) {
    template += '\nreturn obj;'
  }
  template += '\n}'
  lines.splice(opt.line, 0, template)
  return lines.join('\n')
}

module.exports = readFromList