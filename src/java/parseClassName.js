var classNameRexp = /^\s*public class (\w+)/gm

module.exports = function (src) {
  var classCap = classNameRexp.exec(src)
  classNameRexp.lastIndex = 0
  return classCap[1]
}