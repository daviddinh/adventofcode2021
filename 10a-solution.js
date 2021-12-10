let navigationSubsystem = require("fs")
  .readFileSync("./10-input.txt", "utf-8")
  .split("\n")
  .map(e => e.split(""))

function findCorruptCharacter(line) {
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
  return corruptCharacter
}
console.log(
  navigationSubsystem
    .map(e => findCorruptCharacter(e))
    .filter(e => e)
    .reduce((a, b) => {
      switch (b) {
        case ")":
          return a + 3
        case "]":
          return a + 57
        case "}":
          return a + 1197
        case ">":
          return a + 25137
      }
    }, 0)
)
