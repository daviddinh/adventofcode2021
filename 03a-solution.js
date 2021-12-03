let diagnosticReport = 
  require("fs").readFileSync("./03-input.txt", "utf-8")
  .split("\n")
  .map(e => e.split(""))

let dimensions = diagnosticReport[0].length
let counts = diagnosticReport.reduce((a,b) => {
  b.map((e, i) => {
    if(e == '1') a[i]++
    else a[i]--
  })
  return a
}, new Array(dimensions).fill(0)) 

let gammaBinary = counts.map(e => {
  if (e > 0) return 1
  return 0
}).join("")

let epsilonBinary = counts.map(e => {
  if (e < 0) return 1
  return 0
}).join("")

let gamma = parseInt(gammaBinary, 2);
let epsilon = parseInt(epsilonBinary, 2);


// let powerConsumption = 
console.log(gamma * epsilon)
