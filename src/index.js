import Calculator from "./calculator";
import CalculatorDrawer from "./drawers/calculatorDrawer";

class CalculatorApp {
  drawer;
  calculator;

  constructor(drawer, calculator) {
    this.drawer = drawer;
    this.calculator = calculator;
  }

  start() {
    this.drawer.renderLayout();
    this.drawer.appendThemeSwitcher();
    this.drawer.mapRenderOrder(this.calculator);
    this.drawer.renderOrder.forEach((e) => {
      this.drawer.appendButton(e.title, e.handler);
    });

    this.calculator.state.subscribe((state) => {
      const { rightOperand, leftOperand, operation } = state;

      // TODO: remove rightOperand > 0 and change it with render flag
      this.drawer.setDisplayValue(
        operation && rightOperand > 0 ? rightOperand : leftOperand
      );
    });

    console.log(this.drawer.renderOrder);
  }
}

new CalculatorApp(new CalculatorDrawer("root"), new Calculator()).start();
