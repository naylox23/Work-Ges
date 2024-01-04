// Importa la librería mysql2/promise
const mysql = require('mysql2/promise');

// Crea un pool de conexiones para manejar la conexión a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'Nayara@@93_',
  database: 'WorkAndGes',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// Comprueba la conexión
pool.getConnection((err, connection) => {
    if (err) {
        throw err;
    } else {
        console.log('CONEXION EXITOSA');
    }
});

// Exporta el pool para que pueda ser utilizado en otras partes de la aplicación
module.exports = pool;