<script lang="ts">
  import { modalStore, closeModal } from '$lib/stores/modal';
  import { fade, fly } from 'svelte/transition';

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') closeModal();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $modalStore}
<div class="dm-modal-backdrop" on:click|self={closeModal} transition:fade={{ duration: 200 }}>
  <div class="dm-modal" transition:fly={{ y: 30, duration: 300 }}>
    <button class="dm-modal-close" on:click={closeModal} aria-label="Close">&times;</button>
    <h2 class="dm-modal-title">{$modalStore.title}</h2>
    {#if $modalStore.html}
      <div class="dm-modal-body">{@html $modalStore.html}</div>
    {/if}
  </div>
</div>
{/if}

<style>
  .dm-modal-title {
    font-family: var(--dm-font-heading);
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 24px;
    padding-right: 40px;
  }
  .dm-modal-body {
    color: rgba(255,255,255,0.75);
    line-height: 1.7;
    font-size: 15px;
  }
  :global(.dm-modal-body p) { margin-bottom: 16px; }
  :global(.dm-modal-body ul) { padding-left: 20px; margin-bottom: 16px; }
  :global(.dm-modal-body li) { margin-bottom: 8px; }
</style>
