// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarLinks = document.querySelectorAll('.navbar-link');

    // Toggle mobile menu
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarToggle?.classList.remove('active');
            navbarMenu?.classList.remove('active');
        });
    });

    // Highlight active section on scroll
    const sections = document.querySelectorAll('[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.navbar-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navbarLinks.forEach(link => link.classList.remove('active'));
                correspondingLink?.classList.add('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', highlightNavigation);

    // Smooth scroll offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Solo prevenir default en desktop, no en móviles
            if (window.innerWidth > 768) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initial highlight
    highlightNavigation();

    // Lightbox functionality for certification images
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const certificationImages = document.querySelectorAll('.certification-image img');

    // Open lightbox on image click
    certificationImages.forEach(img => {
        img.parentElement.addEventListener('click', function() {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox on close button click
    if (lightboxClose) {
        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close lightbox on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close lightbox on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
