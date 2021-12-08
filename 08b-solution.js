let signals = require("fs")
  .readFileSync("./08-input.txt", "utf-8")
  .split("\n")
  .map(e => e.split(" | ").map(f => f.split(" ")))
  .map(e => [
    e[0].map(f => f.split("").sort().join("")),
    e[1].map(f => f.split("").sort().join("")),
  ])

let decodeDigits = signalSet => {
  let patterns = signalSet[0].sort()
  let value = signalSet[1]

  let digits = Array(10).fill("")

  digits[1] = patterns.find(e => e.length == 2)
  digits[4] = patterns.find(e => e.length == 4)
  digits[7] = patterns.find(e => e.length == 3)
  digits[8] = patterns.find(e => e.length == 7)

  // 0, 6, 9
  let sixSegmentDigits = patterns.filter(e => e.length == 6)
  digits[6] = sixSegmentDigits.find(e => digits[7].split("").filter(f => e.includes(f)).length != 3)
  digits[9] = sixSegmentDigits.find(e => digits[4].split("").filter(f => e.includes(f)).length == 4)
  digits[0] = sixSegmentDigits.find(e => e != digits[6] && e != digits[9])

  // 2, 3, 5
  let fiveSegmentDigits = patterns.filter(e => e.length == 5)
  digits[3] = fiveSegmentDigits.find(e => digits[7].split("").filter(f => e.includes(f)).length == 3)
  digits[5] = fiveSegmentDigits.find(e => digits[6].split("").filter(f => e.includes(f)).length == 5)
  digits[2] = fiveSegmentDigits.find(e => e != digits[3] && e != digits[5])

  return Number(value.map(e => digits.indexOf(e)).join(""))
}

console.log(signals.map(e => decodeDigits(e)).reduce((a, b) => a + b, 0))
