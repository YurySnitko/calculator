import BaseCommand from "./base-command";

class TenXCommand extends BaseCommand {
  execute() {
    return 10 ** this.leftOperand;
  }
}

export default TenXCommand;
