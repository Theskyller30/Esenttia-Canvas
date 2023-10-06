const loginForm = document.querySelector('form'); // Seleccione el formulario en su lugar
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Verificar si el correo y la contraseña coinciden con los valores permitidos
    if (email === 'sinergia@serpomar.com' && password === '123456') {
        // Usuario válido, muestra un mensaje de bienvenida
        console.log('Inicio de sesión exitoso');
        alert('Bienvenido Sinergia');
        localStorage.setItem('login_success', JSON.stringify({ email: email }));
        window.location.href = 'index.html';
    } else {
        // Usuario no válido
        alert('Usuario y/o contraseña incorrectos!');
    }
});