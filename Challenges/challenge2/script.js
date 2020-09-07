const tips = (object) => {
    for (i = 0; i<object.bills.length; i++) {
        if (object.bills[i]<500){
            object.tipAmount.push(object.bills[i]*0.20);
            object.finalBills.push(object.bills[i]+object.tipAmount[i]);
        }
        if (object.bills[i]>=500 && object.bills[i]<2000){
            object.tipAmount.push(object.bills[i]*0.15);
            object.finalBills.push(object.bills[i]+object.tipAmount[i]);
        }
        if (object.bills[i]>=2000){
            object.tipAmount.push(object.bills[i]*0.10);
            object.finalBills.push(object.bills[i]+object.tipAmount[i]);
        }
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