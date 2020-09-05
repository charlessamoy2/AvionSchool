// console.log("using script file");

// let name = prompt('Please give me your name?','');
// alert(`Welcome, ${name}`);
// let age = prompt('Please enter your age:','');
// alert(`You're ${age} years old!`)
// let single = confirm('Are you single?');
// if (single){
//     single = "single";
// } else {
//     single = "taken AWOW";
// }

// document.write(`Welcome, ${name}. <br>`);
// document.write(`You are ${age} years old! <br>`);
// document.write(`You are currently ${single}.`);

let num = prompt('What is your number','');
num = Number(num);

while (!num) {
    num = prompt('Not a number. Try again','');
    num = Number(num);
}

if (num%3 == 0 && num%5 == 0) {
    alert('Eureka!');
    document.write(`Your number (${num}) is divisible by 3 and 5.`)
} else if (num%3 == 0) {
    alert('The input number is divisible by 3.');
    document.write('The input number is divisible by 3.');
} else if (num%5 == 0) {
    alert('The input number is divisible by 5');
    document.write('The input number is divisible by 5.');
}