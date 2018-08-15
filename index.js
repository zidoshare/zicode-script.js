#!/usr/bin/env node

var program = require('commander')

var copyProperties = require('./src').copyProperties
var fromMap = require('./src').fromMap
var toMap = require('./src').toMap
var readFromList = require('./src').readFromList
var printProperties = require('./src').printProperties
var printJson = require('./src').printJson
var path = require('path')
var fileName, line

program.version('1.0.2', '-v, --version')
program.option('-c, --copy-properties', 'Add peppers')
program.option('--func-name [name]', 'set function name')
program.option('--value-type [type]', 'set map value type just Object|String', function (type) {
	return type == 'String' ? 'String' : 'Object'
})
program.option('-t, --to-map', 'create to map function')
program.option('-f, --from-map', 'create from map function')
program.option('-p, --print-properties', 'print class\'s properties string arr')
program.option('-r, --read-from-list', 'create read from list function')
program.option('-j,--json','print json to terminal')
program.option('--to-base-level','object to base type')
program.arguments('[path]')
	.action(function (path) {
		fileName = path
	})
program.option('-l, --line [number]', 'set line', parseInt)

program.parse(process.argv)

if (!fileName) {
	console.error('must set file path')
	return
}
fileName = path.resolve(process.cwd(), fileName)

var opt = {
	line: program.line,
	valueType: program.valueType,
  toBaseLevel:program.toBaseLevel,
}
if (opt.line == null) {
	opt.line = -1
}
if (opt.valueType == null) {
	opt.valueType = 'Object'
}
if (program.funcName) {
	opt.funcName = program.funcName
}
if (program.copyProperties) {
	copyProperties(fileName, opt)
}

if (program.fromMap) {
	fromMap(fileName, opt)
}

if (program.toMap) {
	toMap(fileName, opt)
}

if (program.printProperties) {
	printProperties(fileName)
}

if (program.readFromList) {
	readFromList(fileName, opt)
}
if(program.json){
  printJson(fileName,opt) 
}
