//in kg and m

let john = {
    full_name: "John Young",
    mass: 76,
    height: 1.75
}

let victor = {
    full_name: "Victor Rivera",
    mass: 80,
    height: 1.8
}

const bmiCalculator = (object) => {
    return object.mass / (object.height*object.height);
}

john.bmi = bmiCalculator(john);
victor.bmi = bmiCalculator(victor);

if (john.bmi>victor.bmi){
    console.log(john.full_name);
    console.log(john.bmi);
} else if (victor.bmi>john.bmi){
    console.log(victor.full_name);
    console.log(victor.bmi);
} else {
    console.log("SAME BMI AT: " + victor.bmi);
}