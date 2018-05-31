var fs = require('fs')

var propertyRexp = /^\s*private\s+(?!(static|final))(transient|volatile|\s+)*(\w+)\s+(\w+).*;$/gm
var classNameRexp = /^\s*public class (\w+)/gm
/**
 * 创建复制函数
 * @param {string} content content
 * @param {number} line line
 * @param {object} opt options 
 */
function createCopyFunction(content, opt) {
	if (!content) {
		console.error('no file content')
		return
	}
	var classCap = classNameRexp.exec(content)
	var className = classCap[1]
	var returnName = 'void'
	if (opt.returnThis) {
		returnName = className
	}
	var properties = []
	var cap
	while ((cap = propertyRexp.exec(content)) != null) {
		properties.push({
			type: cap[3],
			name: cap[4]
		})
	}
	var lines = content.split('\n')

	var template = `/**\n*copy from other ${className} \n*\n* @param other the other ${className}\n*/\npublic ${returnName} ${opt.funcName}(${className} other) {\n`
	template = template + properties.map(property => {
		return `if (other.${property.name} != null) {\nthis.${property.name} = other.${property.name};\n}`
	}).join('\n') + '\n}'
	lines.splice(opt.line, 0, template)
	return lines.join('\n')
}

function copyProperties(path, opt) {
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
	var content = createCopyFunction(fs.readFileSync(path, 'utf-8'), opt)
	fs.writeFileSync(path, content, 'utf-8')
}

module.exports = copyProperties