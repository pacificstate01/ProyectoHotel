document.addEventListener('DOMContentLoaded', function() {
    //Se captura el usuario que ha ingresado de localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    console.log(loggedInUser);
    //Se muestra en la esquina superior derecha de la pantalla
    if (loggedInUser) {
        document.getElementById('username').textContent = loggedInUser;
        //Apretar la imagen de usuario da la opcion para cerrar sesion y devolver al login
        const logoutLink = document.querySelector('#cerrar');
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('loggedInUser');
            window.location.href = '../admin/login.html'; 
        });
    } else {
        window.location.href = '../admin/login.html'; 
    }
});
