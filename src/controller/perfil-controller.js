import User from '../model/user-model.js';
import link from '../model/link-model.js';
import jwt from 'jsonwebtoken';
import { clearCookie } from 'express/lib/response.js';
import { token_crypt } from '../config.js';

const encriptador = new User();

export class ControladorDePerfil {
  async editarUsuario(req, res) {
    const { password, nuevoPassword } = req.body;
    const userId = jwt.verify(req.cookies.token, token_crypt).id;

    try {
      const user = await User.findOne({ _id: userId });
      const valido = await user.comparePassword(password, user.password);
      console.log(user._id);
      if (valido == true) {
        await User.findByIdAndUpdate(user._id, {
          password: await encriptador.encryptPassword(nuevoPassword),
        });
        res.redirect('/link-chest/perfil');
      } else {
        req.flash('mensaje', 'El password es incorrecto');
        res.redirect('/link-chest/perfil/editar-usuario');
      }
    } catch (e) {
      console.error(e);

      res.render('error');
    }
  }

  async eliminarCuenta(req, res) {
    const userId = jwt.verify(req.cookies.token, token_crypt).id;
    try {
      await User.findByIdAndDelete({ _id: userId });
      await link.find({ user: userId }).deleteMany();
      res.clearCookie('token');
      res.redirect('/login');
    } catch (e) {
      console.error(e);
      res.clearCookie('token');
      res.render('error');
    }
  }
}
