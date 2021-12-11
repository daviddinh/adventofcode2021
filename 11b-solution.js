let nextStep = require("fs")
  .readFileSync("./11-input.txt", "utf-8")
  .split("\n")
  .map((e) => e.split("").map(Number));

function flashAtCoord(input, coordString) {
  let coords = coordString.split("-").map(Number);
  let newOcts = input.map((e, x) =>
    e.map((f, y) => {
      if (x == coords[0] - 1 || x == coords[0] || x == coords[0] + 1) {
        if (y == coords[1] - 1 || y == coords[1] || y == coords[1] + 1) {
          return f + 1;
        }
      }
      return f;
    })
  );
  return newOcts;
}

let flashCount = 0;

for (let i = 0; i < 500; i++) {
  let flashCoords = [];
  let newFlashCoords = [];
  if (nextStep.reduce((a, b) => a.concat(b), []).reduce((a, b) => a + b) == 0) {
    console.log(nextStep);
    console.log(i);
    return;
  }
  nextStep = nextStep.map((e) => e.map((f) => f + 1));
  do {
    newFlashCoords = [];
    nextStep.map((e, x) =>
      e.map((f, y) => {
        if (f > 9 && flashCoords.indexOf(x + "-" + y) == -1) {
          newFlashCoords.push(x + "-" + y);
          flashCount++;
        }
      })
    );
    newFlashCoords.forEach(function (e) {
      nextStep = flashAtCoord(nextStep, e);
    });

    flashCoords = flashCoords.concat(newFlashCoords);
  } while (newFlashCoords.length > 0);

  flashCoords.forEach(function (e) {
    let coords = e.split("-");
    nextStep[coords[0]][coords[1]] = 0;
  });
}
console.log(nextStep.join("\n"));
console.log(flashCount);
