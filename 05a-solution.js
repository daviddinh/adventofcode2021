let list = require("fs")
  .readFileSync("./05-input.txt", "utf-8")
  .split("\n")
  .map((e) => e.split(" -> ").map((f) => f.split(",").map(Number)));

// console.log(list);
let flattenedList = list
  .reduce((a, b) => a.concat(b), [])
  .reduce((a, b) => a.concat(b), []);
let maxDimension = Math.max(...flattenedList) + 1; // To account for 0-index
let map = Array.from(Array(maxDimension), () =>
  new Array(maxDimension).fill(0)
);

list.forEach((e) => {
  if (e[0][1] == e[1][1]) {
    let low = Math.min(e[0][0], e[1][0])
    let high = Math.max(e[0][0], e[1][0])
    for (let i = low; i <= high; i++) {
      map[i][e[0][1]] += 1;
    }
  }
  if (e[0][0] == e[1][0]) {
    let low = Math.min(e[0][1], e[1][1])
    let high = Math.max(e[0][1], e[1][1])
    for (let i = low; i <= high; i++) {
      map[e[0][0]][i] += 1;
    }
  }
});
// console.log(map.map((e) => e.join("")).join("\n"));
let intersectCount = map
  .reduce((a, b) => a.concat(b), [])
  .filter((e) => e > 1).length;
console.log(intersectCount);
