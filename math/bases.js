/* works on node v12.18.0

Convert numbers between bases 2 and 36
Supports fractions (separate with a period '.')

*/

// recommended between 9 and 12
const FLOATING_POINT_PRECISION = 12;

// result precision (higher = more accurate result, min = 1)
const RESULT_PRECISION = 15;

/**
 * Reverses a string
 * @param {string} string 
 * @returns {string}
 */
function reverseStr(string) {
    let buildStr = "";
    for (let i = string.length - 1; i > -1; i--) {
        buildStr += string[i];
    }
    return buildStr;
}

const digitMap = Object.freeze({
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15,
    'G': 16,
    'H': 17,
    'I': 18,
    'J': 19,
    'K': 20,
    'L': 21,
    'M': 22,
    'N': 23,
    'O': 24,
    'P': 25,
    'Q': 26,
    'R': 27,
    'S': 28,
    'T': 29,
    'U': 30,
    'V': 31,
    'W': 32,
    'X': 33,
    'Y': 34,
    'Z': 35,
});

const decimalMap = Object.freeze({
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F',
    16: 'G',
    17: 'H',
    18: 'I',
    19: 'J',
    20: 'K',
    21: 'L',
    22: 'M',
    23: 'N',
    24: 'O',
    25: 'P',
    26: 'Q',
    27: 'R',
    28: 'S',
    29: 'T',
    30: 'U',
    31: 'V',
    32: 'W',
    33: 'X',
    34: 'Y',
    35: 'Z',
});

/**
 * @param {string} number 
 * @param {number} baseIn 
 * @param {number} baseOut 
 * 
 * @returns {string}
 */
function convert(number, baseIn, baseOut) {
    // reverse the string because numbers are read from the rightmost digit to leftmost digit
    number = reverseStr(number);

    // map the digits to their values (base 10)
    let base10Digits = [];
    let fractionalDigits = 0;
    for (let i = 0; i < number.length; i++) {
        if (number[i] === '.') {
            fractionalDigits = i;
            continue;
        }
        base10Digits.push(digitMap[number[i]]);
    }
    let wholeNumberDigits = base10Digits.length - fractionalDigits;

    // calculate the whole number part (base 10)
    let base10WholeNumber = 0;
    for (let i = 0; i < wholeNumberDigits; i++) {
        base10WholeNumber += base10Digits[i + fractionalDigits] * baseIn ** i;
    }

    // calculate the fractional number part (base 10)
    let base10Fraction = 0;
    for (let i = 0; i < fractionalDigits; i++) {
        base10Fraction += base10Digits[i] * baseIn ** (0 - fractionalDigits + i);
        // fix the number to a given precision
        base10Fraction = parseFloat(base10Fraction.toFixed(FLOATING_POINT_PRECISION));
    }

    // convert the base 10 whole number part into a number of base baseOut
    let baseOutWholeNumber = "";
    do {
        baseOutWholeNumber += decimalMap[base10WholeNumber % baseOut];
        base10WholeNumber = Math.trunc(base10WholeNumber / baseOut);
    } while (base10WholeNumber !== 0);

    if (base10Fraction === 0) return reverseStr(baseOutWholeNumber);

    // convert the base 10 fractional part into a number of base baseOut
    let baseOutFraction = "";
    let i = 0;
    do {
        base10Fraction *= baseOut;
        // fix the number to a given precision
        base10Fraction = parseFloat(base10Fraction.toFixed(FLOATING_POINT_PRECISION));
        baseOutFraction += decimalMap[Math.trunc(base10Fraction)];
        base10Fraction %= 1;
        base10Fraction = parseFloat(base10Fraction.toFixed(FLOATING_POINT_PRECISION));
        i++;
    } while (base10Fraction !== 0 && i !== RESULT_PRECISION);

    return reverseStr(baseOutWholeNumber) + "." + baseOutFraction;
}

const readline = require("readline");
let rl = readline.createInterface(process.stdin, process.stdout);

let number, baseIn, baseOut;

rl.question("Enter a number: ", answer => {
    number = answer;
    rl.question("Enter the base of the number: ", answer => {
        baseIn = answer;
        rl.question("Enter the base of the converted number: ", answer => {
            baseOut = answer;
            rl.write(convert(number, baseIn, baseOut));
            rl.close();
        });
    });
});
