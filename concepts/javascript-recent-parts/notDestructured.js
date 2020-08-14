function data() {
  return [1, 2, 3, 4, 5]
}

var tmp = data()
var first = tmp[0]
var second = tmp[1]
var third = tmp[2]
var rest = tmp.slice(3)

function data2(tmp = []) {
  var [first = 10, second = 20, third = 30] = tmp
}

function data3() {
  return [1, [2, 3], 4]
}
var tmp = data3()

var first = tmp[0]
var tmp2 = tmp[1] || []
var second = tmp2[0]
var third = tmp2[1]
var fourth = tmp[2]
