const expressEngine = require("express");
const router = expressEngine.Router({mergeParams: true});
const connection = require('../app.js');

// Ruta para SELECT
router.get('/clientes', (req, res) => {
    connection.query('SELECT * FROM Clientes', (error, results, fields) => {
        if (error) throw error;

        res.json(results);
    });
});

// Ruta para INSERT
router.post('/clientes', (req, res) => {
    const {
        nom_cliente,
        NIF_CIF,
        telefono,
        direccion,
        pais,
        localidad,
        ciudad,
        cp
    } = req.body;

    const sql = 'INSERT INTO Clientes (nom_cliente, NIF_CIF, telefono, direccion, pais, localidad, ciudad, cp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [nom_cliente, NIF_CIF, telefono, direccion, pais, localidad, ciudad, cp];

    connection.query(sql, values, (error, results, fields) => {
        if (error) throw error;
        res.send('Cliente insertado correctamente');
    });
});

// Ruta para UPDATE
router.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nuevoNombre } = req.body;

    connection.query('UPDATE Clientes SET nom_cliente = ? WHERE id_cliente = ?', [nuevoNombre, id], (error, results, fields) => {
        if (error) throw error;
        res.send('Cliente actualizado correctamente');
    });
});

// Ruta para DELETE
router.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM Clientes WHERE id_cliente = ?', [id], (error, results, fields) => {
        if (error) throw error;
        res.send('Cliente eliminado correctamente');
    });
});

module.exports = router;


