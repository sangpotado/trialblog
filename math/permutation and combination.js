// works on node v12.18.0
/** factorial function */
function fact(num) {
    var val = 1;
    for (var i = 2; i <= num; i++)
        val = val * i;
    return val;
}

/**
 * Permutations without Repetition
 * @param {*} n 
 * @param {*} r 
 * @param {*} s
 */
function v(n, r, s = r) {
    let sum = 0;
    if (s < r) [r, s] = [s, r];
    for (let i = r; i <= s; i++) {
        sum += (fact(n)) / (fact(n - i));
    }
    return sum;
}

/**
 * Permutations with Repetition
 * @param {*} n 
 * @param {*} r 
 * @param {*} s
 */
function vPrime(n, r, s = r) {
    let sum = 0;
    if (s < r) [r, s] = [s, r];
    for (let i = r; i <= s; i++) {
        sum += n ** i;
    }
    return sum;
}

/**
 * Combinations without Repetition
 * @param {*} n 
 * @param {*} r 
 * @param {*} s
 */
function c(n, r, s = r) {
    let sum = 0;
    if (s < r) [r, s] = [s, r];
    for (let i = r; i <= s; i++) {
        sum += (fact(n)) / (fact(i) * fact(n - i));
    }
    return sum;
}

/**
 * Combinations with Repetition
 * @param {*} n 
 * @param {*} r 
 * @param {*} s
 */
function cPrime(n, r, s = r) {
    let sum = 0;
    if (s < r) [r, s] = [s, r];
    for (let i = r; i <= s; i++) {
        sum += (fact(i + n - 1)) / (fact(i) * fact(n - 1));
    }
    return sum;
}

/**
 * @param {Function} f 
 * @param {Number} n 
 * @param {Number} r 
 * @param {Number} s 
 */
function sigma(f, n, r, s = r) {
    let sum = 0;
    if (s < r) [r, s] = [s, r];
    for (let i = r; i <= s; i++) {
        sum += f(n, i, s);
    }
    return sum;
}
/*
When the order doesn't matter it is a Combination (c).
(Indistinguishable objects)

When the order matters it is a Permutation (v).
(Distinguishable objects)

For repetition choose prime
(With exclusion)

n is the number of things to choose from
and we choose r of them
upto and including s
*/
