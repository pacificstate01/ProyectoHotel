document.addEventListener('DOMContentLoaded', function () {
    function mostrar_habitaciones(){
        const habs_guardados= localStorage.getItem('habs');
        let hab = JSON.parse(habs_guardados);
        const bodyTabla = document.getElementById('HabitacionTableBody');
        bodyTabla.innerHTML = '';
        hab.forEach(function (p) {
            const tr = document.createElement('tr');

            const fila = ['nroHabitacion', 'tipoHab','estadoHab'];
            fila.forEach(function (info) {
                const td = document.createElement('td');
                td.textContent = p[info];
                tr.appendChild(td);
            });
            bodyTabla.appendChild(tr);
        });

    }
    window.addEventListener('storage', function (e) {
        if (e.key === 'clients') {
            mostrar_habitaciones();
        }
    });
    mostrar_habitaciones();
});