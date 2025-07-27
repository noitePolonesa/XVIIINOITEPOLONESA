class CarouselManager {
    constructor() {
        this.currentIndex = 0;
        this.images = [
            'image/carousel/1.jpg',
            'image/carousel/2.png',
            'image/carousel/3.jpg',
            'image/carousel/4.jpg',
            'image/carousel/5.jpg',
            'image/carousel/6.jpg',
            'image/carousel/7.jpg',
            'image/carousel/8.jpg',
            'image/carousel/9.jpg',
            'image/carousel/10.jpg',
            'image/carousel/11.jpg',
            'image/carousel/12.jpg',
            'image/carousel/13.jpg',
            'image/carousel/14.jpg',
            'image/carousel/15.jpg',
        ];
        this.autoSlideInterval = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupCarousel());
        } else {
            this.setupCarousel();
        }
    }

    setupCarousel() {
        this.createCarouselImages();
        this.createIndicators();
        this.createCounter();
        this.setupEventListeners();
        this.startAutoSlide();
    }

    createCarouselImages() {
        const track = document.querySelector('.carousel-track');
        if (!track) return;

        this.images.forEach((imageSrc, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `Imagem ${index + 1} do carrossel`;
            img.className = 'carousel-image';
            
            img.onerror = () => {
                console.warn(`Erro ao carregar imagem: ${imageSrc}`);
                slide.style.display = 'none';
            };
            img.loading = 'lazy';
            
            slide.appendChild(img);
            track.appendChild(slide);
        });
    }

    createIndicators() {
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        if (!indicatorsContainer) return;

        this.images.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('data-index', index);
            indicator.setAttribute('aria-label', `Ir para imagem ${index + 1}`);
            
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.stopAutoSlide();
                setTimeout(() => this.startAutoSlide(), 3000); // Reinicia após 3s
            });
            
            indicatorsContainer.appendChild(indicator);
        });
    }

    createCounter() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        const counter = document.createElement('div');
        counter.className = 'carousel-counter';
        counter.textContent = `1 / ${this.images.length}`;
        
        carousel.appendChild(counter);
        this.counterElement = counter;
    }

    updateCounter() {
        if (this.counterElement) {
            this.counterElement.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        }
    }

    setupEventListeners() {
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        const carousel = document.querySelector('.carousel');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousSlide();
                this.stopAutoSlide();
                setTimeout(() => this.startAutoSlide(), 5000);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.stopAutoSlide();
                setTimeout(() => this.startAutoSlide(), 5000);
            });
        }

        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });

            carousel.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        this.setupTouchEvents();
    }

    setupTouchEvents() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const difference = startX - endX;

            if (Math.abs(difference) > 50) { 
                if (difference > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
                this.stopAutoSlide();
                setTimeout(() => this.startAutoSlide(), 5000);
            }
        });
    }

    goToSlide(index) {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.carousel-indicator');
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        this.currentIndex = index;
        this.updateCounter();
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.goToSlide(prevIndex);
    }

    startAutoSlide() {
        this.stopAutoSlide(); 
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 3000); 
        this.updateCounter();
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

new CarouselManager();