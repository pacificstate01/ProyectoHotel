document.addEventListener("DOMContentLoaded", function () {
  //Funcion para validar que el nombre no este vacio  
  function validar_nombre(nombre) {
    return nombre.trim().length > 0;
  }
  //Funcion para validar que el apellido no este vacio
  function validar_apellido(apellidos) {
    return apellidos.trim().length > 0;
  }
  //Funcion para limpiar campos del modal despues de cerrar
  function limpiar_campos() {
    document.getElementById("NuevoCorreo").value = "";
    document.getElementById("NuevoNombre").value = "";
    document.getElementById("NuevoApellido").value = "";
  }
  //Funcion para cargar el cliente luego de actualizarlo
  function cargar_cliente() {
    const bodyTabla = document.getElementById("clientTableBody");
    bodyTabla.innerHTML = "";
    clients = JSON.parse(localStorage.getItem("clients"));
    clients.forEach(function (client) {
      const tr = document.createElement("tr");

      const fila = [
        "nroDocumento",
        "tipoDocumento",
        "nombre",
        "apellidos",
        "correo",
      ];
      fila.forEach(function (info) {
        const td = document.createElement("td");
        td.textContent = client[info];
        tr.appendChild(td);
      });
      //Se crea el checkbox al lado del cliente
      const checkboxCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      //Se crean atributos adicionales al checkbox del cliente marcado para accederlas mas facilmente
      checkbox.dataset.correo = client.correo;
      checkbox.dataset.nombre = client.nombre;
      checkbox.dataset.apellidos = client.apellidos;
      checkboxCell.appendChild(checkbox);
      tr.appendChild(checkboxCell);

      bodyTabla.appendChild(tr);
    });
  }
//Funcion para validar el correo
  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  //Funcion para actualizar al cliente
  function actualizar() {
    //Se capturan los nuevos datos y se verifica que este checkeado
    const newEmail = document.getElementById("NuevoCorreo").value;
    const newName = document.getElementById("NuevoNombre").value;
    const newApp = document.getElementById("NuevoApellido").value;
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    if (checkboxes.length !== 1) {
      alert("Seleccione solo 1 cliente para modificar");
      return;
    }
    //Se accede a la primera posicion del checkbox que es un array
    const checkSelected = checkboxes[0];
    //Se accede al atributo adicional del checkbox que es el correo para guardar el correo actual
    const currentEmail = checkSelected.dataset.correo;
    //Validar correo
    if (!validarEmail(newEmail)) {
      alert("Correo electrónico inválido");
      return;
    }
    //Validar el nuevo nombre y el nuevo apellido
    if (!validar_nombre(newName) || !validar_apellido(newApp)) {
      alert("No pueden haber campos vacíos");
      return;
    }
    //Dentro del array clientes se compara si el correo del checkbox es igual al correo actual, en caso de ser verdad ->
    //-> Se modifican los datos de correo, nombre y apellido
    clients.forEach(function (client) {
      if (client.correo === currentEmail) {
        client.correo = newEmail;
        client.nombre = newName;
        client.apellidos = newApp;
      }
    });
    //Se actualiza el localStorage
    localStorage.setItem("clients", JSON.stringify(clients));
    cargar_cliente();
    //Se esconde el modal (funcion del framework bootstrap)
    $("#myModal").modal("hide");
    alert("La información se ha actualizado correctamente");
  }
 //Se captura el boton actualizar(el azul)
  const actualizarBtn = document.getElementById("actualizarBtn");
  actualizarBtn.addEventListener("click", function () {
    //Se verifica que haya algun checkbox marcado para mostrar el modal, en caso contrario no lo muestra
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    if (checkboxes.length !== 1) {
      alert("Seleccione solo 1 cliente para modificar");
      return;
    }
    $("#myModal").modal("show");
  });
  //Se captura el boton modificar (boton que esta dentro del modal)
  const modifyBtn = document.getElementById("modifyBtn");
  //Se llama a la funcion actualizar en cuanto el boton sea clickeado
  modifyBtn.addEventListener("click", function () {
    actualizar();
  });
  //Se capturan los datos del cliente en localStorage y se muestra en el html
    clients = JSON.parse(localStorage.getItem("clients"));
    cargar_cliente();
  
  //Cuando el modal se esconde, se limpian los inputs
  $("#myModal").on("hidden.bs.modal", function () {
    limpiar_campos();
  });
});
