const calc = document.querySelector('.calc');
const result = document.querySelector('.display__result');
const clearBtn = document.querySelector('.clear');
const posNegBtn = document.querySelector('.posneg');
const percent = document.querySelector('.percentage');
let value1 = '';
let value2 = '';
let operator;
let lastAction = '';

function getResult(a, b, op) {
    let result = '0';
    if (a === 'Error' || b === 'Error') return result = 'Error';

    let l1 = a.includes(',') ? a.slice(a.indexOf(',') + 1) : '';
    let l2 = b.includes(',') ? b.slice(b.indexOf(',') + 1) : '';
    let length = Math.max(l1.length, l2.length);

    a = a.includes(',') ? Number(a.replace(',', '.')) : Number(a);
    b = b.includes(',') ? Number(b.replace(',', '.')) : Number(b);

    switch(op) {
        case '\u00F7': b === 0 ? result = 'Error' : result = a / b;
        break;
        case '\u00D7': result = a * b;
        break;
        case '\u2212': 
            result = length === 0 ? a - b
                : (Math.round((a - b) * Math.pow(10, length))) / Math.pow(10, length);
        break;
        case '\u002B': result = a + b;
        break;
    }
    result = String(result);
    return result.includes('.') ? result.replace('.', ',') : result;
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
    } else if (result.innerText === '0') {
        result.innerText = value;
    } else {
        result.innerText += value;
    }
})

calc.addEventListener('click', (event) => {
    if (!event.target.classList.contains('calc__btn_main')) return;

    if (!event.target.classList.contains('equal')) {
        event.target.classList.add('active');
        if (value1 && lastAction !== '=') {
            value2 = result.innerText;
            value1 = result.innerText = getResult(value1, value2, operator );
        } else {
            value1 = result.innerText;
        }
        lastAction = operator = event.target.innerText;
    }

    if (event.target.classList.contains('equal')) {
        if (lastAction !== '=') value2 = result.innerText;
        value1 = result.innerText = getResult(value1, value2, operator);
        lastAction = event.target.innerText;
    }
})

function clear() {
    result.innerText === '0' ? value1 = '0' : result.innerText = '0';
}

clearBtn.addEventListener('click', () => {
    clear();
    clearBtn.innerText = 'AC';
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