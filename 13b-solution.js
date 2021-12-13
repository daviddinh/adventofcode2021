let input = require("fs").readFileSync("./13-input.txt", "utf-8").split("\n\n")

let dots = input[0].split("\n").map(e => e.split(",").map(Number))
let folds = input[1]
  .split("\n")
  .map(e => e.replace("fold along ", ""))
  .map(e => [e[0], Number(e.split("").slice(2).join(""))])

folds.forEach((fold, index) => {
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

let paperDimensions = [
  Math.max(...dots.map(e => e[0])),
  Math.max(...dots.map(e => e[1])),
]
let paper = []

for (let i = 0; i <= paperDimensions[1]; i++) {
  paper[i] = []
}

for (let i = 0; i <= paperDimensions[1]; i++) {
  for (let j = 0; j <= paperDimensions[0]; j++) {
    paper[i][j] = "."
  }
}

dots.forEach(dot => {
  paper[dot[1]][dot[0]] = "X"
})

console.log(paper.map(e => e.join("")).join("\n"))
