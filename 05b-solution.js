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
  let xy1 = e[0];
  let xy2 = e[1];
  if (xy1[1] == xy2[1]) {
    for (let i = Math.min(xy1[0], xy2[0]); i <= Math.max(xy1[0], xy2[0]); i++) {
      map[i][xy1[1]] += 1;
    }
  } else if (xy1[0] == xy2[0]) {
    for (
      let i = (low = Math.min(xy1[1], xy2[1]));
      i <= Math.max(xy1[1], xy2[1]);
      i++
    ) {
      map[xy1[0]][i] += 1;
    }
  } else {
    if (xy1[0] > xy2[0]) {
      xy1 = e[1];
      xy2 = e[0];
    }
    let gradient = (xy2[1] - xy1[1]) / (xy2[0] - xy1[0]);
    if (gradient == 1) {
      for (let i = 0; i <= Math.abs(xy2[0] - xy1[0]); i++) {
        map[xy1[0] + i][xy1[1] + i] += 1;
      }
    } else {
      for (let i = 0; i <= Math.abs(xy2[0] - xy1[0]); i++) {
        map[xy1[0] + i][xy1[1] - i] += 1;
      }
    }
  }
});

// console.log(map.map((e) => e.join("")).join("\n"));

let intersectCount = map
  .reduce((a, b) => a.concat(b), [])
  .filter((e) => e > 1).length;
console.log(intersectCount);
