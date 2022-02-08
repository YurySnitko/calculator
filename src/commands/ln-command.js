import BaseCommand from "./base-command";

class LnCommand extends BaseCommand {
  execute() {
    return this.leftOperand <= 0 ? "Error" : Math.log(this.leftOperand);
  }
}

export default LnCommand;
