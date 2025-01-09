// Capturamos el formulario y el contenedor de mensajes
const form = document.getElementById('materialForm');
const messageContainer = document.getElementById('formMessage');

// Obtener el usuario desde localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Rellenar automáticamente el email si el usuario está logueado
if (user && user.email) {
    document.getElementById('email').value = user.email;
} else {
    // Redireccionar al inicio de sesión si no hay usuario logueado
    window.location.href = '../index.html';
}


// Agregamos un evento al enviar el formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto

    // Capturamos los valores del formulario
    const data = {
        curso: document.getElementById('curso').value,
        numeroClase: document.getElementById('numeroClase').value,
        video: document.getElementById('video').value,
        materiales: document.getElementById('materiales').value,
        fechaClase: document.getElementById('fechaClase').value,
        email: document.getElementById('email').value,
    };

    try {
        // Hacemos la solicitud POST a tu Google Apps Script
        const response = await fetch('https://script.google.com/macros/s/AKfycbzdUhvxrZCq8_JlbzpTcZZkUepkLNRSPHDvpEh85NrcWXMdQKFnvrT0Dsykx3mOhvTo/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'no-cors' // Solución temporal para evitar CORS
        });

        // Mostramos el mensaje de éxito
        showMessage('Datos enviados correctamente a Google Sheets', 'success');
        form.reset(); // Reseteamos el formulario
    } catch (error) {
        // Mostramos el mensaje de error
        showMessage('Hubo un error: ' + error.message, 'error');
    }
});

// Función para mostrar mensajes
function showMessage(message, type) {
    messageContainer.textContent = message;
    messageContainer.className = `form-message ${type}`;
    messageContainer.style.display = 'block';
}
