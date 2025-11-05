// ========================================
// JQUERY PLUGINS & ENHANCEMENTS
// ========================================

$(document).ready(function() {
    console.log('jQuery is loaded');
    
    // ========================================
    // SERVICE CARD HOVER EFFECTS
    // ========================================
    
    $('.service-card').hover(
        function() {
            $(this).stop().animate({
                paddingTop: '10px'
            }, 200);
            $(this).find('h3').stop().css('color', '#ff6b35');
        },
        function() {
            $(this).stop().animate({
                paddingTop: '0px'
            }, 200);
            $(this).find('h3').stop().css('color', '#1a3a52');
        }
    );
    
    // ========================================
    // PARALLAX EFFECT ON HERO
    // ========================================
    
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        $('.hero-image').css('background-position', '50% ' + (scrolled * 0.5) + 'px');
    });
    
    // ========================================
    // COUNT ANIMATION FOR FACTS
    // ========================================
    
    function animateCounters() {
        $('.fact-item').each(function() {
            var $element = $(this).find('h3');
            var text = $element.text();
            var match = text.match(/\d+/);
            
            if (match) {
                var number = parseInt(match[0]);
                
                $({count: 0}).animate({count: number}, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        var suffix = text.includes('+') ? '+' : '';
                        $element.text(Math.floor(this.count) + suffix);
                    }
                });
            }
        });
    }
    
    // Trigger animation when facts section comes into view
    $(window).on('scroll', function() {
        if ($('.quick-facts').length && !$('.quick-facts').data('animated')) {
            if ($(window).scrollTop() + $(window).height() >= $('.quick-facts').offset().top) {
                animateCounters();
                $('.quick-facts').data('animated', true);
            }
        }
    });
    
    // ========================================
    // BUTTON HOVER WAVE EFFECT
    // ========================================
    
    $('.btn').mouseenter(function(e) {
        var $button = $(this);
        var x = e.offsetX || e.pageX - $(this).offset().left;
        var y = e.offsetY || e.pageY - $(this).offset().top;
        
        var ripple = $('<span class="ripple"></span>');
        ripple.css({
            left: x,
            top: y,
            position: 'absolute',
            width: '20px',
            height: '20px',
            background: 'rgba(255,255,255,0.5)',
            borderRadius: '50%',
            animation: 'ripple-animation 0.6s ease-out'
        });
        
        $button.css('position', 'relative').append(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });
    
    // ========================================
    // SCROLL INDICATOR CLICK
    // ========================================
    
    $('.scroll-indicator').click(function() {
        $('html, body').animate({
            scrollTop: $('.quick-facts').offset().top - 80
        }, 1000);
    });
    
    // ========================================
    // TEAM/TESTIMONIAL CARD FLIP EFFECT
    // ========================================
    
    $('.testimonial-card').hover(
        function() {
            $(this).find('.author-image').stop().css('border-width', '5px');
        },
        function() {
            $(this).find('.author-image').stop().css('border-width', '3px');
        }
    );
    
    // ========================================
    // FORM FIELD FOCUS EFFECTS
    // ========================================
    
    $('input, textarea, select').on('focus', function() {
        $(this).parent().addClass('input-focused');
        $(this).css('box-shadow', '0 0 10px rgba(255, 107, 53, 0.3)');
    }).on('blur', function() {
        $(this).parent().removeClass('input-focused');
        $(this).css('box-shadow', 'none');
    });
    
    // ========================================
    // STICKY HEADER ON SCROLL
    // ========================================
    
    var headerHeight = $('.header').height();
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 0) {
            $('.header').addClass('scrolled').css('box-shadow', '0 4px 12px rgba(0,0,0,0.15)');
        } else {
            $('.header').removeClass('scrolled').css('box-shadow', '0 4px 8px rgba(0,0,0,0.1)');
        }
    });
    
    // ========================================
    // IMAGE LAZY LOADING
    // ========================================
    
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});
