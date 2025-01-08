window.onload = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Verificar si hay un usuario en sesión
    if (user) {
        document.getElementById('profile-pic').src = user.photoURL;
        document.getElementById('user-name').textContent = `${user.displayName}`;
        document.getElementById('user-email').textContent = user.email;
    } else {
        window.location.href = '../index.html';
    }

    // Botón de cierre de sesión
    document.getElementById('logout-button').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = '/aulavirtual/index.html';
    });

    // Función para cargar contenido dinámico
    const contentDiv = document.getElementById('dynamic-content');

    // Función para cargar contenido HTML
    const loadContent = async (filePath) => {
        try {
            const response = await fetch(`../${filePath}`);
            if (!response.ok) {
                throw new Error('Error al cargar el archivo');
            }
            const data = await response.text();
            contentDiv.innerHTML = `<div class="auto-adjustable-container">${data}</div>`;
            // Aplicar el CSS específico del contenido cargado
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `../${filePath.replace('.html', '/styles.css')}`;
            document.head.appendChild(link);

            // Cargar el script específico del contenido cargado
            if (filePath.includes('materiales/index.html')) {
                const script = document.createElement('script');
                script.src = `../materiales/script.js`;
                document.body.appendChild(script);
            }
        } catch (error) {
            contentDiv.innerHTML = `<div class="auto-adjustable-container"><p>Error al cargar el contenido: ${error.message}</p></div>`;
        }
    };

    // No mostrar contenido inicial
    contentDiv.innerHTML = '';

    // Cargar contenido dinámico al presionar los botones del encabezado
    document.querySelectorAll('.header-buttons a').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const filePath = event.target.getAttribute('data-file');
            loadContent(filePath);
        });
    });

    // Verificar si el formulario existe antes de agregar el evento
    const form = document.getElementById('formulario');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Crear un objeto FormData con los datos del formulario
            const formData = new FormData(form);

            // Convertir FormData a un objeto JSON
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Contenedor para mostrar mensajes
            const messageContainer = document.createElement('div');
            messageContainer.id = 'message-container';
            form.appendChild(messageContainer);

            try {
                // Enviar los datos al script de Google Apps
                const response = await fetch('https://script.google.com/macros/s/AKfycbyv6LvoNr8sQJwbSU2zGoZRb8Cikj0nCnnQvI0U1K5Vry-_Bduw4IEVapN3lP7VLWdd/exec', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('Success:', result);
                messageContainer.textContent = 'Datos enviados con éxito';
                messageContainer.style.color = 'green';
                form.reset(); // Reseteamos el formulario
            } catch (error) {
                console.error('Error:', error);
                messageContainer.textContent = 'Error al enviar los datos';
                messageContainer.style.color = 'red';
            }
        });
    }
};
