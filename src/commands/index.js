import AddCommand from "./add-command";
import MultiplyCommand from "./multiply-command";
import SubtractCommand from "./subtract-command";
import DivideCommand from "./divide-command";

class CommandsFactory {
  /**
   *
   * @param {string} sign
   * @returns {BaseCommand}
   */
  getCommandBySign(sign) {
    switch (sign) {
      case "+":
        return AddCommand;
      case "-":
        return SubtractCommand;
      case "*":
        return MultiplyCommand;
      case "/":
        return DivideCommand;

      default:
        throw new Error("Command for the provided sign not found");
    }
  }
}

export default CommandsFactory;
