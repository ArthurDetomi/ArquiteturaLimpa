import { terminal } from "terminal-kit";
import TerminalUtil from "../util/TerminalUtil";
import polimorfismo from "../fundamentos/polimorfismo";
import dip from "../fundamentos/dip";

export default async function menuFundamentos() {
  TerminalUtil.titulo("Fundamentos");

  const [selectedIndex] = await TerminalUtil.menu([
    "1. Polimorfismo",
    "2. DIP",
    "Voltar",
  ]);

  switch (selectedIndex) {
    case 0:
      await polimorfismo();
      break;
    case 1:
      await dip();
      break;
    case 2:
      return;
  }

  await menuFundamentos();
}
