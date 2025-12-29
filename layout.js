
// layout.js - Shared Header and Footer Component


// layout.js - Shared Header and Footer Component

// Determine if we are on the home page
const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
const pathPrefix = isHome ? '' : 'index.html';

const HEADER_HTML = `
    <div class="container header-container">
        <div class="header-section left">
            <nav class="nav-group">
                <a href="${pathPrefix}#features" class="nav-link">Features</a>
                <a href="${pathPrefix}#benefits" class="nav-link">Benefits</a>
            </nav>
        </div>

        <a href="index.html" class="brand-logo">rahatt.co</a>

        <div class="header-section right">
            <nav class="nav-group desktop-nav">
                <a href="${pathPrefix}#faq" class="nav-link">FAQ</a>
                <div class="popover-container">
                    <a href="#" class="btn btn-sm btn-secondary js-toggle-popover">Contact</a>
                    <div class="contact-popover">
                        <div class="popover-arrow"></div>
                        <div class="popover-content">
                            <h3>Join the Waitlist</h3>
                            <p>Get early access to our automated publishing engine.</p>
                            <form class="waitlist-form">
                                <div class="input-group">
                                    <input type="email" class="input-field" placeholder="Enter your email" required
                                        aria-label="Email address">
                                    <div class="success-message">Added!</div>
                                </div>
                                <button type="submit" class="btn btn-primary btn-sm">
                                    Join Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            <button class="menu-toggle" aria-label="Toggle navigation">
                <i data-lucide="menu"></i>
            </button>
        </div>

        <div class="nav-overlay">
            <div class="mobile-nav">
                <a href="${pathPrefix}#features" class="nav-link">Features</a>
                <a href="${pathPrefix}#benefits" class="nav-link">Benefits</a>
                <a href="${pathPrefix}#faq" class="nav-link">FAQ</a>
                <a href="#" class="btn btn-secondary js-toggle-popover">Contact</a>
            </div>
        </div>
    </div>
`;


const FOOTER_HTML = `
    <div class="container footer-content">
        <div class="footer-col brand-col">
            <a href="index.html" class="brand-logo">rahatt.co</a>
            <div class="brand-separator"></div>
            <p class="brand-tagline">Automating digital accessibility for the future of publishing.</p>
        </div>

        <div class="footer-col links-col">
            <h4>Legal</h4>
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms of Service</a>
            <a href="cookies.html">Cookie Policy</a>
        </div>

        <div class="footer-col links-col">
            <h4>Connect</h4>
            <a href="#">Twitter / X</a>
            <a href="#">LinkedIn</a>
            <a href="mailto:hello@rahatt.co">Contact Support</a>
        </div>
    </div>
    <div class="container copyright">
        <p>&copy; 2025 rahatt.co. All rights reserved.</p>
    </div>
`;

function injectLayout() {
    // Inject Header
    const headerEl = document.querySelector('header');
    if (headerEl) {
        headerEl.innerHTML = HEADER_HTML;
    }

    // Inject Footer
    const footerEl = document.querySelector('footer');
    if (footerEl) {
        footerEl.innerHTML = FOOTER_HTML;
    }

    // Dispatch event to signal layout is ready
    const event = new Event('layoutInjected');
    document.dispatchEvent(event);
}

// Run injection immediately if body is present, otherwise wait
if (document.body) {
    injectLayout();
} else {
    document.addEventListener('DOMContentLoaded', injectLayout);
}
