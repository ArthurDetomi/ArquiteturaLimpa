import dotenv from 'dotenv';

dotenv.config();

import { pool } from './external/db/db';

import express from 'express';
import RegistrarUsuario from './core/usuario/service/RegistrarUsuario';
import RepositorioUsuarioMysql from './external/db/RepositorioUsuarioMySql';
import SenhaCripto from './external/auth/SenhaCripto';
import RegistrarUsuarioController from './external/api/RegistrarUsuarioController';
import LoginUsuario from './core/usuario/service/LoginUsuario';
import LoginUsuarioController from './external/api/LoginUsuarioController';
import ObterProdutoPorIdController from './external/api/ObterProdutoPorIdController';
import ObterProdutoPorId from './core/produto/service/ObterProdutoPorId';
import UsuarioMiddleware from './external/api/UsuarioMiddleware';

const app = express();

const PORT = process.env.API_PORT ?? 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------- Rotas abertas

const repositorioUsuario = new RepositorioUsuarioMysql();
const provedorCripto = new SenhaCripto();

const registrarUsuario = new RegistrarUsuario(
  repositorioUsuario,
  provedorCripto,
);

new RegistrarUsuarioController(app, registrarUsuario);

const loginUsuario = new LoginUsuario(repositorioUsuario, provedorCripto);

new LoginUsuarioController(app, loginUsuario);

// -------------------------

// ------------------------- Rotas protegidas

const obterProduto = new ObterProdutoPorId();

const usuarioMid = UsuarioMiddleware(repositorioUsuario);

new ObterProdutoPorIdController(app, obterProduto, usuarioMid);

// ------------------------- Rotas

const server = app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}!`);
});

async function shutdown() {
  console.log('\nEncerrando servidor...');

  server.close(async () => {
    console.log('Servidor HTTP encerrado.');

    try {
      await pool.end();
      console.log('Pool de conexões encerrado.');
      process.exit(0);
    } catch (err) {
      console.error('Erro ao encerrar pool:', err);
      process.exit(1);
    }
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
