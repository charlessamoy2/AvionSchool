const tips = (object) => {
    let percentage = 0;
    if(name="John"){
        for (i in object.bills) {
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
        }
    } else if (name="Victor"){
        for (i in object.bills) {
            if (object.bills[i]<1000){
                percentage = 0.20;
            }
            if (object.bills[i]>=1000 && object.bills[i]<=3000){
                percentage = 0.10;
            }
            if (object.bills[i]>3000){
                percentage = 0.25;
            }
            object.tipAmount.push(object.bills[i]*percentage);
        }
    }
    return object;
}

const averageTips = (object) => {
    let sum = 0;
    for (x of object.tipAmount){
        sum+=x;
    }
    return object.average = sum/object.tipAmount.length;
}

let john = {
    name : "John",
    bills : [1240,480,2680,1800,420],
    tipAmount : []
}

let victor = {
    name : "Victor",
    bills : [770,3750,1100,450],
    tipAmount : []
}

tips(john);
tips(victor);
averageTips(john);
averageTips(victor);

if(john.average>victor.average){
    console.log("John's family");
} else if (victor.average>john.average){
    console.log("Victor's family");
} else {
    console.log("Same average tip");
}