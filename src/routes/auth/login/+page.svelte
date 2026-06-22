<svelte:head>
  <title>Login | Dariro Mode</title>
</svelte:head>

<div class="auth-page">
  <div class="auth-card">
    <img src="/dariromode-logo.svg" alt="Dariro Mode" class="auth-logo" />
    <h1 class="auth-title">Welcome back</h1>
    <p class="auth-sub">Sign in to your Dariro Mode account</p>
    <form class="auth-form">
      <input type="email" class="auth-input" placeholder="Email address" required id="login-email" />
      <input type="password" class="auth-input" placeholder="Password" required id="login-password" />
      <button type="submit" class="dm-btn-primary auth-submit" id="login-submit">Sign in</button>
    </form>
    <p class="auth-link">New client? <a href="/auth/register">Create your account</a></p>
    <p class="auth-link"><a href="/">← Back to site</a></p>
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
    max-width: 420px;
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
