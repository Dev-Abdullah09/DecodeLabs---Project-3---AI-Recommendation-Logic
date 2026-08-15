// AutoMatch AI Client Script
document.addEventListener("DOMContentLoaded", function() {
    // Smooth scroll for anchor tags
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Handle priority radio styling
    const priorityRadios = document.querySelectorAll('input[name="priority"]');
    priorityRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.priority-option').forEach(opt => {
                opt.classList.remove('active');
            });
            if (this.checked) {
                this.closest('.priority-option').classList.add('active');
            }
        });
    });
});
