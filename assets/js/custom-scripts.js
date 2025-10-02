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
