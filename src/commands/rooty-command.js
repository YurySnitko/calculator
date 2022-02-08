import BaseCommand from "./base-command";

class RootYCommand extends BaseCommand {
  execute() {
    if (this.leftOperand < 0 && this.rightOperand % 2 != 1) {
      return "Error"
    } else {
      return (this.leftOperand < 0 ? -1 : 1) * Math.pow(Math.abs(this.leftOperand), 1 / this.rightOperand)
    }
  }
}

export default RootYCommand;
