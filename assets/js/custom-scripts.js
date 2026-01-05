// Custom JS extracted from index.html
// Responsive navbar toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('mainNav');
function handleResize() {
    if(window.innerWidth < 768) {
        navToggle.style.display = 'block';
        mainNav.style.display = 'none';
    } else {
        navToggle.style.display = 'none';
        mainNav.style.display = 'flex';
    }
}
navToggle && navToggle.addEventListener('click', function() {
    if(mainNav.style.display === 'flex') {
        mainNav.style.display = 'none';
    } else {
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.background = '#fff';
        mainNav.style.position = 'absolute';
        mainNav.style.top = '60px';
        mainNav.style.right = '16px';
        mainNav.style.boxShadow = '0 4px 24px rgba(44,62,80,0.10)';
        mainNav.style.borderRadius = '12px';
        mainNav.style.padding = '18px 24px';
        mainNav.style.gap = '1rem';
        mainNav.style.zIndex = '9999';
    }
});
window.addEventListener('resize', handleResize);
window.addEventListener('DOMContentLoaded', handleResize);
// ...existing code for animated background, scroll to top, etc. should be moved here as needed
// Theme toggle (persisted)
const themeToggle = document.getElementById('theme-toggle');
function applyTheme(theme) {
    if(theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle && (themeToggle.innerHTML = '<i class="fas fa-sun"></i>');
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle && (themeToggle.innerHTML = '<i class="fas fa-moon"></i>');
    }
}
// Initialize theme from localStorage
(function(){
    const saved = localStorage.getItem('theme');
    applyTheme(saved === 'light' ? 'light' : 'dark');
})();
themeToggle && themeToggle.addEventListener('click', function(){
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'dark' : 'light');
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
});

// Project filtering
document.addEventListener('DOMContentLoaded', function(){
    const filterBar = document.querySelector('.filter-bar');
    if(filterBar){
        filterBar.addEventListener('click', function(e){
            const btn = e.target.closest('button[data-filter]');
            if(!btn) return;
            const filter = btn.getAttribute('data-filter');
            document.querySelectorAll('.project-card').forEach(card => {
                if(filter === 'all') {
                    card.style.display = '';
                } else {
                    const tags = (card.getAttribute('data-tags')||'').split(/\s+/);
                    card.style.display = tags.includes(filter) ? '' : 'none';
                }
            });
        });
    }

    // Cookie banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    if(cookieBanner && acceptBtn){
        if(!localStorage.getItem('cookies_accepted')){
            cookieBanner.style.display = 'flex';
        }
        acceptBtn.addEventListener('click', function(){
            localStorage.setItem('cookies_accepted','1');
            cookieBanner.style.display = 'none';
        });
    }

    // Contact form: send to Formspree and open WhatsApp with the submission
    const contactForm = document.getElementById('contact-form');
    if(contactForm){
        contactForm.addEventListener('submit', function(e){
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';

            const formData = new FormData(contactForm);
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const subject = formData.get('subject') || '';
            const message = formData.get('message') || '';

            const waNumber = '919161465701'; // international format without +
            const waMessage = `New contact form submission:%0AName: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;
            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(decodeURIComponent(waMessage))}`;

            // Open WhatsApp chat in a new tab/window (user will need to confirm/send in WhatsApp)
            window.open(waUrl, '_blank');

            // Also POST to Formspree (if action points to Formspree endpoint). This runs in background.
            fetch(contactForm.action, {
                method: contactForm.method || 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                // simple UX feedback
                submitBtn.textContent = 'Sent';
                setTimeout(() => { submitBtn.disabled = false; submitBtn.textContent = originalText; contactForm.reset(); }, 1800);
            }).catch(err => {
                console.error('Form submission failed', err);
                submitBtn.textContent = 'Try again';
                setTimeout(() => { submitBtn.disabled = false; submitBtn.textContent = originalText; }, 2200);
            });
        });
    }

    // Keyboard support: allow Enter/Space to activate project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('keydown', function(ev){
            if(ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar'){
                ev.preventDefault();
                const onclick = card.getAttribute('onclick');
                if(onclick){
                    // evaluate the onclick handler safely for existing modal open function
                    try { eval(onclick); } catch(err) { console.error(err); }
                }
            }
        });
    });

    // Ensure nav toggle updates aria-expanded
    const navToggleBtn = document.getElementById('nav-toggle');
    const mainNavEl = document.getElementById('mainNav');
    if(navToggleBtn && mainNavEl){
        navToggleBtn.addEventListener('click', function(){
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', (!expanded).toString());
        });
    }
});
