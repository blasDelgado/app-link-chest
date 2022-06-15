import { Router } from 'express';
import { verifyToken } from '../middleware/verify-token.js';
import { ControladorDePerfil } from '../controller/perfil-controller';
import GeneradorDeVista from '../controller/views-controller';

const vista = new GeneradorDeVista();
const controladorPerfil = new ControladorDePerfil();

const router = Router();

router.get('/link-chest/perfil', verifyToken, vista.vistaPerfil);
router.get(
  '/link-chest/perfil/editar-usuario',
  verifyToken,
  vista.vistaEditarUsuario
);
router.patch(
  '/link-chest/perfil/editar-usuario',
  verifyToken,
  controladorPerfil.editarUsuario
);
router.get(
  '/link-chest/perfil/eliminar-usuario',
  verifyToken,
  vista.vistaEliminarPerfil
);
router.delete(
  '/link-chest/perfil/eliminar-usuario',
  verifyToken,
  controladorPerfil.eliminarCuenta
);

export default router;
