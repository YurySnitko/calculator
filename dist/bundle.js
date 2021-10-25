/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"calc\": () => (/* binding */ calc),\n/* harmony export */   \"result\": () => (/* binding */ result),\n/* harmony export */   \"clearBtn\": () => (/* binding */ clearBtn),\n/* harmony export */   \"posNegBtn\": () => (/* binding */ posNegBtn),\n/* harmony export */   \"percent\": () => (/* binding */ percent),\n/* harmony export */   \"mcBtn\": () => (/* binding */ mcBtn),\n/* harmony export */   \"mPlusBtn\": () => (/* binding */ mPlusBtn),\n/* harmony export */   \"mMinusBtn\": () => (/* binding */ mMinusBtn),\n/* harmony export */   \"mrBtn\": () => (/* binding */ mrBtn),\n/* harmony export */   \"secondFuncBtn\": () => (/* binding */ secondFuncBtn),\n/* harmony export */   \"change1Btn\": () => (/* binding */ change1Btn),\n/* harmony export */   \"change2Btn\": () => (/* binding */ change2Btn),\n/* harmony export */   \"theme1Btn\": () => (/* binding */ theme1Btn),\n/* harmony export */   \"theme2Btn\": () => (/* binding */ theme2Btn),\n/* harmony export */   \"memoryAction\": () => (/* binding */ memoryAction)\n/* harmony export */ });\n/* harmony import */ var _js_getResult_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/getResult.js */ \"./src/js/getResult.js\");\n/* harmony import */ var _js_handleTheme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/handleTheme */ \"./src/js/handleTheme.js\");\n\n\nvar calc = document.querySelector('.calc');\nvar result = document.querySelector('.display__result');\nvar clearBtn = document.querySelector('.clear');\nvar posNegBtn = document.querySelector('.posneg');\nvar percent = document.querySelector('.percentage');\nvar mcBtn = document.getElementById('mc');\nvar mPlusBtn = document.getElementById('m+');\nvar mMinusBtn = document.getElementById('m-');\nvar mrBtn = document.getElementById('mr');\nvar secondFuncBtn = document.getElementById('secondFunc');\nvar change1Btn = document.getElementById('change1');\nvar change2Btn = document.getElementById('change2');\nvar theme1Btn = document.getElementById('theme1');\nvar theme2Btn = document.getElementById('theme2');\nvar value1 = '';\nvar value2 = '';\nvar value3 = '';\nvar operator = '';\nvar lastAction = '';\nvar memory = '0';\nvar memoryAction = false;\nvar doubleValueOperator = [\"+\", \"\\u2212\", 'xy', \"\\xF7\", \"\\xD7\", \"y\\u221A\"];\nvar singleValueOperator = ['x2', 'x3', '1/x', \"2\\u221A\", \"3\\u221A\", 'ex', '10x', 'ln', 'log10'];\ndocument.addEventListener('DOMContentLoaded', function () {\n  calc.addEventListener('click', function (event) {\n    if (!event.target.classList.contains('calc__btn_num')) return;\n    if (result.innerText / Math.pow(10, 15) > 1) return;\n    var active = document.querySelector('.active');\n\n    if (active) {\n      result.innerText = '';\n      active.classList.remove('active');\n    }\n\n    var value = event.target.innerText;\n    if (value !== \"0\") clearBtn.innerText = \"C\";\n\n    if (value === ',') {\n      if (result.innerText.length === 0 || result.innerText.includes(',')) return;\n      if (result.innerText === 'Error') result.innerText = '0';\n      result.innerText += value;\n    } else if (result.innerText === '0' || result.innerText === 'Error') {\n      result.innerText = value;\n    } else if (result.innerText === '-0') {\n      result.innerText = '-' + value;\n    } else if (lastAction === '=' && value1) {\n      result.innerText = value;\n      value1 = '';\n    } else if (singleValueOperator.includes(lastAction)) {\n      result.innerText = value;\n    } else if (lastAction === 'xy' || lastAction === \"y\\u221A\") {\n      result.innerText += value;\n    } else if (memoryAction) {\n      result.innerText = value;\n      memoryAction = false;\n    } else {\n      result.innerText += value;\n    } // if (result.innerText !== '0' && result.innerText !== 'Error' && lastAction === '=') {\n    //     result.innerText += value;\n    // } else if (result.innerText === '0' || result.innerText === 'Error' || lastAction === '=') {\n    //     result.innerText = value;\n    // }\n\n  });\n  calc.addEventListener('click', function (event) {\n    if (!event.target.classList.contains('calc__btn_main')) return;\n\n    if (!event.target.classList.contains('equal')) {\n      var active = document.querySelector('.active');\n      if (active) active.classList.remove('active');\n      event.target.classList.add('active');\n\n      if (value1 != 0 && lastAction !== '=') {\n        value2 = result.innerText;\n        value1 = result.innerText = (0,_js_getResult_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value1, value2, operator);\n      } else {\n        value1 = result.innerText;\n      }\n\n      lastAction = operator = event.target.innerText;\n    }\n\n    if (event.target.classList.contains('equal')) {\n      if (doubleValueOperator.includes(lastAction) && lastAction === operator) {\n        value2 = result.innerText;\n        value1 = result.innerText = (0,_js_getResult_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value1, value2, operator);\n        lastAction = event.target.innerText;\n      } else if (operator && singleValueOperator.includes(lastAction)) {\n        value2 = result.innerText;\n        value1 = result.innerText = (0,_js_getResult_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value1, value2, operator);\n        lastAction = event.target.innerText;\n      } else if (lastAction === 'C') {\n        value2 = result.innerText;\n        value1 = result.innerText = (0,_js_getResult_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value1, value2, operator);\n        lastAction = event.target.innerText;\n      } else if (lastAction !== operator && (lastAction === 'xy' || lastAction === \"y\\u221A\")) {\n        value3 = result.innerText;\n        value2 = (0,_js_getResult_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value2, value3, lastAction);\n        value1 = result.innerText = (0,_js_getResult_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value1, value2, operator);\n        lastAction = event.target.innerText;\n      } else if (lastAction !== operator && singleValueOperator.includes(lastAction)) {\n        value1 = result.innerText = (0,_js_getResult_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(result.innerText, value2, lastAction);\n      } else {\n        value1 = result.innerText = (0,_js_getResult_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value1, value2, operator);\n        lastAction = event.target.innerText;\n      }\n    }\n  });\n  clearBtn.addEventListener('click', function () {\n    var active = document.querySelector('.active');\n    if (active) active.classList.remove('active');\n    if (lastAction === '=') result.innerText = '0';\n\n    if (result.innerText === '0') {\n      value1 = '0';\n      operator = '';\n    }\n\n    result.innerText === '0' ? value1 = '0' : result.innerText = '0';\n    clearBtn.innerText = 'AC';\n    lastAction = \"C\";\n  });\n  posNegBtn.addEventListener('click', function () {\n    if (result.innerText === 'Error') {\n      result.innerText = '-0';\n    } else {\n      result.innerHTML.startsWith('-') ? result.innerText = result.innerText.slice(1) : result.innerText = '-' + result.innerText;\n    }\n  });\n  percent.addEventListener('click', function () {\n    result.innerText = (0,_js_getResult_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(result.innerText, '100', \"\\xF7\");\n  });\n  calc.addEventListener('click', function (event) {\n    if (!event.target.classList.contains('xy')) return;\n    var active = document.querySelector('.active');\n    if (active) active.classList.remove('active');\n    event.target.classList.add('active');\n\n    if (value1 != 0 && (lastAction === 'xy' || lastAction === \"y\\u221A\")) {\n      value2 = result.innerText;\n      value1 = result.innerText = (0,_js_getResult_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value1, value2, operator);\n      lastAction = operator = event.target.innerText;\n    }\n\n    if (lastAction === '+') {\n      value2 = result.innerText;\n      lastAction = event.target.innerText;\n    } else {\n      value1 = result.innerText;\n      lastAction = operator = event.target.innerText;\n    }\n  });\n  calc.addEventListener('click', function (event) {\n    if (!event.target.classList.contains('immidFunc')) return;\n    result.innerText = (0,_js_getResult_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(result.innerText, value2, event.target.innerText);\n    lastAction = event.target.innerText;\n  });\n  mPlusBtn.addEventListener('click', function () {\n    memory === \"0\" ? memory = +result.innerText : memory += +result.innerText;\n    memoryAction = true;\n    if (theme1Btn.checked) mrBtn.classList.add('calc__btn_light');\n    if (theme2Btn.checked) mrBtn.classList.remove('calc__btn_light');\n  });\n  mMinusBtn.addEventListener('click', function () {\n    memory === \"0\" ? memory = 0 - +result.innerText : memory -= +result.innerText;\n    memoryAction = true;\n    if (theme1Btn.checked) mrBtn.classList.add('calc__btn_light');\n    if (theme2Btn.checked) mrBtn.classList.remove('calc__btn_light');\n  });\n  mcBtn.addEventListener('click', function () {\n    memory = \"0\";\n    memoryAction = false;\n    if (theme1Btn.checked) mrBtn.classList.remove('calc__btn_light');\n    if (theme2Btn.checked) mrBtn.classList.add('calc__btn_light');\n  });\n  mrBtn.addEventListener('click', function () {\n    result.innerText = memory;\n    memoryAction = true;\n    if (theme1Btn.checked) mrBtn.classList.add('calc__btn_light');\n    if (theme2Btn.checked) mrBtn.classList.remove('calc__btn_light');\n  });\n  secondFuncBtn.addEventListener('click', function () {\n    if (change1Btn.innerText === '10x') {\n      change1Btn.innerHTML = \"2<sup>x</sup>\";\n      change2Btn.innerHTML = \"log<sub>2</sub>\";\n    } else {\n      change1Btn.innerHTML = \"10<sup>x</sup>\";\n      change2Btn.innerHTML = \"ln\";\n    }\n  });\n  calc.addEventListener('mousedown', function (event) {\n    if (!event.target.classList.contains('calc__btn_main')) return;\n    event.target.style.backgroundColor = \"rgba(248, 205, 124, 0.959)\";\n  });\n  calc.addEventListener('mouseup', function (event) {\n    if (!event.target.classList.contains('calc__btn_main')) return;\n    event.target.style.backgroundColor = '';\n  });\n  document.getElementById('radioBtns').onclick = _js_handleTheme__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n});\n\n//# sourceURL=webpack://calculator/./src/index.js?");

/***/ }),

/***/ "./src/js/getResult.js":
/*!*****************************!*\
  !*** ./src/js/getResult.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getResult)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ \"./src/index.js\");\n //const result = require('../index');\n\nfunction getResult(a, b, op) {\n  var res = '0';\n  if (a === 'Error' || b === 'Error') return res = 'Error';\n  var aTailLength = a.includes(',') ? a.slice(a.indexOf(',') + 1).length : 0;\n  var bTailLength = b.includes(',') ? b.slice(b.indexOf(',') + 1).length : 0;\n  a = a.includes(',') ? Number(a.replace(',', '.')) : Number(a);\n  b = b.includes(',') ? Number(b.replace(',', '.')) : Number(b);\n\n  switch (op) {\n    case \"\\xF7\":\n      b === 0 ? res = 'Error' : res = a / b;\n      break;\n\n    case \"\\xD7\":\n      res = a * b;\n      break;\n\n    case \"\\u2212\":\n      var length = Math.max(aTailLength, bTailLength);\n      res = length === 0 ? a - b : Math.round((a - b) * Math.pow(10, length)) / Math.pow(10, length);\n      break;\n\n    case \"+\":\n      res = a + b;\n      break;\n\n    case '':\n      res = _index_js__WEBPACK_IMPORTED_MODULE_0__.result.innerText;\n      break;\n\n    case 'xy':\n      res = Math.pow(a, b);\n      break;\n\n    case \"y\\u221A\":\n      if (a < 0 && b % 2 != 1) {\n        res = 'Error';\n      } else {\n        res = (a < 0 ? -1 : 1) * Math.pow(Math.abs(a), 1 / b);\n      }\n\n      break;\n\n    case 'x2':\n      res = Math.pow(a, 2);\n      res = aTailLength ? Math.round(res * Math.pow(10, aTailLength * 2)) / Math.pow(10, aTailLength * 2) : res;\n      break;\n\n    case 'x3':\n      res = Math.pow(a, 3);\n      res = aTailLength ? Math.round(res * Math.pow(10, aTailLength * 9)) / Math.pow(10, aTailLength * 9) : res;\n      break;\n\n    case '1/x':\n      res = a === 0 ? 'Error' : 1 / a;\n      break;\n\n    case \"2\\u221A\":\n      if (a < 0) {\n        res = 'Error';\n      } else {\n        res = Math.sqrt(a);\n      }\n\n      break;\n\n    case \"3\\u221A\":\n      res = Math.cbrt(a);\n      break;\n\n    case 'ex':\n      res = Math.exp(a);\n      break;\n\n    case '10x':\n      res = Math.pow(10, a);\n      break;\n\n    case '2x':\n      res = Math.pow(2, a);\n      break;\n\n    case 'ln':\n      if (a <= 0) {\n        res = 'Error';\n      } else {\n        res = Math.log(a);\n      }\n\n      break;\n\n    case 'log10':\n      if (a <= 0) {\n        res = 'Error';\n      } else {\n        res = Math.log10(a);\n      }\n\n      break;\n\n    case 'log2':\n      if (a <= 0) {\n        res = 'Error';\n      } else {\n        res = Math.log2(a);\n      }\n\n      break;\n  }\n\n  if (res !== 'Error') {\n    res = String(res);\n    var resTailLength = res.includes('.') ? res.slice(res.indexOf('.') + 1).length : 0;\n    res = +res;\n    res = resTailLength > 12 ? Math.round(res * Math.pow(10, 12)) / Math.pow(10, 12) : res;\n  }\n\n  res = String(res);\n  return res.includes('.') ? res.replace('.', ',') : res;\n} //module.exports = getResult;\n\n//# sourceURL=webpack://calculator/./src/js/getResult.js?");

/***/ }),

/***/ "./src/js/handleTheme.js":
/*!*******************************!*\
  !*** ./src/js/handleTheme.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handleTheme)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ \"./src/index.js\");\n\nfunction handleTheme() {\n  if (_index_js__WEBPACK_IMPORTED_MODULE_0__.theme2Btn.checked) {\n    document.querySelector('.container').classList.add('container_light');\n    _index_js__WEBPACK_IMPORTED_MODULE_0__.calc.classList.add('calc_light');\n    _index_js__WEBPACK_IMPORTED_MODULE_0__.result.classList.add('display__result_light');\n    document.querySelector('.calc__theme').classList.add('calc__theme_light');\n    var calcBtnOther = document.querySelectorAll('.calc__btn_other');\n\n    for (var i = 0; i < calcBtnOther.length; i++) {\n      calcBtnOther[i].classList.add('calc__btn_light');\n    }\n\n    var calcBtnNum = document.querySelectorAll('.calc__btn_num');\n\n    for (var _i = 0; _i < calcBtnNum.length; _i++) {\n      calcBtnNum[_i].classList.add('calc__btn_num_light');\n    }\n\n    _index_js__WEBPACK_IMPORTED_MODULE_0__.memoryAction ? _index_js__WEBPACK_IMPORTED_MODULE_0__.mrBtn.classList.remove('calc__btn_light') : _index_js__WEBPACK_IMPORTED_MODULE_0__.mrBtn.classList.add('calc__btn_light');\n  }\n\n  if (_index_js__WEBPACK_IMPORTED_MODULE_0__.theme1Btn.checked) {\n    document.querySelector('.container').classList.remove('container_light');\n    _index_js__WEBPACK_IMPORTED_MODULE_0__.calc.classList.remove('calc_light');\n    _index_js__WEBPACK_IMPORTED_MODULE_0__.result.classList.remove('display__result_light');\n    document.querySelector('.calc__theme').classList.remove('calc__theme_light');\n\n    var _calcBtnOther = document.querySelectorAll('.calc__btn_other');\n\n    for (var _i2 = 0; _i2 < _calcBtnOther.length; _i2++) {\n      _calcBtnOther[_i2].classList.remove('calc__btn_light');\n    }\n\n    var _calcBtnNum = document.querySelectorAll('.calc__btn_num');\n\n    for (var _i3 = 0; _i3 < _calcBtnNum.length; _i3++) {\n      _calcBtnNum[_i3].classList.remove('calc__btn_num_light');\n    }\n\n    _index_js__WEBPACK_IMPORTED_MODULE_0__.memoryAction ? _index_js__WEBPACK_IMPORTED_MODULE_0__.mrBtn.classList.add('calc__btn_light') : _index_js__WEBPACK_IMPORTED_MODULE_0__.mrBtn.classList.remove('calc__btn_light');\n  }\n}\n\n//# sourceURL=webpack://calculator/./src/js/handleTheme.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;