import BaseCommand from "./base-command";

class PowYCommand extends BaseCommand {
  execute() {
    return this.leftOperand ** this.rightOperand;
  }
}

export default PowYCommand;
