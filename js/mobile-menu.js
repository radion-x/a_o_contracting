// ========================================
// MOBILE MENU ENHANCEMENTS
// ========================================

class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobile-toggle');
        this.menu = document.getElementById('nav-menu');
        this.links = document.querySelectorAll('.nav-link');
        this.dropdowns = document.querySelectorAll('.dropdown');
        
        console.log('Mobile Menu Debug:', {
            toggle: this.toggle,
            menu: this.menu,
            linksCount: this.links.length,
            dropdownsCount: this.dropdowns.length
        });
        
        if (this.toggle && this.menu) {
            this.init();
            console.log('✅ Mobile menu initialized successfully');
        } else {
            console.error('❌ Mobile menu elements not found!');
        }
    }
    
    init() {
        // Toggle menu - add both click and touchstart for mobile
        this.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });
        
        // Also add touchstart for better mobile support
        this.toggle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.toggleMenu();
        }, { passive: false });
        
        // Close menu on link click
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                if (!link.closest('.dropdown')) {
                    this.closeMenu();
                }
            });
        });
        
        // Handle dropdowns
        this.handleDropdowns();
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        console.log('🔄 Toggle menu clicked');
        this.menu.classList.toggle('active');
        this.toggle.classList.toggle('active');
        
        if (this.menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            console.log('📱 Menu opened');
        } else {
            document.body.style.overflow = '';
            console.log('📱 Menu closed');
        }
    }
    
    closeMenu() {
        this.menu.classList.remove('active');
        this.toggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    handleDropdowns() {
        this.dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM Content Loaded - Initializing Mobile Menu');
    new MobileMenu();
});

// Fallback: Also try to initialize after a short delay if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    console.log('⏳ Document still loading...');
} else {
    console.log('✅ Document already loaded, initializing immediately');
    new MobileMenu();
}
