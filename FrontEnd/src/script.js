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

    duplicarServicio = function(servicio){
        localStorage.setItem('id_clienteServicio', servicio.id_clienteServicio);  
        window.location.href="../services/newService.html";
    }

    mostrarFrameListaFacturas = function () {
        window.location.href = "../invoices/invoicesList.html";
    };

    mostrarFrameListaClientes = function(){
        window.location.href ="../clients/clientsList.html";
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
        if (menu === "menuClientes"){
            this.mostrarFrameListaClientes();
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

        document.getElementById('estadoFilter').addEventListener('change', function () {
            filterResults();
        });

        document.getElementById('textoBuscadoFilter').addEventListener('input', function () {
            filterResults();
        });
        // GET request
        fetch("http://localhost:3000/api/services/")
            .then((response) => response.json())
            .then((data) => {
                localStorage.removeItem("id_clienteServicio");
                lista = data; // Almacena la lista de servicios

                // Llama a la función para aplicar el filtro inicialmente
                filterResults();
            })
            .catch((error) =>
                console.error("Error al realizar la solicitud:", error)
            );
    }

    //--------------------------------------------------------
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
                if (data.importe === null){
                    importeServicio.value = '';
                }

                // Crea una nueva opción con el valor obtenido de la base de datos
                let nuevaOpcion = document.createElement("option");
                nuevaOpcion.text = data.nom_servicio;
                nuevaOpcion.value = data.id_servicio;
                

                // Añade la nueva opción al combobox
                tipoServicio.add(nuevaOpcion);
                
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
                    
                    // Almacena la relación entre id_servicio y nom_servicio
                    servicioMap.set(option.value, option.textContent);
                    
                });
            })
            .catch((error) =>
                console.error("Error al obtener tipos de servicio:", error)
            );
    }

    //--------------------------------------------------------
    if(frameClientsList != null){

        document.getElementById('textoBuscadoFilter').addEventListener('input', function () {
            filterResults();
        });
        // GET request
        fetch("http://localhost:3000/api/clients/")
            .then((response) => response.json())
            .then((data) => {
                
                lista = data; // Almacena la lista de servicios

                // Llama a la función para aplicar el filtro inicialmente
                filterResults();
            })
            .catch((error) =>
                console.error("Error al realizar la solicitud:", error)
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

                    if(tipoServicioData.importe === null){
                        tipoServicioData.importe = '';
                    }

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
    verificaLongitudDato = function(tipoDato, longitud){
        return tipoDato.length >= longitud;
    }


    //--------------------------------------------------------
    verificarValidedDatos = function(){

        let verificado = true;

        if (importeServicio.value < 0){
            errorMessageImporteServicio.textContent = 'El importe no puede tener un valor negativo.';
            errorMessageImporteServicio.style.display = 'block';
            return verificado = false;
        } else {
            errorMessageImporteServicio.display = 'none';
        }
        if (ivaServicio.value < 0){
            errorMessageIvaServicio.textContent = 'El iva no puede tener un valor negativo.';
            errorMessageIvaServicio.style.display = 'block';
            return verificado = false;
        } else {
            errorMessageIvaServicio.style.display = 'none';
        }

        if(verificaLongitudDato(descripcionServicio.value, 50)){
            errorMessageDescripcionServicio.textContent = 'La descripción no puede tener más de 50 caracteres';
            errorMessageDescripcionServicio.style.display = 'block';
            return verificado = false;
        } else {
            errorMessageDescripcionServicio.style.display = 'none';
        }

        if(verificaLongitudDato(telefonoCliente.value, 15)){
            errorMessageTelefonoCliente.textContent = 'El teléfono del cliente no puede tener más de 15 caracteres';
            errorMessageTelefonoCliente.style.display = 'block';
            return verificado = false;
        } else{
            errorMessageTelefonoCliente.style.display = 'none';
        }
        if(verificaLongitudDato(direccionCliente.value, 100)){
            errorMessageDireccionCliente.textContent = 'La dirección del cliente no puede tener más de 100 caracteres';
            errorMessageDireccionCliente.style.display = 'block';
            return verificado = false;
        } else{
            errorMessageDireccionCliente.style.display = 'none';
        }
        if(verificaLongitudDato(cpCliente.value, 10)){
            errorMessageCpCliente.textContent = 'El código postal del cliente no puede tener más de 10 caracteres';
            errorMessageCpCliente.style.display = 'block';
            return verificado = false;
        } else{
            errorMessageCpCliente.style.display = 'none';
        }
        if(verificaLongitudDato(localidadCliente.value, 50)){
            errorMessageLocalidadCliente.textContent = 'La localidad del cliente no puede tener más de 50 caracteres';
            errorMessageLocalidadCliente.style.display = 'block';
            return verificado = false;
        } else{
            errorMessageLocalidadCliente.style.display = 'none';
        }
        if(verificaLongitudDato(ciudadCliente.value, 50)){
            errorMessageCiudadCliente.textContent = 'La ciudad del cliente no puede tener más de 50 caracteres';
            errorMessageCiudadCliente.style.display = 'block';
            return verificado = false;
        } else{
            errorMessageCiudadCliente.style.display = 'none';
        }

        return verificado;
    }

    verificarDatosNombreNifCliente = function (){
        let verificado = true;
        if(verificaLongitudDato(nombreCliente.value, 50)){
            errorMessageNombreCliente.textContent = 'El nombre del cliente no puede tener más de 50 caracteres';
            errorMessageNombreCliente.style.display = 'block';
            return verificado = false;
        } else {
            errorMessageNombreCliente.style.display = 'none';
        }
        if(verificaLongitudDato(nifCliente.value, 10)){
            errorMessageNifCliente.textContent = 'El nif/cif del cliente no puede tener más de 10 caracteres';
            errorMessageNifCliente.style.display = 'block';
            return verificado = false;
        } else{
            errorMessageNifCliente.style.display = 'none';
        }
        return verificado;
    }

    //--------------------------------------------------------
    verificarValidedDatosTipoServicioConfig = function(){
        let verificado = true;

        if(verificaLongitudDato(nombreTipoServicio.value, 50)){
            errorMessageTipoServicioConfig.textContent = 'hola.';
            errorMessageTipoServicioConfig.style.display ='block';
            return verificado = false;
        } else {
            errorMessageTipoServicioConfig.style.display = 'none';
        }

        if(nombreTipoServicio.value.trim() === '' ){
            errorMessageTipoServicioConfig.textContent = 'El nombre del tipo de servicio no puede estar vacío.';
            errorMessageTipoServicioConfig.style.display ='block';
            return verificado = false;
        } else {
            errorMessageTipoServicioConfig.style.display = 'none';
        
        }

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
    // Botón para guardar un nuevo servicio en la tabla clientesServicios
    botonGuardarNuevoServicio = function () {
   
        if(nombreCliente.value.trim() === "" && nifCliente.value.trim() === ""){
            errorMessageNombreNifClienteObligatorio.textContent = 'Para guardar el servicio es necesario un nombre de cliente y su NIF/CIF'
            errorMessageNombreNifClienteObligatorio.style.display = "block";
            if(nombreCliente.value.trim() === ""){
                nombreCliente.focus();
            }
            if(nifCliente.value.trim() === ""){
                nifCliente.focus();
            } 
        }
        else {
            errorMessageNombreNifClienteObligatorio.style.display = "none";

            let tipoServicioD = tipoServicio.text;

            if (!isNaN(tipoServicio.value)){
                tipoServicioD = servicioMap.get(tipoServicio.value);
            }

           if( verificarValidedDatos() && verificarDatosNombreNifCliente()){

                // POST request
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
                    NIF_CIF: nifCliente.value !== "" ? nifCliente.value.trim() : null,
                    telefono: telefonoCliente.value !== "" ? telefonoCliente.value.trim() : null,
                    direccion: direccionCliente.value !== "" ? direccionCliente.value.trim() : null,
                    cp: cpCliente.value !== "" ? cpCliente.value.trim() : null,
                    localidad: localidadCliente.value !== "" ? localidadCliente.value.trim() : null,
                    ciudad: ciudadCliente.value !== "" ? ciudadCliente.value.trim() : null,
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
                        alert(data.mensaje);
                        console.log("Servicio creado:", data.mensaje);
                        mostrarFrameListaServicios();
                    })
                    .catch((error) =>
                        console.error("Error al realizar la solicitud:", error)
                    );
            }
        }
    };

    //--------------------------------------------------------
    // Botón para guardar un servicio modificado en la tabla clientesServicios
    botonGuardarServicioModi = function () {

            let tipoServicioModif = tipoServicio.value;

            if (!isNaN(tipoServicio.value)){
                tipoServicioModif = servicioMap.get(tipoServicio.value);
            }

            if(verificarValidedDatos()){

                // PUT request
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
    //Botón para guardar un nuevo tipo de servicio en la tabla de servicios (configuración)
    botonGuardarTipoDeServicio = function () {
       
        if(verificarValidedDatosTipoServicioConfig()){

            const nuevoTipoServicio = {
                nom_servicio: nombreTipoServicio.value.trim(),
                importe: importeTipoServicio.value !== "" ? importeTipoServicio.value : null,
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
                    alert(data.mensaje);
                    console.log("Tipo de servicio creado.", data.mensaje);
                    mostrarFrameConfigServices();
                    
                })
                .catch((error) =>
                    console.error("Error al realizar la solicitud:", error));
        }
    };

    //--------------------------------------------------------
    // Función para eliminar un servicio de la tabla clientesServicios cuando se hace click en eliminar
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
        let serviciosEjemplos = [
                {id:1, descripcion:'Servicio 1', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe1', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
                {id:2, descripcion:'Servicio 2', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
                {id:3, descripcion:'Servicio 3', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
                {id:4, descripcion:'Servicio 4', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
                {id:5, descripcion:'Servicio 5', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
                {id:6, descripcion:'Servicio 6', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'}
                ];
*/
