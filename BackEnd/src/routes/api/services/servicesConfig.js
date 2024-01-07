const expressEngine = require("express");
const router = expressEngine.Router({ mergeParams: true });
const pool = require("../../../app.js");


//--------------------------------------------------------------------------------- 
// Ruta para SELECT
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Servicios');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la consulta SELECT de Servicios');
    }
});


// //Ruta para SELECT por id
// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     connection.query('SELECT * FROM Servicios WHERE id_servicio = ?', [id], (error, results, fields) => {
//         if (error) throw error;

//         res.json(results[0]);
//     });
// });

// Ruta para INSERT
router.post('/', async (req, res) => {
    try {
        const { 
            nom_servicio, 
            importe 
        } = req.body;

        
        // Obtiene una conexión del pool
        connection = await pool.getConnection();

        const [existingServicesRows] = await connection.query('SELECT * FROM Servicios WHERE nom_servicio = ?', [nom_servicio]);
        
        if(existingServicesRows.length === 0){
            const sql = 'INSERT INTO Servicios (nom_servicio, importe) VALUES (?, ?)';
            const values = [nom_servicio, importe];
            // Realiza la inserción utilizando la función 'query' del pool con async/await
            const [results] = await pool.query(sql, values);
            res.json({ mensaje: 'Servicio insertado correctamente', insertId: results.insertId });
        } else {
            res.json({ mensaje: 'El servicio ya existe en la base de datos'});
        }

        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la consulta INSERT de Servicios');
    }
});

// // Ruta para UPDATE
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { nuevaDescrip } = req.body;

//     connection.query('UPDATE ClientesServicios SET iva = ? WHERE id_clienteServicio = ?', [nuevaDescrip, id], (error, results, fields) => {
//         if (error) throw error;
//         res.send('ClienteServicio actualizado correctamente');
//     });
// });

// // Ruta para DELETE
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;

//     connection.query('DELETE FROM ClientesServicios WHERE id_clienteServicio = ?', [id], (error, results, fields) => {
//         if (error) throw error;
//         res.send('ClienteServicio eliminado correctamente');
//     });
// });

module.exports = router;  