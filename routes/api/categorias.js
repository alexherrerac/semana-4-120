const router = require('express').Router();
const categoriaController = require('../../controllers/CategoriaController.js');
const auth = require('../../middlewares/auth.js');

router.get('/list', auth.verificarVendedor, categoriaController.list);
router.post('/add', auth.verificarVendedor, categoriaController.add);
router.put('/update', auth.verificarVendedor, categoriaController.update);
router.put('/activate', auth.verificarVendedor, categoriaController.activate);
router.put('/deactivate', auth.verificarVendedor, categoriaController.deactivate);

module.exports = router;