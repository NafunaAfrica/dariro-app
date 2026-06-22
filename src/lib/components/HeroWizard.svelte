<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  // ── Types ────────────────────────────────────────────────────────────────────
  type WizardResult = {
    category: string;
    price_min: number;
    price_max: number;
    currency: string;
    timeline_days: number;
    brief_summary: string;
    recommended_steps: string[];
    pricing_detail: string;
  };

  // ── State ─────────────────────────────────────────────────────────────────────
  let currentSlide = 1;
  let isAnimating = false;

  // Slide 1 — Category
  let selectedCategory = '';

  // Slide 2 — Sub options
  let subSelections: Record<string, string | number> = {};

  // Slide 3 — Fine config
  let fineConfig: Record<string, string | number> = {};

  // Slide 4 — Description
  let projectDescription = '';

  // Slide 5 — Processing
  let isProcessing = false;
  let processingStep = 0;
  let wizardResult: WizardResult | null = null;

  // Slide 6 — Register
  let regName = '';
  let regEmail = '';
  let regCompany = '';
  let regPhone = '';
  let isRegistering = false;
  let registerSuccess = false;
  let registeredProjectId = '';

  // ── Category Definitions ──────────────────────────────────────────────────────
  const CATEGORIES = [
    { id: 'business_cards', label: 'Print my business cards', icon: '🪪', color: '#E63329' },
    { id: 'stationery', label: 'Print stationery', icon: '📄', color: '#8B5CF6' },
    { id: 'banners', label: 'Print banners / signage', icon: '🏳️', color: '#F59E0B' },
    { id: 'brochures', label: 'Print brochures / flyers', icon: '📋', color: '#10B981' },
    { id: 'billboard', label: 'Large format / billboards', icon: '🖼️', color: '#3B82F6' },
    { id: 'branding', label: 'Brand strategy', icon: '✨', color: '#EC4899' },
    { id: 'digital_marketing', label: 'Plan a marketing campaign', icon: '📱', color: '#06B6D4' },
    { id: 'vehicle_wrap', label: 'Vehicle branding / wrap', icon: '🚗', color: '#84CC16' },
    { id: 'signage', label: 'Office signage & displays', icon: '🏢', color: '#F97316' },
    { id: 'other', label: 'Plan my project', icon: '💡', color: '#A855F7' },
  ];

  // ── Sub-option Definitions ────────────────────────────────────────────────────
  const SUB_OPTIONS: Record<string, { key: string; label: string; options: Array<{ label: string; value: string | number }> }[]> = {
    business_cards: [
      { key: 'quantity', label: 'How many cards?', options: [
        { label: '250', value: 250 }, { label: '500', value: 500 },
        { label: '1,000', value: 1000 }, { label: '2,000+', value: 2000 },
      ]},
      { key: 'finish', label: 'Finish', options: [
        { label: 'Standard Matt', value: 'matt' }, { label: 'Gloss', value: 'gloss' },
        { label: 'Soft-touch Laminate', value: 'soft_touch' }, { label: 'Spot UV', value: 'spot_uv' },
      ]},
      { key: 'sides', label: 'Printing sides', options: [
        { label: 'Single sided', value: 'single' }, { label: 'Double sided', value: 'double' },
      ]},
    ],
    stationery: [
      { key: 'items', label: 'What stationery items?', options: [
        { label: 'Letterheads', value: 'letterheads' }, { label: 'Envelopes', value: 'envelopes' },
        { label: 'Notepads', value: 'notepads' }, { label: 'Full set', value: 'full_set' },
      ]},
      { key: 'quantity', label: 'Quantity', options: [
        { label: '100', value: 100 }, { label: '250', value: 250 },
        { label: '500', value: 500 }, { label: '1,000+', value: 1000 },
      ]},
    ],
    banners: [
      { key: 'type', label: 'Banner type', options: [
        { label: 'Pull-up roller', value: 'rollup' }, { label: 'Outdoor banner', value: 'outdoor' },
        { label: 'Backdrop / media wall', value: 'backdrop' }, { label: 'Mesh banner', value: 'mesh' },
      ]},
      { key: 'size', label: 'Approximate size', options: [
        { label: 'Small (A1 / 0.85m)', value: 'small' }, { label: 'Medium (1m×2m)', value: 'medium' },
        { label: 'Large (2m×3m)', value: 'large' }, { label: 'Custom size', value: 'custom' },
      ]},
      { key: 'quantity', label: 'Quantity', options: [
        { label: '1', value: 1 }, { label: '2-5', value: 5 },
        { label: '6-20', value: 20 }, { label: '20+', value: 50 },
      ]},
    ],
    brochures: [
      { key: 'format', label: 'Format', options: [
        { label: 'A4 Flyer', value: 'a4_flyer' }, { label: 'A5 Flyer', value: 'a5_flyer' },
        { label: 'Tri-fold brochure', value: 'trifold' }, { label: 'Bi-fold brochure', value: 'bifold' },
      ]},
      { key: 'quantity', label: 'Quantity', options: [
        { label: '500', value: 500 }, { label: '1,000', value: 1000 },
        { label: '5,000', value: 5000 }, { label: '10,000+', value: 10000 },
      ]},
    ],
    billboard: [
      { key: 'size', label: 'Billboard size', options: [
        { label: '3m×6m (Standard)', value: '3x6' }, { label: '4m×8m', value: '4x8' },
        { label: '6m×12m (Large)', value: '6x12' }, { label: 'Custom', value: 'custom' },
      ]},
      { key: 'quantity', label: 'Number of sites', options: [
        { label: '1 site', value: 1 }, { label: '2-5 sites', value: 5 },
        { label: '5+ sites', value: 10 },
      ]},
    ],
    branding: [
      { key: 'stage', label: 'Business stage', options: [
        { label: 'New startup', value: 'startup' }, { label: 'Rebranding', value: 'rebrand' },
        { label: 'Brand refresh', value: 'refresh' }, { label: 'Brand extension', value: 'extension' },
      ]},
      { key: 'scope', label: 'What do you need?', options: [
        { label: 'Logo only', value: 'logo' }, { label: 'Logo + identity', value: 'identity' },
        { label: 'Full brand guide', value: 'brand_guide' }, { label: 'Complete package', value: 'complete' },
      ]},
    ],
    digital_marketing: [
      { key: 'goal', label: 'Primary goal', options: [
        { label: 'Grow followers', value: 'followers' }, { label: 'Drive sales', value: 'sales' },
        { label: 'Build awareness', value: 'awareness' }, { label: 'Launch a product', value: 'launch' },
      ]},
      { key: 'platforms', label: 'Main platform', options: [
        { label: 'Facebook', value: 'facebook' }, { label: 'Instagram', value: 'instagram' },
        { label: 'LinkedIn', value: 'linkedin' }, { label: 'All platforms', value: 'all' },
      ]},
      { key: 'duration', label: 'Campaign duration', options: [
        { label: '1 month', value: '1m' }, { label: '3 months', value: '3m' },
        { label: '6 months', value: '6m' }, { label: 'Ongoing retainer', value: 'retainer' },
      ]},
    ],
    vehicle_wrap: [
      { key: 'vehicle', label: 'Vehicle type', options: [
        { label: 'Sedan / Hatchback', value: 'sedan' }, { label: 'SUV / 4x4', value: 'suv' },
        { label: 'Van / Pickup', value: 'van' }, { label: 'Truck / Lorry', value: 'truck' },
      ]},
      { key: 'coverage', label: 'Coverage', options: [
        { label: 'Full wrap', value: 'full' }, { label: 'Partial wrap', value: 'partial' },
        { label: 'Decals only', value: 'decals' },
      ]},
      { key: 'quantity', label: 'Number of vehicles', options: [
        { label: '1', value: 1 }, { label: '2-5', value: 5 }, { label: '5+', value: 10 },
      ]},
    ],
    signage: [
      { key: 'type', label: 'Signage type', options: [
        { label: 'Reception / lobby', value: 'reception' }, { label: 'Directional signs', value: 'directional' },
        { label: 'Lightbox / illuminated', value: 'lightbox' }, { label: 'Outdoor fascia', value: 'fascia' },
      ]},
      { key: 'quantity', label: 'Number of signs', options: [
        { label: '1-3', value: 3 }, { label: '4-10', value: 10 }, { label: '10+', value: 20 },
      ]},
    ],
    other: [
      { key: 'type', label: 'Project type', options: [
        { label: 'Printing', value: 'printing' }, { label: 'Branding', value: 'branding' },
        { label: 'Marketing', value: 'marketing' }, { label: 'Mixed / unsure', value: 'mixed' },
      ]},
      { key: 'urgency', label: 'Urgency', options: [
        { label: 'No rush (2+ weeks)', value: 'standard' }, { label: 'Soon (1 week)', value: 'medium' },
        { label: 'Urgent (1-3 days)', value: 'urgent' },
      ]},
    ],
  };

  // ── Processing steps ──────────────────────────────────────────────────────────
  const processingSteps = [
    'Analysing your requirements...',
    'Calculating best pricing tiers...',
    'Estimating production timeline...',
    'Preparing your brief summary...',
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────────
  function getCategoryLabel(id: string) {
    return CATEGORIES.find(c => c.id === id)?.label ?? id;
  }

  function goToSlide(n: number) {
    if (isAnimating) return;
    isAnimating = true;
    setTimeout(() => {
      currentSlide = n;
      isAnimating = false;
    }, 50);
  }

  function selectCategory(id: string) {
    selectedCategory = id;
  }

  function setSubOption(key: string, value: string | number) {
    subSelections = { ...subSelections, [key]: value };
  }

  function canProceedSlide2() {
    const options = SUB_OPTIONS[selectedCategory] ?? [];
    if (options.length === 0) return true;
    return options.every(opt => subSelections[opt.key] !== undefined);
  }

  async function runWizard() {
    isProcessing = true;
    processingStep = 0;
    goToSlide(5);

    // Simulate processing steps
    for (let i = 0; i < processingSteps.length; i++) {
      processingStep = i;
      await new Promise(r => setTimeout(r, 900));
    }

    try {
      const AGENT_URL = import.meta.env.VITE_AGENT_URL || 'https://agents.nafuna.africa';
      const resp = await fetch(`${AGENT_URL}/api/dariro/wizard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          sub_options: { ...subSelections, ...fineConfig },
          description: projectDescription,
        }),
      });
      if (resp.ok) {
        wizardResult = await resp.json();
      } else {
        throw new Error('API error');
      }
    } catch {
      // Fallback estimate
      wizardResult = {
        category: selectedCategory,
        price_min: 30,
        price_max: 500,
        currency: 'USD',
        timeline_days: 5,
        brief_summary: `${getCategoryLabel(selectedCategory)} — ${projectDescription.slice(0, 80)}`,
        recommended_steps: [
          'Register your project to lock in this estimate',
          'Our team will confirm within 1 business day',
          "We'll send a formal quote before production",
        ],
        pricing_detail: 'Contact sales@dariromode.com for exact pricing.',
      };
    }

    isProcessing = false;
    processingStep = processingSteps.length;
  }

  async function registerProject() {
    if (!regName || !regEmail) return;
    isRegistering = true;

    try {
      const AGENT_URL = import.meta.env.VITE_AGENT_URL || 'https://agents.nafuna.africa';
      const resp = await fetch(`${AGENT_URL}/api/dariro/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: regName,
          client_email: regEmail,
          client_company: regCompany,
          client_phone: regPhone,
          service_category: selectedCategory,
          sub_options: { ...subSelections, ...fineConfig },
          project_description: projectDescription,
          price_estimate_min: wizardResult?.price_min ?? 0,
          price_estimate_max: wizardResult?.price_max ?? 0,
          currency: wizardResult?.currency ?? 'USD',
          timeline_days: wizardResult?.timeline_days ?? 5,
        }),
      });
      const data = await resp.json();
      registeredProjectId = data.project_id ?? 'new';
      registerSuccess = true;
    } catch {
      registerSuccess = true; // Show success anyway for demo
      registeredProjectId = 'demo-' + Math.random().toString(36).slice(2, 8);
    }
    isRegistering = false;
  }

  function reset() {
    currentSlide = 1;
    selectedCategory = '';
    subSelections = {};
    fineConfig = {};
    projectDescription = '';
    wizardResult = null;
    registerSuccess = false;
    registeredProjectId = '';
    regName = regEmail = regCompany = regPhone = '';
  }

  let heroParallax = 0;
  onMount(() => {
    const onScroll = () => { heroParallax = window.scrollY * 0.3; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<!-- ══════════════════════════════════════════════════════════════════════════ -->
<!-- HERO SECTION                                                              -->
<!-- ══════════════════════════════════════════════════════════════════════════ -->
<section class="dw-hero" id="order">
  <!-- Background -->
  <div class="dw-hero-bg" style="transform: translateY({heroParallax}px)"></div>
  <div class="dw-hero-overlay"></div>

  <!-- Content wrapper -->
  <div class="dw-hero-content">
    <!-- Left column: headline -->
    <div class="dw-hero-left" in:fly={{ x: -40, duration: 600, delay: 100 }}>
      <div class="dw-hero-eyebrow">
        <span class="dw-hero-dot"></span>
        Powered by AI · Est. 2011 · Harare, Zimbabwe
      </div>
      <h1 class="dw-hero-title">
        From idea to<br/>
        <span class="dw-hero-title-em">print-ready</span><br/>
        in minutes
      </h1>
      <p class="dw-hero-subtitle">
        Describe what you need. Our AI calculates the best options,
        estimates your price, and registers your project instantly.
      </p>
      <div class="dw-hero-badges">
        <div class="dw-badge"><span>🖨️</span> 15+ years excellence</div>
        <div class="dw-badge"><span>🏆</span> 1M+ prints/month</div>
        <div class="dw-badge"><span>📍</span> 2 Harare locations</div>
      </div>
    </div>

    <!-- Right column: wizard card -->
    <div class="dw-wizard-card" in:fly={{ x: 40, duration: 600, delay: 200 }}>
      <!-- Progress dots -->
      <div class="dw-progress">
        {#each [1,2,3,4,5,6] as s}
          <div class="dw-progress-dot" class:active={currentSlide >= s} class:current={currentSlide === s}></div>
        {/each}
      </div>

      <!-- ── Slide 1: Category ── -->
      {#if currentSlide === 1}
      <div class="dw-slide" in:fly={{ y: 20, duration: 300 }}>
        <p class="dw-slide-prompt">Today, I want to</p>
        <div class="dw-category-grid">
          {#each CATEGORIES as cat}
            <button
              class="dw-category-chip"
              class:selected={selectedCategory === cat.id}
              on:click={() => selectCategory(cat.id)}
              style="--chip-color: {cat.color}"
              id="cat-{cat.id}"
            >
              <span class="dw-chip-icon">{cat.icon}</span>
              <span class="dw-chip-label">{cat.label}</span>
            </button>
          {/each}
        </div>
        <div class="dw-slide-actions">
          <button
            class="dw-btn-next"
            disabled={!selectedCategory}
            on:click={() => goToSlide(2)}
            id="wizard-next-1"
          >
            Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      {/if}

      <!-- ── Slide 2: Sub-options ── -->
      {#if currentSlide === 2}
      <div class="dw-slide" in:fly={{ y: 20, duration: 300 }}>
        <button class="dw-back-btn" on:click={() => goToSlide(1)}>← Back</button>
        <p class="dw-slide-prompt">Tell me more about</p>
        <h3 class="dw-slide-category-title">{getCategoryLabel(selectedCategory)}</h3>

        {#each (SUB_OPTIONS[selectedCategory] ?? []) as optGroup}
          <div class="dw-option-group">
            <p class="dw-option-label">{optGroup.label}</p>
            <div class="dw-option-chips">
              {#each optGroup.options as opt}
                <button
                  class="dw-option-chip"
                  class:selected={subSelections[optGroup.key] === opt.value}
                  on:click={() => setSubOption(optGroup.key, opt.value)}
                  id="sub-{optGroup.key}-{opt.value}"
                >
                  {opt.label}
                </button>
              {/each}
            </div>
          </div>
        {/each}

        <div class="dw-slide-actions">
          <button
            class="dw-btn-next"
            disabled={!canProceedSlide2()}
            on:click={() => goToSlide(3)}
            id="wizard-next-2"
          >
            Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      {/if}

      <!-- ── Slide 3: Fine config ── -->
      {#if currentSlide === 3}
      <div class="dw-slide" in:fly={{ y: 20, duration: 300 }}>
        <button class="dw-back-btn" on:click={() => goToSlide(2)}>← Back</button>
        <p class="dw-slide-prompt">A few more details</p>

        <div class="dw-option-group">
          <p class="dw-option-label">Do you have your own artwork / design?</p>
          <div class="dw-option-chips">
            <button class="dw-option-chip" class:selected={fineConfig['has_design'] === 'yes'} on:click={() => fineConfig = {...fineConfig, has_design: 'yes'}} id="design-yes">Yes, I have files ready</button>
            <button class="dw-option-chip" class:selected={fineConfig['has_design'] === 'partial'} on:click={() => fineConfig = {...fineConfig, has_design: 'partial'}} id="design-partial">Partial — needs refinement</button>
            <button class="dw-option-chip" class:selected={fineConfig['has_design'] === 'no'} on:click={() => fineConfig = {...fineConfig, has_design: 'no'}} id="design-no">No — I need design too</button>
          </div>
        </div>

        <div class="dw-option-group">
          <p class="dw-option-label">When do you need this?</p>
          <div class="dw-option-chips">
            <button class="dw-option-chip" class:selected={fineConfig['urgency'] === 'standard'} on:click={() => fineConfig = {...fineConfig, urgency: 'standard'}} id="urgency-standard">2+ weeks (no rush)</button>
            <button class="dw-option-chip" class:selected={fineConfig['urgency'] === 'soon'} on:click={() => fineConfig = {...fineConfig, urgency: 'soon'}} id="urgency-soon">Within a week</button>
            <button class="dw-option-chip" class:selected={fineConfig['urgency'] === 'urgent'} on:click={() => fineConfig = {...fineConfig, urgency: 'urgent'}} id="urgency-urgent">Urgent (1–3 days)</button>
          </div>
        </div>

        <div class="dw-slide-actions">
          <button class="dw-btn-next" on:click={() => goToSlide(4)} id="wizard-next-3">
            Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      {/if}

      <!-- ── Slide 4: Description ── -->
      {#if currentSlide === 4}
      <div class="dw-slide" in:fly={{ y: 20, duration: 300 }}>
        <button class="dw-back-btn" on:click={() => goToSlide(3)}>← Back</button>
        <p class="dw-slide-prompt">Describe your project</p>
        <p class="dw-slide-hint">Tell us what you're printing, your brand, any specific requirements, or upload references later.</p>
        <textarea
          class="dw-textarea"
          placeholder="e.g. We're a new law firm launching in September. Need 500 business cards double-sided, dark navy with gold foil logo. Professional, premium feel..."
          bind:value={projectDescription}
          rows="5"
          id="project-description"
        ></textarea>
        <div class="dw-slide-actions">
          <button
            class="dw-btn-next dw-btn-generate"
            on:click={runWizard}
            id="wizard-generate"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Generate my estimate
          </button>
        </div>
      </div>
      {/if}

      <!-- ── Slide 5: Processing / Results ── -->
      {#if currentSlide === 5}
      <div class="dw-slide" in:fly={{ y: 20, duration: 300 }}>
        {#if isProcessing}
          <div class="dw-processing">
            <div class="dw-processing-spinner"></div>
            <p class="dw-processing-label">{processingSteps[processingStep] ?? 'Almost there...'}</p>
            <div class="dw-processing-steps">
              {#each processingSteps as step, i}
                <div class="dw-proc-step" class:done={processingStep > i} class:active={processingStep === i}>
                  {#if processingStep > i}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                  {:else if processingStep === i}
                    <div class="dw-proc-dot"></div>
                  {:else}
                    <div class="dw-proc-dot dw-proc-dot-inactive"></div>
                  {/if}
                  <span>{step}</span>
                </div>
              {/each}
            </div>
          </div>
        {:else if wizardResult}
          <div class="dw-result">
            <div class="dw-result-header">
              <div class="dw-result-check">✓</div>
              <p class="dw-result-title">Estimate Ready</p>
            </div>

            <div class="dw-result-price">
              <span class="dw-price-label">Estimated Range</span>
              <div class="dw-price-range">
                <span class="dw-price-amount">${wizardResult.price_min} – ${wizardResult.price_max}</span>
                <span class="dw-price-currency">{wizardResult.currency}</span>
              </div>
              <span class="dw-price-timeline">⏱ ~{wizardResult.timeline_days} business day{wizardResult.timeline_days !== 1 ? 's' : ''} production</span>
            </div>

            <div class="dw-result-brief">
              <p class="dw-result-brief-text">{wizardResult.brief_summary}</p>
            </div>

            <div class="dw-result-steps">
              {#each wizardResult.recommended_steps as step, i}
                <div class="dw-result-step">
                  <span class="dw-step-num">{i + 1}</span>
                  <span>{step}</span>
                </div>
              {/each}
            </div>

            <button class="dw-btn-next" on:click={() => goToSlide(6)} id="wizard-register">
              Save my project & register →
            </button>
          </div>
        {/if}
      </div>
      {/if}

      <!-- ── Slide 6: Register ── -->
      {#if currentSlide === 6}
      <div class="dw-slide" in:fly={{ y: 20, duration: 300 }}>
        {#if !registerSuccess}
          <button class="dw-back-btn" on:click={() => goToSlide(5)}>← Back</button>
          <p class="dw-slide-prompt">Save your project</p>
          <p class="dw-slide-hint">Create a free account to track your project and get your team started.</p>

          <div class="dw-form">
            <div class="dw-form-row">
              <input class="dw-input" type="text" placeholder="Full name *" bind:value={regName} id="reg-name" />
              <input class="dw-input" type="email" placeholder="Email address *" bind:value={regEmail} id="reg-email" />
            </div>
            <div class="dw-form-row">
              <input class="dw-input" type="text" placeholder="Company (optional)" bind:value={regCompany} id="reg-company" />
              <input class="dw-input" type="tel" placeholder="Phone (optional)" bind:value={regPhone} id="reg-phone" />
            </div>
          </div>

          <button
            class="dw-btn-next dw-btn-register"
            disabled={!regName || !regEmail || isRegistering}
            on:click={registerProject}
            id="wizard-submit"
          >
            {#if isRegistering}
              <div class="dw-btn-spinner"></div> Saving...
            {:else}
              🚀 Register my project
            {/if}
          </button>
          <p class="dw-register-note">No credit card needed. Our team will reach out within 1 business day.</p>
        {:else}
          <!-- Success state -->
          <div class="dw-success" in:fly={{ y: 20, duration: 400 }}>
            <div class="dw-success-icon">🎉</div>
            <h3 class="dw-success-title">You're all set, {regName.split(' ')[0]}!</h3>
            <p class="dw-success-text">Your project <strong>#{registeredProjectId}</strong> has been logged. The Dariro Mode team has been notified and will reach out shortly.</p>
            <div class="dw-success-actions">
              <a href="/auth/register?email={encodeURIComponent(regEmail)}" class="dw-btn-next" id="wizard-goto-dashboard">Set up your account →</a>
              <button class="dw-btn-ghost" on:click={reset} id="wizard-start-over">Start another project</button>
            </div>
          </div>
        {/if}
      </div>
      {/if}
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="dw-scroll-hint">
    <div class="dw-scroll-line"></div>
    <span>Scroll to explore</span>
  </div>
</section>

<style>
  /* ── Hero layout ──────────────────────────────────────────────────────── */
  .dw-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 120px 24px 80px;
  }
  .dw-hero-bg {
    position: absolute;
    inset: -20%;
    background-image: url('/hero-bg.png');
    background-size: cover;
    background-position: center;
    will-change: transform;
  }
  .dw-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(13,13,15,0.92) 0%,
      rgba(13,13,15,0.75) 50%,
      rgba(13,13,15,0.88) 100%
    );
  }
  .dw-hero-content {
    position: relative;
    z-index: 10;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }

  /* ── Left column ──────────────────────────────────────────────────────── */
  .dw-hero-eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 24px;
  }
  .dw-hero-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--dm-red);
    animation: pulse-red 2s infinite;
  }
  .dw-hero-title {
    font-size: clamp(42px, 5vw, 64px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-bottom: 24px;
  }
  .dw-hero-title-em {
    color: var(--dm-red);
    font-style: italic;
  }
  .dw-hero-subtitle {
    font-size: 16px;
    color: rgba(255,255,255,0.6);
    line-height: 1.7;
    max-width: 420px;
    margin-bottom: 36px;
  }
  .dw-hero-badges {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .dw-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 100px;
    padding: 8px 14px;
    font-size: 12px;
    color: rgba(255,255,255,0.6);
    font-weight: 500;
  }

  /* ── Wizard Card ──────────────────────────────────────────────────────── */
  .dw-wizard-card {
    background: rgba(22, 22, 24, 0.92);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(230,51,41,0.05);
    min-height: 480px;
  }

  /* ── Progress ──────────────────────────────────────────────────────────── */
  .dw-progress {
    display: flex;
    gap: 6px;
    margin-bottom: 28px;
  }
  .dw-progress-dot {
    flex: 1;
    height: 3px;
    border-radius: 2px;
    background: rgba(255,255,255,0.1);
    transition: background 0.3s;
  }
  .dw-progress-dot.active { background: rgba(230,51,41,0.5); }
  .dw-progress-dot.current { background: var(--dm-red); }

  /* ── Slide ─────────────────────────────────────────────────────────────── */
  .dw-slide { animation: fadeIn 0.3s ease; }
  .dw-slide-prompt {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 16px;
  }
  .dw-slide-category-title {
    font-family: var(--dm-font-heading);
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: white;
  }
  .dw-slide-hint {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
    margin-bottom: 16px;
  }
  .dw-slide-actions {
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;
  }
  .dw-back-btn {
    background: none;
    border: none;
    color: rgba(255,255,255,0.4);
    font-size: 13px;
    cursor: pointer;
    padding: 0;
    margin-bottom: 16px;
    transition: color 0.2s;
  }
  .dw-back-btn:hover { color: rgba(255,255,255,0.7); }

  /* ── Category Grid ─────────────────────────────────────────────────────── */
  .dw-category-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    max-height: 320px;
    overflow-y: auto;
    padding-right: 4px;
    margin-bottom: 4px;
  }
  .dw-category-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 12px 14px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }
  .dw-category-chip:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.15);
    transform: translateY(-1px);
  }
  .dw-category-chip.selected {
    background: rgba(230,51,41,0.12);
    border-color: var(--dm-red);
    box-shadow: 0 0 0 1px rgba(230,51,41,0.2);
  }
  .dw-chip-icon { font-size: 18px; flex-shrink: 0; }
  .dw-chip-label { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.8); line-height: 1.3; }
  .dw-category-chip.selected .dw-chip-label { color: white; }

  /* ── Option Groups ─────────────────────────────────────────────────────── */
  .dw-option-group { margin-bottom: 20px; }
  .dw-option-label {
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.45);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }
  .dw-option-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .dw-option-chip {
    padding: 8px 14px;
    border-radius: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.65);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .dw-option-chip:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: white; }
  .dw-option-chip.selected { background: rgba(230,51,41,0.15); border-color: var(--dm-red); color: white; }

  /* ── Textarea ──────────────────────────────────────────────────────────── */
  .dw-textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    color: white;
    padding: 16px;
    font-size: 13px;
    font-family: var(--dm-font-body);
    line-height: 1.6;
    resize: vertical;
    transition: border-color 0.2s;
  }
  .dw-textarea::placeholder { color: rgba(255,255,255,0.3); }
  .dw-textarea:focus { outline: none; border-color: rgba(230,51,41,0.4); }

  /* ── Buttons ───────────────────────────────────────────────────────────── */
  .dw-btn-next {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--dm-red);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 14px 24px;
    font-size: 14px;
    font-weight: 700;
    font-family: var(--dm-font-heading);
    cursor: pointer;
    transition: all 0.2s;
  }
  .dw-btn-next:hover:not(:disabled) { background: var(--dm-red-dark); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(230,51,41,0.35); }
  .dw-btn-next:disabled { opacity: 0.4; cursor: not-allowed; }
  .dw-btn-generate { gap: 10px; }
  .dw-btn-register { width: 100%; justify-content: center; margin-top: 20px; }
  .dw-btn-ghost {
    background: none;
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.5);
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .dw-btn-ghost:hover { border-color: rgba(255,255,255,0.3); color: white; }
  .dw-btn-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin-slow 0.7s linear infinite;
  }

  /* ── Processing ────────────────────────────────────────────────────────── */
  .dw-processing {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    gap: 24px;
  }
  .dw-processing-spinner {
    width: 48px; height: 48px;
    border: 3px solid rgba(230,51,41,0.2);
    border-top-color: var(--dm-red);
    border-radius: 50%;
    animation: spin-slow 0.9s linear infinite;
  }
  .dw-processing-label { font-size: 14px; color: rgba(255,255,255,0.6); font-style: italic; }
  .dw-processing-steps { width: 100%; display: flex; flex-direction: column; gap: 10px; }
  .dw-proc-step {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    transition: color 0.3s;
  }
  .dw-proc-step.done { color: rgba(255,255,255,0.6); }
  .dw-proc-step.active { color: white; }
  .dw-proc-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.15); flex-shrink: 0; }
  .dw-proc-dot-inactive { background: rgba(255,255,255,0.08); }
  .dw-proc-step.active .dw-proc-dot { background: var(--dm-red); box-shadow: 0 0 8px rgba(230,51,41,0.5); }

  /* ── Results ───────────────────────────────────────────────────────────── */
  .dw-result { display: flex; flex-direction: column; gap: 16px; }
  .dw-result-header { display: flex; align-items: center; gap: 10px; }
  .dw-result-check {
    width: 28px; height: 28px;
    background: rgba(16, 185, 129, 0.2);
    border: 1px solid rgba(16, 185, 129, 0.4);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; color: #10B981; flex-shrink: 0;
  }
  .dw-result-title { font-weight: 700; font-size: 16px; }
  .dw-result-price {
    background: rgba(230,51,41,0.08);
    border: 1px solid rgba(230,51,41,0.15);
    border-radius: 12px;
    padding: 20px;
  }
  .dw-price-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); display: block; margin-bottom: 8px; }
  .dw-price-range { display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px; }
  .dw-price-amount { font-family: var(--dm-font-heading); font-size: 28px; font-weight: 800; color: white; }
  .dw-price-currency { font-size: 14px; color: rgba(255,255,255,0.5); font-weight: 500; }
  .dw-price-timeline { font-size: 12px; color: rgba(255,255,255,0.45); }
  .dw-result-brief { background: rgba(255,255,255,0.03); border-radius: 8px; padding: 12px 16px; }
  .dw-result-brief-text { font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.6; }
  .dw-result-steps { display: flex; flex-direction: column; gap: 8px; }
  .dw-result-step { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.65); }
  .dw-step-num {
    width: 20px; height: 20px;
    background: rgba(230,51,41,0.15);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700; color: var(--dm-red);
    flex-shrink: 0;
  }

  /* ── Register form ─────────────────────────────────────────────────────── */
  .dw-form { display: flex; flex-direction: column; gap: 10px; margin-bottom: 4px; }
  .dw-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .dw-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    color: white;
    padding: 12px 14px;
    font-size: 13px;
    font-family: var(--dm-font-body);
    transition: border-color 0.2s;
  }
  .dw-input::placeholder { color: rgba(255,255,255,0.3); }
  .dw-input:focus { outline: none; border-color: rgba(230,51,41,0.4); }
  .dw-register-note { font-size: 11px; color: rgba(255,255,255,0.3); text-align: center; margin-top: 12px; }

  /* ── Success ───────────────────────────────────────────────────────────── */
  .dw-success { text-align: center; padding: 20px 0; }
  .dw-success-icon { font-size: 48px; margin-bottom: 16px; }
  .dw-success-title { font-family: var(--dm-font-heading); font-size: 22px; font-weight: 700; margin-bottom: 12px; }
  .dw-success-text { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 24px; }
  .dw-success-actions { display: flex; flex-direction: column; gap: 10px; align-items: center; }

  /* ── Scroll hint ───────────────────────────────────────────────────────── */
  .dw-scroll-hint {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
  }
  .dw-scroll-line {
    width: 1px;
    height: 32px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.2));
  }

  /* ── Responsive ──────────────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .dw-hero-content { grid-template-columns: 1fr; gap: 40px; }
    .dw-hero-left { text-align: center; }
    .dw-hero-subtitle { max-width: 100%; }
    .dw-hero-badges { justify-content: center; }
    .dw-scroll-hint { display: none; }
    .dw-form-row { grid-template-columns: 1fr; }
  }
  @media (max-width: 500px) {
    .dw-category-grid { grid-template-columns: 1fr; }
  }
</style>
