const displayArea = document.getElementById('displayarea');
// Get all calculator buttons
const calculatorButtons = document.querySelectorAll('.calculator-button');

let currentInput = '';
let firstOperand = '';
let operator = null;

calculatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const buttonValue = button.getAttribute('data-value');

        // If the button is 'C', clear the display
        if (buttonValue === 'C') {
            clearDisplay();
            return;
        }

        // If the button is decimal point
        if (buttonValue === '.') {
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

        if (buttonValue === 'back') {
            // If the button is backspace, remove the last character
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '') {
                currentInput = '0';
            }
            updateDisplay(currentInput);
            return;
        }

        // If the button is an operator
        if (isNaN(buttonValue)) { 
            // If the button is an operator  
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
        
        // If the button is a number
        if (displayArea.textContent === '0' && buttonValue !== '.') {
            currentInput = buttonValue;
        }
        else {
            currentInput += buttonValue;
        }

        updateDisplay(currentInput);
    });
});


// Function to display content in the display area
function updateDisplay(content) {
    displayArea.textContent = content;  
}

// Function to clear the display area
function clearDisplay() {
    displayArea.textContent = '0';
    currentInput = '';
    firstOperand = '';
    operator = null;
}

// Function to perform the arithmetic operations
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
