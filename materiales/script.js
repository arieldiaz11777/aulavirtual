// Capturamos el formulario
const form = document.getElementById('materialForm');

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

    // Contenedor para mostrar mensajes
    let messageContainer = document.getElementById('message-container');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'message-container';
        form.appendChild(messageContainer);
    }

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

        // Asumimos que la solicitud fue exitosa ya que no podemos verificar la respuesta con no-cors
        messageContainer.textContent = 'Datos enviados correctamente a Google Sheets';
        messageContainer.style.color = 'green';
        form.reset(); // Reseteamos el formulario
    } catch (error) {
        messageContainer.textContent = 'Hubo un error: ' + error.message;
        messageContainer.style.color = 'red';
    }
});
