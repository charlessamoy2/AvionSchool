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

//refactor code
const getKeyType = (key) => {
    const {action} = key.dataset
    if (!action) return 'number'
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) return 'operator'
    return action
}

const createResultString = (key,displayNum,calculatorState) => {
    //Variables:
    //1. content
    //2. displayNum
    //3. previousKeyType
    //4. action
    //5. calculator.dataset.firstValue
    //6. calculator.dataset.operator
    //7. calculator.dataset.modValue

    const content = key.textContent
    const firstValue = calculatorState.firstValue
    const modValue = calculatorState.modValue
    const operator = calculatorState.operator
    const previousKeyType = calculatorState.previousKeyType
    const keyType = getKeyType(key)


    if (keyType==='number') {
        if (
            displayNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
        ) {
            return content
        } else {
            return displayNum + content
        }
    }

    if (keyType === 'decimal') {
        if(!displayNum.includes('.')) {
            return displayNum + '.'
        } else if (
            previousKeyType==='operator' ||
            previousKeyType === 'calculate'
        ) {
            return '0.'
        }
        return displayNum
    }

    if (
        keyType === 'operator'
        ) {
            if (
                firstValue &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ) {
                return calculate(firstValue,operator,displayNum)
            } else {
                return displayNum
            }
        }
    
    if (keyType === 'clear') {
        return 0
    }

    if (keyType ==='calculate') {
        let firstValue = calculatorState.firstValue
        const operator = calculatorState.operator
        let secondValue = displayNum

        if (firstValue) {
            if (previousKeyType === 'calculate') {
                return calculate(displayNum, operator, modValue)
            }
            return calculate(firstValue,operator,secondValue)
        } else {
            return displayNum
        }
    }

}

const updateCalculatorState = (key, calculator, calcValue, displayNum) => {
    //calcValue
    //displayNum
    //modValue

    const firstValue = calculator.dataset.firstValue
    const modValue = calculator.dataset.modValue
    const operator = calculator.dataset.operator
    const previousKeyType = calculator.dataset.previousKeyType
    const keyType = getKeyType(key)
    calculator.dataset.previousKeyType = keyType
    
    if (keyType === 'operator') {
        calculator.dataset.previousKeyType = 'operator'
        calculator.dataset.operator = key.dataset.action
        calculator.dataset.firstValue = firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
          ? calcValue
          : displayNum
      }
    
    if (keyType === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
        } else {
            key.textContent = 'AC'
        }
        calculator.dataset.previousKeyType = 'clear'
    }

    if (keyType === 'calculate') {
        calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
            ? modValue
            : displayNum
        calculator.dataset.previousKeyType = 'calculate'
    }
}

const updateVisualState = (key, calculator) => {
    const keyType = getKeyType(key)
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

    if (keyType==='operator') {
        key.classList.add('is-depressed')
    }

    if (keyType === 'clear' && key.textContent !== 'AC') {
        key.textContent = 'AC'
    }

    if (keyType !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear')
        clearButton.textContent = 'CE'
    }
    
}

keys.addEventListener('click', x => {
    if (x.target.matches('button')) {
        const key = x.target
        const displayNum = display.textContent
        const resultString = createResultString(key,displayNum,calculator.dataset)

        display.textContent = resultString

        updateCalculatorState(key,calculator,resultString,displayNum)
        updateVisualState(key,calculator)
    }
})