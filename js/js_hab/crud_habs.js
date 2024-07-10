// Agregar, Eliminar, Modificar
document.addEventListener('DOMContentLoaded', function () {
    let habs = [];
    limpiar_campos();
    //Se carga el array de las habitaciones  desde localStorage
    function cargar_habs_desde_localStorage() {
        const storedHabs = localStorage.getItem('habs');
        if (storedHabs) {
            habs = JSON.parse(storedHabs);
        }
    }

    //Funcion para guardar los objectos en el array de habitaciones 
    function guardar_habs_en_localStorage() {
        localStorage.setItem('habs', JSON.stringify(habs));
    }
    //Funcion para limpiar inputs 
    function limpiar_campos() {
        const inputs = document.querySelectorAll('.input');
        inputs.forEach(e => {
            e.value = '';
        });
        //Se carga los select en el primer index, sin ninguna seleccion cargada
        document.getElementById('tipoHabitacion').selectedIndex = 0;
        document.getElementById('estadoHab').selectedIndex = 0; 
        document.getElementById('nuevoEstado').selectedIndex = 0; 
    }
    //Funcion para validar que los inputs no sean vacios
    function validar_input(id) {
        const inpt = document.getElementById(id);
        if (!inpt || inpt.value.trim() === '') {
            console.log('Campo vacío o no encontrado');
            return;
        }
        return inpt.value.trim();
    }
    //Funcion para actualizar el estado de una habitacion
    function actualizar() {
        //Se captura el valor del nuevo estado seleccionado
        const nuevoEstado = document.getElementById('nuevoEstado').value;
        const checkbox = document.querySelector('input[type="checkbox"]:checked');
        const row = checkbox.closest('tr');
        //Se captura el numero de habitacion desde el primer index de la fila
        const nroHabitacion = parseInt(row.cells[0].textContent, 10);

        if (!nuevoEstado) {
            alert("Debe seleccionar un nuevo estado");
            return;
        }
        //Se recorren los objetos del array habitaciones
        habs.forEach(function(hab) {
            //En caso de encontrar el numero de habitacion, se actualiza el estado anterior al nuevo
            if (hab.nroHabitacion === nroHabitacion) {
                hab.estadoHab = nuevoEstado;
            }
        });
        //Se guardan los cambios en localStorage y se cargan
        guardar_habs_en_localStorage();
        cargar_habitacion();
        //Se esconde el modal
        $('#myModal').modal('hide');
        alert('El estado se ha actualizado correctamente');
    }

    const addHab = document.getElementById('addHab');
    const borrarHab = document.getElementById('borrarHab');
    const actualizarHab = document.getElementById('actualizarHab');
    //Insertar
    addHab.addEventListener('click', function (event) {
        event.preventDefault();
        const nro = parseInt(validar_input('nroHabitacion'));
        const tipoHab = document.getElementById('tipoHabitacion').value;
        let estadoHab = document.getElementById('estadoHab').value;

        if (!nro || !tipoHab || !estadoHab) {
            alert("Ingrese información en todos los campos");
            return;
        }

        const existingHab = habs.find(e => e.nroHabitacion === nro);
        if (existingHab) {
            alert("La habitación ya existe");
        } else {
            const newHab = {
                nroHabitacion: nro,
                tipoHab: tipoHab,
                estadoHab: estadoHab
            }
            habs.push(newHab);

            guardar_habs_en_localStorage(); 
            alert("Habitación agregada correctamente");
            cargar_habitacion(); 
            limpiar_campos();
        }
    });

    function cargar_habitacion() {
        const bodyTabla = document.getElementById('clientTableBody');
        bodyTabla.innerHTML = ''; 
        habs.forEach(function (p) {
            const tr = document.createElement('tr');
            const row = ['nroHabitacion', 'tipoHab','estadoHab'];
            row.forEach(function (i) {
                const td = document.createElement('td');
                td.textContent = p[i];
                tr.appendChild(td);
            });
            const checkboxCell = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkboxCell.appendChild(checkbox);
            tr.appendChild(checkboxCell);

            bodyTabla.appendChild(tr); 
        });
    }
    //Eliminar
    borrarHab.addEventListener('click', function (e) {
        e.preventDefault();
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        
        checkboxes.forEach(function (checkbox) {
            const row = checkbox.closest('tr');
            row.remove();

            const nroHabitacion = parseInt(row.cells[0].textContent, 10);
            habs = habs.filter(hab => hab.nroHabitacion !== nroHabitacion);
            
        });
        localStorage.setItem('habs', JSON.stringify(habs));
        if (checkboxes.length === 0) {
            alert("No se han seleccionado habitaciones");
        } else {
            alert('Habitaciones seleccionadas eliminadas');
        }
    });
    //Actualizar
    actualizarHab.addEventListener('click', function(e) {
        e.preventDefault();
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

        if (checkboxes.length !== 1) {
            alert("Seleccione solo 1 habitacion para modificar");
            return;
        }
        $('#myModal').modal('show');
    });
    
    const modifyBtn = document.getElementById('modifyBtn');
    modifyBtn.addEventListener('click', function() {
        actualizar();
    });
    $('#myModal').on('hidden.bs.modal', function() {
        limpiar_campos();
    });

    cargar_habs_desde_localStorage();
    cargar_habitacion(); 
});
