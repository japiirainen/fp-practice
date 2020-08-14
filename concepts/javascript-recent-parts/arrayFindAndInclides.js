var arr = [{ a: 1 }, { a: 2 }]

arr.find(val => val && val.a > 1)
arr.findIndex(val => val && val.a < 2)

var arr2 = [1, 2, NaN, 30, 20, 23]
arr.includes(20)
arr.includes(NaN)
