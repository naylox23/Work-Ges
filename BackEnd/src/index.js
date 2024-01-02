// Importa los módulos necesarios para la aplicación
const express = require('express');  // Framework para construir aplicaciones web con Node.js
const cors = require('cors');        // Middleware para manejar solicitudes CORS (Cross-Origin Resource Sharing)
const path = require('path');        // Módulo para trabajar con rutas de archivos y directorios
const bodyParser = require('body-parser');  // Middleware para analizar cuerpos de solicitudes HTTP
const compression = require('compression');  // Middleware para comprimir las respuestas HTTP
const connection = require('./app.js');

// Crea una instancia de la aplicación Express
const app = express();
const port = 3000;  // Puerto en el que la aplicación escuchará

// Utiliza el middleware de compresión para comprimir las respuestas HTTP
app.use(compression());

// Configura el middleware de análisis para manejar solicitudes con cuerpos JSON y formularios grandes
app.use(bodyParser.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// Aumenta el límite de escuchadores de eventos para evitar advertencias
require('events').EventEmitter.prototype._maxListeners = 100;

// Habilita CORS para permitir solicitudes desde dominios diferentes
app.use(cors());

// Middleware para registrar cada solicitud entrante en la consola
app.use(async (req, res, next) => {
    let nowLog = new Date();
    console.log(nowLog.toUTCString() + " - SOLICITADO: " + req.headers.host + req.url);
    next();
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Configura el motor de plantillas para usar Handlebars (.hbs) -- PENDIENTE DE USO EN VERSIONES FUTURAS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// Sirve archivos estáticos desde el directorio 'public' en la ruta '/public'
app.use('/public', express.static(path.join(__dirname, 'public')));

// Usa el enrutador definido en './routes/index.js'
app.use(require('./routes/index.js'));


// Inicia el servidor y escucha en el puerto especificado
const server = app.listen(port, () => {
    console.log(`Estoy escuchando por el puerto ${port}`);
});

// Captura la señal de cierre (Ctrl+C)
process.on('SIGINT', () => {
    console.log('Cerrando la conexión a la base de datos y deteniendo el servidor.');
    connection.end(); // Cerrar conexión a la base de datos
    server.close(); // Detener el servidor
    process.exit();
});