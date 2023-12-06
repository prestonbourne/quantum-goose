const ALNUM_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const gates = [
  "H",
  "NOT",
  "CNOT",
  "Toffoli",
  "SWAP",
  "IDENTITY",
  "T",
  "S",
  "Z",
  "T",
  "S",
  "P",
  "RZ",
  "Measure",
  "Reset",
  "Barrier",
  "Control",
  "if",
  "SX",
  "SXdg",
  "Y",
  "RX",
  "RY",
  "RXX",
  "RZZ",
  "U",
  "rccx",
  "rc3x",
];

function getRandomSequence() {
  // if (minLength < 1 || maxLength < 1)
  //   throw new Error("Please ensure both numbers are greater than 0");
  // if (minLength > maxLength)
  //   throw new Error("minLength cannot be greater than maxLength");

  // const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  const randomNumber = Math.floor(Math.random() * 28);
  let result = "";
  // for (let i = 0; i < length; i++) {
  //   result += gates[Math.floor(Math.random() * gates.length)];
  // }
  return gates[randomNumber];
}

 // Print result
 function isAlnumChar(str) {
  if (str.length !== 1) return false;
  return /^[a-zA-Z0-9]+$/.test(str);
}

