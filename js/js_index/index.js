document.addEventListener('DOMContentLoaded', function () {
    function actualizarDashboard(){
        const Habs_guardadas= localStorage.getItem('habs');

        let habs = JSON.parse(Habs_guardadas || '[]');

        const total = habs.length;
        const disponibles = habs.filter(hab => hab.estadoHab === 'Disponible').length;
        const ocupadas = habs.filter(hab => hab.estadoHab === 'Ocupada').length;
        const limpieza = habs.filter(hab => hab.estadoHab === 'Limpieza').length;
        
        document.getElementById('totalHab').textContent = total;
        document.getElementById('disponibleHab').textContent = disponibles;
        document.getElementById('ocupadaHab').textContent = ocupadas;
        document.getElementById('limpiezaHab').textContent = limpieza;

    }
    window.addEventListener('storage', function (e) {
        if (e.key === 'habs') {
            actualizarDashboard();
        }
    });
    actualizarDashboard();

} );