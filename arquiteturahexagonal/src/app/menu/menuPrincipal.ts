import TerminalUtil from "../util/TerminalUtil";
import menuFundamentos from "./menuFundamentos";
import menuUsuario from "./menuUsuario";

export default async function menuPrincipal() {
  TerminalUtil.titulo("Menu Principal");

  const [selectedIndex] = await TerminalUtil.menu([
    "1. Fundamentos",
    "2. Usuário",
    "Sair",
  ]);

  switch (selectedIndex) {
    case 0:
      await menuFundamentos();
      break;
    case 1:
      await menuUsuario();
      break;
    case 2:
      process.exit(0);
  }

  await menuPrincipal();
}
