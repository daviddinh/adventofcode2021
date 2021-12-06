let currentState = require("fs")
  .readFileSync("./06-input.txt", "utf-8")
  .split(",")
  .map(Number)
  .reduce((a, b) => {
    a[b] = a[b] + 1
    return a
  }, Array(9).fill(0))

for (let index = 1; index <= 256; index++) {
  currentState.push(currentState[0])
  currentState[7] += currentState[0]
  currentState.shift()
}

console.log(currentState.reduce((a, b) => a + b, 0))
