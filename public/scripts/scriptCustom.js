document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el elemento del menú está presente
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('main-navbar');

    // Solo ejecutar el código del menú si el botón y el menú móvil están presentes
    if (menuButton && mobileMenu) {
        // Toggle mobile menu visibility al hacer clic en el botón de menú
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Ocultar el menú móvil cuando se hace clic en un enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // Slider: Solo ejecuta si existen slides
    const slides = document.querySelectorAll('#slider > div');
    const totalSlides = slides.length;

    if (totalSlides > 0) {
        let currentIndex = 0;
        let autoSlide;

        // Actualiza la posición del slider
        function updateSliderPosition() {
            const slider = document.getElementById('slider');
            if (slider) {
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        }

        // Mover al siguiente slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSliderPosition();
        }

        // Mover al slide anterior
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSliderPosition();
        }

        // Configura la navegación del slider y el auto slide
        function setupSlideNavigation() {
            // Iniciar auto-slide cada 5 segundos
            autoSlide = setInterval(nextSlide, 5000);

            const nextButton = document.getElementById('nextButton');
            const prevButton = document.getElementById('prevButton');

            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    clearInterval(autoSlide); // Detener el auto-slide temporalmente
                    nextSlide(); // Mover al siguiente slide
                    autoSlide = setInterval(nextSlide, 5000); // Reiniciar el auto-slide
                });
            }

            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    clearInterval(autoSlide); // Detener el auto-slide temporalmente
                    prevSlide(); // Mover al slide anterior
                    autoSlide = setInterval(nextSlide, 5000); // Reiniciar el auto-slide
                });
            }
        }

        setupSlideNavigation(); // Ejecutar la función de configuración del slider
    }

    // Manejo del comportamiento del navbar en el scroll
    if (navbar) {
        function handleScroll() {
            // Solo agregar clases si el scroll es mayor a 50px
            if (window.scrollY > 50) {
                navbar.classList.add('fixed', 'top-0', 'w-full', 'bg-white', 'shadow-md');
                document.body.style.marginTop = `${navbar.offsetHeight}px`; // Evitar superposición de contenido
            } else {
                navbar.classList.remove('fixed', 'top-0', 'w-full', 'bg-white', 'shadow-md');
                document.body.style.marginTop = '0'; // Restablecer margen
            }
        }

        // Agregar el evento de scroll para manejar el comportamiento del navbar
        window.addEventListener('scroll', handleScroll);
    }
});
