import CommandsFactory from "./commands";
import Subject from "./helpers/subject";

const initialCalculatorState = {
  leftOperand: "0",
  rightOperand: "",
  operation: undefined,
  clearStatus: "AC",
  is2funcToggled: false,
  memory: null,
  lastAction: undefined,
};

class Calculator {
  availableCalculateOperations = ["*", "/", "+", "-", "=", "xy", "y\u221A"];
  availableModifyOperations = [
    "+/-",
    "%",
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
  availableMemoryOperations = ["mc", "mr", "m+", "m-"];
  buttonsOrder = [
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
    "2\u221A",
    "3\u221A",
    "y\u221A",
    "1",
    "2",
    "3",
    "+",
    "ex",
    "10x",
    "ln",
    "log10",
    "0",
    ".",
    "=",
  ];

  state = new Subject(initialCalculatorState);

  static isEqualOperation(operation) {
    return operation === "=";
  }

  processCalculateOperation = (operation) => {
    const {
      operation: currentOperation,
      leftOperand,
      rightOperand,
      clearStatus,
    } = this.state.getValue();

    clearStatus === "AC" && this.changeState({ clearStatus: "C" });

    if (!currentOperation || Calculator.isEqualOperation(currentOperation)) {
      this.changeState({ operation, lastAction: operation });
    } else {
      const Command = new CommandsFactory().getCommandBySign(currentOperation);
      this.changeState({
        leftOperand: String(new Command(+leftOperand, +rightOperand).execute()),
        rightOperand: "",
        operation: Calculator.isEqualOperation(operation)
          ? undefined
          : operation,
        lastAction: operation,
      });
    }
  };

  processModifyOperation = (operation) => {
    const {
      operation: currentOperation,
      leftOperand,
      rightOperand,
      clearStatus,
    } = this.state.getValue();

    clearStatus === "AC" && this.changeState({ clearStatus: "C" });

    const Command = new CommandsFactory().getCommandBySign(operation);
    const newValue = String(
      new Command(currentOperation ? +rightOperand : +leftOperand).execute()
    );
    this.changeCurrentValue(newValue);
    this.changeState({ lastAction: operation });
  };

  processNumber = (value) => {
    this.state.getValue().clearStatus === "AC" &&
      this.changeState({ clearStatus: "C" });

    if (
      (value === "." && this.getActiveValue().includes(".")) ||
      (value === "0" && this.getActiveValue() === "0")
    ) {
      return;
    } else if (this.state.getValue().lastAction) {
      this.changeCurrentValue(value);
      this.changeState({ lastAction: undefined });
    } else {
      this.getActiveValue() === "0" && value !== "."
        ? this.changeCurrentValue(value)
        : this.changeCurrentValue(`${this.getActiveValue()}${value}`);
    }
  };

  processMemory = (operation) => {
    const { memory } = this.state.getValue();

    switch (operation) {
      case "m+":
        this.changeState({ memory: memory + +this.getActiveValue() });
        break;
      case "m-":
        this.changeState({ memory: memory - +this.getActiveValue() });
        break;
      case "mc":
        this.changeState({ memory: null });
        break;
      case "mr":
        this.changeCurrentValue(memory ? String(memory) : "0");
        break;
    }

    this.changeState({ lastAction: operation });
  };

  processClear = () => {
    if (this.state.getValue().clearStatus === "C") {
      this.changeCurrentValue("0");
      this.changeState({ clearStatus: "AC" });
    } else {
      this.changeState(initialCalculatorState);
    }
  };

  processToggle = () => {
    this.changeState({ is2funcToggled: !this.state.getValue().is2funcToggled });
  };

  changeState = (newState) => {
    this.state.next({
      ...this.state.getValue(),
      ...newState,
    });
  };

  getActiveValue = () => {
    const { operation, leftOperand, rightOperand } = this.state.getValue();
    return operation ? rightOperand : leftOperand;
  };

  changeCurrentValue = (newValue) => {
    const { operation } = this.state.getValue();
    this.changeState(
      operation ? { rightOperand: newValue } : { leftOperand: newValue }
    );
  };

  mapButtonsOrder() {
    this.buttonsOrder = this.buttonsOrder.map((e) => {
      let handler;

      if (this.availableCalculateOperations.includes(e)) {
        handler = this.processCalculateOperation;
      } else if (this.availableModifyOperations.includes(e)) {
        handler = this.processModifyOperation;
      } else if (
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(e)
      ) {
        handler = this.processNumber;
      } else if (this.availableMemoryOperations.includes(e)) {
        handler = this.processMemory;
      } else if (e === "AC") {
        handler = this.processClear;
      } else if (e === "2nd") {
        handler = this.processToggle;
      }

      return {
        title: e,
        handler: handler,
      };
    });
  }
}

export default Calculator;
