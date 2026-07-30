import RegistrarUsuario from '@/core/usuario/service/RegistrarUsuario';
import TerminalUtil from '../util/TerminalUtil';
import Usuario from '@/core/usuario/model/Usuario';

import SenhaCripto from '@/adapter/auth/SenhaCripto';
import RepositorioUsuarioEmMemoria from '@/adapter/db/RepositorioUsuarioEmMemoria';
import RepositorioUsuarioMysql from '@/adapter/db/RepositorioUsuarioMySql';

export default async function registrarUsuario() {
  TerminalUtil.titulo('Registrar Usuário');

  const nome = await TerminalUtil.campoRequerido('Nome: ');
  const email = await TerminalUtil.campoRequerido('Email: ');
  const senha = await TerminalUtil.campoRequerido('Senha: ');

  const usuario: Usuario = { nome, email, senha };

  const provedorCripto = new SenhaCripto();

  const repositorio = new RepositorioUsuarioMysql();

  const casoDeUso = new RegistrarUsuario(repositorio, provedorCripto);

  try {
    await casoDeUso.executar(usuario);

    await TerminalUtil.sucesso('Usuário registrado com sucesso!');
  } catch (e: any) {
    await TerminalUtil.erro(e.message);
  } finally {
    await TerminalUtil.esperarEnter();
  }
}
