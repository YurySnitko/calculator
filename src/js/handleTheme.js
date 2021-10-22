import { theme1Btn, theme2Btn, calc, result, memoryAction, mrBtn } from "../index";

export default function handleTheme() {
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