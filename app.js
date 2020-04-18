// Variables 
let firstNumber = 0;
let lastNumber = 0;
let memory = 0;

let ButtonMemory = 0;

let alreadyDeleted = false;

let operatorSign = '';
let operatorSignMemory = '';

// Getters
const firstTextValue = document.getElementById('display-value');
const secondTextValue = document.getElementById('display-second-value');
const displayOperator = document.getElementById('display-operator');

const operatorButtons = document.querySelectorAll('.operator');
const ACButton = document.querySelector('.AC');
const commaButton = document.querySelector('.Comma');
const equalsButton = document.querySelector('.Equals');

const backTopRow = document.querySelector('.Back');
const backBotRow = document.querySelector('.Back');

const MPlus = document.querySelector('.MPlus');
const MClear = document.querySelector('.MC');
const MReturn = document.querySelector('.MR');

// Sort the button numbers
const numbers = document.querySelectorAll('.number');
const numbersInArray = [];
numbers.forEach(number => numbersInArray.push(number));
const numberButtons = numbersInArray.sort((a,b) => {
    if(a.textContent < b.textContent) return -1;
    else return 1;
});

// --Event listeners--

// Add Event Listener for each number button
numberButtons.forEach((number, index) => 
number.addEventListener('click', () => {
        if(displayOperator.textContent === '') {
            firstTextValue.textContent += index;
            commaButton.addEventListener('click', () => {
                addComma(firstTextValue);
            });
            if(!alreadyDeleted){
                backTopRow.addEventListener('click', deleteTopLastNumber);
            alreadyDeleted = true; 
            }
     
        } else if(displayOperator.textContent !== '') {
            secondTextValue.textContent += index;
            if(secondTextValue.textContent.length !== 0){
                commaButton.addEventListener('click', () => {
                    addComma(secondTextValue);
                });
            }
            
            if(!alreadyDeleted){
                backBotRow.addEventListener('click', deleteBotLastNumber);
            alreadyDeleted = true; 
            }
        }
    }));


// Memory Buttons Listeners

// Add Event Listener for M+ button (add first number to memory);
MPlus.addEventListener('click', () => {
    ButtonMemory = parseInt(firstTextValue.textContent);
    clearDisplay();
});

// Button that clears above
MClear.addEventListener('click', () => {
    clearMemory();
});

// Button that returns the value of the MPlus button
MReturn.addEventListener('click', () => {
    if(firstTextValue.textContent !== '' && operatorSign !== ''){
        secondTextValue.textContent = ButtonMemory;
        lastNumber = ButtonMemory;
    }
})

// Add Event Listener for each operator button
operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {
        backTopRow.removeEventListener('click', deleteTopLastNumber);
        alreadyDeleted = false;
        // Add
        if(operator.classList.contains('Plus') && firstTextValue.textContent !== ''){
            console.log('plus');
            setDisplayOperator('+');
            operation();
            operatorSignMemory = operatorSign;

        // Substract
        } else if(operator.classList.contains('Minus') && firstTextValue.textContent !== ''){
            console.log('minus');
            setDisplayOperator('-');
            operation();
            operatorSignMemory = operatorSign;

        // Multiply
        } else if(operator.classList.contains('Timez') && firstTextValue.textContent !== ''){
            console.log('times');
            setDisplayOperator('\xd7');
            operation();
            operatorSignMemory = operatorSign;

        // Divide
        } else if(operator.classList.contains('Divide') && firstTextValue.textContent !== ''){
            console.log('divide');
            setDisplayOperator('\xf7');
            operation();
            operatorSignMemory = operatorSign;

        }
    });
});

// Add Event Listener for AC Button (clear)
ACButton.addEventListener('click', clearDisplay);

equalsButton.addEventListener('click', () => {
    operation();
    lastNumber = 0;
    memory = 0;
    operatorSign = '';
    operatorSignMemory = '';
    displayOperator.textContent = '';
    firstTextValue.classList.remove('text-muted');
});

// --End of Event listeners--


// Clears the value of memory buttons
function clearMemory(){
    ButtonMemory = 0;
}

// Functions for delete/erase button
function deleteTopLastNumber(){
    const textToArr = displayContentToArray(firstTextValue.textContent);
    textToArr.pop();
    firstTextValue.textContent = textToArr.join("");
}
function deleteBotLastNumber(){
    const textToArr = displayContentToArray(secondTextValue.textContent);
    textToArr.pop();
    secondTextValue.textContent = textToArr.join("");
}


// Function to clear every data and make the top row deletable again(AC Button utilizes it)
function clearDisplay(){
    firstNumber = 0;
    lastNumber = 0;
    memory = 0;
    operatorSign = '';
    operatorSignMemory = '';
    firstTextValue.textContent = '';
    secondTextValue.textContent = '';
    displayOperator.textContent = '';
    

    firstTextValue.classList.remove('text-muted');
}

// Sub function to add a comma to the number
function displayContentToArray(string){
    return string.split("");
}

// Add comma
function addComma(string){
    const textToArr = displayContentToArray(string.textContent);
    if(textToArr.indexOf(".") === -1) {
        textToArr.push(".");
        const joinedArr = textToArr.join("");
        string.textContent = joinedArr;
    }
}

// Change the operator sign on display
function setDisplayOperator(sign){
    operatorSign = sign;
    displayOperator.textContent = operatorSign;
}

// Function names itself pretty much
function operation(){
    const sign = operatorSignMemory;
    firstNumber = parseFloat(firstTextValue.textContent);
    firstTextValue.classList.add('text-muted');
    backTopRow.removeEventListener('click', deleteTopLastNumber);
    if(secondTextValue.textContent !== ''){
        lastNumber = parseFloat(secondTextValue.textContent);
        switch(sign){
            case '+':
                memory = firstNumber + lastNumber;
                afterOperation();
                break;
            case '-':
                memory = firstNumber - lastNumber;
                afterOperation();
                break;
            case '\xd7':
                memory = firstNumber * lastNumber;
                afterOperation();
                break;
             case '\xf7':
                memory = firstNumber / lastNumber;
                afterOperation();
                break;
        }
    }
    
}

// What happens after operation (part of operation function)
function afterOperation(){
    firstTextValue.textContent = memory;
    secondTextValue.textContent = '';
}