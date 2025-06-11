const displayArea = document.getElementById('displayarea');

const calculatorButtons = document.querySelectorAll('.calculator-button');

calculatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const buttonValue = button.getAttribute('data-value');
        console.log(buttonValue);

        displayArea.textContent += buttonValue;
    });
});