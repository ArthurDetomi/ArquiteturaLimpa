import { terminal } from "terminal-kit";

export default class TerminalUtil {
  static titulo(texto: string) {
    terminal.clear();
    terminal.magenta(`${texto}\n`);
    terminal.magenta(`-`.repeat(texto.length) + "\n");
  }

  static limpar() {
    terminal.clear();
  }

  static exibirChaveValor(chave: string, valor: any) {
    terminal.yellow(chave).green(valor).white("\n");
  }

  static async menu(opcoes: string[]): Promise<[number, string]> {
    const resposta = await terminal.singleColumnMenu(opcoes).promise;

    return [resposta.selectedIndex, resposta.selectedText];
  }

  static async confirmacao(texto: string): Promise<Boolean> {
    terminal.yellow(`\n${texto}\n`);

    const resposta = await terminal.singleLineMenu(["Sim", "Não"]).promise;

    return resposta.selectedIndex === 0;
  }

  static async selecao(
    texto: string,
    opcoes: string[],
  ): Promise<[number, string]> {
    terminal.yellow(`\n${texto}\n`);

    const resposta = await terminal.singleLineMenu(opcoes).promise;

    return [resposta.selectedIndex, resposta.selectedText];
  }
}
