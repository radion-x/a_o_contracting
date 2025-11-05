# A & O Contracting Website - Complete Design & Development Instructions
## Modern, Clean, High-Converting Professional Website

---

## TABLE OF CONTENTS
1. Project Overview & Strategy
2. Technical Architecture
3. File Structure
4. HTML Structure & Markup
5. CSS Styling & Responsive Design
6. JavaScript & jQuery Functionality
7. Content Placement & SEO
8. Performance Optimization
9. Conversion Optimization
10. Mobile Responsiveness Details

---

## 1. PROJECT OVERVIEW & STRATEGY

### Design Philosophy
- **Modern & Clean**: Minimalist design with plenty of whitespace
- **Professional**: Conveys trust, expertise, and reliability
- **Conversion-Focused**: Every element guides users toward taking action
- **Mobile-First**: Optimized for smartphone users (majority of traffic)
- **Fast Loading**: Optimized images and minimal code for quick page loads

### Color Scheme (Adjust to your brand):
- **Primary Color**: #1a3a52 (Dark Blue - Trust, Professionalism)
- **Secondary Color**: #ff6b35 (Orange - Energy, Action)
- **Accent Color**: #f7931e (Gold/Orange - Safety, Warning)
- **Background**: #f8f9fa (Off-white - Clean, Professional)
- **Text**: #333333 (Dark Gray - Easy Reading)
- **Success Green**: #27ae60 (Trust, Positive)

### Typography:
- **Headings**: 'Poppins' or 'Montserrat' (Bold, Modern, Sans-serif)
- **Body Text**: 'Open Sans' or 'Roboto' (Clean, Readable, Sans-serif)
- **Accent Text**: 'Lato' (Professional, Modern)

### Target User Actions (Conversion Goals):
1. **Primary**: "Get Free Quote" / "Call Now" (Phone Number)
2. **Secondary**: "Book Consultation" / "Request Estimate"
3. **Tertiary**: Subscribe to newsletter / View portfolio

---

## 2. TECHNICAL ARCHITECTURE

### Technologies Used:
- **HTML5**: Semantic markup structure
- **CSS3**: Responsive design with Flexbox and CSS Grid
- **JavaScript (Vanilla)**: Core functionality
- **jQuery**: DOM manipulation and animations
- **Bootstrap 4/5** (Optional - for faster grid): Or use custom CSS Grid

### Browser Compatibility:
- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Required Libraries & Plugins:
```html
<!-- jQuery (Latest CDN) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Animate.css (for animations) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

<!-- Font Awesome (Icons) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>

<!-- AOS (Animate On Scroll) jQuery Plugin -->
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
<script src="https://unpkg.com/aos@next/dist/aos.umd.js"></script>

<!-- Lightbox (for image galleries) -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js"></script>

<!-- Slick Carousel (for testimonial carousel) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
```

---

## 3. FILE STRUCTURE

```
ao-contracting-website/
│
├── index.html                 (Main homepage)
├── services.html              (Services detailed page)
├── portfolio.html             (Project gallery)
├── about.html                 (About company)
├── contact.html               (Contact form page)
├── quote.html                 (Quote request page)
│
├── css/
│   ├── style.css              (Main stylesheet - 2000+ lines)
│   ├── responsive.css         (Mobile/tablet responsive)
│   ├── animations.css         (Animation keyframes)
│   └── variables.css          (CSS custom properties/variables)
│
├── js/
│   ├── main.js                (Main JavaScript functionality)
│   ├── jquery-plugins.js      (jQuery-based functions)
│   ├── form-validation.js     (Form handling & validation)
│   ├── scroll-animations.js   (Scroll-triggered animations)
│   └── mobile-menu.js         (Mobile navigation)
│
├── images/
│   ├── logo.png
│   ├── hero/                  (Hero section images)
│   ├── services/              (Service category images)
│   ├── portfolio/             (Project photos)
│   ├── team/                  (Team member photos)
│   └── icons/                 (SVG icons)
│
├── fonts/
│   ├── poppins/
│   ├── opensans/
│   └── lato/
│
└── assets/
    └── favicons/
```

---

## 4. HTML STRUCTURE & MARKUP

### 4.1 DOCUMENT HEAD (In all pages)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- META TAGS - CRITICAL FOR SEO & MOBILE -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A & O Contracting - Professional demolition and rubbish removal services across Sydney. Residential, commercial, and industrial demolition specialists.">
    <meta name="keywords" content="demolition Sydney, rubbish removal, house demolition, commercial demolition, waste removal">
    <meta name="author" content="A & O Contracting">
    <meta property="og:title" content="A & O Contracting - Sydney Demolition & Rubbish Removal">
    <meta property="og:description" content="Professional demolition and waste removal services in Sydney">
    <meta property="og:image" content="images/og-image.jpg">
    <meta property="og:url" content="https://aocontracting.com.au">
    <meta name="theme-color" content="#1a3a52">
    <meta name="apple-mobile-web-app-capable" content="yes">
    
    <!-- FAVICON -->
    <link rel="shortcut icon" href="assets/favicons/favicon.ico" type="image/x-icon">
    <link rel="icon" href="assets/favicons/favicon.ico" type="image/x-icon">
    
    <!-- GOOGLE FONTS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Open+Sans:wght@300;400;600;700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- EXTERNAL LIBRARIES -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css">
    
    <!-- CUSTOM STYLESHEETS -->
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/animations.css">
    <link rel="stylesheet" href="css/responsive.css">
    
    <title>A & O Contracting - Sydney Demolition & Rubbish Removal Services</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>
```

### 4.2 NAVIGATION HEADER (Sticky, Responsive)

```html
<!-- HEADER/NAVIGATION - STICKY TOP NAVIGATION -->
<header class="header" id="navbar">
    <nav class="navbar">
        <div class="container">
            <div class="navbar-content">
                
                <!-- LOGO SECTION (Left Side) -->
                <div class="logo-section">
                    <a href="index.html" class="logo">
                        <img src="images/logo.png" alt="A & O Contracting Logo" class="logo-img">
                        <span class="logo-text">A & O Contracting</span>
                    </a>
                </div>
                
                <!-- NAVIGATION MENU (Center) -->
                <nav class="nav-menu" id="nav-menu">
                    <ul class="nav-list">
                        <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
                        <li class="nav-item dropdown">
                            <a href="#" class="nav-link">Services <i class="fas fa-chevron-down"></i></a>
                            <div class="dropdown-menu">
                                <a href="services.html#residential" class="dropdown-item">Residential Demolition</a>
                                <a href="services.html#commercial" class="dropdown-item">Commercial Demolition</a>
                                <a href="services.html#industrial" class="dropdown-item">Industrial Demolition</a>
                                <a href="services.html#rubbish" class="dropdown-item">Rubbish Removal</a>
                            </div>
                        </li>
                        <li class="nav-item"><a href="portfolio.html" class="nav-link">Portfolio</a></li>
                        <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
                        <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
                    </ul>
                </nav>
                
                <!-- CTA BUTTONS (Right Side) -->
                <div class="nav-cta">
                    <a href="tel:+61XXXXXXXXX" class="btn btn-primary-sm">
                        <i class="fas fa-phone"></i> Call Now
                    </a>
                    <a href="quote.html" class="btn btn-secondary-sm">Get Quote</a>
                </div>
                
                <!-- MOBILE MENU TOGGLE (Hidden on Desktop) -->
                <div class="mobile-menu-toggle" id="mobile-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </nav>
</header>
```

### 4.3 HERO SECTION (Above the Fold - Most Important)

```html
<!-- HERO SECTION - THE FIRST IMPRESSION (Most Critical) -->
<section class="hero" id="hero">
    <div class="hero-background">
        <!-- Background video or image slider -->
        <div class="hero-image" style="background-image: url('images/hero/demolition-hero.jpg');">
        </div>
        <!-- Dark overlay for text readability -->
        <div class="hero-overlay"></div>
    </div>
    
    <div class="hero-content">
        <div class="container">
            <div class="hero-text" data-aos="fade-up" data-aos-duration="1000">
                <!-- MAIN HEADLINE - CLEAR VALUE PROPOSITION -->
                <h1 class="hero-title">
                    Professional Demolition & Rubbish Removal in Sydney
                </h1>
                
                <!-- SUBHEADLINE - SUPPORTING MESSAGE -->
                <p class="hero-subtitle">
                    Safe, Efficient, and Cost-Effective Demolition Services for Residential, Commercial, and Industrial Properties
                </p>
                
                <!-- TRUST SIGNALS UNDER HERO -->
                <div class="hero-badges">
                    <div class="badge">
                        <i class="fas fa-certificate"></i>
                        <span>Fully Licensed</span>
                    </div>
                    <div class="badge">
                        <i class="fas fa-shield-alt"></i>
                        <span>Fully Insured</span>
                    </div>
                    <div class="badge">
                        <i class="fas fa-star"></i>
                        <span>5-Star Rated</span>
                    </div>
                </div>
                
                <!-- PRIMARY CTA BUTTONS -->
                <div class="hero-cta">
                    <a href="quote.html" class="btn btn-primary btn-large animate-slide-in-left">
                        Get Free Quote
                    </a>
                    <a href="tel:+61XXXXXXXXX" class="btn btn-secondary btn-large">
                        <i class="fas fa-phone"></i> Call Now
                    </a>
                </div>
                
                <!-- SCROLL INDICATOR -->
                <div class="scroll-indicator">
                    <p>Scroll to explore</p>
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
        </div>
    </div>
</section>
```

### 4.4 QUICK FACTS/STATS SECTION

```html
<!-- QUICK FACTS - BUILDS CREDIBILITY (Below Hero) -->
<section class="quick-facts">
    <div class="container">
        <div class="facts-grid">
            <div class="fact-item" data-aos="fade-up">
                <div class="fact-icon">
                    <i class="fas fa-hard-hat"></i>
                </div>
                <h3>15+ Years</h3>
                <p>Industry Experience</p>
            </div>
            
            <div class="fact-item" data-aos="fade-up" data-aos-delay="100">
                <div class="fact-icon">
                    <i class="fas fa-checkmark-circle"></i>
                </div>
                <h3>500+</h3>
                <p>Projects Completed</p>
            </div>
            
            <div class="fact-item" data-aos="fade-up" data-aos-delay="200">
                <div class="fact-icon">
                    <i class="fas fa-users"></i>
                </div>
                <h3>1000+</h3>
                <p>Satisfied Clients</p>
            </div>
            
            <div class="fact-item" data-aos="fade-up" data-aos-delay="300">
                <div class="fact-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <h3>All Sydney</h3>
                <p>Service Coverage</p>
            </div>
        </div>
    </div>
</section>
```

### 4.5 SERVICES SECTION (Core Offerings)

```html
<!-- SERVICES SECTION - EXPLAIN WHAT YOU DO -->
<section class="services" id="services">
    <div class="container">
        <!-- SECTION HEADER -->
        <div class="section-header" data-aos="fade-up">
            <h2 class="section-title">Our Services</h2>
            <p class="section-subtitle">
                Comprehensive demolition and waste removal solutions for all project types
            </p>
        </div>
        
        <!-- SERVICES GRID (4 columns on desktop, 2 on tablet, 1 on mobile) -->
        <div class="services-grid">
            
            <!-- SERVICE CARD 1: RESIDENTIAL DEMOLITION -->
            <div class="service-card" data-aos="fade-up">
                <div class="service-icon">
                    <i class="fas fa-home"></i>
                </div>
                <h3>Residential Demolition</h3>
                <p>Complete and partial demolition for houses, granny flats, garages, and renovations. Safe removal of residential structures with proper site preparation.</p>
                <ul class="service-list">
                    <li><i class="fas fa-check"></i> Full house demolition</li>
                    <li><i class="fas fa-check"></i> Partial demolition</li>
                    <li><i class="fas fa-check"></i> Interior strip-outs</li>
                    <li><i class="fas fa-check"></i> Garage removal</li>
                </ul>
                <a href="services.html#residential" class="btn btn-outline">Learn More</a>
            </div>
            
            <!-- SERVICE CARD 2: COMMERCIAL DEMOLITION -->
            <div class="service-card" data-aos="fade-up" data-aos-delay="100">
                <div class="service-icon">
                    <i class="fas fa-building"></i>
                </div>
                <h3>Commercial Demolition</h3>
                <p>Professional demolition for offices, retail spaces, warehouses, and multi-story buildings. Specialized techniques for complex commercial structures.</p>
                <ul class="service-list">
                    <li><i class="fas fa-check"></i> Office buildings</li>
                    <li><i class="fas fa-check"></i> Retail spaces</li>
                    <li><i class="fas fa-check"></i> Warehouses</li>
                    <li><i class="fas fa-check"></i> Fit-outs</li>
                </ul>
                <a href="services.html#commercial" class="btn btn-outline">Learn More</a>
            </div>
            
            <!-- SERVICE CARD 3: INDUSTRIAL DEMOLITION -->
            <div class="service-card" data-aos="fade-up" data-aos-delay="200">
                <div class="service-icon">
                    <i class="fas fa-industry"></i>
                </div>
                <h3>Industrial Demolition</h3>
                <p>Complex demolition services for factories, plants, and large facilities. Advanced equipment and expert planning for hazardous material handling.</p>
                <ul class="service-list">
                    <li><i class="fas fa-check"></i> Manufacturing plants</li>
                    <li><i class="fas fa-check"></i> Industrial facilities</li>
                    <li><i class="fas fa-check"></i> Hazmat removal</li>
                    <li><i class="fas fa-check"></i> Equipment removal</li>
                </ul>
                <a href="services.html#industrial" class="btn btn-outline">Learn More</a>
            </div>
            
            <!-- SERVICE CARD 4: RUBBISH REMOVAL -->
            <div class="service-card" data-aos="fade-up" data-aos-delay="300">
                <div class="service-icon">
                    <i class="fas fa-trash"></i>
                </div>
                <h3>Rubbish & Waste Removal</h3>
                <p>Fast and affordable rubbish removal for residential, commercial, and construction waste. Same-day service available with responsible recycling.</p>
                <ul class="service-list">
                    <li><i class="fas fa-check"></i> General rubbish</li>
                    <li><i class="fas fa-check"></i> Construction waste</li>
                    <li><i class="fas fa-check"></i> Hazardous materials</li>
                    <li><i class="fas fa-check"></i> Same-day removal</li>
                </ul>
                <a href="services.html#rubbish" class="btn btn-outline">Learn More</a>
            </div>
        </div>
    </div>
</section>
```

### 4.6 WHY CHOOSE US SECTION (Value Proposition)

```html
<!-- WHY CHOOSE US - BUILD TRUST & DIFFERENTIATE -->
<section class="why-choose-us">
    <div class="container">
        <div class="section-header" data-aos="fade-up">
            <h2 class="section-title">Why Choose A & O Contracting?</h2>
            <p class="section-subtitle">
                Years of experience, professional expertise, and commitment to customer satisfaction
            </p>
        </div>
        
        <div class="why-grid">
            <!-- TWO COLUMN LAYOUT: Text Left, Image Right -->
            <div class="why-content" data-aos="fade-right">
                <div class="why-list">
                    <div class="why-item">
                        <div class="why-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="why-text">
                            <h4>Fully Licensed & Insured</h4>
                            <p>Unrestricted NSW demolition license with $20M public liability insurance. All work complies with SafeWork NSW regulations.</p>
                        </div>
                    </div>
                    
                    <div class="why-item">
                        <div class="why-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="why-text">
                            <h4>Experienced Team</h4>
                            <p>15+ years of hands-on experience across all demolition types. Expert knowledge of Sydney council regulations.</p>
                        </div>
                    </div>
                    
                    <div class="why-item">
                        <div class="why-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="why-text">
                            <h4>Competitive Pricing</h4>
                            <p>Transparent, upfront pricing with no hidden fees. Free detailed quotes after site inspection.</p>
                        </div>
                    </div>
                    
                    <div class="why-item">
                        <div class="why-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="why-text">
                            <h4>Fast & Efficient</h4>
                            <p>Expert planning and professional equipment ensure timely completion of all projects.</p>
                        </div>
                    </div>
                    
                    <div class="why-item">
                        <div class="why-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="why-text">
                            <h4>Environmentally Responsible</h4>
                            <p>Maximum recycling rates, proper hazmat handling, and EPA-compliant waste disposal.</p>
                        </div>
                    </div>
                    
                    <div class="why-item">
                        <div class="why-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="why-text">
                            <h4>Customer First</h4>
                            <p>Responsive communication, on-time service, and complete project management from start to finish.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- IMAGE COLUMN -->
            <div class="why-image" data-aos="fade-left">
                <img src="images/why-choose-us.jpg" alt="A & O Contracting Team at Work">
            </div>
        </div>
    </div>
</section>
```

### 4.7 PORTFOLIO/GALLERY SECTION

```html
<!-- PORTFOLIO SECTION - SOCIAL PROOF THROUGH VISUALS -->
<section class="portfolio" id="portfolio">
    <div class="container">
        <div class="section-header" data-aos="fade-up">
            <h2 class="section-title">Recent Projects</h2>
            <p class="section-subtitle">
                Browse examples of completed demolition and waste removal projects
            </p>
        </div>
        
        <!-- FILTER BUTTONS (Optional) -->
        <div class="portfolio-filters" data-aos="fade-up">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="residential">Residential</button>
            <button class="filter-btn" data-filter="commercial">Commercial</button>
            <button class="filter-btn" data-filter="industrial">Industrial</button>
        </div>
        
        <!-- PORTFOLIO GRID - Image Gallery with Lightbox -->
        <div class="portfolio-grid">
            
            <!-- PORTFOLIO ITEM 1 -->
            <div class="portfolio-item" data-category="residential" data-aos="fade-up">
                <div class="portfolio-image">
                    <img src="images/portfolio/project-1.jpg" alt="House Demolition Project - Maroubra">
                    <div class="portfolio-overlay">
                        <div class="portfolio-info">
                            <h4>Residential House Demolition</h4>
                            <p>Maroubra</p>
                        </div>
                        <a href="images/portfolio/project-1-full.jpg" class="portfolio-link" data-lightbox="portfolio">
                            <i class="fas fa-expand"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- PORTFOLIO ITEM 2 -->
            <div class="portfolio-item" data-category="commercial" data-aos="fade-up" data-aos-delay="100">
                <div class="portfolio-image">
                    <img src="images/portfolio/project-2.jpg" alt="Commercial Office Demolition">
                    <div class="portfolio-overlay">
                        <div class="portfolio-info">
                            <h4>Commercial Office Strip-Out</h4>
                            <p>Sydney CBD</p>
                        </div>
                        <a href="images/portfolio/project-2-full.jpg" class="portfolio-link" data-lightbox="portfolio">
                            <i class="fas fa-expand"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- PORTFOLIO ITEM 3 -->
            <div class="portfolio-item" data-category="residential" data-aos="fade-up" data-aos-delay="200">
                <div class="portfolio-image">
                    <img src="images/portfolio/project-3.jpg" alt="Garage Demolition">
                    <div class="portfolio-overlay">
                        <div class="portfolio-info">
                            <h4>Garage Demolition</h4>
                            <p>Bondi</p>
                        </div>
                        <a href="images/portfolio/project-3-full.jpg" class="portfolio-link" data-lightbox="portfolio">
                            <i class="fas fa-expand"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Add more portfolio items as needed (8-12 total) -->
        </div>
        
        <!-- CTA AFTER PORTFOLIO -->
        <div class="portfolio-cta" data-aos="fade-up">
            <a href="portfolio.html" class="btn btn-primary btn-large">View Full Portfolio</a>
        </div>
    </div>
</section>
```

### 4.8 TESTIMONIALS/REVIEWS SECTION

```html
<!-- TESTIMONIALS SECTION - SOCIAL PROOF & CREDIBILITY -->
<section class="testimonials">
    <div class="container">
        <div class="section-header" data-aos="fade-up">
            <h2 class="section-title">What Our Clients Say</h2>
            <p class="section-subtitle">
                Trusted by hundreds of satisfied residential and commercial clients across Sydney
            </p>
        </div>
        
        <!-- TESTIMONIALS CAROUSEL (Using Slick jQuery) -->
        <div class="testimonials-slider" data-aos="fade-up">
            
            <!-- TESTIMONIAL CARD 1 -->
            <div class="testimonial-card">
                <div class="testimonial-stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p class="testimonial-text">
                    "A & O Contracting made our house demolition incredibly smooth. Professional, timely, and the crew was friendly and respectful. Highly recommended!"
                </p>
                <div class="testimonial-author">
                    <img src="images/testimonials/client-1.jpg" alt="John Smith" class="author-image">
                    <div class="author-info">
                        <h5>John Smith</h5>
                        <p>Homeowner - Maroubra</p>
                    </div>
                </div>
            </div>
            
            <!-- TESTIMONIAL CARD 2 -->
            <div class="testimonial-card">
                <div class="testimonial-stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p class="testimonial-text">
                    "Used A & O for a commercial office fit-out removal. Great communication, excellent pricing, and completed on schedule. Will use again!"
                </p>
                <div class="testimonial-author">
                    <img src="images/testimonials/client-2.jpg" alt="Sarah Johnson" class="author-image">
                    <div class="author-info">
                        <h5>Sarah Johnson</h5>
                        <p>Business Owner - Sydney CBD</p>
                    </div>
                </div>
            </div>
            
            <!-- TESTIMONIAL CARD 3 -->
            <div class="testimonial-card">
                <div class="testimonial-stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p class="testimonial-text">
                    "Professional, reliable, and environmentally conscious. They recycled and disposed of materials responsibly. Impressive!"
                </p>
                <div class="testimonial-author">
                    <img src="images/testimonials/client-3.jpg" alt="Michael Chen" class="author-image">
                    <div class="author-info">
                        <h5>Michael Chen</h5>
                        <p>Property Developer - Randwick</p>
                    </div>
                </div>
            </div>
            
            <!-- Add more testimonial cards as needed -->
        </div>
    </div>
</section>
```

### 4.9 CTA SECTION (Second Major Conversion Point)

```html
<!-- CALL TO ACTION SECTION - SECONDARY CONVERSION PUSH -->
<section class="cta-section">
    <div class="container">
        <div class="cta-content" data-aos="zoom-in">
            <h2>Ready to Start Your Project?</h2>
            <p>Get a free, no-obligation quote from our experienced team today</p>
            
            <div class="cta-buttons">
                <a href="quote.html" class="btn btn-primary btn-large">
                    Request Free Quote
                </a>
                <a href="tel:+61XXXXXXXXX" class="btn btn-secondary btn-large">
                    <i class="fas fa-phone"></i> Call Now
                </a>
            </div>
            
            <p class="cta-note">
                <i class="fas fa-check-circle"></i> Same-day response | Free consultation | No hidden fees
            </p>
        </div>
    </div>
</section>
```

### 4.10 FOOTER

```html
<!-- FOOTER - COMPLETE WITH LINKS, CONTACT, & INFO -->
<footer class="footer">
    <div class="footer-content">
        <div class="container">
            <div class="footer-grid">
                
                <!-- FOOTER COLUMN 1: COMPANY INFO -->
                <div class="footer-col">
                    <h4>A & O Contracting</h4>
                    <p>Professional demolition and rubbish removal services across Sydney. Fully licensed, insured, and committed to safety and customer satisfaction.</p>
                    <div class="social-links">
                        <a href="https://facebook.com/aocontracting" target="_blank" title="Facebook">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="https://instagram.com/aocontracting" target="_blank" title="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://youtube.com/@aocontracting" target="_blank" title="YouTube">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
                
                <!-- FOOTER COLUMN 2: QUICK LINKS -->
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="portfolio.html">Portfolio</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="quote.html">Get Quote</a></li>
                    </ul>
                </div>
                
                <!-- FOOTER COLUMN 3: SERVICES -->
                <div class="footer-col">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="services.html#residential">Residential Demolition</a></li>
                        <li><a href="services.html#commercial">Commercial Demolition</a></li>
                        <li><a href="services.html#industrial">Industrial Demolition</a></li>
                        <li><a href="services.html#rubbish">Rubbish Removal</a></li>
                        <li><a href="services.html#asbestos">Asbestos Removal</a></li>
                    </ul>
                </div>
                
                <!-- FOOTER COLUMN 4: CONTACT INFO -->
                <div class="footer-col">
                    <h4>Contact Us</h4>
                    <ul class="contact-info">
                        <li>
                            <i class="fas fa-phone"></i>
                            <a href="tel:+61XXXXXXXXX">+61 X XXXX XXXX</a>
                        </li>
                        <li>
                            <i class="fas fa-envelope"></i>
                            <a href="mailto:info@aocontracting.com.au">info@aocontracting.com.au</a>
                        </li>
                        <li>
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Maroubra, NSW, Australia</span>
                        </li>
                        <li>
                            <i class="fas fa-clock"></i>
                            <span>Available 7 Days a Week</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
    <!-- FOOTER BOTTOM - COPYRIGHT -->
    <div class="footer-bottom">
        <div class="container">
            <div class="footer-bottom-content">
                <p>&copy; 2025 A & O Contracting. All rights reserved.</p>
                <div class="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Disclaimer</a>
                </div>
            </div>
        </div>
    </div>
</footer>

<!-- BACK TO TOP BUTTON -->
<button class="back-to-top" id="back-to-top">
    <i class="fas fa-arrow-up"></i>
</button>
```

### 4.11 SCRIPT TAGS (End of body - Before closing </body>)

```html
<!-- EXTERNAL LIBRARIES - JAVASCRIPT -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js"></script>

<!-- CUSTOM SCRIPTS -->
<script src="js/main.js"></script>
<script src="js/jquery-plugins.js"></script>
<script src="js/form-validation.js"></script>
<script src="js/scroll-animations.js"></script>
<script src="js/mobile-menu.js"></script>

</body>
</html>
```

---

## 5. CSS STYLING & RESPONSIVE DESIGN

### 5.1 CSS VARIABLES (css/variables.css)

```css
/* ROOT CSS VARIABLES - Define once, use everywhere */
:root {
    /* Color Variables */
    --primary-color: #1a3a52;      /* Dark Blue */
    --secondary-color: #ff6b35;    /* Orange */
    --accent-color: #f7931e;       /* Gold */
    --success-color: #27ae60;       /* Green */
    --warning-color: #e67e22;       /* Orange */
    --error-color: #e74c3c;         /* Red */
    --light-bg: #f8f9fa;            /* Off-white */
    --dark-text: #333333;           /* Dark gray */
    --light-text: #666666;          /* Medium gray */
    --border-color: #ddd;           /* Light gray */
    --white: #ffffff;
    --black: #000000;
    
    /* Typography Variables */
    --font-heading: 'Poppins', sans-serif;
    --font-body: 'Open Sans', sans-serif;
    --font-accent: 'Lato', sans-serif;
    
    /* Font Sizes */
    --font-size-base: 16px;
    --font-size-sm: 14px;
    --font-size-lg: 18px;
    --font-size-xl: 24px;
    --font-size-xxl: 32px;
    --font-size-h1: 48px;
    --font-size-h2: 36px;
    --font-size-h3: 28px;
    --font-size-h4: 22px;
    
    /* Line Heights */
    --line-height-tight: 1.2;
    --line-height-normal: 1.6;
    --line-height-relaxed: 1.8;
    
    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;
    --spacing-xxxl: 64px;
    
    /* Border Radius */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;
    --border-radius-xl: 16px;
    
    /* Shadows */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
    --shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.25);
    
    /* Transitions */
    --transition-fast: 0.2s ease-in-out;
    --transition-normal: 0.3s ease-in-out;
    --transition-slow: 0.5s ease-in-out;
    
    /* Z-index Scale */
    --z-dropdown: 100;
    --z-sticky: 200;
    --z-modal: 1000;
    --z-tooltip: 1100;
}
```

### 5.2 MAIN CSS STRUCTURE (css/style.css - Core Styles)

```css
/* ========================================
   GLOBAL STYLES & RESET
   ======================================== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    font-size: var(--font-size-base);
}

body {
    font-family: var(--font-body);
    color: var(--dark-text);
    line-height: var(--line-height-normal);
    background-color: var(--light-bg);
    overflow-x: hidden;
}

a {
    color: var(--primary-color);
    text-decoration: none;
    transition: var(--transition-normal);
}

a:hover {
    color: var(--secondary-color);
}

/* Clear default list styles */
ul, ol {
    list-style: none;
}

/* ========================================
   CONTAINER & LAYOUT
   ======================================== */

.container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
}

/* ========================================
   TYPOGRAPHY
   ======================================== */

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    line-height: var(--line-height-tight);
    margin-bottom: var(--spacing-md);
    color: var(--primary-color);
}

h1 { font-size: var(--font-size-h1); }
h2 { font-size: var(--font-size-h2); }
h3 { font-size: var(--font-size-h3); }
h4 { font-size: var(--font-size-h4); }

p {
    margin-bottom: var(--spacing-md);
    color: var(--light-text);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
}

/* ========================================
   BUTTONS - CRITICAL FOR CONVERSIONS
   ======================================== */

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);
    border: 2px solid transparent;
    border-radius: var(--border-radius-md);
    font-weight: 600;
    font-size: var(--font-size-base);
    cursor: pointer;
    transition: var(--transition-normal);
    white-space: nowrap;
    text-decoration: none;
    font-family: var(--font-heading);
}

/* Primary Button - Main CTA */
.btn-primary {
    background-color: var(--secondary-color);
    color: var(--white);
    border-color: var(--secondary-color);
}

.btn-primary:hover {
    background-color: darken(#ff6b35, 10%);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

/* Secondary Button - Alternative CTA */
.btn-secondary {
    background-color: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
}

.btn-secondary:hover {
    background-color: darken(#1a3a52, 10%);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

/* Outline Button - Less prominent CTA */
.btn-outline {
    background-color: transparent;
    color: var(--secondary-color);
    border-color: var(--secondary-color);
}

.btn-outline:hover {
    background-color: var(--secondary-color);
    color: var(--white);
}

/* Button Sizes */
.btn-large {
    padding: var(--spacing-lg) var(--spacing-xl);
    font-size: var(--font-size-lg);
}

.btn-small, .btn-primary-sm, .btn-secondary-sm {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-sm);
}

/* ========================================
   NAVIGATION HEADER
   ======================================== */

.header {
    background-color: var(--white);
    box-shadow: var(--shadow-md);
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    transition: var(--transition-normal);
}

.navbar {
    padding: var(--spacing-md) 0;
}

.navbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-lg);
}

/* Logo Section */
.logo-section {
    flex: 0 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-weight: 700;
    font-size: var(--font-size-xl);
    color: var(--primary-color);
    transition: var(--transition-normal);
}

.logo:hover {
    transform: translateX(5px);
}

.logo-img {
    height: 40px;
    width: auto;
}

.logo-text {
    font-family: var(--font-heading);
    font-weight: 800;
}

/* Navigation Menu */
.nav-menu {
    flex: 1;
    display: flex;
    justify-content: center;
}

.nav-list {
    display: flex;
    align-items: center;
    gap: var(--spacing-xl);
}

.nav-item {
    position: relative;
}

.nav-link {
    color: var(--dark-text);
    font-weight: 600;
    font-size: var(--font-size-base);
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: 3px solid transparent;
    transition: var(--transition-normal);
}

.nav-link:hover,
.nav-link.active {
    color: var(--secondary-color);
    border-bottom-color: var(--secondary-color);
}

/* Dropdown Menu */
.dropdown {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: var(--white);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-lg);
    min-width: 200px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: var(--transition-normal);
    padding: var(--spacing-md) 0;
    z-index: var(--z-dropdown);
    margin-top: var(--spacing-md);
}

.dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-item {
    display: block;
    padding: var(--spacing-sm) var(--spacing-lg);
    color: var(--dark-text);
    transition: var(--transition-normal);
}

.dropdown-item:hover {
    background-color: var(--light-bg);
    color: var(--secondary-color);
    padding-left: calc(var(--spacing-lg) + var(--spacing-md));
}

/* CTA Buttons in Nav */
.nav-cta {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex: 0 0 auto;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
}

.mobile-menu-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: var(--dark-text);
    border-radius: var(--border-radius-sm);
    transition: var(--transition-normal);
}

/* ========================================
   HERO SECTION
   ======================================== */

.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.hero-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Parallax effect */
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(26, 58, 82, 0.7); /* Dark blue overlay for text readability */
}

.hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: var(--white);
}

.hero-title {
    font-size: clamp(2rem, 8vw, 3.5rem);
    color: var(--white);
    margin-bottom: var(--spacing-lg);
    font-weight: 800;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.5rem);
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: var(--spacing-xl);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

/* Hero Badges/Trust Signals */
.hero-badges {
    display: flex;
    justify-content: center;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    flex-wrap: wrap;
}

.badge {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--border-radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: var(--white);
    font-weight: 600;
}

.badge i {
    font-size: var(--font-size-lg);
    color: var(--accent-color);
}

/* Hero CTA Buttons */
.hero-cta {
    display: flex;
    justify-content: center;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    flex-wrap: wrap;
}

/* Scroll Indicator */
.scroll-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--white);
    animation: bounce 2s infinite;
    margin-top: var(--spacing-xl);
}

.scroll-indicator i {
    font-size: var(--font-size-lg);
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
}

/* ========================================
   QUICK FACTS SECTION
   ======================================== */

.quick-facts {
    background-color: var(--white);
    padding: var(--spacing-xxxl) var(--spacing-lg);
    margin-top: -80px;
    position: relative;
    z-index: 3;
}

.facts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-xl);
}

.fact-item {
    text-align: center;
    padding: var(--spacing-xl);
    background-color: var(--light-bg);
    border-radius: var(--border-radius-lg);
    transition: var(--transition-normal);
    box-shadow: var(--shadow-sm);
}

.fact-item:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    background-color: var(--white);
}

.fact-icon {
    font-size: 2.5rem;
    color: var(--secondary-color);
    margin-bottom: var(--spacing-md);
}

.fact-item h3 {
    font-size: var(--font-size-h3);
    margin-bottom: var(--spacing-sm);
}

.fact-item p {
    font-size: var(--font-size-base);
    color: var(--light-text);
    margin: 0;
}

/* ========================================
   SECTION HEADERS
   ======================================== */

.section-header {
    text-align: center;
    margin-bottom: var(--spacing-xxxl);
}

.section-title {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: var(--spacing-md);
    position: relative;
    display: inline-block;
    padding-bottom: var(--spacing-md);
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
    border-radius: var(--border-radius-sm);
}

.section-subtitle {
    font-size: var(--font-size-lg);
    color: var(--light-text);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
}

/* ========================================
   SERVICES SECTION
   ======================================== */

.services {
    padding: var(--spacing-xxxl) var(--spacing-lg);
    background-color: var(--light-bg);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-xl);
}

.service-card {
    background-color: var(--white);
    padding: var(--spacing-xl);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    transition: var(--transition-normal);
    border-top: 4px solid transparent;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.service-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-xl);
    border-top-color: var(--secondary-color);
}

.service-icon {
    font-size: 3rem;
    color: var(--secondary-color);
    margin-bottom: var(--spacing-lg);
}

.service-card h3 {
    font-size: var(--font-size-h4);
    margin-bottom: var(--spacing-md);
}

.service-card p {
    margin-bottom: var(--spacing-lg);
    flex: 1;
}

.service-list {
    margin-bottom: var(--spacing-lg);
    flex: 1;
}

.service-list li {
    margin-bottom: var(--spacing-sm);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    color: var(--light-text);
}

.service-list i {
    color: var(--success-color);
    font-size: var(--font-size-base);
}

.service-card .btn {
    align-self: flex-start;
}

/* ========================================
   WHY CHOOSE US SECTION
   ======================================== */

.why-choose-us {
    padding: var(--spacing-xxxl) var(--spacing-lg);
    background-color: var(--white);
}

.why-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xxxl);
    align-items: center;
}

.why-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.why-item {
    display: flex;
    gap: var(--spacing-lg);
}

.why-icon {
    flex: 0 0 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--light-bg);
    border-radius: var(--border-radius-lg);
    font-size: 1.5rem;
    color: var(--secondary-color);
}

.why-text h4 {
    font-size: var(--font-size-h4);
    margin-bottom: var(--spacing-sm);
}

.why-text p {
    margin-bottom: 0;
}

.why-image img {
    width: 100%;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
}

/* ========================================
   PORTFOLIO SECTION
   ======================================== */

.portfolio {
    padding: var(--spacing-xxxl) var(--spacing-lg);
    background-color: var(--light-bg);
}

.portfolio-filters {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xxxl);
    flex-wrap: wrap;
}

.filter-btn {
    padding: var(--spacing-sm) var(--spacing-lg);
    border: 2px solid var(--border-color);
    background-color: var(--white);
    color: var(--dark-text);
    font-weight: 600;
    border-radius: var(--border-radius-md);
    cursor: pointer;
    transition: var(--transition-normal);
}

.filter-btn:hover,
.filter-btn.active {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
    color: var(--white);
}

.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xxxl);
}

.portfolio-item {
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius-lg);
    aspect-ratio: 1;
}

.portfolio-image {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.portfolio-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition-normal);
}

.portfolio-item:hover .portfolio-image img {
    transform: scale(1.1);
}

.portfolio-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(26, 58, 82, 0.85);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: var(--transition-normal);
}

.portfolio-item:hover .portfolio-overlay {
    opacity: 1;
}

.portfolio-info {
    text-align: center;
    color: var(--white);
    margin-bottom: var(--spacing-lg);
}

.portfolio-info h4 {
    color: var(--white);
    font-size: var(--font-size-h4);
}

.portfolio-info p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0;
}

.portfolio-link {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--secondary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: var(--font-size-lg);
    transition: var(--transition-normal);
}

.portfolio-link:hover {
    transform: scale(1.2);
    background-color: var(--accent-color);
}

.portfolio-cta {
    display: flex;
    justify-content: center;
}

/* ========================================
   TESTIMONIALS SECTION
   ======================================== */

.testimonials {
    padding: var(--spacing-xxxl) var(--spacing-lg);
    background-color: var(--white);
}

.testimonials-slider {
    max-width: 800px;
    margin: 0 auto;
}

.testimonial-card {
    padding: var(--spacing-xl);
    background-color: var(--light-bg);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    text-align: center;
}

.testimonial-stars {
    font-size: 1.2rem;
    color: var(--accent-color);
    margin-bottom: var(--spacing-md);
}

.testimonial-text {
    font-size: var(--font-size-lg);
    font-style: italic;
    margin-bottom: var(--spacing-lg);
    color: var(--dark-text);
    line-height: var(--line-height-relaxed);
}

.testimonial-author {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-lg);
}

.author-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--secondary-color);
}

.author-info {
    text-align: left;
}

.author-info h5 {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-xs);
}

.author-info p {
    font-size: var(--font-size-sm);
    color: var(--light-text);
    margin-bottom: 0;
}

/* Slick Carousel Navigation */
.slick-dots {
    display: flex !important;
    justify-content: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-xl);
}

.slick-dots li {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--border-color);
    cursor: pointer;
    transition: var(--transition-normal);
}

.slick-dots li.slick-active {
    background-color: var(--secondary-color);
}

/* ========================================
   CTA SECTION
   ======================================== */

.cta-section {
    padding: var(--spacing-xxxl) var(--spacing-lg);
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: var(--white);
    text-align: center;
}

.cta-content h2 {
    color: var(--white);
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    margin-bottom: var(--spacing-lg);
}

.cta-content p {
    color: rgba(255, 255, 255, 0.95);
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-xl);
}

.cta-buttons {
    display: flex;
    justify-content: center;
    gap: var(--spacing-lg);
    flex-wrap: wrap;
    margin-bottom: var(--spacing-lg);
}

.cta-section .btn {
    min-width: 200px;
}

.cta-note {
    font-size: var(--font-size-base);
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 0;
}

.cta-note i {
    color: var(--accent-color);
    margin-right: var(--spacing-sm);
}

/* ========================================
   FOOTER
   ======================================== */

.footer {
    background-color: var(--primary-color);
    color: var(--white);
    padding-top: var(--spacing-xxxl);
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xxxl);
}

.footer-col h4 {
    color: var(--white);
    font-size: var(--font-size-h4);
    margin-bottom: var(--spacing-lg);
}

.footer-col p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: var(--spacing-lg);
}

.footer-col ul {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.footer-col a {
    color: rgba(255, 255, 255, 0.8);
    transition: var(--transition-normal);
}

.footer-col a:hover {
    color: var(--secondary-color);
}

.social-links {
    display: flex;
    gap: var(--spacing-lg);
    font-size: var(--font-size-lg);
}

.contact-info li {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    color: rgba(255, 255, 255, 0.8);
}

.contact-info i {
    color: var(--secondary-color);
    margin-top: 2px;
    flex: 0 0 auto;
}

.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding: var(--spacing-xl) 0;
}

.footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-lg);
}

.footer-links {
    display: flex;
    gap: var(--spacing-lg);
}

.footer-links a {
    color: rgba(255, 255, 255, 0.7);
    font-size: var(--font-size-sm);
}

.footer-links a:hover {
    color: var(--secondary-color);
}

/* ========================================
   BACK TO TOP BUTTON
   ======================================== */

.back-to-top {
    position: fixed;
    bottom: var(--spacing-xl);
    right: var(--spacing-xl);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: var(--secondary-color);
    color: var(--white);
    border: none;
    font-size: var(--font-size-lg);
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    transition: var(--transition-normal);
    box-shadow: var(--shadow-lg);
    z-index: 999;
}

.back-to-top:hover {
    background-color: var(--primary-color);
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
}

.back-to-top.show {
    display: flex;
}
```

---

## 6. RESPONSIVE CSS (css/responsive.css)

```css
/* ========================================
   TABLET RESPONSIVENESS (768px and below)
   ======================================== */

@media (max-width: 768px) {
    .container {
        padding: 0 var(--spacing-md);
    }
    
    /* Navigation changes for mobile */
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: var(--white);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: var(--shadow-lg);
        max-height: calc(100vh - 70px);
        overflow-y: auto;
        padding: var(--spacing-lg) 0;
        z-index: 99;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-list {
        flex-direction: column;
        gap: var(--spacing-lg);
    }
    
    .mobile-menu-toggle {
        display: flex;
    }
    
    .nav-cta {
        display: none;
    }
    
    /* Hide dropdown on mobile, make it full width */
    .dropdown-menu {
        position: static;
        opacity: 1;
        visibility: visible;
        transform: none;
        box-shadow: none;
        background-color: var(--light-bg);
        margin-top: 0;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    
    .dropdown:hover .dropdown-menu,
    .dropdown.active .dropdown-menu {
        max-height: 500px;
    }
    
    /* Hero section adjustments */
    .hero-title {
        font-size: 1.8rem;
    }
    
    .hero-subtitle {
        font-size: 1rem;
    }
    
    .hero-badges {
        flex-direction: column;
        gap: var(--spacing-md);
    }
    
    .badge {
        width: 100%;
        justify-content: center;
    }
    
    .hero-cta {
        flex-direction: column;
        gap: var(--spacing-md);
    }
    
    .btn-large {
        width: 100%;
    }
    
    /* Grid adjustments */
    .facts-grid,
    .services-grid,
    .portfolio-grid {
        grid-template-columns: 1fr;
    }
    
    .why-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
    }
    
    .section-title {
        font-size: 1.8rem;
    }
    
    .cta-content p {
        font-size: 1rem;
    }
    
    /* Footer grid adjustment */
    .footer-grid {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .footer-bottom-content {
        flex-direction: column;
        text-align: center;
    }
    
    .contact-info li {
        justify-content: center;
    }
}

/* ========================================
   MOBILE RESPONSIVENESS (480px and below)
   ======================================== */

@media (max-width: 480px) {
    html {
        font-size: 14px;
    }
    
    .container {
        padding: 0 var(--spacing-md);
    }
    
    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.3rem; }
    h3 { font-size: 1.1rem; }
    
    .hero {
        min-height: 80vh;
    }
    
    .hero-title {
        font-size: 1.4rem;
    }
    
    .hero-subtitle {
        font-size: 0.95rem;
    }
    
    .btn {
        padding: var(--spacing-md) var(--spacing-md);
        font-size: var(--font-size-sm);
    }
    
    .btn-large {
        padding: var(--spacing-md) var(--spacing-lg);
    }
    
    .hero-cta,
    .cta-buttons {
        flex-direction: column;
    }
    
    .back-to-top {
        width: 40px;
        height: 40px;
        bottom: var(--spacing-lg);
        right: var(--spacing-lg);
    }
    
    .quick-facts {
        margin-top: -40px;
        padding: var(--spacing-xl) var(--spacing-md);
    }
    
    .facts-grid,
    .services-grid,
    .why-grid,
    .portfolio-grid {
        gap: var(--spacing-md);
    }
    
    .section-header {
        margin-bottom: var(--spacing-xl);
    }
    
    .why-item {
        flex-direction: column;
        text-align: center;
    }
    
    .why-icon {
        margin: 0 auto;
    }
    
    .hero-badges {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }
    
    .portfolio-filters {
        gap: var(--spacing-sm);
    }
    
    .filter-btn {
        padding: var(--spacing-sm) var(--spacing-md);
        font-size: var(--font-size-sm);
    }
    
    .footer-col {
        margin-bottom: var(--spacing-lg);
    }
    
    .testimonial-author {
        flex-direction: column;
    }
}

/* ========================================
   EXTRA LARGE SCREENS (1400px+)
   ======================================== */

@media (min-width: 1400px) {
    .container {
        max-width: 1320px;
    }
    
    .hero-title {
        font-size: 4rem;
    }
    
    .section-title {
        font-size: 3.5rem;
    }
}
```

---

## 7. ANIMATIONS CSS (css/animations.css)

```css
/* ========================================
   CUSTOM ANIMATIONS
   ======================================== */

/* Entrance Animations */
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Hover Effects */
@keyframes slideUp {
    from {
        transform: translateY(10px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

/* Apply animations */
.animate-fade-in-down {
    animation: fadeInDown 0.6s ease-out;
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}

.animate-fade-in-left {
    animation: fadeInLeft 0.6s ease-out;
}

.animate-fade-in-right {
    animation: fadeInRight 0.6s ease-out;
}

.animate-slide-in-left {
    animation: fadeInLeft 0.8s ease-out;
}

.animate-scale-in {
    animation: scaleIn 0.6s ease-out;
}

.animate-pulse {
    animation: pulse 2s ease-in-out infinite;
}

/* Smooth transitions on interactive elements */
.service-card,
.portfolio-item,
.testimonial-card,
.why-item {
    transition: var(--transition-normal);
}

.service-card:hover,
.portfolio-item:hover {
    animation: slideUp 0.3s ease-out;
}
```

---

## 8. JAVASCRIPT FUNCTIONALITY

### 8.1 MAIN JAVASCRIPT (js/main.js)

```javascript
// ========================================
// MAIN JAVASCRIPT FILE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing Application');
    
    // Initialize all features
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initAOS();
    initCarousels();
    initPortfolioFilter();
    
    // Log to confirm initialization
    console.log('All features initialized successfully');
});

// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================

function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle) {
        // Toggle menu on hamburger click
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't close for dropdowns
                if (!this.closest('.dropdown')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            });
        });
        
        // Handle dropdown menus on mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// INITIALIZE AOS (ANIMATE ON SCROLL)
// ========================================

function initAOS() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
    });
}

// ========================================
// INITIALIZE CAROUSELS (SLICK)
// ========================================

function initCarousels() {
    const sliders = document.querySelectorAll('.testimonials-slider');
    
    sliders.forEach(slider => {
        if ($(slider).length) {
            $(slider).slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                arrows: true,
                dots: true,
                speed: 500,
                pauseOnHover: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false
                        }
                    }
                ]
            });
        }
    });
}

// ========================================
// PORTFOLIO FILTER
// ========================================

function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('show'), 10);
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('show'), 10);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========================================
// FORM HANDLING & VALIDATION
// ========================================

function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Validate required fields
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                showNotification(field.name + ' is required', 'error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Here you would typically send data to a server
            console.log('Form data:', Object.fromEntries(formData));
            showNotification('Thank you for your submission!', 'success');
            form.reset();
        }
    });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ========================================
// FORM FIELD ANIMATIONS
// ========================================

function initFormFieldAnimations() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement?.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement?.classList.remove('focused');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initFormFieldAnimations);

// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
```

### 8.2 JQUERY PLUGINS (js/jquery-plugins.js)

```javascript
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
            $(this).find('h3').stop().animate({
                color: '#ff6b35'
            }, 300);
        },
        function() {
            $(this).stop().animate({
                paddingTop: '0px'
            }, 200);
            $(this).find('h3').stop().animate({
                color: '#1a3a52'
            }, 300);
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
            var number = parseInt(text.match(/\d+/)[0]);
            
            $({count: 0}).animate({count: number}, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $element.text(Math.floor(this.count) + '+');
                }
            });
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
            $(this).find('.author-image').stop().animate({
                borderWidth: '5px'
            }, 200);
        },
        function() {
            $(this).find('.author-image').stop().animate({
                borderWidth: '3px'
            }, 200);
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
```

### 8.3 FORM VALIDATION (js/form-validation.js)

```javascript
// ========================================
// FORM VALIDATION
// ========================================

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.errors = {};
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.attachFieldValidators();
    }
    
    attachFieldValidators() {
        const fields = this.form.querySelectorAll('[data-validate]');
        
        fields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => {
                if (this.errors[field.name]) {
                    this.validateField(field);
                }
            });
        });
    }
    
    validateField(field) {
        const rules = field.getAttribute('data-validate').split('|');
        let isValid = true;
        
        rules.forEach(rule => {
            if (!this.validateRule(field, rule)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            delete this.errors[field.name];
            this.removeFieldError(field);
        }
        
        return isValid;
    }
    
    validateRule(field, rule) {
        const value = field.value.trim();
        const [ruleName, ...params] = rule.split(':');
        
        switch(ruleName) {
            case 'required':
                if (!value) {
                    this.setFieldError(field, 'This field is required');
                    return false;
                }
                break;
            case 'email':
                if (!this.isValidEmail(value)) {
                    this.setFieldError(field, 'Please enter a valid email');
                    return false;
                }
                break;
            case 'phone':
                if (!this.isValidPhone(value)) {
                    this.setFieldError(field, 'Please enter a valid phone number');
                    return false;
                }
                break;
            case 'min':
                if (value.length < parseInt(params[0])) {
                    this.setFieldError(field, `Minimum ${params[0]} characters required`);
                    return false;
                }
                break;
            case 'max':
                if (value.length > parseInt(params[0])) {
                    this.setFieldError(field, `Maximum ${params[0]} characters allowed`);
                    return false;
                }
                break;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    isValidPhone(phone) {
        return /^[\d\s\-\+\(\)]{10,}$/.test(phone.replace(/\s/g, ''));
    }
    
    setFieldError(field, message) {
        field.classList.add('field-error');
        let errorElement = field.parentElement.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            field.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        this.errors[field.name] = message;
    }
    
    removeFieldError(field) {
        field.classList.remove('field-error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.errors = {};
        
        const fields = this.form.querySelectorAll('[data-validate]');
        let formIsValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                formIsValid = false;
            }
        });
        
        if (formIsValid) {
            this.submitForm();
        }
    }
    
    submitForm() {
        const formData = new FormData(this.form);
        
        // Send to server or process data
        console.log('Form submitted successfully', Object.fromEntries(formData));
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Thank you! We will contact you soon.';
        this.form.parentElement.insertBefore(successMsg, this.form);
        
        // Reset form
        this.form.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => successMsg.remove(), 5000);
    }
}

// Initialize form validators when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new FormValidator('contact-form');
    new FormValidator('quote-form');
});
```

### 8.4 SCROLL ANIMATIONS (js/scroll-animations.js)

```javascript
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
```

### 8.5 MOBILE MENU (js/mobile-menu.js)

```javascript
// ========================================
// MOBILE MENU ENHANCEMENTS
// ========================================

class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobile-toggle');
        this.menu = document.getElementById('nav-menu');
        this.links = document.querySelectorAll('.nav-link');
        this.dropdowns = document.querySelectorAll('.dropdown');
        
        if (this.toggle && this.menu) {
            this.init();
        }
    }
    
    init() {
        // Toggle menu
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
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
        this.menu.classList.toggle('active');
        this.toggle.classList.toggle('active');
        
        if (this.menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
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
    new MobileMenu();
});
```

---

## 9. CONTENT PLACEMENT & STRUCTURE MAP

### Page Flow (Above the Fold to Bottom):

```
1. HEADER (Sticky Navigation)
   ├─ Logo/Brand Name
   ├─ Navigation Menu
   ├─ CTA Buttons (Call Now, Get Quote)
   └─ Mobile Menu Toggle

2. HERO SECTION (First Impression)
   ├─ Background Image/Video
   ├─ Main Headline (Value Proposition)
   ├─ Subheadline (Supporting Message)
   ├─ Trust Badges (Licensed, Insured, Rated)
   ├─ Primary CTA Buttons
   └─ Scroll Indicator

3. QUICK FACTS (Credibility Builder)
   ├─ Years Experience
   ├─ Projects Completed
   ├─ Satisfied Clients
   └─ Service Coverage Area

4. SERVICES SECTION (Explain Offerings)
   ├─ Section Header
   └─ 4 Service Cards
       ├─ Icon
       ├─ Title
       ├─ Description
       ├─ Key Benefits List
       └─ Learn More Link

5. WHY CHOOSE US (Differentiation)
   ├─ 6 Benefit Items with Icons
   └─ Supporting Image

6. PORTFOLIO/GALLERY (Social Proof)
   ├─ Filter Options
   ├─ Image Grid (8-12 items)
   ├─ Lightbox Gallery
   └─ View Full Portfolio Link

7. TESTIMONIALS (Trust Building)
   ├─ Client Carousel/Slider
   ├─ Star Ratings
   ├─ Testimonial Text
   ├─ Client Photo
   └─ Client Name & Title

8. CTA SECTION (Conversion Push)
   ├─ Headline
   ├─ Subheading
   ├─ Primary & Secondary Buttons
   └─ Quick Note (No hidden fees, etc.)

9. FOOTER (Navigation & Info)
   ├─ Company Info Column
   ├─ Quick Links Column
   ├─ Services Column
   ├─ Contact Info Column
   ├─ Social Media Links
   └─ Copyright & Legal Links

10. BACK TO TOP BUTTON (Sticky)
```

---

## 10. PERFORMANCE OPTIMIZATION

### Image Optimization:
```html
<!-- Use modern formats with fallbacks -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="image.jpg" alt="Description" loading="lazy">
</picture>

<!-- Sizes for responsive images -->
<img 
    srcset="image-small.jpg 480w,
            image-medium.jpg 768w,
            image-large.jpg 1200w"
    sizes="(max-width: 480px) 100vw,
           (max-width: 768px) 100vw,
           (max-width: 1200px) 100vw,
           100vw"
    src="image-large.jpg"
    alt="Description"
    loading="lazy">
```

### CSS & JS Optimization:
- Minify CSS and JavaScript files
- Use CSS Grid and Flexbox instead of floats
- Lazy load images and videos
- Defer non-critical JavaScript
- Use CSS custom properties for maintainability
- Remove unused CSS

### Conversion Optimization Checklist:
- ✅ Clear above-the-fold CTA
- ✅ Trust signals (badges, testimonials)
- ✅ Fast page load (< 3 seconds)
- ✅ Mobile optimized
- ✅ Clear value proposition
- ✅ Multiple CTA placements
- ✅ High-quality images
- ✅ Minimal navigation distractions
- ✅ Contact info prominent
- ✅ Phone number clickable on mobile

---

## FINAL NOTES

This document provides a comprehensive foundation for building a modern, conversion-focused website for A & O Contracting. The HTML structure is semantic, CSS is organized with variables for easy theming, and JavaScript is modular for easy maintenance and enhancement.

**Key Implementation Tips:**

1. Start with HTML structure first
2. Apply base CSS styling
3. Add responsive design media queries
4. Implement JavaScript functionality incrementally
5. Test on multiple devices and browsers
6. Optimize images and performance
7. Validate HTML and CSS
8. Test all forms and CTAs
9. Set up analytics tracking
10. A/B test different elements

The site is designed with mobile-first approach, ensuring the best user experience across all devices. All content is strategically placed to guide visitors toward conversion actions (contacting the business or requesting a quote).

