document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validación simple (esto debe ser reemplazado con un sistema de autenticación real)
        if (username === 'admin' && password === 'admin123') {
            sessionStorage.setItem('userRole', 'admin');
            window.location.href = 'index.html'; // Redirigir a la página principal
        } else if (username === 'empleado' && password === 'empleado123') {
            sessionStorage.setItem('userRole', 'empleado');
            window.location.href = 'index.html'; // Redirigir a la página principal
        } else if (username === 'gerente' && password === 'gerente123') {
            sessionStorage.setItem('userRole', 'gerente');
            window.location.href = 'index.html'; // Redirigir a la página principal
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
});
