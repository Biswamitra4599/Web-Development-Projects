let currentInput = '';
let memory = 0;

function appendToDisplay(value) {
    currentInput += value;
    document.getElementById('display').value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    document.getElementById('display').value = '';
}

function calculateResult() {
    try {
        // Use eval for calculations, but check for potential errors in functions
        currentInput = currentInput.replace(/sin|cos|tan|sqrt|log|ln|exp|pow/g, (match) => match + '(');
        currentInput = eval(currentInput).toString();
        document.getElementById('display').value = currentInput;
    } catch (error) {
        document.getElementById('display').value = 'Error';
        currentInput = '';
    }
}

function clearMemory() {
    memory = 0;
}

function recallMemory() {
    currentInput = memory.toString();
    document.getElementById('display').value = currentInput;
}

function addToMemory() {
    memory += parseFloat(currentInput);
}

function subtractFromMemory() {
    memory -= parseFloat(currentInput);
}
