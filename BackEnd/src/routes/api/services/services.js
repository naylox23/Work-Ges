const expressEngine = require("express");
const router = expressEngine.Router({ mergeParams: true });
const pool = require("../../../app.js");


//--------------------------------------------------------
// Ruta para SELECT
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT ClientesServicios.*, clientes.nom_cliente FROM ClientesServicios JOIN clientes ON ClientesServicios.id_cliente = clientes.id_cliente');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la consulta SELECT');
    }
});

//--------------------------------------------------------
// Ruta para SELECT por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT clientesServicios.*, clientes.* FROM ClientesServicios JOIN clientes ON ClientesServicios.id_cliente = clientes.id_cliente WHERE id_clienteServicio = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la consulta SELECT por ID');
    }
});

//--------------------------------------------------------
// Ruta para INSERT
router.post('/', async (req, res) => {
    const {
        id_servicio,
        nom_servicio,
        descrip_servicio,
        f_realizacion,
        f_cobro,
        importe,
        iva,
        estado_realizado,
        estado_facturado,
        estado_cobrado,
        nom_cliente,
        NIF_CIF,
        telefono,
        direccion,
        cp,
        localidad,
        ciudad
    } = req.body;

    let connection;

    try {
        // Obtiene una conexión del pool
        connection = await pool.getConnection();

        // Inicia la transacción
        await connection.beginTransaction();
        
        // Comprueba si el cliente ya existe por NIF_CIF o teléfono
        const [existingClientRows] = await connection.query('SELECT id_cliente FROM Clientes WHERE telefono = ? OR NIF_CIF = ?', [telefono, NIF_CIF]);

        let idCliente;
        if (existingClientRows.length > 0) {
            // El cliente ya existe
            idCliente = existingClientRows[0].id_cliente;
            // await connection.query('UPDATE Clientes SET nom_cliente = ?, NIF_CIF = ?, telefono = ?, direccion = ?, cp = ?, localidad = ?, ciudad = ? WHERE id_cliente =?', 
            //     [nom_cliente,
            //     NIF_CIF,
            //     telefono,
            //     direccion,
            //     cp,
            //     localidad,
            //     ciudad,
            //     idCliente]);
        } else {
            // Inserta en la tabla Clientes
            const [resultInsertCliente] = await connection.query('INSERT INTO Clientes (nom_cliente, NIF_CIF, telefono, direccion, cp, localidad, ciudad) VALUES (?, ?, ?, ?, ?, ?, ?)', [nom_cliente, NIF_CIF, telefono, direccion, cp, localidad, ciudad]);
            idCliente = resultInsertCliente.insertId;
        }

        // Inserta en la tabla ClientesServicios
        const sqlServicios = 'INSERT INTO ClientesServicios (id_cliente, id_servicio, nom_servicio, descrip_servicio, f_realizacion, f_cobro, importe, iva, estado_realizado, estado_facturado, estado_cobrado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const valuesServicios = [
            idCliente,
            id_servicio,
            nom_servicio,
            descrip_servicio,
            f_realizacion,
            f_cobro,
            importe,
            iva,
            estado_realizado,
            estado_facturado,
            estado_cobrado
        ];

        await connection.query(sqlServicios, valuesServicios);

        // Confirma la transacción
        await connection.commit();

        res.json({ mensaje: 'ServicioCliente insertado correctamente'});
    } catch (error) {
        // Si hay algún error, realiza un rollback
        if (connection) {
            await connection.rollback();
        }
        throw error;
    } 
});

//--------------------------------------------------------
// Ruta para UPDATE
router.put('/:id_clienteServicio', async (req, res) => {
    const id_clienteServicio = req.params.id_clienteServicio;

    const {
        nuevoTipoServicio,
        nuevaDescripcionServicio,
        nuevaFechaRealizacion,
        nuevaFechaCobro,
        nuevoImporteServicio,
        nuevoIvaServicio,
        nuevoServicioRealizadoModi,
        nuevoServicioFacturadoModi,
        nuevoServicioCobradoModi,
        nuevoNombreClienteServicio,
        nuevoNifClienteServicio,
        nuevoTelefonoClienteServicio,
        nuevaDireccionClienteServicio,
        nuevoCpClienteServicio,
        nuevaLocalidadClienteServicio,
        nuevaCiudadClienteServicio,
    } = req.body;

    let connection;

    try {
        // Obtiene una conexión del pool
        connection = await pool.getConnection();

        // Inicia la transacción
        await connection.beginTransaction();
        
        
        
        // Comprueba si el cliente ya existe por NIF_CIF o teléfono
        const [existingClientRows] = await connection.query('SELECT id_cliente FROM Clientes WHERE telefono = ? OR NIF_CIF = ?', [nuevoTelefonoClienteServicio, nuevoNifClienteServicio]);
        
        let idCliente;

        if (existingClientRows.length > 0) {
            // El cliente ya existe
            idCliente = existingClientRows[0].id_cliente;
            // await connection.query('UPDATE Clientes SET nom_cliente = ?, NIF_CIF = ?, telefono = ?, direccion = ?, cp = ?, localidad = ?, ciudad = ? WHERE id_cliente =?', 
            //     [nuevoNombreClienteServicio,
            //     nuevoNifClienteServicio,
            //     nuevoTelefonoClienteServicio,
            //     nuevaDireccionClienteServicio,
            //     nuevoCpClienteServicio,
            //     nuevaLocalidadClienteServicio,
            //     nuevaCiudadClienteServicio,
            //     idCliente]);

        } else {
            // Inserta en la tabla Clientes
            const [resultInsertCliente] = await connection.query('INSERT INTO Clientes (nom_cliente, NIF_CIF, telefono, direccion, cp, localidad, ciudad) VALUES (?, ?, ?, ?, ?, ?, ?)', [nuevoNombreClienteServicio, nuevoNifClienteServicio, nuevoTelefonoClienteServicio, nuevaDireccionClienteServicio, nuevoCpClienteServicio, nuevaLocalidadClienteServicio, nuevaCiudadClienteServicio]);
            idCliente = resultInsertCliente.insertId;
        }

        // Actualiza la tabla ClientesServicios
        const sqlServicios = 'UPDATE ClientesServicios SET id_cliente = ?, nom_servicio = ?, descrip_servicio = ?, f_realizacion = ?, f_cobro = ?, importe = ?, iva = ?, estado_realizado = ?, estado_facturado = ?, estado_cobrado = ? WHERE id_clienteServicio = ?';
        const valuesServicios = [
            idCliente,
            nuevoTipoServicio,
            nuevaDescripcionServicio,
            nuevaFechaRealizacion,
            nuevaFechaCobro,
            nuevoImporteServicio,
            nuevoIvaServicio,
            nuevoServicioRealizadoModi,
            nuevoServicioFacturadoModi,
            nuevoServicioCobradoModi,
            id_clienteServicio
        ];

        await connection.query(sqlServicios, valuesServicios);

        // Confirma la transacción
        await connection.commit();

        res.json({ mensaje: 'ServicioCliente actualizado correctamente' });

    } catch (error) {
        // Si hay algún error, realiza un rollback
        if (connection) {
            await connection.rollback();
        }
        throw error;
    } finally {
        // Siempre asegúrate de liberar la conexión
        if (connection) {
            connection.release();
        }
    }
});

//--------------------------------------------------------
// Ruta para DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('DELETE FROM ClientesServicios WHERE id_clienteServicio = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminiar el servicio');
    }
});


module.exports = router;  