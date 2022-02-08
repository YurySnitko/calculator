import BaseCommand from "./base-command";

class Root2Command extends BaseCommand {
  execute() {
    return this.leftOperand < 0 ? "Error" : Math.sqrt(this.leftOperand);
  }
}

export default Root2Command;
