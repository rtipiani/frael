document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el elemento del menú está presente
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('main-navbar');
    
    // Solo ejecutar el código del menú si el botón está presente
    if (menuButton && mobileMenu && navbar) {
        // Toggle mobile menu visibility
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Hide mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });

        // Configurar el slider solo si el contenedor de slides está presente
        const slides = document.querySelectorAll('#slider > div');
        const totalSlides = slides.length;

        if (totalSlides > 0) { // Solo ejecutar si hay slides
            let currentIndex = 0;
            let autoSlide;

            // Update slider position
            function updateSliderPosition() {
                const slider = document.getElementById('slider');
                if (slider) { // Verificar si el slider está presente
                    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                }
            }

            // Move to the next slide
            function nextSlide() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSliderPosition();
            }

            // Move to the previous slide
            function prevSlide() {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSliderPosition();
            }

            // Handle slide navigation and auto slide
            function setupSlideNavigation() {
                autoSlide = setInterval(nextSlide, 5000);

                const nextButton = document.getElementById('nextButton');
                const prevButton = document.getElementById('prevButton');

                if (nextButton) {
                    nextButton.addEventListener('click', () => {
                        clearInterval(autoSlide);
                        nextSlide();
                        autoSlide = setInterval(nextSlide, 5000);
                    });
                }

                if (prevButton) {
                    prevButton.addEventListener('click', () => {
                        clearInterval(autoSlide);
                        prevSlide();
                        autoSlide = setInterval(nextSlide, 5000);
                    });
                }
            }

            setupSlideNavigation();
        }
    }

    // Handle navbar scroll behavior
    if (navbar) {
        function handleScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('fixed', 'top-0', 'w-full', 'bg-white', 'shadow-md');
            } else {
                navbar.classList.remove('fixed', 'top-0', 'w-full', 'bg-white', 'shadow-md');
            }
        }

        window.addEventListener('scroll', handleScroll);
    }
});
