import BaseCommand from "./base-command";

class Pow3Command extends BaseCommand {
  execute() {
    return this.leftOperand ** 3;
  }
}

export default Pow3Command;
