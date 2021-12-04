let input = require("fs")
  .readFileSync("./04-test-input.txt", "utf-8")
  .split("\n\n");

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
// console.log(cardsWithColumns);

numbers.reduce((a, b, i, arr) => {
  let markedNumbers = a.concat(b);
  let winningCards = cardsWithColumns.filter((e, i) => {
    e.filter((f) =>
      // F is a row or a column
      f.every((j) => markedNumbers.includes(j))
    ).length;
  });

  if(winningCards.length == 1) {
    console.log(winningCards.slice(0,5))
    arr = []
  }
  // for each one lets check each card. see if there is a row
  // that is fully complete, then take out these marked numbers
  // from the original cards to work out the total
  return markedNumbers;
}, []);

// console.log(markedNumbers);
