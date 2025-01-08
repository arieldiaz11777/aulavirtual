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
        window.location.href = '/index.html';
    });

    // Función para cargar contenido dinámico
    const contentDiv = document.getElementById('dynamic-content');

    // Función para cargar contenido HTML
    const loadContent = (filePath) => {
        fetch(`../${filePath}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo');
                }
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = `<div class="auto-adjustable-container">${data}</div>`;
                // Aplicar el CSS específico del contenido cargado
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `../${filePath.replace('.html', '/styles.css')}`;
                document.head.appendChild(link);
            })
            .catch(error => {
                contentDiv.innerHTML = `<div class="auto-adjustable-container"><p>Error al cargar el contenido: ${error.message}</p></div>`;
            });
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
};

const form = document.getElementById('formulario');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Crear un objeto FormData con los datos del formulario
  const formData = new FormData(form);

  // Convertir FormData a un objeto JSON
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

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
    alert('Datos enviados con éxito');
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar los datos');
  }
});