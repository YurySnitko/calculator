import BaseCommand from "./base-command";

class TwoXCommand extends BaseCommand {
  execute() {
    return 2 ** this.leftOperand;
  }
}

export default TwoXCommand;
