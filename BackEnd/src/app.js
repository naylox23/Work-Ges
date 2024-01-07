// Importa la librería mysql2/promise
const mysql = require('mysql2/promise');

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'WorkAndGes',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crea un pool de conexiones para manejar la conexión a la base de datos
const pool = mysql.createPool(dbConfig);

// Función para verificar la conexión
async function checkConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('CONEXIÓN EXITOSA');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  } finally {
    if (connection) {
      connection.release(); // Libera la conexión después de su uso
    }
  }
}

// Ejecuta la función para verificar la conexión
checkConnection();

// Exporta el pool para que pueda ser utilizado en otras partes de la aplicación
module.exports = pool;
