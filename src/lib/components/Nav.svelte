<script lang="ts">
  import { page } from '$app/stores';

  let scrolled = false;
  let mobileOpen = false;

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      scrolled = window.scrollY > 20;
    });
  }

  const navLinks = [
    { href: '#order', label: 'Place your order' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
  ];
</script>

<nav class="dm-nav" class:scrolled class:mobile-open={mobileOpen}>
  <div class="dm-nav-inner dm-container">
    <!-- Logo -->
    <a href="/" class="dm-nav-logo">
      <img src="/dariromode-logo.svg" alt="Dariro Mode" />
    </a>

    <!-- Desktop Links -->
    <ul class="dm-nav-links">
      {#each navLinks as link}
        <li>
          <a href={link.href} class="dm-nav-link">{link.label}</a>
        </li>
      {/each}
    </ul>

    <!-- Right: Login + Mobile Toggle -->
    <div class="dm-nav-right">
      <a href="/auth/login" class="dm-nav-login" id="nav-login-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        Login
      </a>
      <button class="dm-nav-hamburger" aria-label="Toggle menu" on:click={() => mobileOpen = !mobileOpen}>
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if mobileOpen}
  <div class="dm-nav-mobile">
    {#each navLinks as link}
      <a href={link.href} class="dm-nav-mobile-link" on:click={() => mobileOpen = false}>{link.label}</a>
    {/each}
    <a href="/auth/login" class="dm-btn-primary dm-nav-mobile-login">Login</a>
  </div>
  {/if}
</nav>

<style>
  .dm-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 20px 0;
    transition: all 0.3s ease;
  }
  .dm-nav.scrolled {
    background: rgba(13, 13, 15, 0.92);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 14px 0;
  }
  .dm-nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dm-nav-logo img {
    height: 24px;
    display: block;
  }
  .dm-nav-links {
    display: flex;
    align-items: center;
    gap: 36px;
    list-style: none;
  }
  .dm-nav-link {
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.01em;
    transition: color 0.2s;
  }
  .dm-nav-link:hover { color: white; }
  .dm-nav-right { display: flex; align-items: center; gap: 16px; }
  .dm-nav-login {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--dm-red);
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    font-family: var(--dm-font-heading);
    text-decoration: none;
    transition: all 0.2s;
  }
  .dm-nav-login:hover {
    background: var(--dm-red-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(230,51,41,0.3);
  }
  .dm-nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }
  .dm-nav-hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s;
  }
  .dm-nav-mobile {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(13,13,15,0.98);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    animation: fadeInUp 0.2s ease;
  }
  .dm-nav-mobile-link {
    color: rgba(255,255,255,0.8);
    text-decoration: none;
    font-size: 18px;
    font-family: var(--dm-font-heading);
    font-weight: 500;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .dm-nav-mobile-login { margin-top: 8px; text-align: center; justify-content: center; }
  @media (max-width: 768px) {
    .dm-nav-links { display: none; }
    .dm-nav-hamburger { display: flex; }
    .dm-nav-login { display: none; }
  }
</style>
