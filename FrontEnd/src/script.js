window.onload = function () {

    
    const servicioMap = new Map(); // Mapa para almacenar la relación entre id_servicio y nom_servicio
    let listaServicios = []; // Variable para almacenar la lista de servicios
    let listaClientes = []; // Variable para almacenar la lista de clientes

    //Elementos del DOM services
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
    const frameServicesList = document.getElementById("frameServicesList");
    const filasTablaServicios = document.getElementById("filasTablaServicios");
    const frameViewService = document.getElementById("frameViewService");
    const botonDuplicarServicio = document.getElementById('botonDuplicarServicio');
    const botonModificarServicio = document.getElementById("botonModificarServicio");
    const btnEliminarServicio = document.getElementById("botonEliminarServicio");
    const btnAbrirModalEliminar = document.getElementById('btnAbrirModalEliminar');
    const frameModifyService = document.getElementById("frameModifyService");
    const frameNewService = document.getElementById("frameNewService");
    const errorMessageNombreNifClienteObligatorio = document.getElementById("errorMessageNombreNifClienteObligatorio");
    const errorMessageDescripcionServicio = document.getElementById('errorMessageDescripcionServicio');
    const errorMessageNombreCliente = document.getElementById('errorMessageNombreCliente');
    const errorMessageNifCliente = document.getElementById('errorMessageNifCliente');
    const errorMessageTelefonoCliente = document.getElementById('errorMessageTelefonoCliente');
    const errorMessageDireccionCliente = document.getElementById('errorMessageDireccionCliente');
    const errorMessageCpCliente = document.getElementById('errorMessageCpCliente');
    const errorMessageLocalidadCliente = document.getElementById('errorMessageLocalidadCliente');
    const errorMessageCiudadCliente = document.getElementById('errorMessageCiudadCliente');
    const errorMessageImporteServicio = document.getElementById('errorMessageImporteServicio');
    const errorMessageIvaServicio = document.getElementById('errorMessageIvaServicio');
    const errorMessageTipoServicioConfig = document.getElementById('errorMessageTipoServicioConfig');
    const errorMessageImporteServicioConfig = document.getElementById('errorMessageImporteServicioConfig');

    //Elementos del DOM clients
    const frameClientsList = document.getElementById('frameClientsList');

    //Elementos del DOM settings
    const frameMainConfigPage = document.getElementById("frameMainConfigPage");
    const frameConfigServices = document.getElementById("frameConfigServices");
    const nombreTipoServicio = document.getElementById("tipoDeServicioConfig");
    const importeTipoServicio = document.getElementById("importeServicioConfig");
    const filasTablaTipoServicios = document.getElementById("filasTablaTipoServicios");

    //--------------------------------------------------------
    //Funciones para navegar entre ventanas

    /*
     * Redirige a la página servicesList.html que contiene una lista de los servicios.
     */
    mostrarFrameListaServicios = function () {
        window.location.href = "../services/servicesList.html";
    };

    /*
     * Guarda en localStorage el id del servicio actual para poder mostrar los datos cuando 
     * redirige a la pantalla viewService.html para ver el servicio actual
     * @param {Object} servicio - El objeto que contiene los datos del servicio actual.
     */
    mostrarDatosServicioActual = function (servicio) {
        localStorage.setItem("id_clienteServicio", servicio.id_clienteServicio);
        window.location.href = "../services/viewService.html";
    };

    /*
     * Redirige a la página newService.html para crear un nuevo servicio.
     */
    mostrarFrameNuevoServicio = function () {
        window.location.href = "../services/newService.html";
    };

    /*
     * Guarda en localStorage el id del servicio actual para poder mostrar los datos cuando 
     * redirige a la pantalla modifyService.html para modificar el servicio actual.
     * @param {Object} servicio - El objeto que contiene los datos del servicio actual a modificar.
     */
    mostrarFrameModificarServicio = function (servicio) {
        localStorage.setItem("id_clienteServicio", servicio.id_clienteServicio);
        window.location.href = "../services/modifyService.html";
    };

    /*
     * Guarda en localStorage el id del servicio actual para poder mostrar los datos cuando 
     * redirige a la pantalla newService.html para crear un nuevo servicio con los mismos datos que el servicio actual.
     * @param {Object} servicio - El objeto que contiene los datos del servicio a duplicar.
     */
    duplicarServicio = function(servicio){
        localStorage.setItem('id_clienteServicio', servicio.id_clienteServicio);  
        window.location.href="../services/newService.html";
    }

    /*
     * Redirige a la página de invoicesList que mostrará una lista de facturas.
     */
    mostrarFrameListaFacturas = function () {
        window.location.href = "../invoices/invoicesList.html";
    };

    /*
     * Redirige a la página clientsList.html que muestra una lista de clientes.
     */
    mostrarFrameListaClientes = function(){
        window.location.href ="../clients/clientsList.html";
    };

     /*
     * Redirige a la página newClient.html para crear un nuevo cliente.
     */
     mostrarFrameNewClient = function(){
        window.location.href ="../clients/newClient.html";
    };

    /*
     * Redirige a la página mainConfigPage.html que es la pantalla de configuracón de la aplicación.
     */
    mostrarFrameConfiguracion = function () {
        window.location.href = "../settings/mainConfigPage.html";
    };

    /*
     * Redirige a la página configService.html para la configuración de los tipos de servicios.
     */
    mostrarFrameConfigServices = function () {
        window.location.href = "../settings/configServices.html";
    };

    /*
     * Redirige a la página configService.html para la configuración de los tipos de servicios.
     */
    mostrarFrameConfigInvoices = function () {
        window.location.href = "../settings/configInvoices.html";
    };

    //--------------------------------------------------------
    /*
     * Muestra u oculta el menú de navegación de la aplicación.
     */
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
    /*
     * Cambia entre menús según la opción proporcionada.
     * @param {string} menu - El menú al que se cambiará ('menuServicios', 'menuFacturas', 'menuClientes', 'menuConfig').
     */
    botonChangeMenu = function (menu) {
        if (menu === "menuServicios") {
            this.mostrarFrameListaServicios();
        }
        if (menu === "menuFacturas") {
            this.mostrarFrameListaFacturas();
        }
        if (menu === "menuClientes"){
            this.mostrarFrameListaClientes();
        }
        if (menu === "menuConfig") {
            this.mostrarFrameConfiguracion();
        }
        
    };

    //--------------------------------------------------------
    /*
     * Convierte la fecha al formato 'Español' (DD-MM-YYYY).
     * @param {Date} fecha - La fecha a formatear.
     * @returns {string} - La fecha en formato 'DD-MM-YYYY'.
     */ 
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
    /*
     * Convierte la fecha al formato necesario para el input type="date" (YYYY-MM-DD).
     * @param {Date} fecha - La fecha a formatear.
     * @returns {string} - La fecha en formato 'YYYY-MM-DD'.
     */
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
    /*
     * Verifica si estamos en la página de servicesList para realizar una GET request y obtener 
     * los servicios de la tabla clientesServicios.
     * Utiliza los elementos HTML con los IDs 'estadoFilter' y 'textoBuscadoFilter'.
     */
    if (frameServicesList != null) {
        // Agrega eventos a los elementos HTML para filtrar resultados
        document.getElementById('estadoFilter').addEventListener('change', function () { filterResults(); });
        document.getElementById('textoBuscadoFilter').addEventListener('input', function () { filterResults(); });

        // Realiza una GET request para obtener la lista de servicios
        fetch("http://localhost:3000/api/services/")
            .then((response) => response.json())
            .then((data) => {
                localStorage.removeItem("id_clienteServicio");
                lista = data; // Almacena la lista de servicios

                // Llama a la función para aplicar el filtro que corresponda
                filterResults();
            })
            .catch((error) =>
                console.error("Error al realizar la solicitud:", error)
            );
    }

    //--------------------------------------------------------
    /*
     * Filtra los resultados en las tablas de servicios o clientes según el contexto.
     */
    filterResults = function () {
        const searchText = document.getElementById("textoBuscadoFilter").value.toUpperCase();
        
        
        if(frameClientsList != null){
            // Filtra la lista de servicios
            const filteredServices = lista.filter((cliente) => clienteCoincideConFiltro(cliente, searchText));
            // Actualiza la tabla con los resultados filtrados
            actualizarTablaClientes(filteredServices);
        }

        if (frameServicesList != null){
            const estadoFilter = document.getElementById("estadoFilter").value;
            // Filtra la lista de servicios
            const filteredServices = lista.filter((servicio) => servicioCoincideConFiltro(servicio, searchText, estadoFilter));
            // Actualiza la tabla con los resultados filtrados
            actualizarTablaServicios(filteredServices);
        }
    }

    //--------------------------------------------------------
    /*
     * Verifica si un servicio cumple con los criterios de búsqueda (filtro).
     * @param {object} servicio - Objeto que representa un servicio.
     * @param {string} searchText - Texto de búsqueda.
     * @param {string} estadoFilter - Estado para filtrar.
     * @returns {boolean} - True si el servicio cumple con los criterios, false de lo contrario.
     */
    servicioCoincideConFiltro = function (servicio, searchText, estadoFilter) {

       
            return (
                (searchText === "" ||
                    servicio.nom_cliente.toUpperCase().includes(searchText) ||
                    servicio.nom_servicio.toUpperCase().includes(searchText) ||
                    servicio.descrip_servicio.toUpperCase().includes(searchText) ||
                    (typeof servicio.f_realizacion === 'string' && servicio.f_realizacion.includes(searchText)) ||
                    (typeof servicio.f_cobro === 'string' && servicio.f_cobro.includes(searchText)) ||
                    (servicio.importe ?? "").toString().includes(searchText)) &&
                (estadoFilter === "" ||
                    (servicio.estado_realizado === 1 && estadoFilter === "Realizado") ||
                    (servicio.estado_facturado === 1 && estadoFilter === "Facturado") ||
                    (servicio.estado_cobrado === 1 && estadoFilter === "Cobrado") ||
                    (servicio.estado_realizado === 0 && estadoFilter === "NoRealizado") ||
                    (servicio.estado_facturado === 0 && estadoFilter === "NoFacturado") ||
                    (servicio.estado_cobrado === 0 && estadoFilter === "NoCobrado"))
            );
        
        
    }

    //--------------------------------------------------------
    /*
     * Verifica si un cliente cumple con los criterios de búsqueda (filtro).
     * @param {object} cliente - Objeto que representa un cliente.
     * @param {string} searchText - Texto de búsqueda.
     * @returns {boolean} - True si el cliente cumple con los criterios, false de lo contrario.
     */
    clienteCoincideConFiltro = function (cliente, searchText) {

            return (
                (searchText === "" ||
                    cliente.nom_cliente.toUpperCase().includes(searchText) ||
                    cliente.NIF_CIF.toUpperCase().includes(searchText) ||
                    cliente.telefono.toUpperCase().includes(searchText) ||
                    cliente.direccion.toUpperCase().includes(searchText) ||
                    cliente.cp.toUpperCase().includes(searchText) ||
                    cliente.localidad.toUpperCase().includes(searchText) ||
                    cliente.ciudad.toUpperCase().includes(searchText)
                
                )
            );
        
        
    }

    //--------------------------------------------------------
    /*
     * Actualiza la tabla de servicios con los servicios filtrados.
     * @param {object[]} servicios - Lista de servicios filtrados.
     */
    actualizarTablaServicios = function (servicios) {
        // Limpia la tabla antes de agregar los resultados filtrados
        const filasTablaServicios = document.getElementById("filasTablaServicios");
        filasTablaServicios.innerHTML = "";

        servicios.forEach((servicio) => {
            // Resto del código para crear filas en la tabla, similar a tu implementación original
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
            if (servicio.importe === null){
                servicio.importe = '';
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
    }

    //--------------------------------------------------------
    /*
     * Actualiza la tabla de clientes con los clientes filtrados.
     * @param {object[]} clientes - Lista de clientes filtrados.
     */
    actualizarTablaClientes = function (clientes) {
        // Limpia la tabla antes de agregar los resultados filtrados
        const filasTablaClientes = document.getElementById("filasTablaClientes");
        filasTablaClientes.innerHTML = "";

        clientes.forEach((cliente) => {

            const fila = document.createElement("tr");
            fila.classList.add("filasHover");

            // fila.addEventListener("click", function () {
            //     mostrarDatosServicioActual(servicio);
            // });
            if(cliente.nom_cliente === null){
                cliente.nom_cliente = ''
            }
            if(cliente.NIF_CIF === null){
                cliente.NIF_CIF = ''
            }
            if(cliente.telefono === null){
                cliente.telefono = '';
            }
            if(cliente.direccion === null){
                cliente.direccion = ''
            }
            if(cliente.cp === null){
                cliente.cp = ''
            }
            if(cliente.localidad === null){
                cliente.localidad = ''
            }
            if(cliente.ciudad === null){
                cliente.ciudad = ''
            }

            fila.innerHTML = `
                                <td>${cliente.nom_cliente}</td>
                                <td>${cliente.NIF_CIF}</td>
                                <td>${cliente.telefono}</td>
                                <td>${cliente.direccion}</td>
                                <td>${cliente.cp}</td>
                                <td>${cliente.localidad}</td>
                                <td>${cliente.ciudad}</td>
                                `;


            filasTablaClientes.appendChild(fila);
        });
    }

    //--------------------------------------------------------
    /*
    * Verifica si estamos en la página de viewService, newService con id o modifyService para realizar una GET request 
    * y obtener los datos del servicio actual con el id_clienteServicio.
    * Utiliza los elementos HTML con los IDs frameViewService, frameNewService, frameModifyService, servicioRealizado, 
    * servicioCobrado, servicioFacturado, importeServicio, tipoServicio, descripcionServicio, fechaRealizacion, fechaCobro, 
    * ivaServicio, nombreCliente, nifCliente, telefonoCliente, direccionCliente, cpCliente, localidadCliente, ciudadCliente, 
    * botonDuplicarServicio y botonModificarServicio.
    */
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
                // Formatea las fechas y actualiza los elementos HTML con los datos obtenidos
                let fechaRealizacionM = new Date(data.f_realizacion);
                let fechaCobroM = new Date(data.f_cobro);
                data.f_realizacion = dateToShowFromSQL(fechaRealizacionM);
                data.f_cobro = dateToShowFromSQL(fechaCobroM);

                // Verifica valores nulos y otros valores para, en caso necesario, asignar nuevos 
                //valores a los elementos correspondientes
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
                if (data.importe === null){
                    importeServicio.value = '';
                }

                // Crea una nueva opción con el valor obtenido de la base de datos
                let nuevaOpcion = document.createElement("option");
                nuevaOpcion.text = data.nom_servicio;
                nuevaOpcion.value = data.id_servicio;
                

                // Añade la nueva opción al combobox
                tipoServicio.add(nuevaOpcion);

                // Asigna los valores a los elementos HTML
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

                // Agrega eventos y almacena datos para las páginas específicas
                if (frameViewService !== null) {
                    botonDuplicarServicio.addEventListener('click', function (){
                        duplicarServicio(data);
                    })
                    botonModificarServicio.addEventListener("click", function () {
                        mostrarFrameModificarServicio(data);
                    });

                    localStorage.setItem("id_clienteServicio",data.id_clienteServicio);
                }
            })
            .catch((error) =>
                console.error("Error al realizar la solicitud:", error)
            );
    }

    //--------------------------------------------------------
    /*
     * Verifica si estamos en la página de modifyService o newService para realizar una GET request y 
     * traer los datos del combobox tipoServicio que están en la tabla ServiciosConfig.
     * Utiliza los elementos HTML con los IDs frameModifyService, frameNewService, tipoServicio y servicioMap.
     */
    if (frameModifyService !== null || frameNewService !== null) {
        // Realiza una GET request para obtener tipos de servicio
        fetch("http://localhost:3000/api/servicesConfig")
            .then((response) => response.json())
            .then((data) => {
                // Llena las opciones del combobox con los datos obtenidos
                data.forEach((tipoServicioData) => {
                    const option = document.createElement("option");
                    option.value = tipoServicioData.id_servicio;
                    option.textContent = tipoServicioData.nom_servicio;
                    
                    // Verifica la existencia del elemento HTML tipoServicio y agrega la opción
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
    /*
     * Verifica si estamos en la página de clientsList para realizar una GET request y 
     * obtener la lista de clientes desde el servidor backend.
     * Utiliza elementos HTML con el ID frameClientsList y textoBuscadoFilter.
     */
    if(frameClientsList != null){

        // Agrega un evento al elemento con el ID textoBuscadoFilter para actualizar los resultados al escribir.
        document.getElementById('textoBuscadoFilter').addEventListener('input', function () {
            filterResults();
        });
        // Realiza una GET request para obtener la lista de clientes
        fetch("http://localhost:3000/api/clients/")
            .then((response) => response.json())
            .then((data) => {
                
                lista = data; // Almacena la lista de servicios

                // Llama a la función para aplicar el filtro
                filterResults();
            })
            .catch((error) =>
                console.error("Error al realizar la solicitud:", error)
            );
    }

    //--------------------------------------------------------
    /*
    * Verifica si estamos en la página de configServices para realizar una GET request y 
    * obtener los tipos de servicio configurados para mostrarlos en la tabla.
    * Utiliza los elementos HTML con el ID frameConfigServices y filasTablaTipoServicios.
    */
    if (frameConfigServices != null) {
        // Realiza una GET request para obtener los tipos de servicio configurados
        fetch("http://localhost:3000/api/servicesConfig")
            .then((response) => response.json())
            .then((data) => {
                // Llenar las opciones del combobox con los datos obtenidos
                data.forEach((tipoServicioData) => {
                    const fila = document.createElement("tr");
                    fila.classList.add("filasHover");

                    // Verifica si importe es nulo y asigna una cadena vacía en su lugar
                    if(tipoServicioData.importe === null){
                        tipoServicioData.importe = '';
                    }

                    // Agrega datos a la fila de la tabla
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
    /*
     * Verifica si la longitud de un tipo de dato es mayor que la longitud especificada.
     * @param {string} tipoDato - El tipo de dato a verificar.
     * @param {number} longitud - La longitud máxima permitida.
     * @returns {boolean} - True si la longitud del tipo de dato es mayor que la longitud especificada, false en caso contrario.
     */
    verificaLongitudDato = function(tipoDato, longitud){
        return tipoDato.length > longitud;
    }


    //--------------------------------------------------------
    /*
     * Función para verificar la validez de los datos.
     * Utiliza los elementos HTML con los IDs importeServicio, ivaServicio, descripcionServicio, telefonoCliente, 
     * direccionCliente, cpCliente, localidadCliente y ciudadCliente, errorMessageImporteServicio, 
     * errorMessageIvaServicio, errorMessageDescripcionServicio, errorMessageTelefonoCliente, 
     * errorMessageDireccionCliente, errorMessageCpCliente, errorMessageLocalidadCliente y errorMessageCiudadCliente.
     * @returns {boolean} - True si todos los datos son válidos, false en caso contrario.
     */
    verificarValidedDatos = function(){


        let verificado = true;

        // Verifica si el importe del servicio es negativo
        if (importeServicio.value < 0){
            errorMessageImporteServicio.textContent = 'El importe no puede tener un valor negativo.';
            errorMessageImporteServicio.style.display = 'block';
            verificado = false;
        } else {
            errorMessageImporteServicio.style.display = 'none';
        }

        // Verifica si el iva del servicio es negativo
        if (ivaServicio.value < 0){
            errorMessageIvaServicio.textContent = 'El iva no puede tener un valor negativo.';
            errorMessageIvaServicio.style.display = 'block';
            verificado = false;
        } else {
            errorMessageIvaServicio.style.display = 'none';
        }

        // Verifica la longitud de la descripcion del servicio
        if(verificaLongitudDato(descripcionServicio.value.trim(), 50)){
            errorMessageDescripcionServicio.textContent = 'La descripción no puede tener más de 50 caracteres';
            errorMessageDescripcionServicio.style.display = 'block';
            verificado = false;
        } else {
            errorMessageDescripcionServicio.style.display = 'none';
        }

        // Verifica la longitud del telefono del cliente
        if(verificaLongitudDato(telefonoCliente.value.trim(), 15)){
            errorMessageTelefonoCliente.textContent = 'El teléfono del cliente no puede tener más de 15 caracteres';
            errorMessageTelefonoCliente.style.display = 'block';
            verificado = false;
        } else{
            errorMessageTelefonoCliente.style.display = 'none';
        }

        // Verifica la longitud de la direccion del cliente
        if(verificaLongitudDato(direccionCliente.value.trim(), 100)){
            errorMessageDireccionCliente.textContent = 'La dirección del cliente no puede tener más de 100 caracteres';
            errorMessageDireccionCliente.style.display = 'block';
            verificado = false;
        } else{
            errorMessageDireccionCliente.style.display = 'none';
        }

        // Verifica la longitud del codigo postal del cliente
        if(verificaLongitudDato(cpCliente.value.trim(), 10)){
            errorMessageCpCliente.textContent = 'El código postal del cliente no puede tener más de 10 caracteres';
            errorMessageCpCliente.style.display = 'block';
            verificado = false;
        } else{
            errorMessageCpCliente.style.display = 'none';
        }

        // Verifica la longitud de la localidad del cliente
        if(verificaLongitudDato(localidadCliente.value.trim(), 50)){
            errorMessageLocalidadCliente.textContent = 'La localidad del cliente no puede tener más de 50 caracteres';
            errorMessageLocalidadCliente.style.display = 'block';
            verificado = false;
        } else{
            errorMessageLocalidadCliente.style.display = 'none';
        }

        // Verifica la longitud de la ciudad del cliente
        if(verificaLongitudDato(ciudadCliente.value.trim(), 50)){
            errorMessageCiudadCliente.textContent = 'La ciudad del cliente no puede tener más de 50 caracteres';
            errorMessageCiudadCliente.style.display = 'block';
            verificado = false;
        } else{
            errorMessageCiudadCliente.style.display = 'none';
        }

        // Verifica la longitud del nombre del cliente
        if(verificaLongitudDato(nombreCliente.value.trim(), 50)){
            errorMessageNombreCliente.textContent = 'El nombre del cliente no puede tener más de 50 caracteres';
            errorMessageNombreCliente.style.display = 'block';
            verificado = false;
        } else {
            errorMessageNombreCliente.style.display = 'none';
        }

        // Verifica la longitud del nif del cliente
        if(verificaLongitudDato(nifCliente.value.trim(), 10)){
            errorMessageNifCliente.textContent = 'El nif/cif del cliente no puede tener más de 10 caracteres';
            errorMessageNifCliente.style.display = 'block';
            verificado = false;
        } else{
            errorMessageNifCliente.style.display = 'none';
        }

        // Verifica si nombre del cliente esta vacio
        if(nombreCliente.value.trim() === ''){
            errorMessageNombreCliente.textContent = 'El nombre del cliente no puede estar vacios';
            errorMessageNombreCliente.style.display = 'block';
            verificado = false;
        } else {
            errorMessageNombreCliente.style.display = 'none';
        }

        // Verifica si el nif del cliente esta vacio
        if(nifCliente.value.trim()===''){
            errorMessageNifCliente.textContent = 'El nif/cif del cliente no puede estar vacio';
            errorMessageNifCliente.style.display = 'block';
            verificado = false;
        } else{
            errorMessageNifCliente.style.display = 'none';
        }

        return verificado;
    }

    //--------------------------------------------------------
    /*
     * Verifica la validez de los datos del tipo de servicio configurado.
     * @returns {boolean} - True si los datos son válidos, false en caso contrario.
     */
    verificarValidedDatosTipoServicioConfig = function(){
        let verificado = true;

        // Verifica la longitud del nombre del tipo de servicio
        if(verificaLongitudDato(nombreTipoServicio.value, 50)){
            errorMessageTipoServicioConfig.textContent = 'El nombre del tipo de servicio no puede tener más de 50 caracteres';
            errorMessageTipoServicioConfig.style.display ='block';
            return verificado = false;
        } else {
            errorMessageTipoServicioConfig.style.display = 'none';
        }

        // Verifica si el nombre del tipo de servicio está vacío
        if(nombreTipoServicio.value.trim() === '' ){
            errorMessageTipoServicioConfig.textContent = 'El nombre del tipo de servicio no puede estar vacío.';
            errorMessageTipoServicioConfig.style.display ='block';
            return verificado = false;
        } else {
            errorMessageTipoServicioConfig.style.display = 'none';
        
        }

        //verifica si el importe del tipo de servicio tiene un valor negativo
        if (importeTipoServicio.value < 0){
            errorMessageImporteServicioConfig.textContent = 'El importe del tipo de servicio no puede tener un valor negativo.';
            errorMessageImporteServicioConfig.style.display = 'block';
            return verificado = false;
        } else {
            errorMessageImporteServicioConfig.style.display = 'none';
        }

        return verificado;
    }

    //--------------------------------------------------------
    /*
     * Función para manejar el evento de hacer clic en el botón para guardar un nuevo servicio.
     */
    botonGuardarNuevoServicio = function () {
        let tipoServicioD = tipoServicio.text;

        // Si el valor de tipoServicio es un número, obtener el nombre correspondiente del mapa
        if (!isNaN(tipoServicio.value)){
            tipoServicioD = servicioMap.get(tipoServicio.value);
        }

        // Verifica la validez de los datos antes de realizar la solicitud POST
        if( verificarValidedDatos() ){

            // Crea un objeto con los datos del nuevo servicio
            const NuevoServicio = {
                id_servicio: tipoServicio.value,
                nom_servicio: tipoServicioD,
                descrip_servicio: descripcionServicio.value !== "" ? descripcionServicio.value.trim() : null,
                f_realizacion: fechaRealizacion.value !== "" ? fechaRealizacion.value : null,
                f_cobro: fechaCobro.value !== "" ? fechaCobro.value : null,
                importe: importeServicio.value !== "" ? importeServicio.value : null,
                iva: ivaServicio.value !== "" ? ivaServicio.value : null,
                estado_realizado: servicioRealizado.checked ? (servicioRealizado.value = 1) : (servicioRealizado.value = 0),
                estado_facturado: servicioFacturado.checked ? (servicioFacturado.value = 1) : (servicioFacturado.value = 0),
                estado_cobrado: servicioCobrado.checked ? (servicioCobrado.value = 1) : (servicioCobrado.value = 0),
                nom_cliente: nombreCliente.value.trim(),
                NIF_CIF: nifCliente.value.trim(),
                telefono: telefonoCliente.value !== "" ? telefonoCliente.value.trim() : null,
                direccion: direccionCliente.value !== "" ? direccionCliente.value.trim() : null,
                cp: cpCliente.value !== "" ? cpCliente.value.trim() : null,
                localidad: localidadCliente.value !== "" ? localidadCliente.value.trim() : null,
                ciudad: ciudadCliente.value !== "" ? ciudadCliente.value.trim() : null,
            };

            // Realiza la solicitud POST al servidor
            fetch("http://localhost:3000/api/services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(NuevoServicio),
            })
            .then((response) => response.json())
            .then((data) => {
                // Muestra un mensaje de éxito y redirigir a la lista de servicios
                alert(data.mensaje);
                console.log("Servicio creado:", data.mensaje);
                mostrarFrameListaServicios();
            })
            .catch((error) =>
                console.error("Error al realizar la solicitud:", error)
            );
        }
    };

    //--------------------------------------------------------
    /*
     * Función para manejar el evento de hacer clic en el botón para guardar un servicio modificado 
     * en la tabla clientesServicios.
     */
    botonGuardarServicioModi = function () {

            let tipoServicioModif = tipoServicio.value;

            // Si el valor de tipoServicio es un número, obtener el nombre correspondiente del mapa
            if (!isNaN(tipoServicio.value)){
                tipoServicioModif = servicioMap.get(tipoServicio.value);
            }

            // Verificar la validez de los datos antes de realizar la solicitud PUT
            if(verificarValidedDatos()){

                // Crear un objeto con los datos del servicio actualizado
                const clienteServicioActualizado = {
                    nuevoTipoServicio: tipoServicioModif,
                    nuevaDescripcionServicio: descripcionServicio.value !== "" ? descripcionServicio.value.trim() : null,
                    nuevaFechaRealizacion: fechaRealizacion.value !== "" ? fechaRealizacion.value.trim() : null,
                    nuevaFechaCobro: fechaCobro.value !== "" ? fechaCobro.value : null,
                    nuevoImporteServicio: importeServicio.value !== "" ? importeServicio.value : null,
                    nuevoIvaServicio: ivaServicio.value !== "" ? ivaServicio.value : null,
                    nuevoServicioRealizadoModi: servicioRealizado.checked ? (servicioRealizado.value = 1) : (servicioRealizado.value = 0),
                    nuevoServicioFacturadoModi: servicioFacturado.checked ? (servicioFacturado.value = 1) : (servicioFacturado.value = 0),
                    nuevoServicioCobradoModi: servicioCobrado.checked ? (servicioCobrado.value = 1) : (servicioCobrado.value = 0),
                    nuevoNombreClienteServicio: nombreCliente.value.trim(),
                    nuevoNifClienteServicio: nifCliente.value !== "" ? nifCliente.value.trim() : null,
                    nuevoTelefonoClienteServicio: telefonoCliente.value !== "" ? telefonoCliente.value.trim() : null,
                    nuevaDireccionClienteServicio: direccionCliente.value.trim(),
                    nuevoCpClienteServicio: cpCliente.value !== "" ? cpCliente.value.trim() : null,
                    nuevaLocalidadClienteServicio: localidadCliente.value !== "" ? localidadCliente.value.trim() : null,
                    nuevaCiudadClienteServicio: ciudadCliente.value !== "" ? ciudadCliente.value.trim() : null,
                };
               
                // Realizar la solicitud PUT al servidor
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
                        // Mostrar un mensaje de éxito y redirigir a la lista de servicios
                        alert(data.mensaje);
                        console.log("Servicio actualizado:", data.mensaje);
                        mostrarFrameListaServicios();
                    })
                    .catch((error) =>
                        console.error("Error al realizar la solicitud:", error)
                    );
            }
        
    };

    //--------------------------------------------------------
    /*
     * Función para manejar el evento de hacer clic en el botón para guardar un nuevo tipo de servicio 
     * en la tabla de servicios (configuración).
     */
    botonGuardarTipoDeServicio = function () {
       
        // Verificar la validez de los datos antes de realizar la solicitud POST
        if(verificarValidedDatosTipoServicioConfig()){

            // Crear un objeto con los datos del nuevo tipo de servicio
            const nuevoTipoServicio = {
                nom_servicio: nombreTipoServicio.value.trim(),
                importe: importeTipoServicio.value !== "" ? importeTipoServicio.value : null,
            };

            // Realizar la solicitud POST al servidor
            fetch("http://localhost:3000/api/servicesConfig/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoTipoServicio),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Mostrar un mensaje de éxito y redirigir a la configuración de servicios
                    alert(data.mensaje);
                    console.log("Tipo de servicio creado.", data.mensaje);
                    mostrarFrameConfigServices();
                    
                })
                .catch((error) =>
                    console.error("Error al realizar la solicitud:", error));
        }
    };

    //--------------------------------------------------------
    /*
     * Función para manejar el evento de hacer clic en el botón para eliminar un servicio de la tabla clientesServicios.
     */
    botonEliminarServicio = function () {
        // DELETE request
        fetch(
            "http://localhost:3000/api/services/" +
            localStorage.getItem("id_clienteServicio"),
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
    /*
     * Función para manejar el evento de hacer clic en el botón para cancelar la operación y 
     * regresar a la ventana de la lista de servicios.
     */
    botonCancelarOperacionServicios = function () {
        mostrarFrameListaServicios();
    };

    //--------------------------------------------------------
    /**
     * Función para manejar el evento de hacer clic en el botón para cancelar la operación y 
     * regresar a la ventana de la lista de tipos de servicios configurados.
     */
    botonCancelarOperacionConfigServicios = function () {
        mostrarFrameConfigServices();
    };

    //--------------------------------------------------------

};

/*
JSON de prueba antes de conexión con Backend
    let serviciosEjemplos = [
        {id:1, descripcion:'Servicio 1', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe1', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        {id:2, descripcion:'Servicio 2', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        {id:3, descripcion:'Servicio 3', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        {id:4, descripcion:'Servicio 4', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        {id:5, descripcion:'Servicio 5', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        {id:6, descripcion:'Servicio 6', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'}
    ];
*/
