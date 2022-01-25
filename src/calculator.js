import CommandsFactory from "./commands";
import Subject from "./helpers/subject";

const initialCalculatorState = {
  leftOperand: 0,
  rightOperand: 0,
  operation: undefined,
};

class Calculator {
  availableCalculateOperations = ["*", "/", "+", "-", "="];
  availableModifyOperations = [
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

  state = new Subject(initialCalculatorState);

  static isEqualOperation(operation) {
    return operation === "=";
  }

  processCalculateOperation = (operation) => {
    const {
      operation: currentOperation,
      leftOperand,
      rightOperand,
    } = this.state.getValue();

    if (!currentOperation || Calculator.isEqualOperation(currentOperation)) {
      this.changeState({ operation });
    } else {
      const Command = new CommandsFactory().getCommandBySign(currentOperation);
      this.changeState({
        leftOperand: new Command(leftOperand, rightOperand).execute(),
        rightOperand: 0,
        operation: operation,
      });
    }
  };

  processNumber = (value) => {
    const newValue = Number(`${this.getActiveValue()}${value}`);
    this.changeCurrentValue(newValue);
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
}

export default Calculator;
