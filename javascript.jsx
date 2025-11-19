
const CONFIG = {
    bakeryName: "Crumbly Delights",
    contactEmail: "hello@crumblydelights.co.za",
    phoneNumber: "+27 12 345 6789",
    location: "Polokwane, South Africa"
};


document.addEventListener('DOMContentLoaded', function() {
    console.log(`${CONFIG.bakeryName} website loaded successfully`);
    initializeAllFeatures();
});

function initializeAllFeatures() {

    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            initHomepage();
            break;
        case 'menu':
            initMenuPage();
            break;
        case 'gallery':
            initGalleryPage();
            break;
        case 'about':
            initAboutPage();
            break;
        case 'contact':
            initContactPage();
            break;
        case 'enquiry':
            initEnquiryPage();
            break;
    }

    initCommonFeatures();
}


function initHomepage() {

    const counterElement = document.querySelector('.counter');
    if (counterElement) {
        animateCounter(counterElement, 0, 247, 50);
    }

    initFeatureCards();
}

function animateCounter(element, start, end, duration) {
    let current = start;
    const increment = Math.ceil((end - start) / (duration / 10));
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = current;
    }, 10);
}

function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showToast(`Learn more about our ${title} services!`);
        });
    });
}

function initMenuPage() {
    const searchInput = document.getElementById('searchMenu');
    const categoryFilter = document.getElementById('categoryFilter');
    const noResults = document.getElementById('noResults');
    
    if (searchInput && categoryFilter) {

        searchInput.addEventListener('input', debounce(filterMenu, 300));
        categoryFilter.addEventListener('change', filterMenu);
 
        setTimeout(filterMenu, 100);
    }
}

function filterMenu() {
    const searchTerm = document.getElementById('searchMenu').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const noResults = document.getElementById('noResults');
    let visibleItems = 0;
    
    document.querySelectorAll('[data-category]').forEach(section => {
        let sectionVisible = false;
        const sectionCategory = section.getAttribute('data-category');
        
        section.querySelectorAll('.card').forEach(card => {
            const itemName = card.querySelector('.label').textContent.toLowerCase();
            const matchesSearch = itemName.includes(searchTerm);
            const matchesCategory = category === 'all' || sectionCategory === category;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                fadeIn(card);
                sectionVisible = true;
                visibleItems++;
            } else {
                card.style.display = 'none';
            }
        });

        const sectionHeader = section.previousElementSibling;
        if (sectionHeader && sectionHeader.classList.contains('section-title')) {
            sectionHeader.style.display = sectionVisible ? 'block' : 'none';
        }
    });

    if (noResults) {
        noResults.style.display = visibleItems === 0 ? 'block' : 'none';
    }
}

function initGalleryPage() {

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close');
    
    if (lightbox) {

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('close')) {
                closeLightbox();
            }
        });
        

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightbox();
            }
        });
    }
}


function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = element.querySelector('img').src;
        lightboxCaption.textContent = element.querySelector('img').alt;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
}


function initAboutPage() {

    const teamMembers = document.querySelectorAll('.member');
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const memberName = this.querySelector('h3').textContent;
            showBio(memberName.toLowerCase());
        });

        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

const TEAM_BIOS = {
    matthew: {
        name: "Matthew",
        role: "Head Pastry Chef",
        bio: "Matthew specializes in French patisserie with 8 years of experience. Trained in Paris, he brings authentic techniques to every croissant and éclair.",
        specialty: "Viennoiserie & French Pastries"
    },
    paul: {
        name: "Paul", 
        role: "Artisan Baker",
        bio: "Paul is our sourdough expert with a passion for traditional baking methods. He starts every day at 4 AM to ensure fresh bread for our customers.",
        specialty: "Sourdough & Artisan Breads"
    },
    palesa: {
        name: "Palesa",
        role: "Cake Specialist", 
        bio: "Palesa creates stunning custom cakes for celebrations. Her artistic flair and attention to detail make every cake a masterpiece.",
        specialty: "Custom Cakes & Decorations"
    },
    kealeboga: {
        name: "Kealeboga",
        role: "Head Barista",
        bio: "Kealeboga is our coffee expert, trained in specialty coffee preparation. He sources the finest beans and creates perfect brews every time.",
        specialty: "Specialty Coffee & Latte Art"
    },
    leago: {
        name: "Leago",
        role: "Service Manager",
        bio: "Leago ensures every customer has an exceptional experience. She manages our front-of-house team with warmth and efficiency.",
        specialty: "Customer Experience & Operations"
    },
    madidimalo: {
        name: "Madidimalo", 
        role: "Pastry Assistant",
        bio: "Madidimalo supports our pastry team with precision and care. She's mastering the art of baking while bringing joy to the kitchen.",
        specialty: "Pastry Preparation & Quality Control"
    },
    amogelang: {
        name: "Amogelang",
        role: "Customer Service",
        bio: "Amogelang greets every customer with a smile and knows all our regulars by name. She's the friendly face of Crumbly Delights.",
        specialty: "Customer Relations & Orders"
    }
};

function showBio(memberId) {
    const member = TEAM_BIOS[memberId];
    const bioModal = document.getElementById('bioModal');
    const bioDetails = document.getElementById('bioDetails');
    
    if (member && bioModal && bioDetails) {
        bioDetails.innerHTML = `
            <h2>${member.name}</h2>
            <h3 style="color: var(--accent); margin-bottom: 15px;">${member.role}</h3>
            <p style="margin-bottom: 15px;">${member.bio}</p>
            <p><strong>Specialty:</strong> ${member.specialty}</p>
        `;
        bioModal.style.display = 'flex';
    }
}

function closeBio() {
    const bioModal = document.getElementById('bioModal');
    if (bioModal) {
        bioModal.style.display = 'none';
    }
}

function initContactPage() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        initRealTimeValidation('contactForm');
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    if (validateForm('contactForm')) {
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };

        showFormSuccess('contactForm', 'successMessage');

        console.log('Contact form submitted:', formData);

        setTimeout(() => {
            e.target.reset();
        }, 3000);
    }
}

function initEnquiryPage() {
    let selectedEnquiryType = '';
    const enquiryOptions = document.querySelectorAll('.enquiry-option');
    
    enquiryOptions.forEach(option => {
        option.addEventListener('click', function() {
            const type = this.getAttribute('data-type') || 
                        this.querySelector('h3').textContent.toLowerCase().includes('catering') ? 'catering' :
                        this.querySelector('h3').textContent.toLowerCase().includes('cake') ? 'custom-cake' : 'wholesale';
            
            selectEnquiryType(type, this);
        });
    });
    
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', handleEnquirySubmit);
        initRealTimeValidation('enquiryForm');
    }
}

function selectEnquiryType(type, element) {
    window.selectedEnquiryType = type;
    const enquiryTypeInput = document.getElementById('enquiryType');
    const typeError = document.getElementById('typeError');
    
    if (enquiryTypeInput) enquiryTypeInput.value = type;
    if (typeError) typeError.style.display = 'none';

    document.querySelectorAll('.enquiry-option').forEach(option => {
        option.classList.remove('selected');
    });
    element.classList.add('selected');
}

function handleEnquirySubmit(e) {
    e.preventDefault();
    
    if (!window.selectedEnquiryType) {
        const typeError = document.getElementById('typeError');
        if (typeError) {
            typeError.style.display = 'block';
            typeError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    if (validateForm('enquiryForm')) {
        const formData = {
            type: window.selectedEnquiryType,
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            eventDate: document.getElementById('eventDate').value,
            guestCount: document.getElementById('guestCount').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };

        showFormSuccess('enquiryForm', 'successMessage');

        console.log('Enquiry form submitted:', formData);
    }
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    let isValid = true;

    form.querySelectorAll('.error').forEach(error => error.style.display = 'none');

    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        const value = field.value.trim();
        const errorElement = document.getElementById(field.id + 'Error');
        
        if (!value) {
            if (errorElement) errorElement.style.display = 'block';
            isValid = false;
            return;
        }

        switch(field.type) {
            case 'email':
                if (!isValidEmail(value)) {
                    if (errorElement) errorElement.style.display = 'block';
                    isValid = false;
                }
                break;
            case 'tel':
                if (!isValidPhone(value)) {
                    if (errorElement) errorElement.style.display = 'block';
                    isValid = false;
                }
                break;
            default:
                if (field.id === 'message' && value.length < 10) {
                    if (errorElement) errorElement.style.display = 'block';
                    isValid = false;
                }
                break;
        }
    });
    
    return isValid;
}

function initRealTimeValidation(formId) {
    const form = document.getElementById(formId);
    
    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', function() {
            const errorElement = document.getElementById(this.id + 'Error');
            if (errorElement) errorElement.style.display = 'none';

            if (this.type === 'email' && this.value.trim()) {
                if (!isValidEmail(this.value.trim()) && errorElement) {
                    errorElement.style.display = 'block';
                }
            }
            
            if (this.type === 'tel' && this.value.trim()) {
                if (!isValidPhone(this.value.trim()) && errorElement) {
                    errorElement.style.display = 'block';
                }
            }
            
            if (this.id === 'message' && this.value.trim().length >= 10 && errorElement) {
                errorElement.style.display = 'none';
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    if (page === 'index.html' || page === '' || page === '/') return 'index';
    if (page.includes('about')) return 'about';
    if (page.includes('menu')) return 'menu';
    if (page.includes('gallery')) return 'gallery';
    if (page.includes('contact')) return 'contact';
    if (page.includes('enquiry')) return 'enquiry';
    
    return 'index';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function fadeIn(element) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let opacity = 0;
    const timer = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = opacity.toString();
        opacity += 0.1;
    }, 30);
}

function showFormSuccess(formId, successId) {
    const form = document.getElementById(formId);
    const successMessage = document.getElementById(successId);
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function showToast(message, duration = 3000) {

    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--accent);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(toast);
    

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

function initCommonFeatures() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || 'Submit';
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
    });

    document.querySelectorAll('form button[type="submit"]').forEach(btn => {
        btn.setAttribute('data-original-text', btn.textContent);
    });
}

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

window.CrumblyDelights = {
    openLightbox,
    closeLightbox,
    showBio,
    closeBio,
    filterMenu,
    selectEnquiryType,
    showToast
};

console.log('Crumbly Delights JavaScript loaded successfully!');