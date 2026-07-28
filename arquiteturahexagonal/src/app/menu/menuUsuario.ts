import TerminalUtil from "../util/TerminalUtil";
import polimorfismo from "../fundamentos/polimorfismo";
import registrarUsuario from "../usuario/registrarUsuario";

export default async function menuUsuario() {
  TerminalUtil.titulo("Usuário");

  const [selectedIndex] = await TerminalUtil.menu([
    "1. Registrar usuário",
    "Voltar",
  ]);

  switch (selectedIndex) {
    case 0:
      await registrarUsuario();
      break;
    case 1:
      return;
  }

  await menuUsuario();
}
