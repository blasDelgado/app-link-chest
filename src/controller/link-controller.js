import link from '../model/link-model.js';
import User from '../model/user-model';
import jwt from 'jsonwebtoken';
import { token_crypt } from '../config.js';

export class ControladorDeLink {
  async agregarLink(req, res) {
    const { name, url, description } = req.body;
    const userId = jwt.verify(req.cookies.token, token_crypt).id;
    try {
      const user = await User.findById(userId).lean();
      const userName = user.user;

      const newLink = new link({
        name,
        url,
        description,
        user_id: userId,
        user_name: userName,
      });
      await newLink.save();
      res.redirect('/link-chest');
    } catch (e) {
      res.redirect('error');
      console.error(e);
    }
  }

  async editarLink(req, res) {
    const { name, url, description } = req.body;
    try {
      await link.findByIdAndUpdate(req.params.id, {
        name: name,
        url: url,
        description: description,
        user: jwt.verify(req.cookies.token, token_crypt).id,
      });
      req.flash('mensaje', 'link editado con éxito');
      res.redirect('/link-chest');
    } catch (e) {
      console.error(e);
      res.render('error');
    }
  }

  async eliminarLink(req, res) {
    try {
      await link.findByIdAndDelete(req.params.id);
      req.flash('mensaje', 'link eliminado con éxito');
      res.redirect('/link-chest');
    } catch (e) {
      console.error(e);
      res.render('error');
    }
  }

  async compartirLink(req, res) {
    const linkId = req.params.id;

    try {
      await link.findByIdAndUpdate(linkId, { share: true });
      req.flash('mensaje', 'link compartido con éxito');
      res.redirect('/link-chest');
    } catch (e) {
      console.error(e);
      req.flash(
        'mensaje',
        'ocurrió un problema, no se pudo compartir este link'
      );
      res.redirect('/link-chest');
    }
  }
  async noCompartirLink(req, res) {
    const linkId = req.params.id;

    try {
      await link.findByIdAndUpdate(linkId, { share: false });
      req.flash('mensaje', 'este link ya no se comparte más');
      res.redirect('/link-chest');
    } catch (e) {
      console.error(e);
      req.flash('mensaje', 'ocurrió un problema inesperado');
      res.redirect('/link-chest');
    }
  }
  async guardarLinkCompartido(req, res) {
    const linkId = req.params.id;
    const userId = jwt.verify(req.cookies.token, token_crypt).id;
    try {
      const userQueLoGuarda = await User.findById(userId);
      const { name, url, description } = await link.findById(linkId);
      const userIdQueLoGuarda = userQueLoGuarda._id;
      const userNameQueLoGuarda = userQueLoGuarda.user;
      const newLink = new link({
        name,
        url,
        description,
        user_id: userIdQueLoGuarda,
        user_name: userNameQueLoGuarda,
      });
      await newLink.save();
      req.flash('mensaje', 'link guardado con éxito');
      res.redirect('/link-chest/links-compartidos');
    } catch (e) {
      res.render('error');
      console.error(e);
    }
  }
}
