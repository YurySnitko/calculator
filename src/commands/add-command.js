import BaseCommand from "./base-command";

class AddCommand extends BaseCommand {
  execute() {
    return this.leftOperand + this.rightOperand;
  }
}

export default AddCommand;
