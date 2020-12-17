const router = require('express').Router();
const articuloController = require('../../controllers/ArticuloController.js');
const auth = require('../../middlewares/auth.js');

router.get('/list', articuloController.list);
router.post('/add', auth.verificarVendedor, articuloController.add);
router.put('/update', auth.verificarVendedor, articuloController.update);
router.put('/activate', auth.verificarVendedor, articuloController.activate);
router.put('/deactivate', auth.verificarVendedor, articuloController.deactivate);

module.exports = router;