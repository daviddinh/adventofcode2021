let currentState = require("fs")
  .readFileSync("./06-input.txt", "utf-8")
  .split(",")
  .map(Number)

for (let index = 1; index <= 80; index++) {
  let numberOfNewFish = 0
  currentState = currentState.map((e, i, a) => {
    e -= 1
    if (e < 0) {
      e = 6
      numberOfNewFish++
    }
    return e
  })
  if (numberOfNewFish > 0) {
    currentState = currentState.concat(new Array(numberOfNewFish).fill(8))
  }
}

console.log(currentState.length)
