
document.addEventListener('DOMContentLoaded', () => {
    // Generic Waitlist Form Handler
    const setupWaitlistForm = (form) => {
        const input = form.querySelector('.input-field');
        const successMsg = form.querySelector('.success-message');
        const submitBtn = form.querySelector('button[type="submit"]');

        if (!input || !submitBtn) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = input.value.trim();

            // Robust Regex Validation
            const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!emailIsValid) {
                input.style.borderColor = '#ef4444';
                setTimeout(() => input.style.borderColor = '', 2000);
                return;
            }

            // Simulate API call state
            const originalText = submitBtn.innerHTML;
            const originalWidth = submitBtn.offsetWidth;
            submitBtn.style.width = `${originalWidth}px`; // Prevent layout shift
            submitBtn.innerHTML = 'Joining...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;

            // EmailJS Send
            const templateParams = {
                to_email: 'kemal@rahatt.co',
                from_email: email,
                message: `New waitlist signup: ${email}`
            };

            // Use global emailjs if available
            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_sjk59ra', 'template_kdl7bjr', templateParams)
                    .then(() => {
                        handleSuccess();
                    }, (error) => {
                        console.error('FAILED...', error);
                        handleError();
                    });
            } else {
                // Fallback for dev/offline
                console.warn('EmailJS not loaded, simulating success');
                setTimeout(handleSuccess, 1000);
            }

            function handleSuccess() {
                submitBtn.innerHTML = 'Joined!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

                if (successMsg) successMsg.classList.add('visible');
                input.value = '';

                // If inside popover, close it after delay
                const popover = form.closest('.contact-popover');

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                    submitBtn.style.width = '';
                    if (successMsg) successMsg.classList.remove('visible');

                    if (popover && popover.classList.contains('active')) {
                        popover.classList.remove('active');
                    }
                }, 3000);
            }

            function handleError() {
                submitBtn.innerHTML = 'Error';
                submitBtn.style.background = '#ef4444';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    submitBtn.style.width = '';
                }, 3000);
            }
        });
    };

    // Initialize all waitlist forms
    document.querySelectorAll('.waitlist-form').forEach(setupWaitlistForm);

    // Popover Logic
    const popoverTriggers = document.querySelectorAll('.js-toggle-popover');
    const popover = document.querySelector('.contact-popover');

    if (popover) {
        popoverTriggers.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent closing immediately
                popover.classList.toggle('active');

                // Focus input if opening
                if (popover.classList.contains('active')) {
                    const input = popover.querySelector('input');
                    if (input) setTimeout(() => input.focus(), 100);
                }
            });
        });

        // Click Away Logic
        document.addEventListener('click', (e) => {
            if (!popover.contains(e.target)) {
                popover.classList.remove('active');
            }
        });

        // Close on Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                popover.classList.remove('active');
            }
        });

        // Prevent clicks inside popover from closing it
        popover.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }


    // Mobile Menu Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link, .nav-overlay .btn, .mobile-nav .nav-link');

    if (menuToggle && navOverlay) {
        menuToggle.addEventListener('click', () => {
            const isActive = navOverlay.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : '';

            // Re-initialize Lucide icons if color changes or icons rotate
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navOverlay.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Optional: Parallax or hover effect for cards could go here
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all others
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherItem.classList.remove('active');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });

                // Toggle current if it wasn't already active
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

});
