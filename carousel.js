class CarouselManager {
    constructor() {
        this.currentIndex = 0;
        this.images = [
            'image/carousel/1.jpg',
            'image/carousel/2.jpg',
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
        this.modalCurrentIndex = 0;
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
        this.createModal();
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
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', () => {
                this.openModal(index);
            });
            
            img.onerror = () => {
                console.warn(`Erro ao carregar imagem: ${imageSrc}`);
                slide.style.display = 'none';
            };
            img.loading = 'lazy';
            
            slide.appendChild(img);
            track.appendChild(slide);
        });
    }

    createModal() {
        const existingModal = document.getElementById('carousel-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'carousel-modal';
        modal.className = 'carousel-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" aria-label="Fechar">×</button>
                    <button class="modal-prev" aria-label="Imagem anterior">‹</button>
                    <div class="modal-image-container">
                        <img src="" alt="" class="modal-image">
                    </div>
                    <button class="modal-next" aria-label="Próxima imagem">›</button>
                    <div class="modal-counter">1 / ${this.images.length}</div>
                    <div class="modal-indicators"></div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModalEvents();
    }

    setupModalEvents() {
        const modal = document.getElementById('carousel-modal');
        const overlay = modal.querySelector('.modal-overlay');
        const closeBtn = modal.querySelector('.modal-close');
        const prevBtn = modal.querySelector('.modal-prev');
        const nextBtn = modal.querySelector('.modal-next');

        closeBtn.addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeModal();
        });

        prevBtn.addEventListener('click', () => this.modalPrevImage());
        nextBtn.addEventListener('click', () => this.modalNextImage());

        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    this.modalPrevImage();
                    break;
                case 'ArrowRight':
                    this.modalNextImage();
                    break;
            }
        });
        this.setupModalTouchEvents();
    }

    setupModalTouchEvents() {
        const modal = document.getElementById('carousel-modal');
        const imageContainer = modal.querySelector('.modal-image-container');
        let startX = 0;
        let endX = 0;

        imageContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        imageContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const difference = startX - endX;

            if (Math.abs(difference) > 50) {
                if (difference > 0) {
                    this.modalNextImage();
                } else {
                    this.modalPrevImage();
                }
            }
        });
    }

    openModal(index) {
        this.modalCurrentIndex = index;
        const modal = document.getElementById('carousel-modal');
        const img = modal.querySelector('.modal-image');
        
        this.stopAutoSlide();
        
        img.src = this.images[index];
        img.alt = `Imagem ${index + 1} do carrossel`;
        this.updateModalCounter();
        this.createModalIndicators();
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('carousel-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => this.startAutoSlide(), 1000);
    }

    modalNextImage() {
        this.modalCurrentIndex = (this.modalCurrentIndex + 1) % this.images.length;
        this.updateModalImage();
    }

    modalPrevImage() {
        this.modalCurrentIndex = (this.modalCurrentIndex - 1 + this.images.length) % this.images.length;
        this.updateModalImage();
    }

    updateModalImage() {
        const modal = document.getElementById('carousel-modal');
        const img = modal.querySelector('.modal-image');
        const indicators = modal.querySelectorAll('.modal-indicator');
        
        img.src = this.images[this.modalCurrentIndex];
        img.alt = `Imagem ${this.modalCurrentIndex + 1} do carrossel`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.modalCurrentIndex);
        });
        
        this.updateModalCounter();
    }

    updateModalCounter() {
        const modal = document.getElementById('carousel-modal');
        const counter = modal.querySelector('.modal-counter');
        counter.textContent = `${this.modalCurrentIndex + 1} / ${this.images.length}`;
    }

    createModalIndicators() {
        const modal = document.getElementById('carousel-modal');
        const container = modal.querySelector('.modal-indicators');
        container.innerHTML = '';
        
        this.images.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `modal-indicator ${index === this.modalCurrentIndex ? 'active' : ''}`;
            indicator.addEventListener('click', () => {
                this.modalCurrentIndex = index;
                this.updateModalImage();
            });
            container.appendChild(indicator);
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
                setTimeout(() => this.startAutoSlide(), 3000);
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