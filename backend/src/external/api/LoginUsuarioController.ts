import LoginUsuario from '@/core/usuario/service/LoginUsuario';

import { Express } from 'express';
import ProvedorJwt from './ProvedorJwt';

export default class LoginUsuarioController {
  constructor(servidor: Express, casoDeUso: LoginUsuario) {
    servidor.post('/api/usuarios/login', async (req, res) => {
      try {
        const usuario = await casoDeUso.executar({
          email: req.body.email,
          senha: req.body.senha,
        });

        const provedorJwt = new ProvedorJwt(process.env.JWT_SECRET!);

        res.status(200).send({
          usuario: usuario,
          token: provedorJwt.gerar(usuario),
        });
      } catch (error: any) {
        res.status(400).send(error.message);
      }
    });
  }
}
