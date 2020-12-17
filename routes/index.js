const router = require('express').Router();
const apiRouterUsuarios = require('./api/usuarios.js');
const apiRouterArticulo = require('./api/articulos.js');
const apiRouterCategoria = require('./api/categorias.js');

router.use('/usuario', apiRouterUsuarios);
router.use('/articulo', apiRouterArticulo);
router.use('/categoria', apiRouterCategoria);

module.exports = router;