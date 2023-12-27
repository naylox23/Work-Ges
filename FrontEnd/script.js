window.onload = function (){

    //ids ventana viewService.htlm
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

    //ids ventana modifyService.html
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

    // id tabla de servicesList.html
    const filasTablaServicios = document.getElementById('filasTablaServicios');

    if(descripcionServicioView != null){
        descripcionServicioView.value = localStorage.getItem('descripcion');
        fechaRealizacionView.value = localStorage.getItem('fecha_realizacion');
        fechaCobroView.value = localStorage.getItem('fecha_cobro');
        importeServicioView.value = localStorage.getItem('importe');
        ivaServicioView.value = localStorage.getItem('iva');
        servicioRealizadoView.value = localStorage.getItem('realizado');
        servicioFacturadoView.value = localStorage.getItem('facturado');
        servicioCobradoView.value = localStorage.getItem('cobrado');
        nombreClienteView.value = localStorage.getItem('nombreCliente');
        nifClienteView.value = localStorage.getItem('nif_cif');
        telefonoClienteView.value = localStorage.getItem('telefono');
        direccionClienteView.value = localStorage.getItem('direccion');
        cpClienteView.value = localStorage.getItem('codigo_postal');
        localidadClienteView.value = localStorage.getItem('localidad');
        ciudadClienteView.value = localStorage.getItem('ciudad');      
    }

    if (descripcionServicioModi != null){
        descripcionServicioModi.value = localStorage.getItem('descripcion');
        fechaRealizacionModi.value = localStorage.getItem('fecha_realizacion');
        fechaCobroModi.value = localStorage.getItem('fecha_cobro');
        importeServicioModi.value = localStorage.getItem('importe');
        ivaServicioModi.value = localStorage.getItem('iva');
        servicioRealizadoModi.value = localStorage.getItem('realizado');
        servicioFacturadoModi.value = localStorage.getItem('facturado');
        servicioCobradoModi.value = localStorage.getItem('cobrado');
        nombreClienteModi.value = localStorage.getItem('nombreCliente');
        nifClienteModi.value = localStorage.getItem('nif_cif');
        telefonoClienteModi.value = localStorage.getItem('telefono');
        direccionClienteModi.value = localStorage.getItem('direccion');
        cpClienteModi.value = localStorage.getItem('codigo_postal');
        localidadClienteModi.value = localStorage.getItem('localidad');
        ciudadClienteModi.value = localStorage.getItem('ciudad'); 
    }

    

    //Ventanas de servicios
    listaServicios = function (){
        
        window.location.href="../services/servicesList.html";
    }

    nuevoServicio = function (){
        
        window.location.href="../services/newService.html";
    }

    modificarServicio = function(){
        localStorage.setItem('descripcion',  descripcionServicioView.value);
        localStorage.setItem('fecha_realizacion', fechaRealizacionView.value);
        localStorage.setItem('fecha_cobro', fechaCobroView.value);
        localStorage.setItem('importe', importeServicioView.vaue);
        localStorage.setItem('iva', ivaServicioView.value);
        localStorage.setItem('realizado', servicioRealizadoView.value);
        localStorage.setItem('facturado', servicioFacturadoView.value);
        localStorage.setItem('cobrado', servicioCobradoView.value);
        localStorage.setItem('nombreCliente', nombreClienteView.value);
        localStorage.setItem('nif_cif', nifClienteView.value);
        localStorage.setItem('telefono', telefonoClienteView.value);
        localStorage.setItem('direccion', direccionClienteView.value);
        localStorage.setItem('codigo_postal', cpClienteView.value);
        localStorage.setItem('localidad', localidadClienteView.value);
        localStorage.setItem('ciudad', ciudadClienteView.value); 

        window.location.href="../services/modifyService.html";
    }

    verServicio = function(servicio){

        localStorage.setItem('descripcion', servicio.descripcion);
        localStorage.setItem('fecha_realizacion', servicio.fecha_realizacion);
        localStorage.setItem('fecha_cobro', servicio.fecha_cobro);
        localStorage.setItem('importe', servicio.importe);
        localStorage.setItem('iva', servicio.iva);
        localStorage.setItem('realizado', servicio.realizado);
        localStorage.setItem('facturado', servicio.facturado);
        localStorage.setItem('cobrado', servicio.cobrado);
        localStorage.setItem('nombreCliente', servicio.nombreCliente);
        localStorage.setItem('nif_cif', servicio.nif_cif);
        localStorage.setItem('telefono', servicio.telefono);
        localStorage.setItem('direccion', servicio.direccion);
        localStorage.setItem('codigo_postal', servicio.codigo_postal);
        localStorage.setItem('localidad', servicio.localidad);
        localStorage.setItem('ciudad', servicio.ciudad);        
        
        window.location.href="../services/viewService.html";
    }


    //Ventanas de facturas
    listaFacturas = function(){

        window.location.href="../invoices/invoicesList.html";
    }

    nuevaFactura = function (){

        window.location.href= "../invoices/newInvoice.html";
    }

    //--------------------------------------------------------
    //Función para mostrar/ocultar el menú al hacer click sobre el icono del menú
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
    //Función para cambiar de un menú a otro al hacer click sobre el que corresponda.
    changeMenu = function (menu){
        
        if (menu === 'menuServicios'){
            this.listaServicios();
        }

        if (menu === 'menuFacturas'){ 
            this.listaFacturas();
        }

        if (menu === 'menuConfig'){
            //this.configuracion();
        }
    }

    //--------------------------------------------------------
    
    if (filasTablaServicios != null){
        let serviciosEjemplos = [
                {id:1, descripcion:'Servicio 1', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe1', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
                {id:2, descripcion:'Servicio 2', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
                {id:3, descripcion:'Servicio 3', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
                {id:4, descripcion:'Servicio 4', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
                {id:5, descripcion:'Servicio 5', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'},
                {id:6, descripcion:'Servicio 6', fecha_realizacion:'2023-09-12', fecha_cobro:'2023-12-30', importe: 200.00, iva: 21, realizado: true, facturado: true, cobrado: false, nombreCliente:'pepe', nif_cif:'oooooo', telefono:'pppppppp', direccion:'akakakka', codigo_postal:'01220', localidad:'papa', ciudad:'pppp'}
                ];

            // Recorre los datos y crea filas en la tabla
        serviciosEjemplos.forEach((servicio) => {
            const fila = document.createElement('tr');
            fila.classList.add('filasHover');

            const botonVer = document.createElement('button');
            botonVer.textContent = '<a href="#"><i class="fas fa-eye" style="color:green; margin-right:10px"></i></a>';
            fila.addEventListener('click', function (){
                verServicio(servicio);
            })
            
            
            fila.innerHTML = `
                    <td>${servicio.nombreCliente}</td>
                    <td>${servicio.descripcion}</td>
                    <td>${servicio.fecha_realizacion}</td>
                    <td>${servicio.fecha_cobro}</td>
                    <td>${servicio.importe}</td>
                    <td>${servicio.realizado}</td>
                    
                    `;
            this.filasTablaServicios.appendChild(fila);
        }); 
    }

}

