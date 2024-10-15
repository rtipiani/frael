document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById("client-slider");

    // Verifica si el slider existe
    if (!slider) {
        return; // Sal del script si no hay slider
    }

    let currentIndex = 0;
    const totalSlides = slider.children.length; // Total de logos

    // Determina cuántos logos se deben mostrar según el tamaño de la pantalla
    function getSlidesVisible() {
        if (window.innerWidth < 768) {
            return 1; // sm: 1 logo
        } else if (window.innerWidth < 1024) {
            return 3; // md: 3 logos
        } else {
            return 4; // lg: 4 logos
        }
    }

    // Actualiza la posición del slider
    function updateSliderPosition() {
        const slidesVisible = getSlidesVisible();
        const offset = -(currentIndex * (100 / slidesVisible));
        slider.style.transform = `translateX(${offset}%)`;
    }

    // Muestra el siguiente logo
    function showNextSlide() {
        const slidesVisible = getSlidesVisible();
        currentIndex++;
        if (currentIndex > totalSlides - slidesVisible) {
            currentIndex = 0; // Regresa al principio
        }
        updateSliderPosition();
    }

    // Muestra el logo anterior
    function showPrevSlide() {
        const slidesVisible = getSlidesVisible();
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalSlides - slidesVisible; // Regresa al final
        }
        updateSliderPosition();
    }

    // Eventos de los botones de navegación
    document.getElementById("next").addEventListener("click", showNextSlide);
    document.getElementById("prev").addEventListener("click", showPrevSlide);

    // Actualiza el slider al cambiar el tamaño de la ventana
    window.addEventListener('resize', updateSliderPosition);

    // Auto-slide (opcional)
    function startAutoSlide() {
        setInterval(showNextSlide, 3000); // Cambia automáticamente cada 3 segundos
    }

    startAutoSlide(); // Inicia el auto-slide
});
