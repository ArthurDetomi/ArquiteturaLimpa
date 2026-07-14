import { terminal } from "terminal-kit";
import TerminalUtil from "../util/TerminalUtil";
import menuFundamentos from "./menuFundamentos";

export default async function menuPrincipal() {
  TerminalUtil.titulo("Menu Principal");

  const [selectedIndex] = await TerminalUtil.menu(["1. Fundamentos", "Sair"]);

  switch (selectedIndex) {
    case 0:
      await menuFundamentos();
      break;
    case 1:
      process.exit(0);
  }

  await menuPrincipal();
}
