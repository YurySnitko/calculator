import BaseCommand from "./base-command";

class MultiplyCommand extends BaseCommand {
  execute() {
    return this.leftOperand * this.rightOperand;
  }
}

export default MultiplyCommand;
