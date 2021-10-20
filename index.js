const calc = document.querySelector('.calc');
const result = document.querySelector('.display__result');
const clearBtn = document.querySelector('.clear');
const posNegBtn = document.querySelector('.posneg');
const percent = document.querySelector('.percentage');
const pow2Btn = document.querySelector('.pow2');
const mcBtn = document.getElementById('mc');
const mPlusBtn = document.getElementById('m+');
const mMinusBtn = document.getElementById('m-');
const mrBtn = document.getElementById('mr');

let value1 = '';
let value2 = '';
let value3 = '';
let operator = '';
let lastAction = '';
let memory = '0';
let doubleValueOperator = ['\u002B', '\u2212', 'xy', '\u00F7', '\u00D7', 'y\u221A'];
let singleValueOperator = ['x2', 'x3', '1/x', '2\u221A', '3\u221A', 'ex', '10x', 'ln', 'log10'];

function getResult(a, b, op) {
    let res = '0';
    if (a === 'Error' || b === 'Error') return res = 'Error';

    let aTailLength = a.includes(',') ? a.slice(a.indexOf(',') + 1).length : 0;
    let bTailLength = b.includes(',') ? b.slice(b.indexOf(',') + 1).length : 0;
    
    a = a.includes(',') ? Number(a.replace(',', '.')) : Number(a);
    b = b.includes(',') ? Number(b.replace(',', '.')) : Number(b);

    switch(op) {
        case '\u00F7': b === 0 ? res = 'Error' : res = a / b;
            break;
        case '\u00D7': res = a * b;
            break;
        case '\u2212': 
            let length = Math.max(aTailLength, bTailLength);
            res = length === 0 ? a - b
                : (Math.round((a - b) * Math.pow(10, length))) / Math.pow(10, length);
            break;
        case '\u002B': res = a + b;
            break;
        case '': res = result.innerText;
            break;
        case 'xy':
            res = Math.pow(a, b);
            break;
        case 'y\u221A':
            if (a < 0 && b % 2 != 1) {
                res = 'Error';
            } else {
                res = (a < 0 ? -1 : 1) * Math.pow(Math.abs(a), 1/b)
            }
            break;
        case 'x2':
            res = Math.pow(a, 2);
            res = aTailLength ? Math.round(res * Math.pow(10, aTailLength * 2)) / Math.pow(10, aTailLength * 2) : res;
            break;
        case 'x3':
            res = Math.pow(a, 3);
            res = aTailLength ? Math.round(res * Math.pow(10, aTailLength * 9)) / Math.pow(10, aTailLength * 9) : res;
            break;
        case '1/x':
            res = 1 / a;
            break;
        case '2\u221A':
            if (a < 0) {
                res = 'Error'; 
            } else {
                res = Math.sqrt(a);
            }
            break;
        case '3\u221A':
            res = Math.cbrt(a);
            break;
        case 'ex':
            res = Math.exp(a);
            break;
        case '10x':
            res = Math.pow(10, a);
            break;
        case 'ln':
            if (a <= 0) {
                res = 'Error'; 
            } else {
                res = Math.log1p(a);
            }
            break;
        case 'log10':
            if (a <= 0) {
                res = 'Error'; 
            } else {
                res = Math.log10(a);
            }
            break;
    }
    res = String(res);
    return res.includes('.') ? res.replace('.', ',') : res;
}

calc.addEventListener('click', (event) => {
    if (!event.target.classList.contains('calc__btn_num')) return;
    if ((result.innerText / Math.pow(10, 15)) > 1) return;

    let active = document.querySelector('.active');
    if (active) {
        result.innerText = '';
        active.classList.remove('active');
    }

    const value = event.target.innerText;

    if (value !== "0") clearBtn.innerText = "C"; 

    if (value === ',') {
        if (result.innerText.length === 0 || result.innerText.includes(',')) return;
        if (result.innerText === 'Error') result.innerText = '0';

        result.innerText += value;
    } else if (result.innerText === '0' || result.innerText === 'Error') {
        result.innerText = value;
    } else if (result.innerText === '-0') {
        result.innerText = '-' + value;
    } else if (lastAction === '=' && value1) {
        result.innerText = value;
        value1 = '';
    } else if (singleValueOperator.includes(lastAction)) {
        result.innerText = value;
    } else if (lastAction === 'xy' || lastAction === 'y\u221A') {
        result.innerText += value;
        //value3 += value;
    } else {
        result.innerText += value;
    }
    // if (result.innerText !== '0' && result.innerText !== 'Error' && lastAction === '=') {
    //     result.innerText += value;
    // } else if (result.innerText === '0' || result.innerText === 'Error' || lastAction === '=') {
    //     result.innerText = value;
    // }
    
})

calc.addEventListener('click', (event) => {
    if (!event.target.classList.contains('calc__btn_main')) return;

    if (!event.target.classList.contains('equal')) {
        let active = document.querySelector('.active');
        if (active) active.classList.remove('active');
        
        event.target.classList.add('active');
        if (value1 != 0 && lastAction !== '=') {
            value2 = result.innerText;
            value1 = result.innerText = getResult(value1, value2, operator );
        } else {
            value1 = result.innerText;
        }
        lastAction = operator = event.target.innerText;
    }

    if (event.target.classList.contains('equal')) {
        // first variant

        // if (lastAction !== '=') value2 = result.innerText;
        // if (lastAction === "C") {
        //     value1 = result.innerText
        // } else {
        //     value1 = result.innerText = getResult(value1, value2, operator);
        //     lastAction = event.target.innerText;
        // }   
        if (doubleValueOperator.includes(lastAction) && lastAction === operator) {
            value2 = result.innerText;
            value1 = result.innerText = getResult(value1, value2, operator);
            lastAction = event.target.innerText;
        } else if (operator && (lastAction === 'x2' || lastAction === 'x3')) {
            value2 = result.innerText;
            value1 = result.innerText = getResult(value1, value2, operator);
            lastAction = event.target.innerText;
        } else if (lastAction === 'C') {
            value2 = result.innerText;
            value1 = result.innerText = getResult(value1, value2, operator);
            lastAction = event.target.innerText;
        }
        // if (lastAction === "C") {
        //     value2 = result.innerText
        // } else {
        
            
        else if (lastAction !== operator && (lastAction === 'xy' || lastAction === 'y\u221A')) {
            value3 = result.innerText;
            value2 = getResult(value2, value3, lastAction);
            value1 = result.innerText = getResult(value1, value2, operator);
            lastAction = event.target.innerText;
        } else if (lastAction !== operator && singleValueOperator.includes(lastAction)) {
            value1 = result.innerText = getResult(result.innerText, value2, lastAction);
            //lastAction = event.target.innerText;
        } else {
            value1 = result.innerText = getResult(value1, value2, operator);
            lastAction = event.target.innerText;
        }
        //}    
    }
})

function clear() {
    let active = document.querySelector('.active');
    if (active) active.classList.remove('active');

    if (lastAction === '=') result.innerText = '0';
    if (result.innerText === '0') {
        value1 = '0';
        operator = '';
    }
    result.innerText === '0' ? value1 = '0' : result.innerText = '0';
}

clearBtn.addEventListener('click', () => {
    // todo: after first clear take .active back 
    clear();
    clearBtn.innerText = 'AC';
    lastAction = "C";
})

posNegBtn.addEventListener('click', () => {
    if (result.innerText === 'Error') {
        result.innerText = '-0';
    } else {
        result.innerHTML.startsWith('-') ? result.innerText = result.innerText.slice(1)
                                     : result.innerText = '-' + result.innerText;
    }
})

percent.addEventListener('click', () => {
    result.innerText = getResult(result.innerText, '100', '\u00F7')
})

// function pow2() {
//     let a = result.innerText;
//     let length = a.includes(',') ? a.slice(a.indexOf(',') + 1).length : 0;
    
//     a = result.innerText.includes(',') 
//         ? Number(result.innerText.replace(',', '.')) 
//         : Number(result.innerText);
//     res = Math.pow(a, 2);
//     res = length ? Math.round(res * Math.pow(10, length * 2)) / Math.pow(10, length * 2) : res;
//     res = String(res);
//     value1 = result.innerText = res.includes('.') ? res.replace('.', ',') : res;
//     lastAction = operator = 'x2';
// }

//pow2Btn.addEventListener('click', pow2)

calc.addEventListener('click', (event) => {
    if (!event.target.classList.contains('xy')) return;

    let active = document.querySelector('.active');
    if (active) active.classList.remove('active');

    event.target.classList.add('active');
    // if (value1 != 0 && lastAction !== '=') {
    //     value2 = result.innerText;
    //     value1 = result.innerText = getResult(value1, value2, operator);
    if (value1 != 0 && (lastAction === 'xy' || lastAction === 'y\u221A')) {
        value2 = result.innerText;
        value1 = result.innerText = getResult(value1, value2, operator);
        lastAction = operator = event.target.innerText;
    } if (lastAction === '+') {
        value2 = result.innerText;
        lastAction = event.target.innerText;
    } else {
        value1 = result.innerText;
        lastAction = operator = event.target.innerText;
    }
})

calc.addEventListener('click', (event) => {
    if (!event.target.classList.contains('immidFunc')) return;

    result.innerText = getResult(result.innerText, value2, event.target.innerText);

    lastAction = event.target.innerText;
})

mPlusBtn.addEventListener('click', () => {
    memory === "0" ? memory = result.innerText : memory += result.innerText ;
})
mMinusBtn.addEventListener('click', () => {
    memory -= result.innerText;
})