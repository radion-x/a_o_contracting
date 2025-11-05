// ========================================
// SCROLL-TRIGGERED ANIMATIONS
// ========================================

class ScrollAnimationManager {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                this.observerOptions
            );
            
            this.elements.forEach(element => {
                this.observer.observe(element);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            this.animateAllElements();
        }
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateElement(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    animateElement(element) {
        const animation = element.getAttribute('data-aos');
        const duration = element.getAttribute('data-aos-duration') || '1000';
        const delay = element.getAttribute('data-aos-delay') || '0';
        const easing = element.getAttribute('data-aos-easing') || 'ease-out';
        
        element.style.animation = `${animation} ${duration}ms ${easing} ${delay}ms forwards`;
    }
    
    animateAllElements() {
        this.elements.forEach(element => {
            this.animateElement(element);
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimationManager();
});
