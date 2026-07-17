import corrida from "@/core/fundamentos/corrida";
import TerminalUtil from "../util/TerminalUtil";
import Ferrari from "@/core/fundamentos/Ferrari";
import Fusca from "@/core/fundamentos/Fusca";
import Carro from "@/core/fundamentos/Carro";
import Civic from "@/core/fundamentos/Civic";
import { terminal } from "terminal-kit";

export default async function dip() {
  TerminalUtil.titulo("DIP");

  const [tipoCarro] = await TerminalUtil.selecao("Tipo de carro?", [
    "Ferrari",
    "Fusca",
    "Civic",
  ]);

  let carro: Carro;

  switch (tipoCarro) {
    case 0:
      carro = new Ferrari();
      break;
    case 1:
      carro = new Fusca();
      break;
    case 2:
      carro = new Civic();
      break;
    default:
      throw new Error("Carro inválido escolhido");
  }

  corrida(carro, terminal.blue);

  await TerminalUtil.esperarEnter();
}
