let currentIndex = 0;
let slides = Array.from(document.querySelectorAll('.slide'));
const totalSlides = slides.length;
let timeoutId; // Variable para almacenar el timeout
let timerId; // Variable para almacenar el temporizador

// Función para mezclar las diapositivas
function shuffleSlides(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    // Reorganizar diapositivas en el contenedor
    const container = document.querySelector('.slideshow-container');
    array.forEach(slide => container.appendChild(slide));
}

// Función para mostrar el temporizador
function startTimer(duration) {
    let timeLeft = duration;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = timeLeft; // Establece el tiempo inicial

    timerId = setInterval(() => {
        timeLeft -= 1;
        timerDisplay.textContent = timeLeft; // Actualiza el temporizador

        // Cuando el tiempo se acaba
        if (timeLeft <= 0) {
            clearInterval(timerId); // Detener el temporizador
            timerDisplay.textContent = "¡Tiempo!";
            // Mostramos el nombre del actor después del tiempo sin avanzar la diapositiva
            slides[currentIndex].classList.add('active'); // Mostrar el nombre del actor
        }
    }, 1000); // Actualiza cada segundo
}

// Función para mostrar una diapositiva
function showSlide(index) {
    // Ocultar la diapositiva actual
    slides[currentIndex].style.display = 'none';
    slides[currentIndex].classList.remove('active'); // Ocultar el nombre del actor

    // Cambiar al nuevo índice
    currentIndex = index;

    // Mostrar la nueva diapositiva
    slides[currentIndex].style.display = 'block';
    clearTimeout(timeoutId);
    clearInterval(timerId); // Detener el temporizador anterior
    startTimer(7); // Inicia el temporizador de 7 segundos

    // No avanzar a la siguiente diapositiva automáticamente
}

// Mezclar las diapositivas al cargar la página
shuffleSlides(slides);

// Mostrar la primera diapositiva inicialmente
showSlide(0);

// Función para mostrar la siguiente diapositiva
function nextSlide() {
    const button = document.getElementById('nextButton');
    button.disabled = true; // Deshabilitar el botón temporalmente

    setTimeout(() => {
        button.disabled = false; // Rehabilitar el botón después de 500ms
    }, 500);

    let nextIndex = (currentIndex + 1) % totalSlides;
    showSlide(nextIndex);
}
