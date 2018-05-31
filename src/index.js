var javaPattern = /.+\.java$/

var fileHelper = require('./utils/fileHelper')
var copyProperties = require('./java/copyProperties')
var map = require('./java/map')
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
  }
}