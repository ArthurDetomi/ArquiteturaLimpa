import { terminal } from "terminal-kit";
import TerminalUtil from "../util/TerminalUtil";
import polimorfismo from "../fundamentos/polimorfismo";

export default async function menuFundamentos() {
  TerminalUtil.titulo("Fundamentos");

  const [selectedIndex] = await TerminalUtil.menu([
    "1. Polimorfismo",
    "Voltar",
  ]);

  switch (selectedIndex) {
    case 0:
      await polimorfismo();
      break;
    case 1:
      return;
  }

  await menuFundamentos();
}
