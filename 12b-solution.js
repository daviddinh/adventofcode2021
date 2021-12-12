let input = require("fs")
  .readFileSync("./12-input.txt", "utf-8")
  .split("\n")
  .map((e) => e.split("-"));

let caves = [...new Set(input.reduce((a, b) => a.concat(b), []))];

let isConnected = (a, b) =>
  input.some((e) => e.includes(a) && e.includes(b) && a != b);

let isCompletedPath = (path) => path.includes("start") && path.includes("end");

let isMultipleLowerPath = (path) => {
  let lowerCaseElements = path
    .filter((e) => e !== "start")
    .filter((e) => e == e.toLowerCase());
  let counts = {};
  for (let e of lowerCaseElements) {
    counts[e] = counts[e] ? counts[e] + 1 : 1;
  }
  return Object.values(counts).some((e) => e > 1);
};

let paths = [["start"]];
let newCavesAdded = [];
let validPaths = [];
do {
  newPaths = [];
  newCavesAdded = [];
  // If there are any connected paths then lets add them
  paths
    .filter((path) => path[path.length - 1] !== "end")
    .forEach((path, i) => {
      let lastPoint = path[path.length - 1];
      caves
        .filter(
          (cave) =>
            cave != "start" &&
            isConnected(lastPoint, cave) &&
            (!path.includes(cave) ||
              cave == cave.toUpperCase() ||
              !isMultipleLowerPath(path))
        )
        .forEach((connection) => {
          newPaths.push(path.concat(connection));
          newCavesAdded.push(connection);
        });
    });
  paths = newPaths;
  paths.forEach((path) => {
    if (isCompletedPath(path)) {
      validPaths.push(path);
    }
  });
  console.log(paths);
} while (newCavesAdded.length);

console.log(validPaths);
console.log(validPaths.length);
