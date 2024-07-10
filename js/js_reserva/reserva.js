document.addEventListener('DOMContentLoaded', function () {
    function limpiar_campos() {
        const inputs = document.querySelectorAll('.input');
        inputs.forEach(e => {
            e.value = '';
        });
        document.getElementById('nroDocumento').selectedIndex = 0;
        document.getElementById('Correo').selectedIndex = 0; 
        document.getElementById('Habitacion').selectedIndex = 0; 
    }
    function guardar_reservas_en_localStorage() {
        localStorage.setItem('reserva', JSON.stringify(reserva));
    }
    function cargar_reservas_desde_localStorage() {
        const storedReservas = localStorage.getItem('reserva');
        if (storedReservas) {
            reserva = JSON.parse(storedReservas);
        }
    }

    function cargar_reserva() {
      const bodyTabla = document.getElementById('ReservasTableBody');
      bodyTabla.innerHTML = '';
      reserva.forEach(function (p) {
          const tr = document.createElement('tr');
          const row = ['id', 'nro', 'email', 'hab', 'nom', 'app']; 
          row.forEach(function (i) {
              if (i !== 'nom' && i !== 'app') { 
                const td = document.createElement('td');
                td.textContent = p[i];
                tr.appendChild(td);
              }
          });

          // Create and append checkbox
          const checkboxCell = document.createElement("td");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkboxCell.appendChild(checkbox);
          tr.appendChild(checkboxCell);

          bodyTabla.appendChild(tr);
      });
  }
    limpiar_campos();
    let reserva = [];
    cargar_reservas_desde_localStorage();
    //Valores numero documento
    const reservas = localStorage.getItem('clients');
    const nroDocumento = JSON.parse(reservas);

    const selectNro = document.getElementById('nroDocumento');

    nroDocumento.forEach(function(i){
        const option = document.createElement('option');
        option.value = i.nroDocumento;
        option.innerHTML = i.nroDocumento;
        selectNro.appendChild(option);
    });
    //Valores correo
    const correo =  JSON.parse(reservas);
    const selectCorreo = document.getElementById('Correo');
    correo.forEach(function(i){
        const option = document.createElement('option');
        option.value = i.correo;
        option.innerHTML = i.correo;
        selectCorreo.appendChild(option);
    });
 
    const selectnombre = document.getElementById('nombre');
    correo.forEach(function(i){
      const option = document.createElement('option');
      option.value = i.nombre;
      selectnombre.appendChild(option);
  });

    const selectapp = document.getElementById('apellido');
    correo.forEach(function(i){
      const option = document.createElement('option');
      option.value = i.apellidos;
      selectapp.appendChild(option);
  });

    //Valores numero de habitacion
    const hab = JSON.parse(localStorage.getItem('habs'));
   
    const selectHab = document.getElementById('Habitacion');

    hab.forEach(function(i){
        const option = document.createElement('option');
        option.value = i.nroHabitacion;
        option.innerHTML = i.nroHabitacion;
        selectHab.appendChild(option);
    });
    const addBtn = document.getElementById('btnRegistrarReserva');
    const deleteBtn = document.getElementById('deleteReservaBtn');
    const modify = document.getElementById('actualizarReserva');
    //Agregar
    addBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const nro = parseInt(document.getElementById("nroDocumento").value);
      const email = document.getElementById("Correo").value;
      const hab = parseInt(document.getElementById("Habitacion").value);
      const nom = selectnombre.value;
      const app = selectapp.value;
      let id = 1;
      let reserve = reserva.find((e) => e.nro === nro);
      let habocu = reserva.find((e) => e.hab === hab);
      if (reserve || habocu) {
        alert("Cliente o habitacion ya ingresadas.");
      } else {
        if (!reserve) {
          if (!nro || !hab || !email) {
            alert("Ingrese información en todos los campos");
            return;
          } else {
            const newReserva = {
              id: reserva.length + 1,
              nro: nro,
              email: email,
              hab: hab,
              nom:nom,
              app:app 
            };
            reserva.push(newReserva);
            guardar_reservas_en_localStorage();
            alert("Reserva agregada correctamente");
            cargar_reserva();
            limpiar_campos();
          }
        } else {
          reserve.id += 1;
        }
      }
    });
    deleteBtn.addEventListener('click',function(e){
        e.preventDefault();
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        
        checkboxes.forEach(function (checkbox) {
            const row = checkbox.closest("tr");
            const nro = parseInt(row.cells[0].textContent, 10);
            const email = row.cells[1].textContent; 
            const hab = parseInt(row.cells[2].textContent,10); 
            
            row.remove();

            const nroDocumento = parseInt(row.cells[0].textContent, 10);

            reserva = reserva.filter(r => r.nro !== nro);
        });
        guardar_reservas_en_localStorage();
        if (checkboxes.length === 0) {
          alert("No se han seleccionado habitaciones");
          return;
        }else{
            alert("Habitaciones seleccionadas eliminadas");
        }
        
    });
    selectNro.addEventListener('change', function () {
        const selectedNro = parseInt(selectNro.value);
        const selectedClient = nroDocumento.find(client => client.nroDocumento === selectedNro);
        if (selectedClient) {
            selectCorreo.value = selectedClient.correo;
            selectnombre.value = selectedClient.nombre;
            selectapp.value = selectedClient.apellidos;
        } else {
            selectCorreo.value = '';
            selectnombre.value = '';
            selectapp.value = '';
        }
    });
    cargar_reservas_desde_localStorage();
    cargar_reserva(); 
});