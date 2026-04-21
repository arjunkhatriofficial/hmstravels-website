document.addEventListener('DOMContentLoaded', function () {
  const path = window.location.pathname.replace(/\\/g, '/');
  const isInPages = path.includes('/pages/');
  const pagesPrefix = isInPages ? '' : 'pages/';
  const homeHref = isInPages ? '../index.html' : 'index.html';
  const logoSrc = isInPages ? '../assets/logo.png' : 'assets/logo.png';

  const footerHTML = `
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="${homeHref}" class="logo-wrap">
        <img src="${logoSrc}" alt="HMS Travels Logo" class="logo-img">
      </a>
      <p>India's premium self-drive car rental.</p>
      <div class="footer-socials">
        <a class="soc-btn" href="https://www.linkedin.com/company/hmstravels" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="2" y="3" width="20" height="18" rx="2" stroke="#ffffff" stroke-width="0" fill="transparent" />
            <path d="M4.98 3.5C4.98 4.602 4.07 5.5 2.99 5.5C1.91 5.5 1 4.602 1 3.5C1 2.398 1.91 1.5 2.99 1.5C4.07 1.5 4.98 2.398 4.98 3.5ZM.5 8.98H5.5V23H.5V8.98ZM8.98 8.98H13.28V10.66H13.36C13.98 9.58 15.68 8.44 17.9 8.44C22.02 8.44 23 10.98 23 15.06V23H17.96V15.98C17.96 13.86 17.92 11.18 15.04 11.18C12.12 11.18 11.6 13.44 11.6 15.78V23H6.56V8.98H8.98Z" fill="currentColor" />
          </svg>
        </a>
        <a class="soc-btn" href="https://www.instagram.com/hmskt_s/" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.4" fill="none" />
            <circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.4" fill="none" />
            <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
          </svg>
        </a>
        <a class="soc-btn" href="https://www.facebook.com/share/16goMzvnEA/" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H8.898v-2.888h1.54V9.845c0-1.517.898-2.357 2.277-2.357.659 0 1.349.118 1.349.118v1.486h-.76c-.75 0-.985.466-.985.945v1.137h1.676l-.268 2.888h-1.408v6.99C18.343 21.128 22 16.991 22 12z" fill="currentColor" />
          </svg>
        </a>
      </div>
    </div>

    <div class="footer-col">
      <h4>Pages</h4>
      <ul>
        <li><a href="${homeHref}">Home</a></li>
        <li><a href="${pagesPrefix}fleet.html">Fleet</a></li>
        <li><a href="${pagesPrefix}booking.html">Booking</a></li>
        <li><a href="${pagesPrefix}about.html">About</a></li>
        <li><a href="${pagesPrefix}contact.html">Contact</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Contact</h4>
      <ul>
        <li><a href="https://wa.me/+917003876988">WhatsApp</a></li>
        <li><a href="tel:+918369778863">Call Us</a></li>
        <li><a href="mailto:wap709@gmail.com">Email</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Legal</h4>
      <ul>
          <li><a href="#" class="legal-link" data-key="terms">Terms</a></li>
          <li><a href="#" class="legal-link" data-key="privacy">Privacy</a></li>
          <li><a href="#" class="legal-link" data-key="cancellation">Cancellation</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom">
    <p>© 2025 HMS Travels.</p>
    <p>Self-Drive · Insured · No Driver</p>
  </div>
  
    <!-- Legal modal (hidden until opened) -->
    <div id="legal-modal" class="legal-modal" aria-hidden="true">
      <div class="legal-modal-panel" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
        <button class="legal-close" aria-label="Close">×</button>
        <h3 id="legal-modal-title"></h3>
        <div id="legal-modal-content" class="legal-modal-content"></div>
      </div>
    </div>
  `;

    // attach handlers for legal links and modal
    function attachLegalHandlers() {
      const root = document.getElementById('site-footer') || document;
      const links = root.querySelectorAll('.legal-link');
      const modal = document.getElementById('legal-modal');
      if (!modal) return;
      const titleEl = modal.querySelector('#legal-modal-title');
      const contentEl = modal.querySelector('#legal-modal-content');

      const legalTexts = {
        terms: `
          <h4>Terms & Conditions</h4>
          <p>These Terms govern your use of HMS Travels services. By booking with us you agree to the terms below.</p>
          <h5>Booking & Payment</h5>
          <p>Bookings are initiated via WhatsApp and confirmed by our team. Prices shown are per day and may include taxes where applicable.</p>
          <h5>Use of Vehicle</h5>
          <p>The renter must hold a valid driving licence and obey all applicable laws. The vehicle must be returned in the same condition it was provided.</p>
          <h5>Liability</h5>
          <p>HMS Travels is not liable for personal belongings left in the vehicle. Damage caused by misuse or negligence may be charged to the renter.</p>
          <p><strong>Governing Law:</strong> These Terms are governed by the laws of India.</p>
        `,
        privacy: `
          <h4>Privacy Policy</h4>
          <p>We collect contact and booking details to provide and improve our services. We do not sell personal data to third parties.</p>
          <h5>Information We Collect</h5>
          <p>We may collect your name, phone number, email, booking details and payment information as needed to complete bookings.</p>
          <h5>How We Use Data</h5>
          <p>Data is used for booking confirmations, customer support and legal compliance. You can request data removal via email.</p>
          <h5>Contact</h5>
          <p>For privacy queries contact us at <a href="mailto:wap709@gmail.com">wap709@gmail.com</a>.</p>
        `,
        cancellation: `
          <h4>Cancellation Policy</h4>
          <p>Cancellations should be requested via WhatsApp. Refunds are processed according to the timing of the cancellation relative to pickup.</p>
          <ul>
            <li>Full refund for cancellations made 48+ hours before pickup.</li>
            <li>50% refund for cancellations made between 24–48 hours before pickup.</li>
            <li>No refund for cancellations made within 24 hours of pickup.</li>
          </ul>
          <p>Exceptions may apply during promotions or peak periods. Contact <a href="https://wa.me/+917003876988">WhatsApp</a> for assistance.</p>
        `
      };

      links.forEach(a => a.addEventListener('click', function (e) {
        e.preventDefault();
        const key = this.dataset.key;
        const titles = { terms: 'Terms & Conditions', privacy: 'Privacy Policy', cancellation: 'Cancellation Policy' };
        titleEl.textContent = titles[key] || '';
        contentEl.innerHTML = legalTexts[key] || '<p>Content coming soon.</p>';
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }));

      // close handlers
      modal.addEventListener('click', function (e) {
        if (e.target === modal || e.target.classList.contains('legal-close')) {
          closeModal();
        }
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

      function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }

  // prefer an explicit placeholder if present
  let footerContainer = document.getElementById('site-footer');
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
    attachLegalHandlers();
    return;
  }

  // otherwise replace the first <footer> on the page
  const existingFooter = document.querySelector('footer');
  if (existingFooter) {
    existingFooter.id = 'site-footer';
    existingFooter.innerHTML = footerHTML;
    attachLegalHandlers();
    return;
  }

  // fallback: append footer to the document
  const f = document.createElement('footer');
  f.id = 'site-footer';
  f.innerHTML = footerHTML;
  document.body.appendChild(f);
  attachLegalHandlers();
});
