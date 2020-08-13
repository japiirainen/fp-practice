//greedy
const makeChange = (coins, amount) => {
  coins.sort((a, b) => b - a)
  let coinTotal = 0
  let i = 0
  while (amount > 0) {
    if (coins[i] <= amount) {
      amount -= coins[i]
      coinTotal++
    } else {
      i++
    }
  }
  return coinTotal
}

console.log(makeChange([5, 10, 25], 40))
console.log(makeChange([1, 6, 10], 12))
//brute force
const cache = {}
const coins = [1, 6, 10]
const makeChange2 = value => {
  if (cache[value]) return cache[value]
  if (value === 0) return 0
  let minCoins
  coins.forEach(coins => {
    if (value - coins >= 0) {
      let currMinCoins = makeChange2(value - coins)
      if (minCoins === undefined || currMinCoins < minCoins) {
        minCoins = currMinCoins
      }
    }
  })
  cache[value] = minCoins + 1
  return cache[value]
}
console.log(makeChange2(12))
