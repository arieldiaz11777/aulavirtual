document.getElementById('materialForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        curso: document.getElementById('curso').value,
        numeroClase: document.getElementById('numeroClase').value,
        video: document.getElementById('video').value,
        materiales: document.getElementById('materiales').value,
        fechaClase: document.getElementById('fechaClase').value,
        email: document.getElementById('email').value,
    };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyLvsMUTRK40cXBWfU_856cMIpOhLsCfLdBIjwzkiA3QBGtEBqTIX2-BZPTc4DUdnGW/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert('Datos enviados correctamente');
        } else {
            alert('Error al enviar los datos');
        }
    } catch (error) {
        alert('Hubo un error: ' + error);
    }
});
