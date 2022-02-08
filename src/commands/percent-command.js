import BaseCommand from "./base-command";

class PercentCommand extends BaseCommand {
  execute() {
    return this.leftOperand / 100;
  }
}

export default PercentCommand;
