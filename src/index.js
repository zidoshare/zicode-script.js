var javaPattern = /.+\.java$/

var fileHelper = require('./utils/fileHelper')
var copyProperties = require('./java/copyProperties')
var parseClassName = require('./java/parseClassName')
var map = require('./java/map')
var readProperties = require('./java/readProperties')
var readFromList = require('./java/readFromList')
function createCopyFromFunction(path, opt) {
  var objs = fileHelper.readMatchPath(path, javaPattern)
  objs.forEach(obj => {
    fileHelper.writeFile(obj.path, copyProperties(obj.src, opt))
  })
}

module.exports = {
  copyProperties: createCopyFromFunction,
  fromMap: function (path, opt) {
    var objs = fileHelper.readMatchPath(path, javaPattern)
    objs.forEach(obj => {
      fileHelper.writeFile(obj.path, map.createFromMapFunction(obj.src, opt))
    })
  },
  toMap: function (path, opt) {
    var objs = fileHelper.readMatchPath(path, javaPattern)
    objs.forEach(obj => {
      fileHelper.writeFile(obj.path, map.createToMapFunction(obj.src, opt))
    })
  },
  printProperties: function (path) {
    var objs = fileHelper.readMatchPath(path, javaPattern)
    objs.forEach(obj => {
      var properties = readProperties(obj.src)
      console.log(parseClassName(obj.src) + ":   " + properties.map(prop => {
        return '"' + prop.name + '"'
      }).join(',') + '\n\n')
    })
  },
  readFromList: function (path, opt) {
    var objs = fileHelper.readMatchPath(path, javaPattern)
    objs.forEach(obj => {
      fileHelper.writeFile(obj.path, readFromList(obj.src, opt))
    })
  }
}