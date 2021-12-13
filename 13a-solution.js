let input = require("fs")
  .readFileSync("./13-input.txt", "utf-8")
  .split("\n\n")

let dots = input[0].split("\n").map(e => e.split(",").map(Number))
let folds = input[1]
  .split("\n")
  .map(e => e.replace("fold along ", ""))
  .map(e => [e[0], Number(e.split("").slice(2).join(""))])

folds.slice(0,1).forEach((fold, index) => {
  if (fold[0] == "y") {
    dots = dots.map(e => {
      if (e[1] > fold[1]) {
        e = [e[0], e[1] - 2 * (e[1] - fold[1])]
      }
      return e
    })
  }
  if (fold[0] == "x") {
    dots = dots.map(e => {
      if (e[0] > fold[1]) {
        e = [e[0] - 2 * (e[0] - fold[1]), e[1]]
      }
      return e
    })
  }
})

console.log(new Set(dots.map(e => e.toString())).size)