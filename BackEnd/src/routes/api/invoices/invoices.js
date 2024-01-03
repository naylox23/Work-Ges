const expressEngine = require("express");
const router = expressEngine.Router({ mergeParams: true });
const pool = require("../../../app.js");


//--------------------------------------------------------
// Ruta para SELECT
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT Facturas.*, clientes.nom_cliente FROM facturas JOIN clientes ON facturas.id_cliente = clientes.id_cliente');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la consulta SELECT');
    }
});