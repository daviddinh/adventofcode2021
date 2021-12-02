let plannedCourse = 
  require("fs").readFileSync("./02-input.txt", "utf-8")
  .split("\n")
  .map(e => e.split(" "))
  .map(e => [e[0], Number(e[1])])
  .reduce((a, b) => {
    if(b[0] == 'forward') a[0] += b[1]
    if(b[0] == 'up')      a[1] -= b[1]
    if(b[0] == 'down')    a[1] += b[1]
    return a
  }, [0, 0])
  .reduce((a, b) => a * b, 1)

console.log(plannedCourse)