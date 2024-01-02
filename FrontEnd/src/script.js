window.onload = function (){

    //ids ventana viewService.htlm
    const tipoServicioView = document.getElementById('tipoServicioView');
    const descripcionServicioView = document.getElementById('descripcionServicioView');
    const fechaRealizacionView = document.getElementById('fechaRealizacionView');
    const fechaCobroView = document.getElementById('fechaCobroView');
    const importeServicioView = document.getElementById('importeServicioView');
    const ivaServicioView = document.getElementById('ivaServicioView');
    const servicioRealizadoView = document.getElementById('servicioRealizadoView');
    const servicioFacturadoView = document.getElementById('servicioFacturadoView');
    const servicioCobradoView = document.getElementById('servicioCobradoView');
    const nombreClienteView= document.getElementById('nombreClienteView');
    const nifClienteView  = document.getElementById('nifClienteView');
    const telefonoClienteView = document.getElementById('telefonoClienteView');
    const direccionClienteView = document.getElementById('direccionClienteView');
    const cpClienteView = document.getElementById('cpClienteView');
    const localidadClienteView = document.getElementById('localidadClienteView');
    const ciudadClienteView = document.getElementById('ciudadClienteView');
    const botonModificarServicio = document.getElementById('botonModificarServicio');
    const botonDuplicarServicio = document.getElementById('botonDuplicarServicio');

    //ids ventana modifyService.html
    const tipoServicioModi = document.getElementById('tipoServicioModi');
    const descripcionServicioModi = document.getElementById('descripcionServicioModi');
    const fechaRealizacionModi = document.getElementById('fechaRealizacionModi');
    const fechaCobroModi = document.getElementById('fechaCobroModi');
    const importeServicioModi = document.getElementById('importeServicioModi');
    const ivaServicioModi = document.getElementById('ivaServicioModi');
    const servicioRealizadoModi = document.getElementById('servicioRealizadoModi');
    const servicioFacturadoModi = document.getElementById('servicioFacturadoModi');
    const servicioCobradoModi = document.getElementById('servicioCobradoModi');
    const nombreClienteModi= document.getElementById('nombreClienteModi');
    const nifClienteModi  = document.getElementById('nifClienteModi');
    const telefonoClienteModi = document.getElementById('telefonoClienteModi');
    const direccionClienteModi = document.getElementById('direccionClienteModi');
    const cpClienteModi = document.getElementById('cpClienteModi');
    const localidadClienteModi = document.getElementById('localidadClienteModi');
    const ciudadClienteModi = document.getElementById('ciudadClienteModi');

    //ids ventana newService.html
    const tipoServicioNew = document.getElementById('tipoServicioNew');
    const descripcionServicioNew = document.getElementById('descripcionServicioNew');
    const fechaRealizacionNew = document.getElementById('fechaRealizacionNew');
    const fechaCobroNew = document.getElementById('fechaCobroNew');
    const importeServicioNew = document.getElementById('importeServicioNew');
    const ivaServicioNew = document.getElementById('ivaServicioNew');
    const servicioRealizadoNew = document.getElementById('servicioRealizadoNew');
    const servicioFacturadoNew = document.getElementById('servicioFacturadoNew');
    const servicioCobradoNew = document.getElementById('servicioCobradoNew');
    const nombreClienteNew= document.getElementById('nombreClienteNew');
    const nifClienteNew  = document.getElementById('nifClienteNew');
    const telefonoClienteNew = document.getElementById('telefonoClienteNew');
    const direccionClienteNew = document.getElementById('direccionClienteNew');
    const cpClienteNew = document.getElementById('cpClienteNew');
    const localidadClienteNew = document.getElementById('localidadClienteNew');
    const ciudadClienteNew = document.getElementById('ciudadClienteNew');
    // Variable que almacenará la relación entre id_servicio y nom_servicio al guardar el nuevo clienteServicio
    const servicioMap = new Map();

    // ids ventana de servicesList.html
    const filasTablaServicios = document.getElementById('filasTablaServicios');

    //ids ventana configServices.html
    const nombreTipoServicio = document.getElementById('tipoDeServicioConfig');
    const importeTipoServicio = document.getElementById('importeServicioConfig');
    const filasTablaTipoServicios = document.getElementById('filasTablaTipoServicios');
     if (filasTablaTipoServicios != null){
        const myModal = new bootstrap.Modal(document.getElementById('modalNuevoTipoServicio'));
     }

    
    //--------------------------------------------------------
    //Ventanas de ClientesServicios
    listaServicios = function (){ window.location.href="../services/servicesList.html"; }

    nuevoServicio = function (){ window.location.href="../services/newService.html"; }

    modificarServicio = function(servicio){
        localStorage.setItem('id_clienteServicio', servicio.id_clienteServicio);  
        window.location.href="../services/modifyService.html";
    }

    duplicarServicio = function(servicio){
        localStorage.setItem('id_clienteServicio', servicio.id_clienteServicio);  
        window.location.href="../services/newService.html";
    }

    verServicio = function(servicio){
        localStorage.setItem('id_clienteServicio', servicio.id_clienteServicio);      
        window.location.href="../services/viewService.html";
    }

    //--------------------------------------------------------
    //Ventanas de facturas
    listaFacturas = function(){ window.location.href="../invoices/invoicesList.html"; }

    nuevaFactura = function (){ window.location.href= "../invoices/newInvoice.html"; }

    mainConfigPage = function (){ window.location.href="../settings/mainConfigPage.html"; }
    
    abrirConfigServices = function (){ window.location.href="../settings/configServices.html"; }

    //--------------------------------------------------------
    //Función para mostrar/ocultar el menú de navegación
    mostrarOcultarMenu = function (){
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');

        if (sidebar.style.left === "-250px" ) {
            sidebar.style.left = "0";
            content.style.marginLeft = "250px";
        } else {
            sidebar.style.left = "-250px";
            content.style.marginLeft = "0";
        }
    }

    //--------------------------------------------------------
    //Función para cambiar de un menú a otro.
    changeMenu = function (menu){

        if (menu === 'menuServicios') {this.listaServicios(); }

        if (menu === 'menuFacturas') {this.listaFacturas();}

        if (menu === 'menuConfig') {this.mainConfigPage();}
    }
     
    //--------------------------------------------------------
    //Función que muestra la fecha al usuario en formato 'Español'
    dateToShowFromSQL_ES = function (fecha) {

        let dia = fecha.getDate();
        let mes = (fecha.getMonth()+1);
        let anio = fecha.getFullYear();
        
        if (dia < 10) {dia = '0' + dia; }
        if (mes < 10) {mes = '0' + mes;}

        return dia + '-' + mes + '-' + anio;
    }
    //--------------------------------------------------------
    //Función que transforma la fecha al formato que necesita input type date
    dateToShowFromSQL = function (fecha) {

        let dia = fecha.getDate();
        let mes = (fecha.getMonth()+1);
        let anio = fecha.getFullYear();
        
        if (dia < 10) {dia = '0' + dia;}
        if (mes < 10) {mes = '0' + mes;}

        return anio + '-' + mes + '-' + dia;
    }

    //--------------------------------------------------------
    /*Si el id descripcionServicioView está en la pantalla (no es null) entonces significa que el usuario esta en 
    la pantalla viewService.html y debe coger la ruta que contiene el id del servicio sobre el que ha hecho click en
    la pantalla servicesList. Esa ruta hará una petición al backend para traer los datos del id del servicio y mostrarlo.
    */
    if(descripcionServicioView != null){
        // GET request
            fetch('http://localhost:3000/api/services/'+ localStorage.getItem('id_clienteServicio'))
            .then(response => response.json())
            .then(data => {
            console.log('Datos del cliente:', data);
            let fechaRealizacion = new Date (data.f_realizacion);
            let fechaCobro = new Date (data.f_cobro);
            data.f_realizacion = dateToShowFromSQL(fechaRealizacion);
            data.f_cobro = dateToShowFromSQL(fechaCobro);

            if(data.descrip_servicio === null) {data.descrip_servicio = '';}

            if(data.estado_realizado === 1) {servicioRealizadoView.checked = true;}

            if(data.estado_cobrado === 1) {servicioCobradoView.checked = true;}

            if(data.estado_facturado === 1) {servicioFacturadoView.checked = true;}

            // Crea una nueva opción con el valor obtenido de la base de datos
            let nuevaOpcion = document.createElement("option");
            nuevaOpcion.text = data.nom_servicio;
            nuevaOpcion.value = data.nom_servicio;

            // Añade la nueva opción al combobox
            tipoServicioView.add(nuevaOpcion);

            // Selecciona la opción recién agregada
            tipoServicioView.value = data.nom_servicio;
            descripcionServicioView.value = data.descrip_servicio;
            fechaRealizacionView.value = data.f_realizacion;
            fechaCobroView.value = data.f_cobro;
            importeServicioView.value = data.importe;
            ivaServicioView.value = data.iva;
            nombreClienteView.value = data.nom_cliente;
            nifClienteView.value = data.NIF_CIF;
            telefonoClienteView.value = data.telefono;
            direccionClienteView.value = data.direccion;
            cpClienteView.value = data.cp;
            localidadClienteView.value = data.localidad;
            ciudadClienteView.value = data.ciudad;

            botonModificarServicio.addEventListener('click', function (){
                modificarServicio(data);
            })

            botonDuplicarServicio.addEventListener('click', function (){
                duplicarServicio(data);
            })
           
        })
        .catch(error => console.error('Error al realizar la solicitud:', error));
           
   }

   //--------------------------------------------------------
   if(descripcionServicioNew != null && localStorage.getItem('id_clienteServicio')!== null){
    console.log('@@@@@id: ' + localStorage.getItem('id_clienteServicio'));

        // GET request
        fetch('http://localhost:3000/api/services/'+ localStorage.getItem('id_clienteServicio'))
        .then(response => response.json())
        .then(data => {
            console.log('Datos del cliente dupli:', data);
            let fechaRealizacion = new Date (data.f_realizacion);
            let fechaCobro = new Date (data.f_cobro);
            data.f_realizacion = dateToShowFromSQL(fechaRealizacion);
            data.f_cobro = dateToShowFromSQL(fechaCobro);

            if(data.descrip_servicio === null) {data.descrip_servicio = '';}

            if(data.estado_realizado === 1) {servicioRealizadoNew.checked = true;}

            if(data.estado_cobrado === 1) {servicioCobradoNew.checked = true;}

            if(data.estado_facturado === 1) {servicioFacturadoNew.checked = true;}

            
            setTimeout(() => {
                // Obtener el valor del mapa correspondiente a la opción deseada
                //const selectedNomServicio = servicioMap.get(tipoServicioNew.value);
                console.log('opcion elegida:' + data.nom_servicio);
                tipoServicioNew.value=data.nom_servicio;
                console.log('opcion elegida2:' + tipoServicioNew.value);
                // Asignar el valor directamente al combobox
                //tipoServicioNew.value = selectedNomServicio;
                
              }, "1000");
                

            // Selecciona la opción recién agregada
            
            descripcionServicioNew.value = data.descrip_servicio;
            fechaRealizacionNew.value = data.f_realizacion;
            fechaCobroNew.value = data.f_cobro;
            importeServicioNew.value = data.importe;
            ivaServicioNew.value = data.iva;
            nombreClienteNew.value = data.nom_cliente;
            nifClienteNew.value = data.NIF_CIF;
            telefonoClienteNew.value = data.telefono;
            direccionClienteNew.value = data.direccion;
            cpClienteNew.value = data.cp;
            localidadClienteNew.value = data.localidad;
            ciudadClienteNew.value = data.ciudad;

        })
        .catch(error => console.error('Error al realizar la solicitud:', error));

   }
    //--------------------------------------------------------
    if (descripcionServicioModi != null){
 
        // GET request
        fetch('http://localhost:3000/api/services/'+ localStorage.getItem('id_clienteServicio'))
        .then(response => response.json())
        .then(data => {
            console.log('Datos del cliente:', data);
            let fechaRealizacion = new Date (data.f_realizacion);
            let fechaCobro = new Date (data.f_cobro);
            data.f_realizacion = dateToShowFromSQL(fechaRealizacion);
            data.f_cobro = dateToShowFromSQL(fechaCobro);

            if(data.descrip_servicio === null) {data.descrip_servicio = '';}

            if(data.estado_realizado === 1) {servicioRealizadoModi.checked = true;}

            if(data.estado_cobrado === 1) {servicioCobradoModi.checked = true;}

            if(data.estado_facturado === 1) {servicioFacturadoModi.checked = true;}
            
            // Crea una nueva opción con el valor obtenido de la base de datos
            let nuevaOpcion = document.createElement("option");
            nuevaOpcion.text = data.nom_servicio;
            nuevaOpcion.value = data.nom_servicio;

            // Añade la nueva opción al combobox
            tipoServicioModi.add(nuevaOpcion);

            // Selecciona la opción recién agregada
            tipoServicioModi.value = data.nom_servicio;
            descripcionServicioModi.value = data.descrip_servicio;
            fechaRealizacionModi.value = data.f_realizacion;
            fechaCobroModi.value = data.f_cobro;
            importeServicioModi.value = data.importe;
            ivaServicioModi.value = data.iva;
            nombreClienteModi.value = data.nom_cliente;
            nifClienteModi.value = data.NIF_CIF;
            telefonoClienteModi.value = data.telefono;
            direccionClienteModi.value = data.direccion;
            cpClienteModi.value = data.cp;
            localidadClienteModi.value = data.localidad;
            ciudadClienteModi.value = data.ciudad;

        })
        .catch(error => console.error('Error al realizar la solicitud:', error));

    }

    //--------------------------------------------------------
    guardarNuevoServicio = function (){
        
            if (nifClienteNew === '' || telefonoClienteNew === ''){
                alert('no tiene valor el nif ni el telefono')
            } else {
                // POST request
                if (servicioRealizadoNew.checked){
                    servicioRealizadoNew.value = 1
                } else{
                    servicioRealizadoNew.value = 0;
                }
    
                if (servicioFacturadoNew.checked){
                    servicioFacturadoNew.value = 1
                } else{
                    servicioFacturadoNew.value = 0;
                }
    
                if (servicioCobradoNew.checked){
                    servicioCobradoNew.value = 1
                } else{
                    servicioCobradoNew.value = 0;
                }
                const nuevoServicio = {
                    id_servicio: tipoServicioNew.value,
                    nom_servicio: servicioMap.get(tipoServicioNew.value),
                    descrip_servicio: descripcionServicioNew.value !== '' ? descripcionServicioNew.value : null,
                    f_realizacion: fechaRealizacionNew.value !== '' ? fechaRealizacionNew.value : null,
                    f_cobro: fechaCobroNew.value !== '' ? fechaCobroNew.value : null,
                    importe: importeServicioNew.value !== '' ? importeServicioNew.value : null,
                    iva: ivaServicioNew.value !== '' ? ivaServicioNew.value : null,
                    estado_realizado: servicioRealizadoNew.value,
                    estado_facturado: servicioFacturadoNew.value,
                    estado_cobrado: servicioCobradoNew.value,
                    nom_cliente: nombreClienteNew.value,
                    NIF_CIF: nifClienteNew.value !== '' ? nifClienteNew.value : null,
                    telefono: telefonoClienteNew.value !== '' ? telefonoClienteNew.value : null,
                    direccion: direccionClienteNew.value !== '' ? direccionClienteNew.value : null,
                    cp: cpClienteNew.value !== '' ? cpClienteNew.value : null,
                    localidad: localidadClienteNew.value !== '' ? localidadClienteNew.value : null,
                    ciudad: ciudadClienteNew.value !== '' ? ciudadClienteNew.value : null
                
                };
                console.log(nuevoServicio);
                
                fetch('http://localhost:3000/api/services', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoServicio),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Servicio creado:', data.mensaje);
                    listaServicios();
                })
                .catch(error => console.error('Error al realizar la solicitud:', error));
            }
            
    }

    //--------------------------------------------------------
    guardarServicioModi = function(){
        if (servicioRealizadoModi.checked){
            servicioRealizadoModi.value = 1
        } else{
            servicioRealizadoModi.value = 0;
        }

        if (servicioFacturadoModi.checked){
            servicioFacturadoModi.value = 1
        } else{
            servicioFacturadoModi.value = 0;
        }

        if (servicioCobradoModi.checked){
            servicioCobradoModi.value = 1
        } else{
            servicioCobradoModi.value = 0;
        }
        // PUT request
        const clienteServicioActualizado = {
            nuevoTipoServicio: tipoServicioModi.value,
            nuevaDescripcionServicio: descripcionServicioModi.value,
            nuevaFechaRealizacion: fechaRealizacionModi.value,
            nuevaFechaCobro: fechaCobroModi.value,
            nuevoImporteServicio: importeServicioModi.value,
            nuevoIvaServicio: ivaServicioModi.value,
            nuevoServicioRealizadoModi: servicioRealizadoModi.value,
            nuevoServicioFacturadoModi: servicioFacturadoModi.value,
            nuevoServicioCobradoModi: servicioCobradoModi.value,
            nuevoNombreClienteServicio: nombreClienteModi.value,
            nuevoNifClienteServicio: nifClienteModi.value,
            nuevoTelefonoClienteServicio: telefonoClienteModi.value,
            nuevaDireccionClienteServicio: direccionClienteModi.value,
            nuevoCpClienteServicio: cpClienteModi.value,
            nuevaLocalidadClienteServicio: localidadClienteModi.value,
            nuevaCiudadClienteServicio: ciudadClienteModi.value,
            
        };
        console.log(clienteServicioActualizado);
        
        fetch('http://localhost:3000/api/services/'+ localStorage.getItem('id_clienteServicio'), {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteServicioActualizado),
        })
            .then(response => response.json())
            .then(data => {
            console.log('Cliente actualizado:', data.mensaje);
            listaServicios();
            })
            .catch(error => console.error('Error al realizar la solicitud:', error));
    }
    //--------------------------------------------------------
    if (filasTablaServicios != null){
        // let serviciosEjemplos = [
        //         {id:1, descripcion:'Servicio 1', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe1', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        //         {id:2, descripcion:'Servicio 2', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        //         {id:3, descripcion:'Servicio 3', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        //         {id:4, descripcion:'Servicio 4', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        //         {id:5, descripcion:'Servicio 5', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
        //         {id:6, descripcion:'Servicio 6', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'}
        //         ];

        
        // GET request
        fetch('http://localhost:3000/api/services/')
        .then(response => response.json())
        .then(data => {
            console.log('Datos de los servicios:', data);
            localStorage.removeItem('id_clienteServicio');
            

            // Recorre los datos y crea filas en la tabla
            data.forEach((servicio) => {

                let fechaRealizacion = new Date (servicio.f_realizacion);
                let fechaCobro = new Date (servicio.f_cobro);
                servicio.f_realizacion = dateToShowFromSQL_ES(fechaRealizacion);
                servicio.f_cobro = dateToShowFromSQL_ES(fechaCobro);

                const fila = document.createElement('tr');
                fila.classList.add('filasHover');
    
                // const botonVer = document.createElement('button');
                // botonVer.textContent = '<a href="#"><i class="fas fa-eye" style="color:green; margin-right:10px"></i></a>';

                fila.addEventListener('click', function (){
                    verServicio(servicio);
                })
                
                if (servicio.descrip_servicio === null){
                    servicio.descrip_servicio = '';
                }
                const etiquetaRealizado = document.createElement('span');
                const etiquetaFacturado = document.createElement('span');
                const etiquetaCobrado = document.createElement('span');

                if(servicio.estado_realizado === 1){
                    etiquetaRealizado.textContent = 'R';
                    etiquetaRealizado.classList.add('etiquetaRealizado');
                }
               
                if(servicio.estado_facturado === 1){
                    etiquetaFacturado.textContent = 'F';
                    etiquetaFacturado.classList.add('etiquetaFacturado');
                }

                if(servicio.estado_cobrado === 1){
                    etiquetaCobrado.textContent = 'C';
                    etiquetaCobrado.classList.add('etiquetaCobrado');
                }

                fila.innerHTML = `
                        <td>${servicio.nom_cliente}</td>
                        <td>${servicio.nom_servicio} ${servicio.descrip_servicio}</td>
                        <td>${servicio.f_realizacion}</td>
                        <td>${servicio.f_cobro}</td>
                        <td>${servicio.importe}</td>
                        <td>${etiquetaRealizado.outerHTML} ${etiquetaFacturado.outerHTML} ${etiquetaCobrado.outerHTML}</td>
                        
                        `;
                this.filasTablaServicios.appendChild(fila);
            }); 
            
        })
        .catch(error => console.error('Error al realizar la solicitud:', error));


    }
    
    //--------------------------------------------------------
    if (tipoServicioNew != null){
        fetch('http://localhost:3000/api/servicesConfig')  
        .then(response => response.json())
        .then(data => {
            console.log(data);
        // Llena las opciones del combobox con los datos obtenidos
        data.forEach(tipoServicio => {
            const option = document.createElement('option');
            option.value = tipoServicio.id_servicio;  
            option.textContent = tipoServicio.nom_servicio;  
            tipoServicioNew.appendChild(option);

            // Almacena la relación entre id_servicio y nom_servicio
            servicioMap.set(option.value, option.textContent);
            //console.log(servicioMap);
        });
        })
        .catch(error => console.error('Error al obtener tipos de servicio:', error));
    }
    //--------------------------------------------------------
    if (tipoServicioModi != null){
            fetch('http://localhost:3000/api/servicesConfig')  
            .then(response => response.json())
            .then(data => {
                console.log(data);
            // Llena las opciones del combobox con los datos obtenidos
            data.forEach(tipoServicio => {
                const option = document.createElement('option');
                option.value = tipoServicio.id_servicio;  
                option.textContent = tipoServicio.nom_servicio;  
                tipoServicioModi.appendChild(option);
    
                // Almacena la relación entre id_servicio y nom_servicio
                servicioMap.set(option.value, option.textContent);
                console.log(servicioMap);
            });
            })
            .catch(error => console.error('Error al obtener tipos de servicio:', error));
    }
    //--------------------------------------------------------
    if (filasTablaTipoServicios != null){
        fetch('http://localhost:3000/api/servicesConfig') 
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Llenar las opciones del combobox con los datos obtenidos
            data.forEach(tipoServicio => {
                const fila = document.createElement('tr');
                fila.classList.add('filasHover');
                
                fila.innerHTML = `
                        <td>${tipoServicio.nom_servicio}</td>
                        <td>${tipoServicio.importe}</td>
                        `;
                this.filasTablaTipoServicios.appendChild(fila);
            }); 
            
        })
        .catch(error => console.error('Error al obtener tipos de servicio:', error));
    }
    //--------------------------------------------------------
    guardarTipoDeServicio = function(){
        const nuevoTipoServicio = {
            nom_servicio: nombreTipoServicio.value,
            importe: importeTipoServicio.value !== '' ? importeTipoServicio.value : null
        };

        fetch('http://localhost:3000/api/servicesConfig/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoTipoServicio),
        })
            .then(response => response.json())
            .then(data => {
            console.log('Tipo de servicio creado.', data.mensaje);
            
            myModal.hide();
            
            })
            .catch(error => console.error('Error al realizar la solicitud:', error));
            
    }



}
/*

  // DELETE request
fetch('http://localhost:3000/clientes/1', {
  method: 'DELETE',
})
  .then(response => {
    if (response.ok) {
      console.log('Cliente eliminado correctamente');
    } else {
      console.error('Error al eliminar el cliente');
    }
  })
  .catch(error => console.error('Error al realizar la solicitud:', error));

*/

