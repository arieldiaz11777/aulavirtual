document.getElementById('materialForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener los datos del formulario
    const data = {
        curso: document.getElementById('curso').value,
        numeroClase: document.getElementById('numeroClase').value,
        video: document.getElementById('video').value,
        materiales: document.getElementById('materiales').value,
        fechaClase: document.getElementById('fechaClase').value,
        email: document.getElementById('email').value,
    };

    try {
        // Enviar los datos al Web App del App Script
        const response = await fetch('https://script.google.com/macros/s/AKfycbyKs1TtpknpMDzDhv_K050uOL6gXZyrotyvtobqIhJfHzixJ1HvtvZuyMCIvo3Hq1ra/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert('Datos enviados correctamente a Google Sheets');
        } else {
            alert('Error al enviar los datos');
        }
    } catch (error) {
        alert('Hubo un error: ' + error);
    }
});
