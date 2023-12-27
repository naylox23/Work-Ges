const mysql = require ('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'WorkAndGes',
    user: 'root',
    password: 'Nayara1234'
});

conexion.connect(function (error){
    if (error){
        throw error;
    } else {
        console.log('CONEXION EXITOSA');
    }
});

module.exports = conexion;