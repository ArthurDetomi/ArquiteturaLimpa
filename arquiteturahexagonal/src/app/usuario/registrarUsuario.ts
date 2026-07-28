import RegistrarUsuario from '@/core/usuario/service/RegistrarUsuario';
import TerminalUtil from '../util/TerminalUtil';
import Usuario from '@/core/usuario/model/Usuario';
import InverterSenhaCripto from '@/adapter/auth/InverterSenhaCriptografia';

export default async function registrarUsuario() {
  TerminalUtil.titulo('Registrar Usuário');

  const nome = await TerminalUtil.campoRequerido('Nome: ', 'Ana da Silva');
  const email = await TerminalUtil.campoRequerido(
    'Email: ',
    'ana.silva@empresa.com.br',
  );
  const senha = await TerminalUtil.campoRequerido('Senha: ', '123456');

  const usuario: Usuario = { nome, email, senha };

  const provedorCripto = new InverterSenhaCripto();

  const casoDeUso = new RegistrarUsuario(provedorCripto);

  await casoDeUso.executar(usuario);

  await TerminalUtil.sucesso('Usuário registrado com sucesso!');

  await TerminalUtil.esperarEnter();

  try {
    await casoDeUso.executar(usuario);
  } catch (e: any) {
    await TerminalUtil.erro(e.message);
  } finally {
    await TerminalUtil.esperarEnter();
  }
}
