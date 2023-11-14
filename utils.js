/**
 * @fileoverview - This file contains all the utility functions used in the game.
 */


/**
 * All the characters that are allowed in a sequence.
 * @const {string}
*/
const ALNUM_CHARS =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";



/**
 * Generates a random sequence of alphanumeric characters with a length between minLength and maxLength (inclusive).
 * @param {number} minLength - The minimum length of the sequence.
 * @param {number} maxLength - The maximum length of the sequence.
 * @returns {string} The randomly generated sequence.
 * @throws {Error} If either minLength or maxLength is less than 1, or if minLength is greater than maxLength.
 */
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

/**
 * Checks if a given string is an alphanumeric character.
 * @param {string} str - The string to check.
 * @returns {boolean} - Returns true if the string is an alphanumeric character, false otherwise.
 */
function isAlnumChar(str) {
    if (str.length !== 1) return false;
    return /^[a-zA-Z0-9]+$/.test(str);
}


