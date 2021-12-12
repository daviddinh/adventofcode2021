let input = require("fs")
  .readFileSync("./12-input.txt", "utf-8")
  .split("\n")
  .map((e) => e.split("-"));

let caves = [...new Set(input.reduce((a, b) => a.concat(b), []))];

let isConnected = (a, b) =>
  input.some((e) => e.includes(a) && e.includes(b) && a != b);

let isValidPath = (path) => path.includes("start") && path.includes("end");

console.log(caves);
let paths = [["start"]];
let newCavesAdded = [];
let validPaths = [];
do {
  newPaths = [];
  newCavesAdded = [];
  // If there are any connected paths then lets add them
  paths
    .filter((path) => path[path.length - 1] !== "end")
    .forEach((path) => {
      let lastPoint = path[path.length - 1];
      caves
        .filter(
          (cave) =>
            isConnected(lastPoint, cave) &&
            (!path.includes(cave) || cave == cave.toUpperCase())
        )
        .forEach((connection) => {
          newPaths.push(path.concat(connection));
          newCavesAdded.push(connection);
        });
    });
  paths = newPaths;
  paths.forEach((path) => {
    if (isValidPath(path)) {
      validPaths.push(path);
    }
  });
} while (newCavesAdded.length);

console.log(validPaths.length);
