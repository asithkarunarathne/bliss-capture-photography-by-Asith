document.addEventListener("DOMContentLoaded", () => {
    // 1. Sticky Navbar
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-links li a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

    // 3. Hero Slideshow Animation
    const slides = document.querySelectorAll(".hero-slideshow .slide");
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }
    
    // Change slide every 6 seconds
    setInterval(nextSlide, 6000);

    // 4. Gallery Filtering
    const filterBtns = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove("active"));
            // Add active class to clicked button
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            galleryItems.forEach(item => {
                if (filterValue === "all" || item.classList.contains(filterValue)) {
                    item.style.display = "block";
                    // Brief delay to allow CSS opacity transition
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 50);
                } else {
                    item.style.opacity = "0";
                    item.style.transform = "scale(0.8)";
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 600);
                }
            });
        });
    });

    // 5. Scroll Reveal Intersection Observer (More Animations)
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    };
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Parallax effect on scroll for about image
    const parallaxImg = document.querySelector('.parallax-img');
    window.addEventListener('scroll', () => {
        if (parallaxImg) {
            let scrollY = window.scrollY;
            // Apply slight vertical shift based on scroll
            parallaxImg.style.transform = `translateY(${scrollY * 0.05}px)`;
        }
    });

    // 6. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            if(targetId === "") return;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // 7. Contact Form Handling
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Sending...";
            
            // Simulate sending message
            setTimeout(() => {
                alert("Thank you for reaching out! We will get back to you soon.");
                contactForm.reset();
                btn.innerText = originalText;
            }, 1000);
        });
    }
});
