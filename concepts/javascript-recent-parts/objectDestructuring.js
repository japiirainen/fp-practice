function data() {
  return { a: 1, b: { c: 3, d: 4 } }
}
var tmp
var { a = 42, b: { c, d } = {}, ...rest } = (tmp = data() || {})

function data({ a, b } = {}) {
  //..
}

var obj = {
  a: 1,
  b: {
    x: 2,
  },
  c: [3, 4, 5],
}

var {
  a,
  b,
  b: { x },
  c,
  c: [y, u, i] = [],
} = obj
console.log(c)
console.log(y, u, i)

//exercise

var defaults = {
  topic: 'JavaScript',
  format: 'Live',
  slides: {
    start: 0,
    end: 100,
  },
}

fakeAjax('http://get-the-workshop-tld', handleResponse)

function handleResponse({ topic = 'JavaScript', format = 'Live', slides: { start = 0, end = 100 } } = {}) {
  TestCase({
    topic,
    format,
    slides: {
      end,
      start,
    },
  })
}

function TestCase(data) {
  console.log(
    data.topic == 'JS Recent Parts' && data.format == 'Live' && data.slides.start == 0 && data.slides.end == 77
  )
}
