document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.interns-slider');
    const sliderCards = document.querySelectorAll('.intern-card');
    const nextButton = document.getElementById('next');

    let currentIndex = 0;

    function updateSlider() {
        const offset = -currentIndex * (sliderCards[0].offsetWidth + 20);
        slider.style.transform = `translateX(${offset}px)`;
    }

    nextButton.addEventListener('click', function() {
        if (currentIndex < sliderCards.length - 4) {  // Assuming 4 cards per view
            currentIndex++;
            updateSlider();
        } else {
            currentIndex = 0;  // Reset to first card
            updateSlider();
        }
    });
});
