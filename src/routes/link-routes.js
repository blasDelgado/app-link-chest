import { Router } from 'express';
import { verifyToken } from '../middleware/verify-token.js';
import { ControladorDeLink } from '../controller/link-controller.js';
import GeneradorDeVista from '../controller/views-controller';

const gdv = new GeneradorDeVista();
const cdl = new ControladorDeLink();

const router = Router();

//Todos los links
router.get('/', verifyToken, gdv.mainVista);
router.get('/link-chest', verifyToken, gdv.mainVista);
//Agregar link
router.get('/link-chest/agregar-link', verifyToken, gdv.agregarVista);
router.post('/link-chest/agregar-link', verifyToken, cdl.agregarLink);
//Editar link
router.get('/link-chest/editar-link/:id', verifyToken, gdv.editarVista);
router.post('/link-chest/editar-link/:id', verifyToken, cdl.editarLink);
//Eliminar link
router.get('/link-chest/eliminar-link/:id', verifyToken, gdv.eliminarVista);
router.post('/link-chest/eliminar-link/:id', verifyToken, cdl.eliminarLink);
//Links compartidos
//Compartir link
router.get('/link-chest/compartir-link/:id', verifyToken, cdl.compartirLink);
router.get(
  '/link-chest/no-compartir-link/:id',
  verifyToken,
  cdl.noCompartirLink
);
router.get(
  '/link-chest/links-compartidos',
  verifyToken,
  gdv.linkCompartidosVista
);
router.get(
  '/link-chest/guardar-link-compartido/:id',
  verifyToken,
  cdl.guardarLinkCompartido
);

//Error
router.get('/link-chest/error', (req, res) => {
  res.render('error');
});

export default router;
