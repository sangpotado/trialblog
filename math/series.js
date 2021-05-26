function a_series() {
    let a = parseFloat(document.getElementById("series_a").value);
    let r = parseFloat(document.getElementById("series_r").value);
    let n = parseFloat(document.getElementById("series_n").value);
    let sum = 0;
    let ans = '';
    for (i=0;i<=n;i++) {
        sum += a + i*r;
        ans += `n: ${i}, a_n: ${a+i*r}, sum: ${sum} <br>`
    }
    document.getElementById("series_ans").innerHTML = ans;
}
function g_series() {
    let a = parseFloat(document.getElementById("series_a").value);
    let r = parseFloat(document.getElementById("series_r").value);
    let n = parseFloat(document.getElementById("series_n").value);
    let sum = 0;
    let ans = '';
    for (i=0;i<=n;i++) {
        sum += a*r**i;
        ans += `n: ${i}, a_n: ${a*r**i}, sum: ${sum} <br>`
    }
    document.getElementById("series_ans").innerHTML = ans;
}