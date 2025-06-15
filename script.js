// JAVASCRIPT CODE FOR A SIMPLE CALCULATOR APPLICATION

// GET THE DISPLAY AREA ELEMENT
const displayArea = document.getElementById('displayarea');
// GET ALL CALCULATOR BUTTONS
const calculatorButtons = document.querySelectorAll('.calculator-button');

// INITIALIZE VARIABLES TO HOLD THE CURRENT INPUT, FIRST OPERAND, AND OPERATOR
let currentInput = '';
let firstOperand = '';
let operator = null;

// ADD EVENT LISTENERS TO EACH BUTTON
calculatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const buttonValue = button.getAttribute('data-value');

        // IF THE BUTTON IS 'C', CLEAR THE DISPLAY
        if (buttonValue === 'C') {
            clearDisplay();
            return;
        }

        // IF THE BUTTON IS DECIMAL POINT
        if (buttonValue === '.') {
            // IF THE BUTTON IS DECIMANL POINT, ADD IT TO THE CURRENT INPUT
            if (!currentInput.includes('.')) {
                if (currentInput === '') {
                    currentInput = '0.';
                }
                else {
                    currentInput += '.';
                }
                updateDisplay(currentInput);
            }
            return;
        }

        // IF BUTTON IS BACKSPACE
        if (buttonValue === 'back') {
            // IF THE BUTTON IS BACJSPACE, REMOVE THE LAST CHARACTER
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '') {
                currentInput = '0';
            }
            updateDisplay(currentInput);
            return;
        }

        // IF THE BUTTON IS AN OPERATOR
        if (isNaN(buttonValue)) { 
            // IF THE BUTTON IS EQUAL 
            if (buttonValue === '=') {
                if (firstOperand !== '' && operator && currentInput !== '') {
                    const result = operate(firstOperand, currentInput, operator);
                    updateDisplay(result);
                    currentInput = result.toString();
                    firstOperand = '';
                    operator = null;
                }
            }
            else {
                operator = buttonValue;
                firstOperand = currentInput;
                currentInput = '';
            }
            return;
        }
        
        // IF THE BUTTON IS A NUMBER
        if (currentInput === '0' && buttonValue !== '.') {
            currentInput = buttonValue;
        }
        else {
            currentInput += buttonValue;
        }

        updateDisplay(currentInput);
    });
});

// ADD KEYBOARD INPUT SUPPORT
const keyboardInput = document.addEventListener('keydown', (event) => {
    const key = event.key;

    // IF THE KEY IS ESCAPE, CLEAR DISPLAY
    if (key === 'Escape') {
        clearDisplay();
    }

    // IF THE KEY IS BACKSPACE, REMOVE LAST CHARACTER
    if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '0';
        }
        updateDisplay(currentInput);
    }

    // IF THE KEY IS AN OPERATOR
    if (['+', '-', '*', '/'].includes(key)) {
        if (currentInput !== '') {
            firstOperand = currentInput;
            operator = key;
            currentInput = '';
        }
    }

    // IF THE KEY IS ENTER, PERFORM CALCULATION
    if (key === 'Enter') {
        if (firstOperand !== '' && operator && currentInput !== '') {
            const result = operate(firstOperand, currentInput, operator);
            updateDisplay(result);
            currentInput = result.toString();
            firstOperand = '';
            operator = null;
        }
    }

    // IF THE KEY IS A NUMBER OR DECIMAL POINT
    if (!isNaN(key) || key === '.') {
        if (key === '.' && currentInput.includes('.')) return;
        if (currentInput === '0' && key !== '.') {
            currentInput = key;
        } else {
            currentInput += key;
        }
        updateDisplay(currentInput);
    }    
});

// FUNCTION TO DISPLAY CONTENT IN THE DISPLAY AREA
function updateDisplay(content) {
    displayArea.textContent = content;  
}

// FUNCTION TO CLEAR THE DISPLAY AREA
function clearDisplay() {
    displayArea.textContent = '0';
    currentInput = '';
    firstOperand = '';
    operator = null;
}

// FUNCTION TO PERFORM THE ARITHMETIC OPERATIOS
function operate(first, second, operator) {
    const num1 = Number(first);
    const num2 = Number(second);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/': 
            return num2 !== 0 ? num1 / num2 : 'Error';
        case '%':
            return num1 % num2;
        case '^':
            return Math.pow(num1, num2);
        default:
            return second;
    }
}
