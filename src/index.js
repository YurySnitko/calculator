import getResult from "./js/getResult.js";
import handleTheme from "./js/handleTheme";

export const calc = document.querySelector(".calc");
export const result = document.querySelector(".display__result");
export const clearBtn = document.querySelector(".clear");
export const posNegBtn = document.querySelector(".posneg");
export const percent = document.querySelector(".percentage");
export const mcBtn = document.getElementById("mc");
export const mPlusBtn = document.getElementById("m+");
export const mMinusBtn = document.getElementById("m-");
export const mrBtn = document.getElementById("mr");
export const secondFuncBtn = document.getElementById("secondFunc");
export const change1Btn = document.getElementById("change1");
export const change2Btn = document.getElementById("change2");
export const theme1Btn = document.getElementById("theme1");
export const theme2Btn = document.getElementById("theme2");

let value1 = "";
let value2 = "";
let value3 = "";
let operator = "";
let lastAction = "";
let memory = "0";
export let memoryAction = false;
let doubleValueOperator = [
  "\u002B",
  "\u2212",
  "xy",
  "\u00F7",
  "\u00D7",
  "y\u221A",
];
let singleValueOperator = [
  "x2",
  "x3",
  "1/x",
  "2\u221A",
  "3\u221A",
  "ex",
  "10x",
  "ln",
  "log10",
];

document.addEventListener("DOMContentLoaded", () => {
  calc.addEventListener("click", (event) => {
    if (!event.target.classList.contains("calc__btn_num")) return;
    if (result.innerText / Math.pow(10, 15) > 1) return;

    let active = document.querySelector(".active");
    if (active) {
      result.innerText = "";
      active.classList.remove("active");
    }

    const value = event.target.innerText;

    if (value !== "0") clearBtn.innerText = "C";

    if (value === ",") {
      if (result.innerText.length === 0 || result.innerText.includes(","))
        return;
      if (result.innerText === "Error") result.innerText = "0";

      result.innerText += value;
    } else if (result.innerText === "0" || result.innerText === "Error") {
      result.innerText = value;
    } else if (result.innerText === "-0") {
      result.innerText = "-" + value;
    } else if (lastAction === "=" && value1) {
      result.innerText = value;
      value1 = "";
    } else if (singleValueOperator.includes(lastAction)) {
      result.innerText = value;
    } else if (lastAction === "xy" || lastAction === "y\u221A") {
      result.innerText += value;
    } else if (memoryAction) {
      result.innerText = value;
      memoryAction = false;
    } else {
      result.innerText += value;
    }
  });

  calc.addEventListener("click", (event) => {
    if (!event.target.classList.contains("calc__btn_main")) return;

    if (!event.target.classList.contains("equal")) {
      let active = document.querySelector(".active");
      if (active) active.classList.remove("active");
      event.target.classList.add("active");

      if (value1 != 0 && lastAction !== "=") {
        value2 = result.innerText;
        value1 = result.innerText = getResult(value1, value2, operator);
      } else {
        value1 = result.innerText;
      }
      lastAction = operator = event.target.innerText;
    }

    if (event.target.classList.contains("equal")) {
      if (doubleValueOperator.includes(lastAction) && lastAction === operator) {
        value2 = result.innerText;
        value1 = result.innerText = getResult(value1, value2, operator);
        lastAction = event.target.innerText;
      } else if (operator && singleValueOperator.includes(lastAction)) {
        value2 = result.innerText;
        value1 = result.innerText = getResult(value1, value2, operator);
        lastAction = event.target.innerText;
      } else if (lastAction === "C") {
        value2 = result.innerText;
        value1 = result.innerText = getResult(value1, value2, operator);
        lastAction = event.target.innerText;
      } else if (
        lastAction !== operator &&
        (lastAction === "xy" || lastAction === "y\u221A")
      ) {
        value3 = result.innerText;
        value2 = getResult(value2, value3, lastAction);
        value1 = result.innerText = getResult(value1, value2, operator);
        lastAction = event.target.innerText;
      } else if (
        lastAction !== operator &&
        singleValueOperator.includes(lastAction)
      ) {
        value1 = result.innerText = getResult(
          result.innerText,
          value2,
          lastAction
        );
      } else {
        value1 = result.innerText = getResult(value1, value2, operator);
        lastAction = event.target.innerText;
      }
    }
  });

  clearBtn.addEventListener("click", () => {
    let active = document.querySelector(".active");
    if (active) active.classList.remove("active");

    if (lastAction === "=") result.innerText = "0";
    if (result.innerText === "0") {
      value1 = "0";
      operator = "";
    }
    result.innerText === "0" ? (value1 = "0") : (result.innerText = "0");
    clearBtn.innerText = "AC";
    lastAction = "C";
  });

  posNegBtn.addEventListener("click", () => {
    if (result.innerText === "Error") {
      result.innerText = "-0";
    } else {
      result.innerHTML.startsWith("-")
        ? (result.innerText = result.innerText.slice(1))
        : (result.innerText = "-" + result.innerText);
    }
  });

  percent.addEventListener("click", () => {
    result.innerText = getResult(result.innerText, "100", "\u00F7");
  });

  calc.addEventListener("click", (event) => {
    if (!event.target.classList.contains("xy")) return;

    let active = document.querySelector(".active");
    if (active) active.classList.remove("active");
    event.target.classList.add("active");

    if (value1 != 0 && (lastAction === "xy" || lastAction === "y\u221A")) {
      value2 = result.innerText;
      value1 = result.innerText = getResult(value1, value2, operator);
      lastAction = operator = event.target.innerText;
    }
    if (lastAction === "+") {
      value2 = result.innerText;
      lastAction = event.target.innerText;
    } else {
      value1 = result.innerText;
      lastAction = operator = event.target.innerText;
    }
  });

  calc.addEventListener("click", (event) => {
    if (!event.target.classList.contains("immidFunc")) return;

    result.innerText = getResult(
      result.innerText,
      value2,
      event.target.innerText
    );

    lastAction = event.target.innerText;
  });

  mPlusBtn.addEventListener("click", () => {
    memory === "0"
      ? (memory = +result.innerText)
      : (memory += +result.innerText);
    memoryAction = true;
    if (theme1Btn.checked) mrBtn.classList.add("calc__btn_light");
    if (theme2Btn.checked) mrBtn.classList.remove("calc__btn_light");
  });
  mMinusBtn.addEventListener("click", () => {
    memory === "0"
      ? (memory = 0 - +result.innerText)
      : (memory -= +result.innerText);
    memoryAction = true;
    if (theme1Btn.checked) mrBtn.classList.add("calc__btn_light");
    if (theme2Btn.checked) mrBtn.classList.remove("calc__btn_light");
  });
  mcBtn.addEventListener("click", () => {
    memory = "0";
    memoryAction = false;
    if (theme1Btn.checked) mrBtn.classList.remove("calc__btn_light");
    if (theme2Btn.checked) mrBtn.classList.add("calc__btn_light");
  });
  mrBtn.addEventListener("click", () => {
    result.innerText = memory;
    memoryAction = true;
    if (theme1Btn.checked) mrBtn.classList.add("calc__btn_light");
    if (theme2Btn.checked) mrBtn.classList.remove("calc__btn_light");
  });

  secondFuncBtn.addEventListener("click", () => {
    if (change1Btn.innerText === "10x") {
      change1Btn.innerHTML = "2<sup>x</sup>";
      change2Btn.innerHTML = "log<sub>2</sub>";
    } else {
      change1Btn.innerHTML = "10<sup>x</sup>";
      change2Btn.innerHTML = "ln";
    }
  });

  calc.addEventListener("mousedown", (event) => {
    if (!event.target.classList.contains("calc__btn_main")) return;
    event.target.style.backgroundColor = "rgba(248, 205, 124, 0.959)";
  });
  calc.addEventListener("mouseup", (event) => {
    if (!event.target.classList.contains("calc__btn_main")) return;
    event.target.style.backgroundColor = "";
  });

  document.getElementById("radioBtns").onclick = handleTheme;
});
