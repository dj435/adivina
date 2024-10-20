let currentIndex = 0;
let slides = Array.from(document.querySelectorAll('.slide'));
const totalSlides = slides.length;
let timeoutId; // Variable para almacenar el timeout
let timerId; // Variable para almacenar el temporizador

// Funci�n para mezclar las diapositivas
function shuffleSlides(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Funci�n para mostrar el temporizador
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
            timerDisplay.textContent = "Tiempo!";
            // Aqu� puedes decidir qu� hacer cuando se acabe el tiempo
        }
    }, 1000); // Actualiza cada segundo
}

// Funci�n para mostrar una diapositiva
function showSlide(index) {
    slides[currentIndex].style.display = 'none';
    slides[currentIndex].classList.remove('active');

    currentIndex = index;

    slides[currentIndex].style.display = 'block';
    clearTimeout(timeoutId);
    clearInterval(timerId); // Detener el temporizador anterior
    startTimer(7); // Inicia el temporizador de 7 segundos

    timeoutId = setTimeout(() => {
        slides[currentIndex].classList.add('active');
    }, 7000); // 7 segundos para mostrar el nombre
}

// Mezclar las diapositivas al cargar la p�gina
shuffleSlides(slides);

// Mostrar la primera diapositiva inicialmente
showSlide(0);

// Funci�n para mostrar la siguiente diapositiva
function nextSlide() {
    let nextIndex = (currentIndex + 1) % totalSlides;
    showSlide(nextIndex);
}