import BaseCommand from "./base-command";

class DivideCommand extends BaseCommand {
  execute() {
    if (!this.rightOperand) {
      return "Error";
    }
    return this.leftOperand / this.rightOperand;
  }
}

export default DivideCommand;
