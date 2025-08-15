function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function multi(a, b) {
    return a * b;
}

function div(a, b) {
    if(b === 0) {
        return "ERROR"
    }

    return a / b;
}

function operate(_leftOperand, _operator, _rightOperand) {
    
    switch(_operator) {

        case "+":
            return add(_leftOperand, _rightOperand);
            
        case "-":
            return sub(_leftOperand, _rightOperand);
        
        case "X":
            return multi(_leftOperand, _rightOperand);

        case "/":
            return div(_leftOperand, _rightOperand); // Can return ERROR

        default:
            return "Invalid Operator"
    }
}

function clearDisplay() {
    resultDisplay.textContent = ""
}

function clearVariables() {
    leftOperand = null
    rightOperand = null
    operator = ""
    isLeftOperandReady = false
    isCalculationFinished = false
    clearDisplay()
}


let leftOperand = null
let rightOperand = null
let operator = ""
let result = null

let isLeftOperandReady = false
let isCalculationFinished = false


let numbersList = "0123456789"
let operatorsList = "/X-+"

let buttonsContainer = document.querySelector(".buttons-container")
let resultDisplay = document.querySelector(".result-display")
resultDisplay.textContent = ""

buttonsContainer.addEventListener("click", (e) => {

    if(e.target.textContent === "D") {
        
        // delete last character
        resultDisplay.textContent = resultDisplay
            .textContent
            .substring(0, resultDisplay.textContent.length - 1)

        if(!isLeftOperandReady) {
            leftOperand = +resultDisplay.textContent
            
        } else {
            rightOperand = +resultDisplay.textContent
        }

        
        
    }

    if(e.target.textContent === "C") {
        clearDisplay()
        clearVariables()
        return
    }

    if(isCalculationFinished && numbersList.includes(e.target.textContent)) {

        isCalculationFinished = false
        leftOperand = null
        resultDisplay.textContent = ""

    }

    if(!isLeftOperandReady && numbersList.includes(e.target.textContent)) {
        resultDisplay.textContent += e.target.textContent
        leftOperand = +resultDisplay.textContent
        return
    }

    if(!isLeftOperandReady && operatorsList.includes(e.target.textContent)) {
        isCalculationFinished = false
        isLeftOperandReady = true
        operator = e.target.textContent
        clearDisplay()
        return
    }

    if(isLeftOperandReady && operator !== "" && numbersList.includes(e.target.textContent)) {
        isCalculationFinished = false
        resultDisplay.textContent += e.target.textContent
        rightOperand = +resultDisplay.textContent
        return
    }

    if(isLeftOperandReady && operatorsList.includes(e.target.textContent)) {
        isCalculationFinished = false
        leftOperand = operate(leftOperand, operator, rightOperand)
        operator = e.target.textContent
        clearDisplay()
    }

    if(isLeftOperandReady && operator !== "" && e.target.textContent === "=") {
        clearDisplay()
        
        result = operate(leftOperand, operator, rightOperand)
        result = Math.round(result * 100) / 100
        if(result !== "ERROR" || result !== "Invalid Operator") {
            resultDisplay.textContent = `${result}`
            leftOperand = result
        }
        isCalculationFinished = true
    }

    

    
})