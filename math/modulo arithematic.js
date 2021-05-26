/*
Minimal subset
Subset of the smallest non-negative integers,
to which all other integers can be shown to be
congruent to
*/
function minK(k) {
    return Array(k).fill().map((_, i) => i);
}

/*
Smallest positive congruent number to n (mod k)
*/
function scn(n, k) {
    return n < 0 ?
        n % k + k :
        n % k;
}

/*
Returns if a and b are congruent
*/
function congruent(a, b, k) {
    return scn(a, k) === scn(b, k);
}

/*
multiplicative inverse of n in mod k
*/
function mi(n, k) {
    for (let i = 0; i < k; i++) {
        if (scn(n * i, k) === 1) return i;
    }
}

/*
smallest digit to be added to make n divisable by k
*/
function sd(n, k) {
    return k - scn(n, k);
}

/*
Congruent number set
first a numbers starting from n congruent to n in mod k
*/
function cns(a, n, k) {
    let set = [];
    if (a < 0) {
        for (let i = 0; i < -a; i++) {
            set.push(n + -i * k);
        }
    } else {
        for (let i = 0; i < a; i++) {
            set.push(n + i * k);
        }
    }
    return set;
}
