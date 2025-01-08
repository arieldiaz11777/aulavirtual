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


        const result = await response.json();

        // Validamos la respuesta
        if (result.status === 'success') {
            alert('Datos enviados correctamente a Google Sheets');
            form.reset(); // Reseteamos el formulario
        } else {
            alert('Error al enviar los datos');
        }
    } catch (error) {
        alert('Hubo un error: ' + error.message);
    }
});
