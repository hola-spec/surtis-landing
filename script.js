// Funcionalidad del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const promoForm = document.getElementById('promocionesForm');
    const successMessage = document.getElementById('successMessage');

    // Formulario principal de contacto
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const compro = document.querySelector('input[name="compro"]:checked').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;

        // IMPORTANTE: Reemplaza 'TU_URL_DE_APPS_SCRIPT' con la URL que obtuviste de Google Apps Script
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzSOwFRteq6XdjYF8APtxpreGReAvdVb-frHUyXkizbu6UjL1vJ1yRCotHj-QyK7fbvbw/exec';

        console.log('Enviando datos...', {nombre, compro, email, telefono});

        // Enviar datos a Google Sheets usando un formulario oculto
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('compro', compro);
        formData.append('email', email);
        formData.append('telefono', telefono);

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })
        .then(() => {
            console.log('✅ Datos enviados exitosamente a Google Sheets');
            successMessage.style.display = 'block';
            form.reset();
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 5000);
        })
        .catch((error) => {
            console.error('❌ Error:', error);
            alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
        });
    });

    // Formulario de promociones (simplificado)
    promoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = promoForm.querySelector('input[type="email"]').value;

        console.log('Email para promociones:', email);
        alert('¡Gracias por suscribirte! Recibirás nuestras promociones especiales.');
        promoForm.reset();
    });

    // Menú móvil
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
        });
    });
}

// Pausar animación del slider cuando el mouse está sobre él
    const marcasSliderWrapper = document.querySelector('.marcas-slider-wrapper');
    const marcasSlider = document.querySelector('.marcas-slider');
    
    if (marcasSliderWrapper && marcasSlider) {
        marcasSliderWrapper.addEventListener('mouseenter', function() {
            marcasSlider.style.animationPlayState = 'paused';
        });
        
        marcasSliderWrapper.addEventListener('mouseleave', function() {
            marcasSlider.style.animationPlayState = 'running';
        });
    }

    // Animación suave al hacer scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = 150;

            if (sectionTop < window.innerHeight - sectionVisible) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
});

// Funciones para el carrusel de imágenes
let currentSlideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.tienda-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function currentSlide(index) {
    showSlide(index - 1);
}

// Auto-play del carrusel
setInterval(function() {
    changeSlide(1);
}, 5000); // Cambia de slide cada 5 segundos
