const tips = (amt) => {
    if (amt<500) {
        return amt*.20
    }
    if (amt>=500 && amt <2000){
        return amt*.15
    }
    if (amt>=2000){
        return amt*.10
    }
}

document.write("<h1>How much should you tip?</h1>")

let bills = [1240,480,2680]
let tipAmount = [];

document.write(`<h2>Current amount:</h2><ol>`)

for (x of bills) {
    document.write(`<li>₱${x}</li>`);
    tipAmount.push(tips(x));
}
document.write('</ol>')

for (let i = 0; i<=bills.length-1; i++){
    bills[i] += tipAmount[i];
}

document.write(`<h2>Amount to tip:</h2><ol>`);
for (x of tipAmount) {
    document.write(`<li>₱${x}</li>`)
}
document.write('</ol>')

document.write(`<h2>Final Billing:</h2><ol>`);
for (x of bills) {
    document.write(`<li>₱${x}</li>`)
}
document.write('</ol>')
