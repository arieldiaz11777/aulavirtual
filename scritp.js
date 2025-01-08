// Configuración de Firebase (reemplaza con tus credenciales)
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB09CD9sGHfRS_an-XuS-7qN_mVYnPPZwo",
  authDomain: "capacitaciones-virtuales-3e1a8.firebaseapp.com",
  projectId: "capacitaciones-virtuales-3e1a8",
  storageBucket: "capacitaciones-virtuales-3e1a8.firebasestorage.app",
  messagingSenderId: "357265314385",
  appId: "1:357265314385:web:b5af6a4236a1efb6581e70",
  measurementId: "G-EWM90H94WZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Typing effect for welcome message
const welcomeMessage = "Bienvenidos al Aula Virtual";
let index = 0;
const h1Element = document.querySelector('h1');
const signInButton = document.getElementById('sign-in-btn');

function typeEffect() {
  if (index < welcomeMessage.length) {
    h1Element.textContent += welcomeMessage.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  } else {
    signInButton.style.display = 'block'; // Show button after typing
  }
}

document.addEventListener('DOMContentLoaded', typeEffect);

// Función para iniciar sesión con Google
const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      // El usuario se autenticó correctamente
      const user = result.user;
      console.log("Usuario autenticado:", user);
      // Guardar información del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(user));
      // Redirigir al usuario a aula/index.html
      window.location.href = 'profesores/index.html';
    })
    .catch((error) => {
      // Manejo de errores
      console.error("Error al iniciar sesión:", error);
    });
};

// Escucha el clic en el botón de inicio de sesión
signInButton.addEventListener('click', signInWithGoogle);