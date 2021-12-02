let plannedCourse = 
  require("fs").readFileSync("./02-input.txt", "utf-8")
  .split("\n")
  .map(e => e.split(" "))
  .map(e => [e[0], Number(e[1])])
  .reduce((a, b) => {
    if(b[0] == 'forward') {
      a[0] += b[1]
      a[1] += b[1] * a[2]
    }
    if(b[0] == 'up')   a[2] -= b[1]
    if(b[0] == 'down') a[2] += b[1]
    return a
  }, [0, 0, 0])// [horizontal, depth, aim]

console.log(plannedCourse[0] * plannedCourse[1])