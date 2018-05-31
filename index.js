#!/usr/bin/env node

var program = require('commander')

var copyProperties = require('./src').copyProperties
var fromMap = require('./src').fromMap
var toMap = require('./src').toMap

var path = require('path')
var fileName, line

program.version('0.0.1', '-v, --version')
program.option('-c, --copy-properties', 'Add peppers')
program.option('--func-name', 'set function name')
program.option('-t, --to-map', 'create to map function')
program.option('-f, --from-map', 'create from map function')
program.arguments('<path>')
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
}
if (opt.line == null) {
	opt.line = -1
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