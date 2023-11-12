const ALNUM_CHARS =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getRandomSequence(minLength, maxLength) {

  if (minLength < 1 || maxLength < 1)
    throw new Error("Please ensure both numbers are greater than 0");
  if (minLength > maxLength)
    throw new Error("minLength cannot be greater than maxLength");

 

  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  let result = "";
  for (let i = 0; i < length; i++) {
    result += ALNUM_CHARS.charAt(Math.floor(Math.random() * ALNUM_CHARS.length));
  }
  return result;
}

function isAlnum(str) {
    return ALNUM_CHARS.includes(str);
}


