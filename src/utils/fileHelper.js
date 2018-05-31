var fs = require('fs')

/**
 * 读取指定文件中的内容
 * @param {string} path 文件路径
 */
function readFile(path) {
  return fs.readFileSync(path, 'utf-8')
}

/**
 * 向指定路径中写入内容
 * @param {string} path 文件路径
 * @param {string} content 文件内容
 */
function writeFile(path, content) {
  fs.writeFileSync(path, content, 'utf-8')
}

/**
 * 匹配文件，返回匹配的路径数组
 * @param {string} path 路径
 * @param {RegExp} pattern 文件匹配正则表达式
 */
function matchFile(path, pattern) {
  var stat = fs.statSync(path)
  if (stat.isDirectory()) {
    if (pattern == null) {
      return []
    }
    var arr = fs.readdirSync(path)
    return arr.filter(pattern.test)
  } else if (stat.isFile()) {
    return [path]
  }
}

/**
 * 匹配文件，返回匹配的路径的文件的内容+路径数组
 * @param {string} path 路径
 * @param {RegExp} pattern 文件匹配正则表达式
 */
function readMatchPath(path, pattern) {
  return matchFile(path, pattern).map(p => ({
    src: readFile(p),
    path: p,
  }))
}

module.exports = {
  readFile,
  writeFile,
  matchFile,
  readMatchPath,
}