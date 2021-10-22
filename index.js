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
const secondFuncBtn = document.getElementById('secondFunc');
const change1Btn = document.getElementById('change1');
const change2Btn = document.getElementById('change2');
const theme1Btn = document.getElementById('theme1');
const theme2Btn = document.getElementById('theme2');

let value1 = '';
let value2 = '';
let value3 = '';
let operator = '';
let lastAction = '';
let memory = '0';
let memoryAction = false;
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
        case '2x':
            res = Math.pow(2, a);
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
        case 'log2':
            if (a <= 0) {
                res = 'Error';
            } else {
                res = Math.log2(a);
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
    } else if (memoryAction) {
        result.innerText = value;
        memoryAction = false;
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
        if (doubleValueOperator.includes(lastAction) && lastAction === operator) {
            value2 = result.innerText;
            value1 = result.innerText = getResult(value1, value2, operator);
            lastAction = event.target.innerText;
        } else if (operator && singleValueOperator.includes(lastAction)) {
            value2 = result.innerText;
            value1 = result.innerText = getResult(value1, value2, operator);
            lastAction = event.target.innerText;
        } else if (lastAction === 'C') {
            value2 = result.innerText;
            value1 = result.innerText = getResult(value1, value2, operator);
            lastAction = event.target.innerText;
        } else if (lastAction !== operator && (lastAction === 'xy' || lastAction === 'y\u221A')) {
            value3 = result.innerText;
            value2 = getResult(value2, value3, lastAction);
            value1 = result.innerText = getResult(value1, value2, operator);
            lastAction = event.target.innerText;
        } else if (lastAction !== operator && singleValueOperator.includes(lastAction)) {
            value1 = result.innerText = getResult(result.innerText, value2, lastAction);
        } else {
            value1 = result.innerText = getResult(value1, value2, operator);
            lastAction = event.target.innerText;
        }  
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

calc.addEventListener('click', (event) => {
    if (!event.target.classList.contains('xy')) return;

    let active = document.querySelector('.active');
    if (active) active.classList.remove('active');
    event.target.classList.add('active');

    // if (theme1Btn.checked) event.target.classList.add('calc__btn_light');
    // if (theme2Btn.checked) event.target.classList.remove('calc__btn_light');

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
    memory === "0" ? memory = +result.innerText : memory += +result.innerText;
    memoryAction = true;
    if (theme1Btn.checked) mrBtn.classList.add('calc__btn_light');
    if (theme2Btn.checked) mrBtn.classList.remove('calc__btn_light');
})
mMinusBtn.addEventListener('click', () => {
    memory === "0" ? memory = 0 - +result.innerText : memory -= +result.innerText;
    memoryAction = true;
    if (theme1Btn.checked) mrBtn.classList.add('calc__btn_light');
    if (theme2Btn.checked) mrBtn.classList.remove('calc__btn_light');
})
mcBtn.addEventListener('click', () => {
    memory = "0";
    memoryAction = false;
    if (theme1Btn.checked) mrBtn.classList.remove('calc__btn_light');
    if (theme2Btn.checked) mrBtn.classList.add('calc__btn_light');
})
mrBtn.addEventListener('click', () => {
    result.innerText = memory;
    memoryAction = true;
    if (theme1Btn.checked) mrBtn.classList.add('calc__btn_light');
    if (theme2Btn.checked) mrBtn.classList.remove('calc__btn_light');
})

secondFuncBtn.addEventListener('click', () => {
    if (change1Btn.innerText === '10x') {
        change1Btn.innerHTML = "2<sup>x</sup>";
        change2Btn.innerHTML = "log<sub>2</sub>";
    } else {
        change1Btn.innerHTML = "10<sup>x</sup>";
        change2Btn.innerHTML = "ln";
    }
})

calc.addEventListener('mousedown', (event) => {
    if (!event.target.classList.contains('calc__btn_main')) return;
    event.target.style.backgroundColor = "rgba(248, 205, 124, 0.959)";
});
calc.addEventListener('mouseup', (event) => {
    if (!event.target.classList.contains('calc__btn_main')) return;
    event.target.style.backgroundColor = '';
});

// calc.addEventListener('click', (event) => {
//     if (event.target.classList.contains('calc__btn_main') 
//         || event.target.classList.contains('calc__btn_num')
//         || event.target.classList.contains('calc__theme')) return;
//     event.target.style.backgroundColor = "#999";
//     setTimeout(() => { event.target.style.backgroundColor = "" }, 100)
// })

function handleTheme() {
    if (theme2Btn.checked) {
        document.querySelector('.container').classList.add('container_light'); 
        calc.classList.add('calc_light');
        result.classList.add('display__result_light');
        document.querySelector('.calc__theme').classList.add('calc__theme_light');

        const calcBtnOther = document.querySelectorAll('.calc__btn_other');
        for (let i = 0; i < calcBtnOther.length; i++) {
            calcBtnOther[i].classList.add('calc__btn_light');
        }
        const calcBtnNum = document.querySelectorAll('.calc__btn_num');
        for (let i = 0; i < calcBtnNum.length; i++) {
            calcBtnNum[i].classList.add('calc__btn_num_light');
        }

        memoryAction ? mrBtn.classList.remove('calc__btn_light') : mrBtn.classList.add('calc__btn_light');
    }
    if (theme1Btn.checked) {
        document.querySelector('.container').classList.remove('container_light');  
        calc.classList.remove('calc_light');
        result.classList.remove('display__result_light'); 
        document.querySelector('.calc__theme').classList.remove('calc__theme_light');

        const calcBtnOther = document.querySelectorAll('.calc__btn_other');
        for (let i = 0; i < calcBtnOther.length; i++) {
            calcBtnOther[i].classList.remove('calc__btn_light');
        }
        const calcBtnNum = document.querySelectorAll('.calc__btn_num');
        for (let i = 0; i < calcBtnNum.length; i++) {
            calcBtnNum[i].classList.remove('calc__btn_num_light');
        }

        memoryAction ? mrBtn.classList.add('calc__btn_light') : mrBtn.classList.remove('calc__btn_light');
    }
}

document.getElementById('radioBtns').onclick = handleTheme;
