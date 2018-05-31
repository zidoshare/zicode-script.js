#!/usr/bin/env node

var program = require('commander')

var copyProperties = require('./java/copyProperties')

var path = require('path')
var fileName, line

program.version('0.0.1', '-v, --version')
program.option('-c, --copyProperties', 'Add peppers')
program.arguments('<path>')
	.action(function (path) {
		fileName = path
	})
program.option('-l, --line [number]', 'set line', parseInt)

program.parse(process.argv)

if (program.copyProperties) {
	if (!fileName) {
		console.error('must set file path')
		return
	}
	fileName = path.resolve(process.cwd(), fileName)
	console.log(fileName)
	copyProperties(fileName, program.line)
}