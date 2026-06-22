<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ModalSystem from '$lib/components/ModalSystem.svelte';
</script>

<ModalSystem />
<Nav />
<main>
  <slot />
</main>
<Footer />
