const tips = (object) => {
    let percentage = 0;
    for (i = 0; i<object.bills.length; i++) {
        if (object.bills[i]<500){
            percentage = 0.20;
        }
        if (object.bills[i]>=500 && object.bills[i]<2000){
            percentage = 0.15;
        }
        if (object.bills[i]>=2000){
            percentage = 0.10;
        }
        object.tipAmount.push(object.bills[i]*percentage);
        object.finalBills.push(object.bills[i]+object.tipAmount[i]);
    }
    return object;
}

let john = {
    bills : [1240,480,2680,1800,420],
    tipAmount : [],
    finalBills : []
}

tips(john);

console.log(john.tipAmount);
console.log(john.finalBills);