let navigationSubsystem = require("fs")
  .readFileSync("./10-input.txt", "utf-8")
  .split("\n")
  .map(e => e.split(""))

function findStacks(line) {
  let stack = []
  let corruptCharacter = ""
  let i = 0
  while (corruptCharacter == "" && line[i] !== undefined) {
    if (line[i] == "(" || line[i] == "[" || line[i] == "{" || line[i] == "<")
      stack.push(line[i])
    if (line[i] == ")") {
      if (stack[stack.length - 1] == "(") {
        stack.pop()
      } else {
        corruptCharacter = ")"
      }
    }
    if (line[i] == "]") {
      if (stack[stack.length - 1] == "[") {
        stack.pop()
      } else {
        corruptCharacter = "]"
      }
    }
    if (line[i] == "}") {
      if (stack[stack.length - 1] == "{") {
        stack.pop()
      } else {
        corruptCharacter = "}"
      }
    }
    if (line[i] == ">") {
      if (stack[stack.length - 1] == "<") {
        stack.pop()
      } else {
        corruptCharacter = ">"
      }
    }
    i++
  }
  if (corruptCharacter == "") {
    return stack
  }
}

function findCompleteStackScores(stack) {
  return stack
    .reduceRight((a, b) => {
      switch (b) {
        case "(":
          a.push(1)
          break
        case "[":
          a.push(2)
          break
        case "{":
          a.push(3)
          break
        case "<":
          a.push(4)
          break
      }
      return a
    }, [])
    .reduce((a, b) => a * 5 + b, 0)
}

let incompleteStacks = navigationSubsystem
  .map(e => findStacks(e))
  .filter(e => e)
  .map(e => findCompleteStackScores(e))
  .sort((a, b) => a - b)

console.log(incompleteStacks[Math.floor(incompleteStacks.length / 2)])
