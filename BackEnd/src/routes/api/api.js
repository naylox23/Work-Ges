// Importa el módulo 'express'
const expressEngine = require("express");

// Crea un router de Express y permite que se compartan parámetros de la ruta principal con las rutas secundarias
const router = expressEngine.Router({ mergeParams: true });

// Utiliza la subruta '/services' y vincula las rutas del módulo './services/services.js'
router.use('/services', require('./services/services.js'));

// Utiliza la subruta '/servicesConfig' y vincula las rutas del módulo './services/servicesConfig.js'
router.use('/servicesConfig', require('./services/servicesConfig.js'));

router.use('/clients', require('./clients/clients.js'));
//router.use('/invoices', require('./invoices/invoices.js'));

// Exporta el router para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;