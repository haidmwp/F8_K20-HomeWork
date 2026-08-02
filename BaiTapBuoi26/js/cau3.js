const carousel = document.getElementById('carousel');
const track = document.getElementById('track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counterDisplay = document.getElementById('counterDisplay');
const dotsContainer = document.getElementById('dotsContainer');

const originalSlides = Array.from(track.children);
const totalOriginals = originalSlides.length;

const firstClone = originalSlides[0].cloneNode(true);
const lastClone = originalSlides[totalOriginals - 1].cloneNode(true);

track.insertBefore(lastClone, originalSlides[0]);
track.appendChild(firstClone);

originalSlides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('data-index', index);
    dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dot');

let currentIndex = 1;
let isTransitioning = false;
let autoPlayInterval = null;

updateSlidePosition(false);

function updateSlidePosition(hasAnimation = true) {
    if (hasAnimation) {
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
        track.style.transition = 'none';
    }

    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    updateUI();
}

function updateUI() {
    let displayIndex = currentIndex;
    
    if (currentIndex === 0) {
        displayIndex = totalOriginals;
    } else if (currentIndex === totalOriginals + 1) {
        displayIndex = 1;
    }
    
    counterDisplay.textContent = `${displayIndex} / ${totalOriginals}`;
    
    dots.forEach((dot, index) => {
        if (index === (displayIndex - 1)) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function moveNext() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateSlidePosition(true);
}

function movePrev() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateSlidePosition(true);
}

track.addEventListener('transitionend', () => {
    isTransitioning = false;
    
    if (currentIndex === totalOriginals + 1) {
        currentIndex = 1;
        updateSlidePosition(false);
    } else if (currentIndex === 0) {
        currentIndex = totalOriginals;
        updateSlidePosition(false);
    }
});

nextBtn.addEventListener('click', () => {
    moveNext();
    resetAutoPlay(); // Reset bộ đếm 3 giây từ đầu khi có tương tác thủ công
});

prevBtn.addEventListener('click', () => {
    movePrev();
    resetAutoPlay();
});

dotsContainer.addEventListener('click', (e) => {
    if (isTransitioning || !e.target.classList.contains('dot')) return;
    
    const targetIndex = parseInt(e.target.getAttribute('data-index')) + 1;
    if (currentIndex !== targetIndex) {
        isTransitioning = true;
        currentIndex = targetIndex;
        updateSlidePosition(true);
        resetAutoPlay();
    }
});

function startAutoPlay() {
    if (!autoPlayInterval) {
        autoPlayInterval = setInterval(moveNext, 3000);
    }
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

startAutoPlay();

function handleKeyDown(e) {
    if (e.key === 'ArrowRight') {
        moveNext();
        resetAutoPlay();
    } else if (e.key === 'ArrowLeft') {
        movePrev();
        resetAutoPlay();
    }
}

carousel.addEventListener('focus', () => {
    window.addEventListener('keydown', handleKeyDown);
});

carousel.addEventListener('blur', () => {
    window.removeEventListener('keydown', handleKeyDown);
});
