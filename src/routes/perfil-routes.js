import { Router } from 'express';
import { verifyToken } from '../middleware/verify-token.js';
import { ControladorDePerfil } from '../controller/perfil-controller';
import GeneradorDeVista from '../controller/views-controller';

const gdv = new GeneradorDeVista();
const cdp = new ControladorDePerfil();

const router = Router();

router.get('/link-chest/perfil', verifyToken, gdv.vistaPerfil);
router.get(
  '/link-chest/perfil/editar-usuario',
  verifyToken,
  gdv.vistaEditarUsuario
);
router.post(
  '/link-chest/perfil/editar-usuario',
  verifyToken,
  cdp.editarUsuario
);
router.get(
  '/link-chest/perfil/eliminar-usuario',
  verifyToken,
  gdv.vistaEliminarPerfil
);
router.post(
  '/link-chest/perfil/eliminar-usuario',
  verifyToken,
  cdp.eliminarCuenta
);

export default router;
