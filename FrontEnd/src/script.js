window.onload = function () {

    // Mapa para almacenar la relación entre id_servicio y nom_servicio
    const servicioMap = new Map(); 

    //Elementos del DOM
    const tipoServicio = document.getElementById("tipoServicio");
    const descripcionServicio = document.getElementById("descripcionServicio");
    const fechaRealizacion = document.getElementById("fechaRealizacion");
    const fechaCobro = document.getElementById("fechaCobro");
    const importeServicio = document.getElementById("importeServicio");
    const ivaServicio = document.getElementById("ivaServicio");
    const servicioRealizado = document.getElementById("servicioRealizado");
    const servicioFacturado = document.getElementById("servicioFacturado");
    const servicioCobrado = document.getElementById("servicioCobrado");
    const nombreCliente = document.getElementById("nombreCliente");
    const nifCliente = document.getElementById("nifCliente");
    const telefonoCliente = document.getElementById("telefonoCliente");
    const direccionCliente = document.getElementById("direccionCliente");
    const cpCliente = document.getElementById("cpCliente");
    const localidadCliente = document.getElementById("localidadCliente");
    const ciudadCliente = document.getElementById("ciudadCliente");

    //ids ventana servicesList.html
    const frameServicesList = document.getElementById("frameServicesList");
    const filasTablaServicios = document.getElementById("filasTablaServicios");

    //ids ventana viewService.htlm
    const frameViewService = document.getElementById("frameViewService");
    const botonModificarServicio = document.getElementById(
        "botonModificarServicio"
    );
    const btnEliminarServicio = document.getElementById(
        "botonEliminarServicio"
    );

    //ids ventana modifyService.html
    const frameModifyService = document.getElementById("frameModifyService");

    //ids ventana newService.html
    const frameNewService = document.getElementById("frameNewService");
    var errorMessageNombre = document.getElementById("error-message-nombre");
    var errorMessageNif = document.getElementById("error-message-nif");
    var errorMessageTelefono = document.getElementById("error-message-telefono");


    //ids ventana mainConfigPage.html
    const frameMainConfigPage = document.getElementById("frameMainConfigPage");

    //ids ventana configServices.html
    const frameConfigServices = document.getElementById("frameConfigServices");
    const nombreTipoServicio = document.getElementById("tipoDeServicioConfig");
    const importeTipoServicio = document.getElementById("importeServicioConfig");
    const filasTablaTipoServicios = document.getElementById(
        "filasTablaTipoServicios"
    );

    //--------------------------------------------------------
    //Funciones para navegar entre ventanas
    mostrarFrameListaServicios = function () {
        window.location.href = "../services/servicesList.html";
    };

    mostrarDatosServicioActual = function (servicio) {
        localStorage.setItem("id_clienteServicio", servicio.id_clienteServicio);
        window.location.href = "../services/viewService.html";
    };
    mostrarFrameNuevoServicio = function () {
        window.location.href = "../services/newService.html";
    };

    mostrarFrameModificarServicio = function (servicio) {
        localStorage.setItem("id_clienteServicio", servicio.id_clienteServicio);
        window.location.href = "../services/modifyService.html";
    };

    mostrarFrameListaFacturas = function () {
        window.location.href = "../invoices/invoicesList.html";
    };

    mostrarFrameConfiguracion = function () {
        window.location.href = "../settings/mainConfigPage.html";
    };
    mostrarFrameConfigServices = function () {
        window.location.href = "../settings/configServices.html";
    };

    //--------------------------------------------------------
    //Función para mostrar/ocultar el menú de navegación
    botonMostrarOcultarMenuNavegacion = function () {
        const sidebar = document.getElementById("sidebar");
        const content = document.getElementById("content");

        if (sidebar.style.left === "-250px") {
            sidebar.style.left = "0";
            content.style.marginLeft = "250px";
        } else {
            sidebar.style.left = "-250px";
            content.style.marginLeft = "0";
        }
    };

    //--------------------------------------------------------
    //Función para cambiar de un menú a otro.
    botonChangeMenu = function (menu) {
        if (menu === "menuServicios") {
            this.mostrarFrameListaServicios();
        }
        if (menu === "menuFacturas") {
            this.mostrarFrameListaFacturas();
        }
        if (menu === "menuConfig") {
            this.mostrarFrameConfiguracion();
        }
    };

    //--------------------------------------------------------
    //Función que muestra la fecha al usuario en formato 'Español' DD-MM-YYYY
    dateToShowFromSQL_ES = function (fecha) {
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();

        if (dia < 10) {
            dia = "0" + dia;
        }
        if (mes < 10) {
            mes = "0" + mes;
        }

        return dia + "-" + mes + "-" + anio;
    };
    //--------------------------------------------------------
    //Función que transforma la fecha al formato que necesita input type="date" YYYY-MM-DD
    dateToShowFromSQL = function (fecha) {
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();

        if (dia < 10) {
            dia = "0" + dia;
        }
        if (mes < 10) {
            mes = "0" + mes;
        }

        return anio + "-" + mes + "-" + dia;
    };

    //--------------------------------------------------------
    // Verifica si estamos en la página de servicesList para realizar una GET request para obtener los servicios de la tabla clientesServicios
    if (frameServicesList != null) {
        // GET request
        fetch("http://localhost:3000/api/services/")
            .then((response) => response.json())
            .then((data) => {
                localStorage.removeItem("id_clienteServicio");

                // Recorre los datos y crea filas en la tabla
                data.forEach((servicio) => {
                    let fechaRealizacion = new Date(servicio.f_realizacion);
                    let fechaCobro = new Date(servicio.f_cobro);
                    servicio.f_realizacion = dateToShowFromSQL_ES(fechaRealizacion);
                    servicio.f_cobro = dateToShowFromSQL_ES(fechaCobro);

                    const fila = document.createElement("tr");
                    fila.classList.add("filasHover");

                    fila.addEventListener("click", function () {
                        mostrarDatosServicioActual(servicio);
                    });

                    if (servicio.descrip_servicio === null) {
                        servicio.descrip_servicio = "";
                    }
                    const etiquetaRealizado = document.createElement("span");
                    const etiquetaFacturado = document.createElement("span");
                    const etiquetaCobrado = document.createElement("span");

                    if (servicio.estado_realizado === 1) {
                        etiquetaRealizado.textContent = "R";
                        etiquetaRealizado.classList.add("etiquetaRealizado");
                    }

                    if (servicio.estado_facturado === 1) {
                        etiquetaFacturado.textContent = "F";
                        etiquetaFacturado.classList.add("etiquetaFacturado");
                    }

                    if (servicio.estado_cobrado === 1) {
                        etiquetaCobrado.textContent = "C";
                        etiquetaCobrado.classList.add("etiquetaCobrado");
                    }

                    fila.innerHTML = `
                        <td>${servicio.nom_cliente}</td>
                        <td>${servicio.nom_servicio} ${servicio.descrip_servicio}</td>
                        <td>${servicio.f_realizacion}</td>
                        <td>${servicio.f_cobro}</td>
                        <td>${servicio.importe}</td>
                        <td>${etiquetaRealizado.outerHTML} ${etiquetaFacturado.outerHTML} ${etiquetaCobrado.outerHTML}</td>
                        `;
                    filasTablaServicios.appendChild(fila);
                });
            })
            .catch((error) =>
                console.error("Error al realizar la solicitud:", error)
            );
    }

    //--------------------------------------------------------
    // Verificar si estamos en la página de viewService, newService con id o modifyService para realizar una GET request para obtener los datos del servicio actual con el id_clienteServicio
    if (frameViewService !== null ||
        (frameNewService !== null && localStorage.getItem("id_clienteServicio") !== null) ||
        frameModifyService !== null
    ) {
        // Realizar una GET request para obtener datos del servicio actual
        fetch(
            "http://localhost:3000/api/services/" +
            localStorage.getItem("id_clienteServicio")
        )
            .then((response) => response.json())
            .then((data) => {
                let fechaRealizacionM = new Date(data.f_realizacion);
                let fechaCobroM = new Date(data.f_cobro);
                data.f_realizacion = dateToShowFromSQL(fechaRealizacionM);
                data.f_cobro = dateToShowFromSQL(fechaCobroM);

                if (data.descrip_servicio === null) {
                    data.descrip_servicio = "";
                }
                if (data.estado_realizado === 1) {
                    servicioRealizado.checked = true;
                }
                if (data.estado_cobrado === 1) {
                    servicioCobrado.checked = true;
                }
                if (data.estado_facturado === 1) {
                    servicioFacturado.checked = true;
                }

                // Crea una nueva opción con el valor obtenido de la base de datos
                let nuevaOpcion = document.createElement("option");
                nuevaOpcion.text = data.nom_servicio;
                nuevaOpcion.value = data.nom_servicio;

                // Añade la nueva opción al combobox
                tipoServicio.add(nuevaOpcion);

                // Selecciona la opción recién agregada
                tipoServicio.value = data.nom_servicio;

                descripcionServicio.value = data.descrip_servicio;
                fechaRealizacion.value = data.f_realizacion;
                fechaCobro.value = data.f_cobro;
                importeServicio.value = data.importe;
                ivaServicio.value = data.iva;
                nombreCliente.value = data.nom_cliente;
                nifCliente.value = data.NIF_CIF;
                telefonoCliente.value = data.telefono;
                direccionCliente.value = data.direccion;
                cpCliente.value = data.cp;
                localidadCliente.value = data.localidad;
                ciudadCliente.value = data.ciudad;

                if (frameViewService !== null) {
                    botonModificarServicio.addEventListener("click", function () {
                        mostrarFrameModificarServicio(data);
                    });
                    btnEliminarServicio.addEventListener("click", function () {
                        botonEliminarServicio(data);
                    });
                }
            })
            .catch((error) =>
                console.error("Error al realizar la solicitud:", error)
            );
    }

    //--------------------------------------------------------
    //Verificar si estamos en la página de modifyService o newService para realizar una GET request para traer los datos del combobox tipoServicio que estan en la tabla Servicios
    if (frameModifyService !== null || frameNewService !== null) {
            fetch("http://localhost:3000/api/servicesConfig")
                .then((response) => response.json())
                .then((data) => {
                    // Llena las opciones del combobox con los datos obtenidos
                    data.forEach((tipoServicioData) => {
                        const option = document.createElement("option");
                        option.value = tipoServicioData.id_servicio;
                        option.textContent = tipoServicioData.nom_servicio;
                        if (tipoServicio !== null) {
                            tipoServicio.appendChild(option);
                        }
                        if (tipoServicio !== null) {
                            tipoServicio.appendChild(option);
                        }
    
                        // Almacena la relación entre id_servicio y nom_servicio
                        servicioMap.set(option.value, option.textContent);
                    });
                })
                .catch((error) =>
                    console.error("Error al obtener tipos de servicio:", error)
                );
        }

    //--------------------------------------------------------
    // Verifica si estamos en la página de configServices para realizar una GET request que obtener los tipos de servicio configurados y mostrarlos en la tabla
    if (frameConfigServices != null) {
            fetch("http://localhost:3000/api/servicesConfig")
                .then((response) => response.json())
                .then((data) => {
                    // Llenar las opciones del combobox con los datos obtenidos
                    data.forEach((tipoServicioData) => {
                        const fila = document.createElement("tr");
                        fila.classList.add("filasHover");
    
                        fila.innerHTML = `
                            <td>${tipoServicioData.nom_servicio}</td>
                            <td>${tipoServicioData.importe}</td>
                            `;
                        filasTablaTipoServicios.appendChild(fila);
                    });
                })
                .catch((error) =>
                    console.error("Error al obtener tipos de servicio:", error)
                );
        }
    //--------------------------------------------------------
    // Botón para guardar un nuevo servicio en la tabla clientesServicios
    botonGuardarNuevoServicio = function () {
        if (nombreCliente.value.trim() === "" && nifCliente.value.trim() === "") {
            // Mostrar el mensaje de error y establecer el foco en el campo
            errorMessageNombre.style.display = "block";
            errorMessageNif.style.display = "block";
            errorMessageTelefono.style.display = "none";
            nombreCliente.focus();
        } 
        if (nombreCliente.value.trim() !== "" && nifCliente.value.trim() === ""){
            // Mostrar el mensaje de error y establecer el foco en el campo
            errorMessageNombre.style.display = "none";
            errorMessageNif.style.display = "block";
            errorMessageTelefono.style.display = "none";
            nifCliente.focus();
        } 
        if (nombreCliente.value.trim() === "" && telefonoCliente.value.trim() === ''){
            // Mostrar el mensaje de error y establecer el foco en el campo
            errorMessageNombre.style.display = "block";
            errorMessageNif.style.display = "none";
            errorMessageTelefono.style.display = "block";
            telefonoCliente.focus();
        }
        if (nombreCliente.value.trim() !== "" && telefonoCliente.value.trim() === ''){
            // Mostrar el mensaje de error y establecer el foco en el campo
            errorMessageNombre.style.display = "none";
            errorMessageNif.style.display = "none";
            errorMessageTelefono.style.display = "block";
            telefonoCliente.focus();
        }
        if (nombreCliente.value.trim() !== '' && (nifCliente.value.trim() !== '' || telefonoCliente.value.trim() !== '')) {
            errorMessageNombre.style.display = "none";
            errorMessageNif.style.display = "none";
            errorMessageTelefono.style.display = "none";

                // POST request
                const NuevoServicio = {
                    id_servicio: tipoServicio.value,
                    nom_servicio: servicioMap.get(tipoServicio.value),
                    descrip_servicio: descripcionServicio.value !== "" ? descripcionServicio.value : null,
                    f_realizacion: fechaRealizacion.value !== "" ? fechaRealizacion.value : null,
                    f_cobro: fechaCobro.value !== "" ? fechaCobro.value : null,
                    importe: importeServicio.value !== "" ? importeServicio.value : null,
                    iva: ivaServicio.value !== "" ? ivaServicio.value : null,
                    estado_realizado: servicioRealizado.checked ? (servicioRealizado.value = 1) : (servicioRealizado.value = 0),
                    estado_facturado: servicioFacturado.checked ? (servicioFacturado.value = 1) : (servicioFacturado.value = 0),
                    estado_cobrado: servicioCobrado.checked ? (servicioCobrado.value = 1) : (servicioCobrado.value = 0),
                    nom_cliente: nombreCliente.value,
                    NIF_CIF: nifCliente.value !== "" ? nifCliente.value : null,
                    telefono: telefonoCliente.value !== "" ? telefonoCliente.value : null,
                    direccion: direccionCliente.value !== "" ? direccionCliente.value : null,
                    cp: cpCliente.value !== "" ? cpCliente.value : null,
                    localidad: localidadCliente.value !== "" ? localidadCliente.value : null,
                    ciudad: ciudadCliente.value !== "" ? ciudadCliente.value : null,
                };
    
                fetch("http://localhost:3000/api/services", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(NuevoServicio),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Servicio creado:", data.mensaje);
                        mostrarFrameListaServicios();
                    })
                    .catch((error) =>
                        console.error("Error al realizar la solicitud:", error)
                    );
            }
        };
    
    //--------------------------------------------------------
    // Botón para guardar un servicio modificado en la tabla clientesServicios
    botonGuardarServicioModi = function () {
        if (nombreCliente.value.trim() === "") {
            // Mostrar el mensaje de error y establecer el foco en el campo
            errorMessageNombre.style.display = "block";
            errorMessageNif.style.display = "none";
            errorMessageTelefono.style.display = "none";
            nombreCliente.focus();
        } 
        if (nifCliente.value.trim() === ""){
            // Mostrar el mensaje de error y establecer el foco en el campo
            errorMessageNombre.style.display = "none";
            errorMessageNif.style.display = "block";
            errorMessageTelefono.style.display = "none";
            nifCliente.focus();
        } 
         if (telefonoCliente.value.trim() === ''){
            // Mostrar el mensaje de error y establecer el foco en el campo
            errorMessageNombre.style.display = "none";
            errorMessageNif.style.display = "none";
            errorMessageTelefono.style.display = "block";
            telefonoCliente.focus();
        }
        if (nombreCliente.value.trim() !== '' && (nifCliente.value.trim() !== '' || telefonoCliente.value.trim() !== '')) {
            errorMessageNombre.style.display = "none";
            errorMessageNif.style.display = "none";
            errorMessageTelefono.style.display = "none";
            // PUT request
            const clienteServicioActualizado = {
                nuevoTipoServicio: tipoServicio.value,
                nuevaDescripcionServicio: descripcionServicio.value !== "" ? descripcionServicio.value : null,
                nuevaFechaRealizacion: fechaRealizacion.value !== "" ? fechaRealizacion.value : null,
                nuevaFechaCobro: fechaCobro.value !== "" ? fechaCobro.value : null,
                nuevoImporteServicio: importeServicio.value !== "" ? importeServicio.value : null,
                nuevoIvaServicio: ivaServicio.value !== "" ? ivaServicio.value : null,
                nuevoServicioRealizadoModi: servicioRealizado.checked ? (servicioRealizado.value = 1) : (servicioRealizado.value = 0),
                nuevoServicioFacturadoModi: servicioFacturado.checked ? (servicioFacturado.value = 1) : (servicioFacturado.value = 0),
                nuevoServicioCobradoModi: servicioCobrado.checked ? (servicioCobrado.value = 1) : (servicioCobrado.value = 0),
                nuevoNombreClienteServicio: nombreCliente.value,
                nuevoNifClienteServicio: nifCliente.value !== "" ? nifCliente.value : null,
                nuevoTelefonoClienteServicio: telefonoCliente.value !== "" ? telefonoCliente.value : null,
                nuevaDireccionClienteServicio: direccionCliente.value,
                nuevoCpClienteServicio: cpCliente.value !== "" ? cpCliente.value : null,
                nuevaLocalidadClienteServicio: localidadCliente.value !== "" ? localidadCliente.value : null,
                nuevaCiudadClienteServicio: ciudadCliente.value !== "" ? ciudadCliente.value : null,
            };
            console.log(clienteServicioActualizado);
    
            fetch(
                "http://localhost:3000/api/services/" +
                localStorage.getItem("id_clienteServicio"),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(clienteServicioActualizado),
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log("Cliente actualizado:", data.mensaje);
                    mostrarFrameListaServicios();
                })
                .catch((error) =>
                    console.error("Error al realizar la solicitud:", error)
                );
            }
        };
    
    //--------------------------------------------------------
    //Botón para guardar un nuevo tipo de servicio en la tabla de servicios (configuración)
    botonGuardarTipoDeServicio = function () {
            const nuevoTipoServicio = {
                nom_servicio: nombreTipoServicio.value,
                importe:
                    importeTipoServicio.value !== "" ? importeTipoServicio.value : null,
            };
    
            fetch("http://localhost:3000/api/servicesConfig/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoTipoServicio),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Tipo de servicio creado.", data.mensaje);
                    mostrarFrameConfigServices();
                    //myModal.hide();
                })
                .catch((error) =>
                    console.error("Error al realizar la solicitud:", error)
                );
        };
    // Función para eliminar un servicio de la tabla clientesServicios cuando se hace click en eliminar
    botonEliminarServicio = function (servicio) {
        // DELETE request
        fetch(
            "http://localhost:3000/api/services/" +
            localStorage.getItem("id_clienteServicio", servicio.id_clienteServicio),
            {
                method: "DELETE",
            }
        )
            .then((response) => {
                if (response.ok) {
                    console.log("Servicio eliminado correctamente");
                    mostrarFrameListaServicios();
                } else {
                    console.error("Error al eliminar el servicio");
                }
            })
            .catch((error) =>
                console.error("Error al realizar la solicitud:", error)
            );
    };

    //--------------------------------------------------------
    //Botón que cancela la operación y regresa a la ventana de la lista de servicios
    botonCancelarOperacionServicios = function () {
        mostrarFrameListaServicios();
    };

    //--------------------------------------------------------
    //Botón que cancela la operación y regresa a la ventana de la lista de tipos de servicios configurados
    botonCancelarOperacionConfigServicios = function () {
        mostrarFrameConfigServices();
    };

    //--------------------------------------------------------

};


/*

        // let serviciosEjemplos = [
        //         {id:1, descripcion:'Servicio 1', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe1', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        //         {id:2, descripcion:'Servicio 2', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        //         {id:3, descripcion:'Servicio 3', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        //         {id:4, descripcion:'Servicio 4', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        //         {id:5, descripcion:'Servicio 5', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        //         {id:6, descripcion:'Servicio 6', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'}
        //         ];

*/
