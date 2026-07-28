// Na arquitetura hexagonal esta interface é uma Porta!
// A porta faz parte do core da aplicação
export default interface ProvedorCriptografia {
  criptografar(texto: string): string;
}
