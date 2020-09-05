const divisible = (num) => {
    if (num%3 === 0 && num%5 === 0){
        alert('Eureka!');
        document.write(`Your number (${num}) is divisible by 3 and 5.`);
        return;
    }
    if (num%3 === 0){
        alert('The input number is divisible by 3.');
        document.write('The input number is divisible by 3.');
        return;
    }
    if (num%5 === 0){
        alert('The input number is divisible by 5');
        document.write('The input number is divisible by 5.');
        return;
    }
}

let num = prompt('What is your number?','');
num = Number(num);

while (!num) {
    num = prompt('Not a number. Try again','');
    num = Number(num);
}

divisible(num);