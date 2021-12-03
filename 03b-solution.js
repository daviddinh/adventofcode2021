let diagnosticReport = require("fs")
  .readFileSync("./03-input.txt", "utf-8")
  .split("\n")
  .map(e => e.split(""))

function getFirstDigitCount(diagnosticReport) {
  return diagnosticReport.reduce((a, b) => {
    if (b[0] == "1") return (a += 1)
    return (a -= 1)
  }, 0)
}

function getOxygenBinary(diagnosticReport) {
  if (diagnosticReport.length == 1) {
    return diagnosticReport[0].join("")
  }
  if (getFirstDigitCount(diagnosticReport) >= 0) {
    var oxygenDigit = "1"
    var newDiagnosticReport = diagnosticReport
      .filter(e => e[0] == "1")
      .map(e => e.slice(1))
  } else {
    var oxygenDigit = "0"
    var newDiagnosticReport = diagnosticReport
      .filter(e => e[0] == "0")
      .map(e => e.slice(1))
  }

  return oxygenDigit + getOxygenBinary(newDiagnosticReport)
}

function getCarbonBinary(diagnosticReport) {
  if (diagnosticReport.length == 1) {
    return diagnosticReport[0].join("")
  }

  if (getFirstDigitCount(diagnosticReport) < 0) {
    var carbonDigit = "1"
    var newDiagnosticReport = diagnosticReport
      .filter(e => e[0] == "1")
      .map(e => e.slice(1))
  } else {
    var carbonDigit = "0"
    var newDiagnosticReport = diagnosticReport
      .filter(e => e[0] == "0")
      .map(e => e.slice(1))
  }
  return carbonDigit + getCarbonBinary(newDiagnosticReport)
}

let oxygen = parseInt(getOxygenBinary(diagnosticReport), 2)
let carbon = parseInt(getCarbonBinary(diagnosticReport), 2)

console.log(oxygen * carbon)
