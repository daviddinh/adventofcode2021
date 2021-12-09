let heatMap = require("fs")
  .readFileSync("./09-input.txt", "utf-8")
  .split("\n")
  .map(e => e.split("").map(Number))

let basinLowPoints = heatMap
  .map((row, rowIndex, rowArray) => {
    return row
      .map((column, columnIndex, columnArray) => {
        if (
          (columnArray[columnIndex - 1] == undefined ||
            column < columnArray[columnIndex - 1]) &&
          (columnArray[columnIndex + 1] == undefined ||
            column < columnArray[columnIndex + 1]) &&
          (rowArray[rowIndex - 1] == undefined ||
            column < rowArray[rowIndex - 1][columnIndex]) &&
          (rowArray[rowIndex + 1] == undefined ||
            column < rowArray[rowIndex + 1][columnIndex])
        ) {
          return [rowIndex, columnIndex]
        } else {
          return null
        }
      })
      .filter(e => e && e.length)
  })
  .reduce((a, b) => a.concat(b), [])

basinSizes = basinLowPoints.map(e => {
  let basinPoints = [e]
  let newBasinPoints = [e]
  while (newBasinPoints.length != 0) {
    newBasinPoints = []
    basinPoints.map(e => {
      if (
        heatMap[e[0]] != undefined &&
        heatMap[e[0]][e[1] - 1] != undefined &&
        heatMap[e[0]][e[1] - 1] >= heatMap[e[0]][e[1]] &&
        heatMap[e[0]][e[1] - 1] < 9 &&
        !basinPoints.some(f => f[0] == e[0] && f[1] == e[1] - 1) &&
        !newBasinPoints.some(f => f[0] == e[0] && f[1] == e[1] - 1)
      ) {
        newBasinPoints.push([e[0], e[1] - 1])
      }
      if (
        heatMap[e[0]][e[1] + 1] != undefined &&
        heatMap[e[0]][e[1] + 1] >= heatMap[e[0]][e[1]] &&
        heatMap[e[0]][e[1] + 1] < 9 &&
        !basinPoints.some(f => f[0] == e[0] && f[1] == e[1] + 1) &&
        !newBasinPoints.some(f => f[0] == e[0] && f[1] == e[1] + 1)
      ) {
        newBasinPoints.push([e[0], e[1] + 1])
      }
      if (
        heatMap[e[0] + 1] != undefined &&
        heatMap[e[0] + 1][e[1]] != undefined &&
        heatMap[e[0] + 1][e[1]] >= heatMap[e[0]][e[1]] &&
        heatMap[e[0] + 1][e[1]] < 9 &&
        !basinPoints.some(f => f[0] == e[0] + 1 && f[1] == e[1]) &&
        !newBasinPoints.some(f => f[0] == e[0] + 1 && f[1] == e[1])
      ) {
        newBasinPoints.push([e[0] + 1, e[1]])
      }
      if (
        heatMap[e[0] - 1] != undefined &&
        heatMap[e[0] - 1][e[1]] != undefined &&
        heatMap[e[0] - 1][e[1]] >= heatMap[e[0]][e[1]] &&
        heatMap[e[0] - 1][e[1]] < 9 &&
        !basinPoints.some(f => f[0] == e[0] - 1 && f[1] == e[1]) &&
        !newBasinPoints.some(f => f[0] == e[0] + 1 && f[1] == e[1])
      ) {
        newBasinPoints.push([e[0] - 1, e[1]])
      }
    })
    basinPoints.push(...newBasinPoints)
  }
  return basinPoints.length
})

console.log(
  basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1)
)