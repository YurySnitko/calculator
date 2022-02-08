import BaseCommand from "./base-command";

class Log2Command extends BaseCommand {
  execute() {
    return this.leftOperand <= 0 ? "Error" : Math.log2(this.leftOperand);
  }
}

export default Log2Command;
