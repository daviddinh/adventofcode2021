let input = require("fs").readFileSync("./04-input.txt", "utf-8").split("\n\n");

let numbers = input[0].split(",").map(Number);

let cards = input.slice(1).map((e) =>
  e
    .replaceAll("  ", " ")
    .split("\n")
    .map((f) => f.trim().split(" ").map(Number))
);

function addCardColumns(card) {
  let cardRows = card;
  // each row add the element to the corresponding column
  // Weird: prototype Array(card[0].length).fill([]) isn't equivalent to the below.
  let cardColumns = [[], [], [], [], []];

  cardRows.map((e) => {
    e.map((f, j) => {
      cardColumns[j].push(f);
    });
  });

  return card.concat(cardColumns);
}

cardsWithColumns = cards.map((e) => addCardColumns(e));

let winningOrder = [];
numbers.some((_, i) => {
  let markedNumbers = numbers.slice(0, i);
  // Part(b) we just need to know which the last card is rather than the first
  let winningCards = cardsWithColumns.filter((e, k) => {
    if (
      e.filter((f) =>
        // F is a row or a column
        f.every((j) => markedNumbers.includes(j))
      ).length
    ) {
      if (!winningOrder.includes(k)) {
        winningOrder.push(k);
      }
      return true;
    }
  });
  if (winningCards.length == cardsWithColumns.length) {
    // remove the columns again so we don't double count
    let winningCard = winningCards[winningOrder.pop()].slice(0, 5);
    let unmarkedNumbersSum = winningCard
      .reduce((a, b) => a.concat(b), [])
      .filter((e) => !markedNumbers.includes(e))
      .reduce((a, b) => a + b, 0);
    let lastMarkedNumber = markedNumbers.slice().pop();
    let score = unmarkedNumbersSum * lastMarkedNumber;
    // console.log("winningCard", winningCards[0].slice(0, 5));
    // console.log("markedNumbers", markedNumbers);
    // console.log("sumOfUnmarkedNumbers", unmarkedNumbersSum);
    // console.log("lastMarkedNumber", lastMarkedNumber);
    console.log("score", score);
    return true;
  }
  return false;
});
