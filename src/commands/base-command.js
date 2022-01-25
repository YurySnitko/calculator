class BaseCommand {
  leftOperand;
  rightOperand;

  constructor(leftOperand, rightOperand) {
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
  }

  execute() {
    alert("Execute method is not implemented yet");
  }
}

export default BaseCommand;
