import BaseCommand from "./base-command";

class ReverseCommand extends BaseCommand {
  execute() {
    return this.leftOperand === 0 ? "Error" : 1 / this.leftOperand;
  }
}

export default ReverseCommand;
