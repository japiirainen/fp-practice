function data() {
  return { a: 1, b: { c: 3, d: 4 } }
}

var tmp = data() || {}

var a = tmp.a !== undefined ? tmp.a : 42
var b = tmp.b || {}
var c = b.c
var d = b.d

function data(temp = {}) {
  var { a, b } = temp
}
