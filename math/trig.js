/* works on node v12.18.0
Reference triangle
  C
  |\
b | \ a
  |  \
  |___\
 A  c  B

*/

/*
cosine rule side
returns sideC
*/
function cosine_side(sideA, sideB, gamma) {
    let cSqr = sideA ** 2 + sideB ** 2 - 2 * sideA * sideB * Math.cos(gamma);
    return Math.sqrt(cSqr);
}

/*
cosine rule angle
returns cos(alpha)
*/
function cosine_angle(sideA, sideB, sideC) {
    return (sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC);
}

/*
sine rule side
returns sideC
*/
function sine_side(sideA, alpha, gamma) {
    return sideA * Math.sin(gamma) / Math.sin(alpha);
}

/*
sine rule angle
returns sin(beta) in radians
*/
function sine_angle(sideB, sideA, alpha) {
    return sideB * Math.sin(alpha) / sideA;
}

/*
calculate the third angle (degrees)
returns gamma in degrees
*/
function third_angle_deg(alpha, beta) {
    return 180 - alpha - beta;
}

/*
calculate the third angle (radians)
returns gamma in radians
*/
function third_angle_rad(alpha, beta) {
    return Math.PI - alpha - beta;
}

function deg_to_rad(degree) {
    return degree * Math.PI / 180;
}

function rad_to_deg(radian) {
    return radian * 180 / Math.PI;
}

function pythagoras(a, b) {
    return Math.sqrt(a ** 2 + b ** 2);
}

function printTriangle(a, b, c, alpha, beta, gamma) {
    console.log(`Side A: ${a}
Side B: ${b}
Side C: ${c}
alpha: ${alpha}
beta: ${beta}
gamma: ${gamma}`);
}

/*
Takes angles in radians
returns angles in radians
minimum arguments:
1 side, 2 angles
2 sides, 1 angle
3 sides, 0 angles
*/
function triangleSolver(sideA, sideB, sideC, alpha, beta, gamma) {
    // check for 3 arguments
    let arg_len = 0;
    // check for atleast 1 side
    let side_count = 0;
    let angle_count = 0;
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i]) {
            arg_len++;
            if (i < 3) side_count++;
            else angle_count++;
        }
    }
    console.log("Arguments: " + arg_len);
    console.log("Sides: " + side_count);
    console.log("Angles: " + angle_count);
    if (arg_len < 3) return "Needs atleast 3 arguments!";
    if (side_count < 1) return "Needs atleast 1 side!";


    // 2+ angles
    if (angle_count > 1) {
        // get the remaining angle if not given
        if (!alpha) alpha = third_angle_rad(beta, gamma);
        else if (!beta) beta = third_angle_rad(alpha, gamma);
        else if (!gamma) gamma = third_angle_rad(alpha, beta);
    } else if (angle_count === 1) {
        if (alpha) {
            if (sideA && sideB) beta = Math.asin(sine_angle(sideB, sideA, alpha));
            if (sideA && sideC) gamma = Math.asin(sine_angle(sideC, sideA, alpha));
            if (sideB && sideC) {
                if (!sideA) sideA = cosine_side(sideB, sideC, alpha);
                if (!beta) beta = Math.asin(sine_angle(sideB, sideA, alpha));
                if (!gamma) gamma = Math.asin(sine_angle(sideC, sideA, alpha));
            }
        } else if (beta) {
            if (sideB && sideA) alpha = Math.asin(sine_angle(sideA, sideB, beta));
            if (sideB && sideC) gamma = Math.asin(sine_angle(sideC, sideB, beta));
            if (sideA && sideC) {
                if (!sideB) sideB = cosine_side(sideA, sideC, beta);
                if (!alpha) alpha = Math.asin(sine_angle(sideA, sideB, beta));
                if (!gamma) gamma = Math.asin(sine_angle(sideC, sideB, beta));
            }
        } else if (gamma) {
            if (sideC && sideA) alpha = Math.asin(sine_angle(sideA, sideC, gamma));
            if (sideC && sideB) beta = Math.asin(sine_angle(sideB, sideC, gamma));
            if (sideA && sideB) {
                if (!sideC) sideC = cosine_side(sideA, sideB, gamma);
                if (!alpha) alpha = Math.asin(sine_angle(sideA, sideC, gamma));
                if (!beta) beta = Math.asin(sine_angle(sideB, sideC, gamma));
            }
        }
    } else {
        alpha = Math.acos(cosine_angle(sideA, sideB, sideC));
        beta = Math.asin(sine_angle(sideB, sideA, alpha));
        gamma = Math.asin(sine_angle(sideC, sideA, alpha));
    }

    // use sine rules to get the remaining sides
    if (sideA) {
        if (!sideB) sideB = sine_side(sideA, alpha, beta);
        if (!sideC) sideC = sine_side(sideA, alpha, gamma);
    } else if (sideB) {
        if (!sideA) sideA = sine_side(sideB, beta, alpha);
        if (!sideC) sideC = sine_side(sideB, beta, gamma);
    } else if (sideC) {
        if (!sideA) sideA = sine_side(sideC, gamma, alpha);
        if (!sideB) sideB = sine_side(sideC, gamma, beta);
    }

    return [sideA, sideB, sideC, alpha, beta, gamma];
}
