const router = require('express').Router();
const usuarioController = require('../../controllers/UsuarioController.js');
const auth = require('../../middlewares/auth.js');

router.get('/list', auth.verificarVendedor, usuarioController.list);
router.post('/register', auth.verificarAdministrador, usuarioController.register);
router.put('/update', auth.verificarAdministrador, usuarioController.update);

router.post('/login', usuarioController.login);

module.exports = router;
