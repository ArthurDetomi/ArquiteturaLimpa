import RegistrarUsuario from '@/core/usuario/service/RegistrarUsuario';
import TerminalUtil from '../util/TerminalUtil';
import Usuario from '@/core/usuario/model/Usuario';

export default async function registrarUsuario() {
  TerminalUtil.titulo('Registrar Usuário');

  const nome = await TerminalUtil.campoRequerido('Nome: ', 'Ana da Silva');
  const email = await TerminalUtil.campoRequerido(
    'Email: ',
    'ana.silva@empresa.com.br',
  );
  const senha = await TerminalUtil.campoRequerido('Senha: ', '123456');

  const usuario: Usuario = { nome, email, senha };

  new RegistrarUsuario().executar(usuario);

  await TerminalUtil.sucesso('Usuário registrado com sucesso!');

  await TerminalUtil.esperarEnter();

  try {
    new RegistrarUsuario().executar(usuario);
  } catch (e: any) {
    await TerminalUtil.erro(e.message);
  } finally {
    await TerminalUtil.esperarEnter();
  }
}
