import BaseCommand from "./base-command";

class ExponentCommand extends BaseCommand {
  execute() {
    return Math.exp(this.leftOperand);
  }
}

export default ExponentCommand;
