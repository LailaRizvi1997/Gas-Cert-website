/**
 * Khawer Rizvi Gas Services - Main JavaScript
 * Created: April 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle - completely rewritten for reliability
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            nav.classList.toggle('mobile-menu-open');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && 
                !nav.contains(e.target) && 
                nav.classList.contains('mobile-menu-open')) {
                nav.classList.remove('mobile-menu-open');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
        
        // Close menu when clicking a nav link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('mobile-menu-open');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
    
    // Testimonial carousel
    const testimonialCarousel = document.querySelector('.testimonials-carousel');
    const prevBtn = document.querySelector('.carousel-controls .prev');
    const nextBtn = document.querySelector('.carousel-controls .next');
    
    if (testimonialCarousel && prevBtn && nextBtn) {
        let currentSlide = 0;
        const slides = testimonialCarousel.querySelectorAll('.testimonial');
        const totalSlides = slides.length;
        
        // Set up automatic rotation
        let slideInterval = setInterval(nextSlide, 5000);
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
        
        function updateCarousel() {
            testimonialCarousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Reset the interval when manually changed
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Booking form submission
    const bookingForm = document.getElementById('booking');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(bookingForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h3>Booking Request Received!</h3>
                <p>Thank you for your booking request. Khawer will contact you shortly to confirm your appointment.</p>
                <p>A confirmation has been sent to your phone.</p>
            `;
            
            // Replace form with success message
            bookingForm.innerHTML = '';
            bookingForm.appendChild(successMessage);
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Log the form data (for development purposes)
            console.log('Form submitted:', formObject);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (linkPath === currentPage || 
            (currentPage === '/' && linkPath === '/index.html') ||
            (currentPage.includes(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
        }
    });
});
