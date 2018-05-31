var parseClassName = require('./parseClassName')
var readProperties = require('./readProperties')
/**
 * 创建复制函数
 * @param {string} src content
 * @param {number} line line
 * @param {object} opt options 
 */
function createCopyFunction(src, opt) {
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
			funcName: 'copyFrom',
			returnThis: false,
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

	var template = `/**\n*copy from other ${className} \n*\n* @param other the other ${className}\n*/\npublic ${returnName} ${opt.funcName}(${className} other) {\n`
	template = template + properties.map(property => {
		return `if (other.${property.name} != null) {\nthis.${property.name} = other.${property.name};\n}`
	}).join('\n')
	if (opt.returnThis) {
		template += '\nreturn this;'
	}
	template += '\n}'
	lines.splice(opt.line, 0, template)
	return lines.join('\n')
}


module.exports = createCopyFunction