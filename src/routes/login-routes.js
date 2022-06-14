import { Router } from 'express';
import { haveToken } from '../middleware/have-token.js';
import LoginController from '../controller/login-controller.js';
import GeneradorDeVista from '../controller/views-controller';

const router = Router();
const gdv = new GeneradorDeVista();
const controller = new LoginController();

router.get('/login', haveToken, gdv.vistaLogin);
router.post('/login', haveToken, controller.login);
router.get('/signup', haveToken, gdv.vistaSignup);
router.post('/signup', haveToken, controller.signup);
router.get('/logout', controller.logout);

export default router;
