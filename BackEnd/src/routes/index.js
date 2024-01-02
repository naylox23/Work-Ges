// Importa el módulo 'express'
const expressEngine = require("express");

// Crea un router de Express y permite que se compartan parámetros de la ruta principal con las rutas secundarias
const router = expressEngine.Router({ mergeParams: true });

// Utiliza la subruta '/api' y vincula las rutas del módulo './api/api.js'
router.use('/api', require('./api/api.js'));

// Exporta el router para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;




