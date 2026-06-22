<script lang="ts">
  import { page } from '$app/stores';
  let email = $page.url.searchParams.get('email') || '';
</script>

<svelte:head>
  <title>Create Account | Dariro Mode</title>
</svelte:head>

<div class="auth-page">
  <div class="auth-card">
    <img src="/dariromode-logo.svg" alt="Dariro Mode" class="auth-logo" />
    <h1 class="auth-title">Create your account</h1>
    <p class="auth-sub">Track projects, get quotes, and manage your orders</p>
    <form class="auth-form">
      <div class="auth-row">
        <input type="text" class="auth-input" placeholder="First name" required id="reg-firstname" />
        <input type="text" class="auth-input" placeholder="Last name" required id="reg-lastname" />
      </div>
      <input type="email" class="auth-input" placeholder="Email address" value={email} required id="reg-email" />
      <input type="tel" class="auth-input" placeholder="Phone number" id="reg-phone" />
      <input type="text" class="auth-input" placeholder="Company (optional)" id="reg-company" />
      <input type="password" class="auth-input" placeholder="Create a password" required id="reg-password" />
      <button type="submit" class="dm-btn-primary auth-submit" id="reg-submit">Create account</button>
    </form>
    <p class="auth-link">Already have an account? <a href="/auth/login">Sign in</a></p>
  </div>
</div>

<style>
  :global(body) { background: #0D0D0F; }
  .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .auth-card {
    background: #161618;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 48px;
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
  }
  .auth-logo { height: 22px; margin-bottom: 8px; }
  .auth-title { font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 700; }
  .auth-sub { font-size: 14px; color: rgba(255,255,255,0.45); }
  .auth-form { width: 100%; display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
  .auth-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .auth-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    color: white;
    padding: 14px 16px;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s;
  }
  .auth-input::placeholder { color: rgba(255,255,255,0.3); }
  .auth-input:focus { outline: none; border-color: rgba(230,51,41,0.4); }
  .auth-submit { width: 100%; justify-content: center; padding: 14px; font-size: 15px; margin-top: 4px; }
  .auth-link { font-size: 13px; color: rgba(255,255,255,0.4); }
  .auth-link a { color: rgba(230,51,41,0.8); text-decoration: none; }
  .auth-link a:hover { color: #E63329; }
</style>
