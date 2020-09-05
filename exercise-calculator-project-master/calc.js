const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

const calculate = (n1, o, n2) => {
    const num1 = parseFloat(n1)
    const num2 = parseFloat(n2)
    if (o === 'add') return num1 + num2
    if (o === 'subtract') return num1 - num2
    if (o === 'multiply') return num1 * num2
    if (o === 'divide') return num1 / num2
}

keys.addEventListener('click', x => {
    if (x.target.matches('button')) {
        const key = x.target
        const action = key.dataset.action
        const content = key.textContent
        const displayNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType
        Array.from(key.parentNode.children).forEach(k=>k.classList.remove('is-depressed'))

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }

        if (!action) {
            if (displayNum === '0' || previousKeyType === 'operator' || previousKeyType ==='calculate') {
                display.textContent = content
            } else {
                display.textContent = displayNum + content
            }
            calculator.dataset.previousKeyType = 'number'
        }

        if (action==='decimal') {
            if (!displayNum.includes(".")) {
                display.textContent = displayNum + '.'
            } else if (previousKeyType ==='operator' || previousKeyType === 'calculate') {
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayNum

            if (firstValue && operator && previousKeyType!=='operator' && previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue,operator,secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayNum
            }
        
            key.classList.add('is-depressed')
            calculator.dataset.operator = action
            calculator.dataset.previousKeyType = 'operator'
        }

        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'AC'
            }
            display.textContent = '0'
            calculator.dataset.previousKeyType = 'clear'
        }
        
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            let operator = calculator.dataset.operator
            let secondValue = displayNum

            if (firstValue){
                if (previousKeyType==='calculate'){
                    firstValue = displayNum
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue, operator, secondValue)
            }

            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }
    }
})