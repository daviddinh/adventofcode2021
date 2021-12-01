let numberOfIncrements = 
  require("fs")
  .readFileSync("./01-input.txt", "utf-8")
  .split("\n")
  .map(Number)
  .filter((e,i,a) => 
    ((e + a[i-1] + a[i-2]) > (a[i-1] + a[i-2] + a[i-3])))
  .length

console.log(numberOfIncrements)