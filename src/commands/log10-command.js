import BaseCommand from "./base-command";

class Log10Command extends BaseCommand {
  execute() {
    return this.leftOperand <= 0 ? "Error" : Math.log10(this.leftOperand);
  }
}

export default Log10Command;
