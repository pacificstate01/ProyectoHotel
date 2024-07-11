document.addEventListener("DOMContentLoaded", function () {
  //Array clients para guardar datos
  let clients = [];
  //Funcion para validar si los inputs estan vacios o no
  function validar_input(id) {
    const inpt = document.getElementById(id);
    if (inpt.value.trim() === "") {
      console.log("Campos vacios");
      return;
    }
    return inpt.value.trim();
  }
  //Funcion para validar que el mail tenga la forma de correo con caracter especial
  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  //Se capturan botones de agregar y eliminar
  const btn = document.getElementById("btnRegistrarCliente");
  const deleteBtn = document.getElementById("deleteClientBtn");
  //Evento cuando se aprete el boton de agregar
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    //Validacion de datos ingresados
    const nd = parseInt(validar_input("nroDocumento"));
    const td = validar_input("tipoDocumento");
    const nom = validar_input("nombres");
    const app = validar_input("apellidos");
    const co = validar_input("correo");
    //Validacion de correo
    if (!validarEmail(co)) {
      alert("Correo electrónico inválido");
      return;
    }
    //Se busca si el nro de documento ya existe, por ende el cliente ya esta ingresado
    const existingClient = clients.find((e) => e.nroDocumento === nd);
    //Si no estan todos los campos con datos se pide que se llenen
    if (!nd || !td || !nom || !app || !co) {
      alert("Ingrese información en todos los campos");
      return;
    } else {
      //Si ya existe el cliente, se avisa y en caso contrario se crea un nuevo objeto cliente
      if (existingClient) {
        alert("El cliente ya existe");
      } else {
        const newClient = {
          nroDocumento: nd,
          tipoDocumento: td,
          nombre: nom,
          apellidos: app,
          correo: co,
        };
        //Se empuja dentro del array
        clients.push(newClient);
        //Se guarda en localStorage
        localStorage.setItem("clients", JSON.stringify(clients));
        //Se carga el cliente ingresado y se limpian los campos usados
        alert("Cliente agregado correctamente");
        cargar_cliente();
        limpiar_campos();
      }
    }
  });
  //Se captura el boton de eliminar
  deleteBtn.addEventListener("click", function () {
    //Se capturan los checkboxes checkeados
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    //Se elimina la fila mas cercana al checkbox selecccionado
    checkboxes.forEach(function (checkbox) {
      const row = checkbox.closest("tr");
      row.remove();
      //Se extrae el nro de documento del row para filtrar el array y asi crear un nuevo arreglo sin el cliente con ese nro
      const nroDocumento = parseInt(row.cells[0].textContent, 10);
      clients = clients.filter(
        (client) => client.nroDocumento !== nroDocumento
      );
    });
    //Se actualiza el array en localStorage
    localStorage.setItem("clients", JSON.stringify(clients));
    //Se revisa si algun checkbox ha sido efectivamente checkeado
    if (checkboxes.length === 0) {
      alert("No se han seleccionado clientes");
    } else {
      alert("Clientes seleccionados eliminados");
    }
  });
  //Funcion para cargar clientes en el html
  function cargar_cliente() {
    const bodyTabla = document.getElementById("clientTableBody");
    bodyTabla.innerHTML = "";

    clients.forEach(function (p) {
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
        td.textContent = p[info];
        tr.appendChild(td);
      });
      //Al final de cada row cliente se agrega una checkbox para marcar en caso de borrar o modificar
      const checkboxCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkboxCell.appendChild(checkbox);
      tr.appendChild(checkboxCell);

      bodyTabla.appendChild(tr);
    });
  }
  //Funcion para limpiar los inputs usados
  function limpiar_campos() {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach((e) => {
      e.value = "";
    });
  }
});
