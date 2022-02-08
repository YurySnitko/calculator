import BaseCommand from "./base-command";

class Root3Command extends BaseCommand {
  execute() {
    return Math.cbrt(this.leftOperand);
  }
}

export default Root3Command;
