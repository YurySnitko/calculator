import BaseCommand from "./base-command";

class SubtractCommand extends BaseCommand {
  execute() {
    return this.leftOperand - this.rightOperand;
  }
}

export default SubtractCommand;
