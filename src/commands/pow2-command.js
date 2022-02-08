import BaseCommand from "./base-command";

class Pow2Command extends BaseCommand {
  execute() {
    return this.leftOperand ** 2;
  }
}

export default Pow2Command;
