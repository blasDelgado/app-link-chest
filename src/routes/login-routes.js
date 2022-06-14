import { Router } from 'express';
import { haveToken } from '../middleware/have-token.js';
import ControladorLogin from '../controller/login-controller.js';
import ControladorDeVista from '../controller/views-controller';

const router = Router();
const vista = new ControladorDeVista();
const controladorLogin = new ControladorLogin();

router.get('/login', haveToken, vista.vistaLogin);
router.post('/login', haveToken, controladorLogin.login);
router.get('/signup', haveToken, vista.vistaSignup);
router.post('/signup', haveToken, controladorLogin.signup);
router.get('/logout', controladorLogin.logout);

export default router;
