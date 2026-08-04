export default interface CasoDeUso<E, S> {
  executar(entrada: any): Promise<any>;
}
