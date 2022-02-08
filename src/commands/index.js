import AddCommand from "./add-command";
import MultiplyCommand from "./multiply-command";
import SubtractCommand from "./subtract-command";
import DivideCommand from "./divide-command";
import PosNegCommand from "./posneg-command";
import PercentCommand from "./percent-command";
import Pow2Command from "./pow2-command";
import Pow3Command from "./pow3-command";
import ReverseCommand from "./reverse-command";
import Root2Command from "./root2-command";
import Root3Command from "./root3-command";
import ExponentCommand from "./exponent-command";
import TenXCommand from "./tenx-command";
import LnCommand from "./ln-command";
import Log10Command from "./log10-command";
import PowYCommand from "./powy-command";
import RootYCommand from "./rooty-command";
import TwoXCommand from "./twox-command";
import Log2Command from "./log2-command";

class CommandsFactory {
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
      case "+/-":
        return PosNegCommand;
      case "%":
        return PercentCommand;
      case "x2":
        return Pow2Command;
      case "x3":
        return Pow3Command;
      case "xy":
        return PowYCommand;
      case "1/x":
        return ReverseCommand;
      case "2\u221A":
        return Root2Command;
      case "3\u221A":
        return Root3Command;
      case "y\u221A":
        return RootYCommand;
      case "ex":
        return ExponentCommand;
      case "10x":
        return TenXCommand;
      case "2x":
        return TwoXCommand;
      case "ln":
        return LnCommand;
      case "log10":
        return Log10Command;
      case "log2":
        return Log2Command;
      default:
        throw new Error("Command for the provided sign not found");
    }
  }
}

export default CommandsFactory;
