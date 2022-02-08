class CalculatorDrawer {
  rootElement;
  buttonsWrapper;
  display;
  themeSwitcher;
  clearBtn;
  mrBtn;

  constructor(rootElementId) {
    this.rootElement = document.getElementById(rootElementId);
    this.theme = "Dark";
  }

  appendButton(title, onClick) {
    const button = this.renderButton(title, onClick);

    title === "AC" && (this.clearBtn = button);
    if (title === "mr") {
      this.mrBtn = button;
      button.classList.add("mrBtn");
    }

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
    return this.addButtonStyles(button, title);
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
    this.themeSwitcher = document.createElement("div");
    const div = document.createElement("div");
    this.themeSwitcher.classList.add("interface__theme");
    div.innerText = "Theme";
    if (this.buttonsWrapper) {
      const radioBtns = document.createElement("form");
      radioBtns.setAttribute("id", "radioBtns");
      radioBtns.setAttribute("name", "radioBtns");
      radioBtns.onchange = () => this.handleOnThemeSwitcherClick();
      this.buttonsWrapper.appendChild(this.themeSwitcher);
      this.themeSwitcher.append(div, radioBtns);
      radioBtns.append(
        ...this.createRadioBtn("Dark"),
        ...this.createRadioBtn("Light")
      );
    }
  }

  handleOnThemeSwitcherClick() {
    this.setTheme(document.getElementById("radioBtns").theme.value);

    const numButtons = this.buttonsWrapper.querySelectorAll(".btn__num");
    const otherButtons = this.buttonsWrapper.querySelectorAll(
      "button:not(.btn__main):not(.mrBtn)"
    );

    if (this.theme === "Light") {
      this.display.classList.add("display_light");
      this.themeSwitcher.classList.add("interface__theme_light");

      for (let i = 0; i < numButtons.length; i++) {
        numButtons[i].classList.add("btn__num_light");
      }
      for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].classList.add("btn_light");
      }
    } else {
      this.display.classList.remove("display_light");
      this.themeSwitcher.classList.remove("interface__theme_light");

      for (let i = 0; i < numButtons.length; i++) {
        numButtons[i].classList.remove("btn__num_light");
      }
      for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].classList.remove("btn_light");
      }
    }

    this.mrBtn.classList.toggle("btn_light");
  }

  createRadioBtn(theme) {
    const nodes = [];
    const input = document.createElement("input");
    const label = document.createElement("label");

    input.type = "radio";
    input.setAttribute("id", theme);
    input.setAttribute("name", "theme");
    input.setAttribute("value", theme);
    input.classList.add("radio-input");
    input.checked = theme === this.theme;

    label.setAttribute("for", theme);
    label.innerText = theme;

    nodes.push(input);
    nodes.push(label);

    return nodes;
  }

  setDisplayValue(value) {
    this.display.value = value;
  }

  setClearBtnValue(value) {
    this.clearBtn.innerText = value;
  }

  fixFuncButtons(node1, node2) {
    this.buttonsWrapper.childNodes[30].replaceWith(node1);
    this.buttonsWrapper.childNodes[31].replaceWith(node2);
  }

  setButtonActive(lastAction) {
    const active = this.buttonsWrapper.querySelector(".active");
    active && active.classList.remove("active");

    if (lastAction) {
      for (let node of this.buttonsWrapper.childNodes) {
        lastAction === node.innerText && node.classList.add("active");
      }
    }
  }

  setMemoryActive(isActive) {
    if (this.theme === "Dark") {
      isActive
        ? this.mrBtn.classList.add("btn_light")
        : this.mrBtn.classList.remove("btn_light");
    } else {
      isActive
        ? this.mrBtn.classList.remove("btn_light")
        : this.mrBtn.classList.add("btn_light");
    }
  }

  addButtonStyles(button, title) {
    if (["*", "/", "+", "-", "="].includes(title)) {
      button.classList.add("btn__main");
    } else if (
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(title)
    ) {
      button.classList.add("btn__num");
      this.theme === "Light" && button.classList.add("btn__num_light");
    }
    this.theme === "Light" && button.classList.add("btn_light");
    return button;
  }

  setTheme(theme) {
    this.theme = theme;
  }
}

export default CalculatorDrawer;
