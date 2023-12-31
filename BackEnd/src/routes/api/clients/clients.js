const expressEngine = require("express");
const router = expressEngine.Router({ mergeParams: true });
const pool = require("../../../app.js");


//--------------------------------------------------------------------------------- 
// Ruta para SELECT
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Clientes');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la consulta SELECT');
    }
});

// // Ruta para INSERT
// router.post('/', (req, res) => {
//     const {
//         nom_cliente,
//         NIF_CIF,
//         telefono,
//         direccion,
//         pais,
//         localidad,
//         ciudad,
//         cp
//     } = req.body;

//     const sql = 'INSERT INTO Clientes (nom_cliente, NIF_CIF, telefono, direccion, pais, localidad, ciudad, cp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
//     const values = [nom_cliente, NIF_CIF, telefono, direccion, pais, localidad, ciudad, cp];

//     connection.query(sql, values, (error, results, fields) => {
//         if (error) throw error;
//         res.send('Cliente insertado correctamente');
//     });
// });

// Ruta para UPDATE
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { nuevoNombre } = req.body;

//     connection.query('UPDATE Clientes SET nom_cliente = ? WHERE id_cliente = ?', [nuevoNombre, id], (error, results, fields) => {
//         if (error) throw error;
//         res.send('Cliente actualizado correctamente');
//     });
// });

// // Ruta para DELETE
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;

//     connection.query('DELETE FROM Clientes WHERE id_cliente = ?', [id], (error, results, fields) => {
//         if (error) throw error;
//         res.send('Cliente eliminado correctamente');
//     });
// });

module.exports = router;  