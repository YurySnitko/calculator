const calc = document.querySelector('.calc');
const result = document.querySelector('.display__result');
let value1;
let value2;
let operator;

function getResult(a, b, op) {
    let result;
    a = Number(a);
    b = Number(b);
    switch(op) {
        case '\u00F7': result = a / b;
        break;
        case '\u00D7': result = a * b;
        break;
        case '\u2212': result = a - b;
        break;
        case '\u002B': result = a + b;
        break;
    }
    return result;
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

    if (value === ',') {
        if (result.innerText.length === 0 || result.innerText.includes
            (',')) return;

        result.innerText += value;
    } else if (result.innerText === '0') {
        result.innerText = value;
    } else {
        result.innerText += value;
    }
})

calc.addEventListener('click', (event) => {
    if (!event.target.classList.contains('calc__btn_main')) return;
    event.target.classList.add('active');
    if (!event.target.classList.contains('equal')) {
        value1 = result.innerText; 
        operator = event.target.innerText;
    }

    if (event.target.classList.contains('equal')) {
        result.innerText = getResult(value1, result.innerText, operator )
    }
})