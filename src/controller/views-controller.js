import link from '../model/link-model.js';
import jwt from 'jsonwebtoken';
import { token_crypt } from '../config.js';
import User from '../model/user-model.js';

export default class ControladorDeVista {
  //Links Vista
  async mainVista(req, res) {
    try {
      const userId = jwt.verify(req.cookies.token, token_crypt).id;
      const links = await link.find({ user_id: userId }).lean();
      res.render('main-cards', { links });
    } catch (e) {
      console.error(e);
      res.render('error');
    }
  }

  agregarVista(req, res) {
    res.render('agregar-link');
  }

  async editarVista(req, res) {
    const id = req.params.id;
    try {
      let links = await link.findById(id).lean();
      res.render('editar-link', { links });
    } catch (e) {
      console.error(e);
      res.render('error');
    }
  }

  async eliminarVista(req, res) {
    try {
      let links = await link.findById(req.params.id).lean();
      res.render('eliminar-link', { links });
    } catch (e) {
      console.error(e);
      res.render('error');
    }
  }

  //Link compartidos

  async linkCompartidosVista(req, res) {
    const id = jwt.verify(req.cookies.token, token_crypt).id;
    try {
      const todosLosLinks = await link.find({ share: true }).lean();
      const links = todosLosLinks.filter((link) => {
        if (link.user_id != id) return true;
      });

      res.render('link-compartidos', { links });
    } catch (e) {
      console.error(e);
      res.render('error');
    }
  }

  //Login Vista

  vistaLogin(req, res) {
    res.render('login');
  }

  vistaSignup(req, res) {
    res.render('signup');
  }

  //Perfil Vista

  vistaPerfil(req, res) {
    res.render('perfil');
  }

  async vistaEditarUsuario(req, res) {
    const id = jwt.verify(req.cookies.token, token_crypt).id;
    try {
      let usuario = await User.findById(id).lean();
      res.render('editar-usuario', { usuario });
    } catch (e) {
      console.error(e);
      res.render('error');
    }
  }
  vistaEliminarPerfil(req, res) {
    res.render('eliminar-perfil');
  }
}
