import jwt from 'jsonwebtoken';
import User from '../model/user-model.js';
import { token_crypt } from '../config.js';

export async function verifyToken(req, res, next) {
  let token = req.cookies.token;

  if (!token) {
    res.redirect('/login');
  } else {
    try {
      const userId = jwt.verify(token, token_crypt).id;

      const user = await User.findById(userId, { password: 0 });

      if (!user) {
        res.redirect('/login');
        req.flash('mensaje', 'token');
      } else {
        next();
      }
    } catch (error) {
      console.error('no se pudo verificar el token');
      res.clearCookie('token');
      res.redirect('/login');
    }
  }
}
