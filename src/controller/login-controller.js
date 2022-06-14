import User from '../model/user-model.js';
import jwt from 'jsonwebtoken';
import { clearCookie } from 'express/lib/response.js';
import { token_crypt } from '../config.js';

export default class LoginController {
  async login(req, res) {
    const { username, password } = req.body;
    let passwordV;
    try {
      const user = await User.findOne({ user: username });
      if (user) {
        passwordV = await user.comparePassword(password, user.password);
      }

      if (user == null) {
        req.flash('mensaje', 'El Usuario no existe');
        res.redirect('/login');
      } else if (passwordV == false) {
        req.flash('mensaje', 'El password es incorrecto');
        res.redirect('/login');
      } else {
        const token = jwt.sign({ id: user._id }, token_crypt, {
          expiresIn: 60 * 60 * 24,
        });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/link-chest');
      }
    } catch (e) {
      console.error(e);

      res.redirect('/login');
    }
  }

  async signup(req, res) {
    const { username, email, password } = req.body;

    try {
      const usuarioExiste = await User.findOne({ user: username });
      const emailExiste = await User.findOne({ email: email });

      if (usuarioExiste) {
        req.flash('mensaje', 'El Usuario ya existe');
        res.redirect('/signup');
      } else if (emailExiste) {
        req.flash('mensaje', 'El email ya existe');
        res.redirect('/signup');
      } else {
        const user1 = new User({
          user: username,
          email,
          password,
        });
        user1.password = await user1.encryptPassword(password);
        await user1.save();
        const token = jwt.sign({ id: user1._id }, token_crypt, {
          expiresIn: 60 * 60 * 24,
        });
        res.cookie('token', token, { httpOnly: true });
      }

      res.redirect('/link-chest');
    } catch (error) {
      console.error(error);
      res.render('error');
    }
  }
  logout(req, res) {
    res.clearCookie('token');
    res.redirect('/login');
  }
}
