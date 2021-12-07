let horizontalPositions = require("fs")
  .readFileSync("./07-input.txt", "utf-8")
  .split(",")
  .map(Number)

let numberSummer = number =>
  Array(number)
    .fill(0)
    .map((_, i) => i + 1)
    .reduce((a, b) => a + b, 0)

totalFuels = horizontalPositions.map((e, i, arr) =>
  arr.reduce((a, b) => a + numberSummer(Math.abs(i - b)), 0)
)

console.log(Math.min(...totalFuels))
