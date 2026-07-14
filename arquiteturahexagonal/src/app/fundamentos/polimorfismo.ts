import TerminalUtil from "../util/TerminalUtil";

export default async function polimorfismo() {
  TerminalUtil.titulo("Polimorfismo");

  const tipoCarro = await TerminalUtil.selecao("Tipo de carro?", [
    "Ferrari",
    "Fusca",
  ]);

  while (true) {
    const continuar = await TerminalUtil.confirmacao("Deseja continuar?");

    if (!continuar) {
      return;
    }
  }
}
