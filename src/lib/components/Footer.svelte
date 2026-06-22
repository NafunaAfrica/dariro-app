<footer class="dm-footer">
  <div class="dm-container">
    <div class="dm-footer-grid">
      <!-- Brand -->
      <div class="dm-footer-brand">
        <img src="/dariromode-logo.svg" alt="Dariro Mode" class="dm-footer-logo" />
        <p class="dm-footer-tagline">Where Creativity Meets Precision.<br/>Bringing Your Vision to Life.</p>
        <div class="dm-footer-socials">
          <a href="#" aria-label="Instagram" class="dm-social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
          </a>
          <a href="#" aria-label="Facebook" class="dm-social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" class="dm-social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>

      <!-- Links -->
      <div class="dm-footer-col">
        <h4 class="dm-footer-heading">Quick Links</h4>
        <ul class="dm-footer-links">
          <li><a href="#order">Place your order</a></li>
          <li><a href="#services">Our Services</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="/auth/login">Client Login</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
        </ul>
      </div>

      <!-- Services -->
      <div class="dm-footer-col">
        <h4 class="dm-footer-heading">Services</h4>
        <ul class="dm-footer-links">
          <li><a href="#services">Large Format Printing</a></li>
          <li><a href="#services">Lithographic Printing</a></li>
          <li><a href="#services">Digital Printing</a></li>
          <li><a href="#services">Signage & Branding</a></li>
          <li><a href="#services">Digital Marketing</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="dm-footer-col">
        <h4 class="dm-footer-heading">Contact</h4>
        <ul class="dm-footer-contact">
          <li>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <a href="mailto:sales@dariromode.com">sales@dariromode.com</a>
          </li>
          <li>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.19L6.5 2.19a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.5 9.56a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
            <a href="tel:+263772221035">+263 772 221 035</a>
          </li>
          <li>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Africa House, 100 Jason Moyo Ave, Harare</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="dm-footer-bottom">
      <p>© {new Date().getFullYear()} Dariro Mode. All rights reserved. Zimbabwe-owned & operated.</p>
      <a href="#order" class="dm-btn-primary dm-footer-cta">Place your order →</a>
    </div>
  </div>
</footer>

<style>
  .dm-footer {
    background: #0A0A0C;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 80px 0 40px;
  }
  .dm-footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
    gap: 48px;
    margin-bottom: 60px;
  }
  .dm-footer-logo { height: 22px; margin-bottom: 20px; display: block; }
  .dm-footer-tagline {
    font-size: 14px;
    color: rgba(255,255,255,0.45);
    line-height: 1.7;
    margin-bottom: 24px;
  }
  .dm-footer-socials { display: flex; gap: 12px; }
  .dm-social-link {
    width: 36px; height: 36px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.5);
    transition: all 0.2s;
    text-decoration: none;
  }
  .dm-social-link:hover { border-color: var(--dm-red); color: var(--dm-red); }
  .dm-footer-heading {
    font-family: var(--dm-font-heading);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--dm-grey);
    margin-bottom: 20px;
  }
  .dm-footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .dm-footer-links a {
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;
  }
  .dm-footer-links a:hover { color: white; }
  .dm-footer-contact { list-style: none; display: flex; flex-direction: column; gap: 14px; }
  .dm-footer-contact li { display: flex; align-items: flex-start; gap: 10px; }
  .dm-footer-contact svg { flex-shrink: 0; margin-top: 2px; color: var(--dm-red); }
  .dm-footer-contact a, .dm-footer-contact span { color: rgba(255,255,255,0.55); font-size: 13px; text-decoration: none; }
  .dm-footer-contact a:hover { color: white; }
  .dm-footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dm-footer-bottom p { font-size: 13px; color: rgba(255,255,255,0.3); }
  .dm-footer-cta { padding: 10px 22px; font-size: 13px; }
  @media (max-width: 900px) {
    .dm-footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
    .dm-footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
  }
  @media (max-width: 600px) {
    .dm-footer-grid { grid-template-columns: 1fr; }
  }
</style>
