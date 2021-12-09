let heightMap = require("fs")
  .readFileSync("./09-input.txt", "utf-8")
  .split("\n")
  .map(e => e.split("").map(Number))
  .map((row, rowIndex, rowArray) => {
    return row.filter((column, columnIndex, columnArray) => {
      return (
        (columnArray[columnIndex - 1] == undefined ||
          column < columnArray[columnIndex - 1]) &&
        (columnArray[columnIndex + 1] == undefined ||
          column < columnArray[columnIndex + 1]) &&
        (rowArray[rowIndex - 1] == undefined ||
          column < rowArray[rowIndex - 1][columnIndex]) &&
        (rowArray[rowIndex + 1] == undefined ||
          column < rowArray[rowIndex + 1][columnIndex])
      )
    })
  })
  .reduce((a, b) => a.concat(b), [])
  .map(e => e + 1)
  .reduce((a, b) => a + b, 0)
console.log(heightMap)
