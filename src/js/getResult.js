import { result } from "../index";

export default function getResult(a, b, op) {
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