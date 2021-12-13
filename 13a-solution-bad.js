// This solution works for example but not for the real input...
let input = require("fs")
  .readFileSync("./13-input.txt", "utf-8")
  .split("\n\n")

let dots = input[0].split("\n").map(e => e.split(",").map(Number))
let folds = input[1]
  .split("\n")
  .map(e => e.replace("fold along ", ""))
  .map(e => [e[0], Number(e.split("").slice(2).join(""))])

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

let xOverlaps = 0
folds.forEach((fold, index) => {
  // folds.slice(0, 1).forEach((fold, index) => {
  if (fold[0] == "y") {
    foldedSection = paper.slice(fold[1]).reverse()

    // console.log('paper')
    // console.log(paper.join('\n'))
    // console.log('endpaper')
    // console.log('foldedSection')
    // console.log(foldedSection.join('\n'))
    // console.log('endfoldedSection')
    paper = paper.slice(0, fold[1]).map((row, rowI) =>
      row.map((col, colI) => {
        if (
          foldedSection[rowI] != undefined &&
          (foldedSection[rowI][colI] == "X" || col == "X")
        ) {
          return "X"
        }
        return col
      })
    )
  }
  if (fold[0] == "x") {
    foldedSection = paper.map(e => e.slice(fold[1] + 1).reverse())

    // console.log('paper')
    // console.log(paper.join('\n'))
    // console.log('endpaper')
    console.log("foldedSection")
    console.log(foldedSection.map(e => e.join("")).join("\n"))
    // console.log('endfoldedSection')
    paper = paper
      .map(e => e.slice(0, fold[1]))
      .map((row, rowI) =>
        row.map((col, colI) => {
          if (col == "X" && foldedSection[rowI][colI] == "X") {
            xOverlaps++
            console.log("X overlap!")
          }
          if (
            foldedSection[rowI] != undefined &&
            foldedSection[rowI][colI] == "X"
          ) {
            return "X"
          }
          return col
        })
      )
  }

  console.log("paper after folds: ", index + 1)
  console.log(paper.map(e => e.join("")).join("\n"))
  console.log("-----")
})

// console.log("final")
console.log(paper.map(e => e.join("")).join("\n"))
console.log(
  "dots =",
  paper.reduce((a, b) => a + b.filter(e => e == "X").length, 0)
)
console.log(xOverlaps)
