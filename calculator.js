// Calculator 

// Function to update the result input
function updateResult(value) {
    document.getElementById('result').value = value;
}

// Function to append characters to result input
function appendToResult(char) {
    document.getElementById('result').value += char;
}

// Function to clear the result input
function clearResult() {
    document.getElementById('result').value = ' ';
}

// Function to calculate the result
function calculateResult() {
    try {
        const result = eval(document.getElementById('result').value);
        updateResult(result)
    } catch (error) {
        updateResult('Error');
    }
}