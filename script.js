
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.waitlist-form');
    const input = document.querySelector('.input-field');
    const successMsg = document.querySelector('.success-message');
    const submitBtn = document.querySelector('.btn-primary');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = input.value.trim();

            // Robust Regex Validation
            const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!emailIsValid) {
                // You might want to show a visible error message here.
                // For now, we'll just return, or you could add an 'error' class to input.
                input.style.borderColor = 'red';
                setTimeout(() => input.style.borderColor = '', 2000);
                return;
            }

            // Simulate API call state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Joining...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;

            // EmailJS Send
            // Make sure to match these parameters with your EmailJS template variables
            const templateParams = {
                to_email: 'kemal@rahatt.co',
                from_email: email,
                message: `New waitlist signup: ${email}`
            };

            emailjs.send('service_sjk59ra', 'template_kdl7bjr', templateParams)
                .then(() => {
                    // Success State
                    submitBtn.innerHTML = 'Joined!';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; // Green success gradient

                    successMsg.classList.add('visible');
                    input.value = '';

                    // Reset after a few seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.opacity = '1';
                        submitBtn.disabled = false;
                        successMsg.classList.remove('visible');
                    }, 3000);
                }, (error) => {
                    console.error('FAILED...', error);
                    submitBtn.innerHTML = 'Error';
                    submitBtn.style.background = '#ef4444'; // Red error

                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
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
