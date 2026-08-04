import Usuario from '@/core/usuario/model/Usuario';
import RepositorioUsuario from '@/core/usuario/service/RepositorioUsuario';

import { pool } from './db';

import type { RowDataPacket } from 'mysql2/promise';

interface UsuarioRow extends RowDataPacket {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

export default class RepositorioUsuarioMysql implements RepositorioUsuario {
  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const [rows] = await pool.execute<UsuarioRow[]>(
      `
        SELECT id, nome, email, senha
        FROM usuarios
        WHERE email = ?
        LIMIT 1
      `,
      [email],
    );

    const row = rows[0];

    if (!row) {
      return null;
    }

    return { id: row.id, nome: row.nome, email: row.email, senha: row.senha };
  }

  async inserir(usuario: Usuario): Promise<void> {
    await pool.execute(
      `
        INSERT INTO usuarios (id, nome, email, senha)
        VALUES (?, ?, ?, ?)
      `,
      // cast to any to satisfy overloaded typings of pool.execute
      [usuario.id, usuario.nome, usuario.email, usuario.senha] as any,
    );
  }
}
