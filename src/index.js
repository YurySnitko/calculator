import Calculator from "./calculator";
import CalculatorDrawer from "./drawers/calculatorDrawer";
import SnapshotState from "./helpers/snapshot-state";

class CalculatorApp {
  drawer;
  calculator;

  constructor(drawer, calculator) {
    this.drawer = drawer;
    this.calculator = calculator;
    this.snapshotState = new SnapshotState();
  }

  start() {
    this.drawer.renderLayout();
    this.drawer.appendThemeSwitcher();
    this.calculator.mapButtonsOrder();
    this.calculator.buttonsOrder.forEach((e) => {
      this.drawer.appendButton(e.title, () => {
        e.handler(e.title);
        if (
          ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].indexOf(
            e.title
          ) < 0
        ) {
          this.snapshotState.pushState(this.calculator.state.getValue());
        }
      });
    });

    this.snapshotState.pushState(this.calculator.state.getValue());

    this.calculator.state.subscribe((state) => {
      const {
        rightOperand,
        leftOperand,
        operation,
        clearStatus,
        is2funcToggled,
        lastAction,
        memory,
      } = state;

      if (this.snapshotState.getLastState().is2funcToggled !== is2funcToggled) {
        this.drawer.fixFuncButtons(
          this.drawer.renderButton(
            is2funcToggled ? "2x" : "10x",
            this.calculator.processModifyOperation
          ),
          this.drawer.renderButton(
            is2funcToggled ? "log2" : "ln",
            this.calculator.processModifyOperation
          )
        );
      }
      this.drawer.setClearBtnValue(clearStatus);
      this.drawer.setDisplayValue(
        operation && rightOperand !== "" ? rightOperand : leftOperand
      );
      this.drawer.setButtonActive(
        lastAction !== "=" &&
          this.calculator.availableCalculateOperations.includes(lastAction)
          ? lastAction
          : undefined
      );
      this.snapshotState.getLastState().memory !== memory &&
        this.drawer.setMemoryActive(memory === null ? false : true);
    });
  }
}

new CalculatorApp(new CalculatorDrawer("root"), new Calculator()).start();
