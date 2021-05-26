function my_scn() {
    let n = parseFloat(document.getElementById("congruent_n").value);
    let k = parseFloat(document.getElementById("mod").value);
    document.getElementById("ma_answer").innerHTML = `smallest positive ${scn(n,k)}`;
};
function my_mi() {
    let n = parseFloat(document.getElementById("congruent_n").value);
    let k = parseFloat(document.getElementById("mod").value);
    document.getElementById("ma_answer").innerHTML = `multiplicative inverse ${mi(n,k)}`;
}
function my_sd() {
    let n = parseFloat(document.getElementById("congruent_n").value);
    let k = parseFloat(document.getElementById("mod").value);
    document.getElementById("ma_answer").innerHTML = `smallest digit needed to be added ${sd(n,k)}`;
}
function checkcongruent() {
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    let abk = parseFloat(document.getElementById("modabk").value);
    document.getElementById("checkcongruent_answer").innerHTML=congruent(a,b,abk);
}

function my_set() {
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    let abk = parseFloat(document.getElementById("modabk").value);
    document.getElementById("checkcongruent_answer").innerHTML=cns(a,b,abk);
}

function toDegrees (angle) {
    return angle * (180 / Math.PI);
}
function toRadians (angle) {
    return angle * (Math.PI / 180);
}
function rtd() {
    let r = parseFloat(document.getElementById("convertrtd").value);
    document.getElementById("rtd").innerHTML = `${r} radians = ${toDegrees(r)} degrees`;
}
function dtr() {
    let d = parseFloat(document.getElementById("convertdtr").value);
    document.getElementById("dtr").innerHTML = `${d} degrees = ${toRadians(d)} radians`;
}
function solvetrig() {
    let sideA = parseFloat(document.getElementById("sideA").value);
    let sideB = parseFloat(document.getElementById("sideB").value);
    let sideC = parseFloat(document.getElementById("sideC").value);
    let angleA = parseFloat(document.getElementById("angleA").value);
    let angleB = parseFloat(document.getElementById("angleB").value);
    let angleC = parseFloat(document.getElementById("angleC").value);
    let ans = triangleSolver(sideA, sideB, sideC, angleA, angleB, angleC);
    console.log(ans);
    document.getElementById("solvetrig").innerHTML = `side A = ${ans[0]}    side B = ${ans[1]}   side C = ${ans[2]}   <br>  angle A = ${ans[3]}    angle B = ${ans[4]}     angle C = ${ans[5]}`
}
