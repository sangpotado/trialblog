function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
let trn = document.getElementById("turn").innerHTML;
const getcom = document.getElementById("computer");
let computer = parseInt(getcom.innerHTML);
const gethuman = document.getElementById("human");
let human = parseInt(gethuman.innerHTML);
const status = document.getElementById("status");

function changepic() {

}
function rolldice () {
    let dc1 = Math.floor(Math.random() * 6) + 1;
    let dc2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice1").src = `d${dc1}.jpg`;
    document.getElementById("dice2").src = `d${dc2}.jpg`;
    let score = dc1 + dc2;
    status.innerHTML = `${trn} just got ${score}`;
    if (trn === "computer") {computer += score}
    else if (trn === "human") {human += score};
    if (dc1 === dc2) {trn = trn}
    else if ((dc1 !== dc2) && (trn ==="human")) {trn ="computer"}
    else if ((dc1 !== dc2) && (trn ==="computer")) {trn ="human"}
    document.getElementById("turn").innerHTML = trn;
    gethuman.innerHTML = human.toString();
    getcom.innerHTML = computer.toString();
    status.innerHTML += `, it's ${trn} next`;
}
function reset() {
    getcom.innerHTML = "0";;
    computer = 0;
    gethuman.innerHTML = "0";
    human = 0;
}
function checkstatus() {
    if ((computer >= 50) || (human >= 50)) {
        if (computer > human) {status.innerHTML = "computer wins, reset game"}
        else {status.innerHTML = "human wins, reset game"};
}};
function dicedice() {
    rolldice();
    checkstatus();
}
document.getElementById("myBtn").addEventListener("click", dicedice);
document.getElementById("resetbtn").addEventListener("click", reset);
