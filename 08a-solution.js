let signals = require("fs")
  .readFileSync("./08-input.txt", "utf-8")
  .split("\n")
  .map(e => e.split(" | ").map(f => f.split(" ")))
  .map(e => [
    e[0].map(f => f.split("").sort().join("")),
    e[1].map(f => f.split("").sort().join("")),
  ])
  .reduce(
    (a, b) => a + b[1].filter(e => [2, 3, 4, 7].indexOf(e.length) != -1).length,
    0
  )

console.log(signals)
