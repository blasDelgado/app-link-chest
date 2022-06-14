import { Router } from 'express';
import { verifyToken } from '../middleware/verify-token.js';
import { ControladorDeLink } from '../controller/link-controller.js';
import ControladorDeVista from '../controller/views-controller';

const vista = new ControladorDeVista();
const controladorLink = new ControladorDeLink();

const router = Router();

//Todos los links
router.get('/', verifyToken, vista.mainVista);
router.get('/link-chest', verifyToken, vista.mainVista);
//Agregar link
router.get('/link-chest/agregar-link', verifyToken, vista.agregarVista);
router.post(
  '/link-chest/agregar-link',
  verifyToken,
  controladorLink.agregarLink
);
//Editar link
router.get('/link-chest/editar-link/:id', verifyToken, vista.editarVista);
router.post(
  '/link-chest/editar-link/:id',
  verifyToken,
  controladorLink.editarLink
);
//Eliminar link
router.get('/link-chest/eliminar-link/:id', verifyToken, vista.eliminarVista);
router.post(
  '/link-chest/eliminar-link/:id',
  verifyToken,
  controladorLink.eliminarLink
);
//Links compartidos
//Compartir link
router.get(
  '/link-chest/compartir-link/:id',
  verifyToken,
  controladorLink.compartirLink
);
router.get(
  '/link-chest/no-compartir-link/:id',
  verifyToken,
  controladorLink.noCompartirLink
);
router.get(
  '/link-chest/links-compartidos',
  verifyToken,
  vista.linkCompartidosVista
);
router.get(
  '/link-chest/guardar-link-compartido/:id',
  verifyToken,
  controladorLink.guardarLinkCompartido
);

//Error
router.get('/link-chest/error', (req, res) => {
  res.render('error');
});

export default router;
