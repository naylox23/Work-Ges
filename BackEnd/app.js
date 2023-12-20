var mysql = require ('mysql2');

var conexion = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'pruebaProyecto',
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

conexion.end();