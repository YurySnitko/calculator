class CalculatorDrawer {
  rootElement;
  buttonsWrapper;
  display;

  constructor(rootElementId) {
    this.rootElement = document.getElementById(rootElementId);
  }
  renderOrder = [
    "AC",
    "+/-",
    "%",
    "/",
    "mc",
    "m+",
    "m-",
    "mr",
    "7",
    "8",
    "9",
    "*",
    "2nd",
    "x2",
    "x3",
    "xy",
    "4",
    "5",
    "6",
    "-",
    "1/x",
    "2r",
    "3r",
    "yr",
    "1",
    "2",
    "3",
    "+",
    "ex",
    "10x",
    "ln",
    "log10",
    "0",
    ",",
    "=",
  ];

  appendButton(title, onClick) {
    const button = this.renderButton(title, onClick);
    if (this.buttonsWrapper) {
      this.buttonsWrapper.appendChild(button);
    }
  }

  renderButton(title, onClick) {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerHTML = title;
    button.addEventListener("click", () => {
      onClick.call(undefined, title);
    });
    return button;
  }

  renderLayout() {
    this.buttonsWrapper = document.createElement("div");
    this.buttonsWrapper.classList.add("interface");
    this.display = this.renderDisplay(0);
    this.rootElement.appendChild(this.display);
    this.rootElement.appendChild(this.buttonsWrapper);
  }

  renderDisplay(initialValue) {
    const output = document.createElement("output");
    output.classList.add("display");
    output.innerText = initialValue;
    return output;
  }

  appendThemeSwitcher() {
    const themeSwitcher = document.createElement("div");
    themeSwitcher.classList.add("interface__theme");
    themeSwitcher.innerText = "Theme";
    if (this.buttonsWrapper) {
      this.buttonsWrapper.appendChild(themeSwitcher);
    }
  }

  mapRenderOrder(calculator) {
    this.renderOrder = this.renderOrder.map((e) => {
      let handler;

      if (calculator.availableCalculateOperations.includes(e)) {
        handler = calculator.processCalculateOperation;
      } else if (
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e)
      ) {
        handler = calculator.processNumber;
      }

      return {
        title: e,
        handler: handler,
      };
    });
  }

  setDisplayValue(value) {
    this.display.value = value;
  }
}

export default CalculatorDrawer;
