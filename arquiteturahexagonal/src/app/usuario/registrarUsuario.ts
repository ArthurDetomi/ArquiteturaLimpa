import RegistrarUsuario from '@/core/usuario/service/RegistrarUsuario';
import TerminalUtil from '../util/TerminalUtil';
import Usuario from '@/core/usuario/model/Usuario';

import SenhaCripto from '@/adapter/auth/SenhaCripto';
import RepositorioUsuarioMysql from '@/adapter/db/RepositorioUsuarioMySql';

export default async function registrarUsuario() {
  const { titulo, campoRequerido, sucesso, erro, esperarEnter } = TerminalUtil;

  titulo('Registrar Usuário');

  const nome = await campoRequerido('Nome: ');
  const email = await campoRequerido('Email: ');
  const senha = await campoRequerido('Senha: ');

  const usuario: Usuario = { nome, email, senha };

  const provedorCripto = new SenhaCripto();

  const repositorio = new RepositorioUsuarioMysql();

  const casoDeUso = new RegistrarUsuario(repositorio, provedorCripto);

  try {
    await casoDeUso.executar(usuario);

    await sucesso('Usuário registrado com sucesso!');
  } catch (e: any) {
    await erro(e.message);
  } finally {
    await esperarEnter();
  }
}
