<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  onMount(() => {
    const input = document.getElementById('daro-input') as HTMLInputElement | null;
    input?.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') sendDaroMessage();
    });
  });

  async function sendDaroMessage() {
    const input = document.getElementById('daro-input') as HTMLInputElement | null;
    const messages = document.getElementById('daro-chat-messages');
    if (!input || !input.value.trim() || !messages) return;
    const msg = input.value.trim();
    input.value = '';

    const userMsg = document.createElement('div');
    userMsg.className = 'dash-chat-msg dash-chat-user';
    userMsg.textContent = msg;
    messages.appendChild(userMsg);

    const botMsg = document.createElement('div');
    botMsg.className = 'dash-chat-msg dash-chat-bot';
    botMsg.textContent = 'Thinking...';
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;

    try {
      const agentUrl = import.meta.env.VITE_AGENT_URL as string;
      const res = await fetch(agentUrl + '/api/dariro/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, user_role: 'team', thread_id: 'dashboard-' + Date.now() })
      });
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) { fullText += data.content; botMsg.textContent = fullText; messages.scrollTop = messages.scrollHeight; }
            } catch {}
          }
        }
      }
    } catch {
      botMsg.textContent = 'Daro is offline. Check the agent server.';
    }
  }


</script>

<svelte:head>
  <title>Dashboard | Dariro Mode</title>
</svelte:head>

<div class="dash-layout">
  <div class="dash-sidebar">
    <div class="dash-logo">
      <img src="/dariromode-logo.svg" alt="Dariro Mode" />
    </div>
    <nav class="dash-nav">
      <a href="/dashboard" class="dash-nav-item active">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Overview
      </a>
      <a href="/dashboard/projects" class="dash-nav-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        Projects
      </a>
      <a href="/dashboard/team" class="dash-nav-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        Team
      </a>
      <a href="/dashboard/chat" class="dash-nav-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Ask Daro
      </a>
    </nav>
    <div class="dash-sidebar-footer">
      <a href="/" class="dash-back-link">← Back to site</a>
    </div>
  </div>

  <main class="dash-main">
    <div class="dash-header">
      <div>
        <h1 class="dash-title">Dashboard</h1>
        <p class="dash-subtitle">Dariro Mode — Project Management</p>
      </div>
      <div class="dash-header-actions">
        <a href="#order" class="dm-btn-primary dash-new-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Project
        </a>
      </div>
    </div>

    <!-- Stats row -->
    <div class="dash-stats">
      {#each [
        { label: 'Total Projects', value: '—', icon: '📋', color: '#E63329' },
        { label: 'In Progress', value: '—', icon: '⚡', color: '#F59E0B' },
        { label: 'Awaiting Review', value: '—', icon: '👁️', color: '#8B5CF6' },
        { label: 'Completed', value: '—', icon: '✅', color: '#10B981' },
      ] as stat}
        <div class="dash-stat-card" style="--stat-color: {stat.color}">
          <div class="dash-stat-icon">{stat.icon}</div>
          <div class="dash-stat-value">{stat.value}</div>
          <div class="dash-stat-label">{stat.label}</div>
        </div>
      {/each}
    </div>

    <!-- Ask Daro widget -->
    <div class="dash-daro-widget">
      <div class="dash-daro-header">
        <span class="dash-daro-badge">🤖 Daro AI</span>
        <p class="dash-daro-title">Ask Daro anything about your projects or services</p>
      </div>
      <div class="dash-daro-chat" id="daro-chat-messages"></div>
      <div class="dash-daro-input-row">
        <input
          type="text"
          class="dash-daro-input"
          placeholder="e.g. How many projects are pending? What's the price for 500 flyers?"
          id="daro-input"
        />
        <button class="dm-btn-primary dash-daro-send" id="daro-send" on:click={sendDaroMessage}>
          Send
        </button>
      </div>
    </div>

    <!-- Recent projects placeholder -->
    <div class="dash-projects-section">
      <div class="dash-section-header">
        <h2 class="dash-section-title">Recent Projects</h2>
        <a href="/dashboard/projects" class="dash-see-all">See all →</a>
      </div>
      <div class="dash-empty-state">
        <div class="dash-empty-icon">📭</div>
        <p class="dash-empty-title">No projects yet</p>
        <p class="dash-empty-sub">Projects created through the wizard will appear here.</p>
        <a href="/#order" class="dm-btn-primary">Place your first order</a>
      </div>
    </div>
  </main>
</div>


<style>
  :global(body) { background: #0D0D0F; }
  .dash-layout { display: flex; min-height: 100vh; }
  .dash-sidebar {
    width: 220px;
    background: #111113;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    padding: 32px 20px;
    flex-shrink: 0;
  }
  .dash-logo img { height: 20px; margin-bottom: 40px; }
  .dash-nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
  .dash-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
  }
  .dash-nav-item:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); }
  .dash-nav-item.active { background: rgba(230,51,41,0.1); color: white; }
  .dash-sidebar-footer { margin-top: auto; }
  .dash-back-link { font-size: 12px; color: rgba(255,255,255,0.3); text-decoration: none; }
  .dash-back-link:hover { color: rgba(255,255,255,0.6); }
  .dash-main { flex: 1; padding: 40px 48px; overflow-y: auto; }
  .dash-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 40px; }
  .dash-title { font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 700; }
  .dash-subtitle { font-size: 14px; color: rgba(255,255,255,0.4); margin-top: 4px; }
  .dash-new-btn { padding: 10px 20px; font-size: 13px; }
  .dash-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
  .dash-stat-card {
    background: #161618;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }
  .dash-stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--stat-color); }
  .dash-stat-icon { font-size: 22px; margin-bottom: 12px; }
  .dash-stat-value { font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: white; }
  .dash-stat-label { font-size: 12px; color: rgba(255,255,255,0.35); margin-top: 4px; }
  .dash-daro-widget {
    background: #161618;
    border: 1px solid rgba(230,51,41,0.15);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 32px;
  }
  .dash-daro-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .dash-daro-badge {
    background: rgba(230,51,41,0.15);
    border: 1px solid rgba(230,51,41,0.3);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #E63329;
    white-space: nowrap;
  }
  .dash-daro-title { font-size: 14px; color: rgba(255,255,255,0.55); }
  .dash-daro-chat {
    min-height: 80px;
    max-height: 240px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 12px;
    padding: 4px 0;
  }
  :global(.dash-chat-msg) { max-width: 85%; padding: 10px 14px; border-radius: 10px; font-size: 13px; line-height: 1.5; }
  :global(.dash-chat-user) { align-self: flex-end; background: rgba(230,51,41,0.15); border: 1px solid rgba(230,51,41,0.2); color: white; }
  :global(.dash-chat-bot) { align-self: flex-start; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.8); }
  .dash-daro-input-row { display: flex; gap: 10px; }
  .dash-daro-input {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    color: white;
    padding: 10px 14px;
    font-size: 13px;
    font-family: inherit;
  }
  .dash-daro-input:focus { outline: none; border-color: rgba(230,51,41,0.4); }
  .dash-daro-send { padding: 10px 18px; font-size: 13px; }
  .dash-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .dash-section-title { font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; }
  .dash-see-all { font-size: 13px; color: rgba(255,255,255,0.4); text-decoration: none; }
  .dash-see-all:hover { color: white; }
  .dash-projects-section { background: #161618; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px; }
  .dash-empty-state { text-align: center; padding: 48px 24px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .dash-empty-icon { font-size: 48px; }
  .dash-empty-title { font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 600; }
  .dash-empty-sub { font-size: 14px; color: rgba(255,255,255,0.4); margin-bottom: 8px; }
</style>
