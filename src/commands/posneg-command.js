import BaseCommand from "./base-command";

class PosNegCommand extends BaseCommand {
  execute() {
    const value = String(this.leftOperand);
    return value.startsWith("-") ? value.slice(1) : "-" + value;
  }
}

export default PosNegCommand;
