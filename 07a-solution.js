let totalFuels = require("fs")
  .readFileSync("./07-input.txt", "utf-8")
  .split(",")
  .map(Number)
  .map((e, _, arr) => {
    return arr.reduce((a, b) => a + Math.abs(e - b), 0)
  })

console.log(Math.min(...totalFuels))
