<script lang="ts">
  import HeroWizard from '$lib/components/HeroWizard.svelte';
  import { openModal } from '$lib/stores/modal';
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';


  // Services data
  const services = [
    {
      id: 'large-format',
      icon: '🏳️',
      title: 'Large Format Printing',
      tagline: 'Make a bold statement',
      description: 'Banners, billboards, exhibition displays, backdrops, and pop-up banners. Vivid colours and stunning detail at any scale.',
      details: `<p>Our large format printing service handles projects of any scale — from a single pop-up banner to a full billboard campaign across multiple sites.</p>
      <ul>
        <li>Pull-up roller banners (0.85m × 2m standard)</li>
        <li>Outdoor vinyl banners (all weather-resistant)</li>
        <li>Backdrops & media walls (for events & photography)</li>
        <li>Exhibition displays & trade show materials</li>
        <li>Billboards: 3×6m up to 6×12m</li>
        <li>Mesh banners for outdoor wind resistance</li>
      </ul>
      <p><strong>Turnaround:</strong> 1–3 business days standard. Same-day available for urgent jobs.</p>`,
      stat: '3m+',
      statLabel: 'Max print width',
      color: '#E63329',
    },
    {
      id: 'lithographic',
      icon: '📚',
      title: 'Lithographic Bulk Printing',
      tagline: 'Volume without compromise',
      description: 'Brochures, annual reports, catalogues, and flyers. Over 1 million prints per month with consistent colour accuracy.',
      details: `<p>When quality must stay consistent across hundreds of thousands of prints, lithographic printing is the gold standard.</p>
      <ul>
        <li>Corporate brochures (A4, A5, A6 sizes)</li>
        <li>Annual reports & catalogues</li>
        <li>Magazines & newsletters</li>
        <li>High-volume flyer campaigns</li>
        <li>NCR (carbon copy) forms</li>
        <li>Consistent Pantone colour matching</li>
      </ul>
      <p><strong>Monthly capacity:</strong> 1,000,000+ prints. Minimum order: 1,000 units.</p>`,
      stat: '1M+',
      statLabel: 'Prints per month',
      color: '#8B5CF6',
    },
    {
      id: 'digital-printing',
      icon: '🖨️',
      title: 'Digital Printing',
      tagline: 'Fast, precise, professional',
      description: 'Business cards, flyers, posters, letterheads, and stationery. High resolution with fast turnaround for modern businesses.',
      details: `<p>Perfect for smaller print runs and last-minute jobs. Our digital printers deliver sharp, vibrant output without setup fees.</p>
      <ul>
        <li>Business cards (standard, square, folded)</li>
        <li>Flyers & leaflets (A4, A5, DL)</li>
        <li>Posters (A3, A2, A1)</li>
        <li>Letterheads & compliment slips</li>
        <li>Postcards & invitations</li>
        <li>Photo prints & canvas</li>
      </ul>
      <p><strong>Minimum order:</strong> 50 units. <strong>Turnaround:</strong> As fast as same-day.</p>`,
      stat: '300dpi',
      statLabel: 'Resolution',
      color: '#10B981',
    },
    {
      id: 'signage',
      icon: '🏢',
      title: 'Signage & Branding',
      tagline: 'Own every space you enter',
      description: 'Roll-up banners, lightboxes, vehicle wraps, corporate flags, and full office branding. Concept to installation.',
      details: `<p>We don't just print — we brand your entire environment, from the reception to the roads.</p>
      <ul>
        <li>Vehicle wraps (cars, vans, trucks, fleets)</li>
        <li>Office & reception signage</li>
        <li>Illuminated lightboxes & LED signs</li>
        <li>Corporate flags (tabletop to 6m outdoor)</li>
        <li>Directional & wayfinding systems</li>
        <li>Exhibition stands & displays</li>
      </ul>
      <p><strong>Full service:</strong> Design → print → fabricate → install. We handle everything.</p>`,
      stat: '100%',
      statLabel: 'Full install service',
      color: '#F59E0B',
    },
    {
      id: 'digital-marketing',
      icon: '📱',
      title: 'Digital Marketing',
      tagline: 'Your brand online, amplified',
      description: "Social media management, content creation, brand strategy, and online campaigns. Zimbabwe's print authority goes digital.",
      details: `<p>We've branded Zimbabwe's top companies for 15 years. Now we bring that creative power to your digital presence.</p>
      <ul>
        <li>Social media management (Facebook, Instagram, LinkedIn, X)</li>
        <li>Content creation: graphics, reels, carousels</li>
        <li>Brand strategy & positioning</li>
        <li>Community management & engagement</li>
        <li>Paid social & Google Ads campaigns</li>
        <li>Monthly analytics & reporting</li>
      </ul>
      <p><strong>Packages from:</strong> $150/month. Integrated with your print identity.</p>`,
      stat: '5',
      statLabel: 'Platforms managed',
      color: '#06B6D4',
      isNew: true,
    },
    {
      id: 'branding',
      icon: '✨',
      title: 'Brand Strategy',
      tagline: 'Identity that speaks volumes',
      description: 'Logo design, brand guides, corporate identity systems. Built for startups, rebrands, and extensions.',
      details: `<p>A great brand is more than a logo. We create complete identity systems that work across print and digital.</p>
      <ul>
        <li>Logo design (3 concepts + revisions)</li>
        <li>Full brand identity guide</li>
        <li>Colour palettes & typography systems</li>
        <li>Business stationery set design</li>
        <li>Brand voice & messaging guidelines</li>
        <li>Digital asset packs (social media templates)</li>
      </ul>
      <p><strong>Turnaround:</strong> 10–14 business days for a complete brand package.</p>`,
      stat: '∞',
      statLabel: 'Creative possibilities',
      color: '#EC4899',
    },
  ];

  // Testimonials
  const testimonials = [
    { name: 'Tendai M.', role: 'Marketing Manager', quote: 'Dariro Mode has been our go-to partner for all our branding and printing needs. Their attention to detail, exceptional quality, and timely delivery are unmatched.' },
    { name: 'Farai K.', role: 'CEO, Startup Harare', quote: 'From logo to business cards to signage — they handled our entire rebrand. Delivered on time and the quality blew us away. Truly a one-stop shop.' },
    { name: 'Steven M.', role: 'Event Director', quote: 'Even with a tight deadline, Dariro Mode delivered high-quality promotional materials for our event. Their efficiency and expertise are second to none.' },
    { name: 'Chipo R.', role: 'Brand Manager', quote: 'The team is incredibly creative and professional. Our corporate brochures received amazing feedback from clients. We\'ll continue working with them.' },
  ];

  let activeTestimonial = 0;
  let testimonialInterval: ReturnType<typeof setInterval>;

  onMount(() => {
    testimonialInterval = setInterval(() => {
      activeTestimonial = (activeTestimonial + 1) % testimonials.length;
    }, 4500);
    return () => clearInterval(testimonialInterval);
  });

  function showServiceDetails(service: typeof services[0]) {
    openModal({
      title: service.title,
      html: service.details,
    });
  }
</script>

<!-- ── Hero Wizard ──────────────────────────────────────────────────────────── -->
<HeroWizard />

<!-- ── Services ────────────────────────────────────────────────────────────── -->
<section class="dm-services" id="services">
  <div class="dm-container">
    <div class="dm-services-header">
      <div class="dm-section-label">What we do</div>
      <h2 class="dm-services-title">
        Full-spectrum creative<br/>
        <span class="dm-services-title-em">production & marketing</span>
      </h2>
      <p class="dm-services-sub">From business cards to billboards, branding to digital campaigns — one partner, total consistency.</p>
    </div>

    <div class="dm-services-grid">
      {#each services as service (service.id)}
        <div class="dm-service-card" style="--card-color: {service.color}">
          {#if service.isNew}
            <div class="dm-new-badge">NEW</div>
          {/if}
          <div class="dm-service-icon">{service.icon}</div>
          <div class="dm-service-stat">
            <span class="dm-stat-value">{service.stat}</span>
            <span class="dm-stat-label">{service.statLabel}</span>
          </div>
          <h3 class="dm-service-title">{service.title}</h3>
          <p class="dm-service-tagline">{service.tagline}</p>
          <p class="dm-service-desc">{service.description}</p>
          <button class="dm-service-cta" on:click={() => showServiceDetails(service)} id="service-{service.id}">
            Learn more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      {/each}
    </div>

    <div class="dm-services-cta-bar">
      <p>Not sure which service you need?</p>
      <a href="#order" class="dm-btn-primary">Use our AI wizard to figure it out →</a>
    </div>
  </div>
</section>

<!-- ── About ────────────────────────────────────────────────────────────────── -->
<section class="dm-about" id="about">
  <div class="dm-container">
    <div class="dm-about-grid">
      <div class="dm-about-left">
        <div class="dm-section-label">Our story</div>
        <h2 class="dm-about-title">Zimbabwe's creative<br/>production powerhouse</h2>
        <p class="dm-about-text">
          Established in <strong>2011</strong> in Harare, Dariro Mode grew from a specialist business card printer
          into Zimbabwe's most trusted full-service printing and branding company.
        </p>
        <p class="dm-about-text">
          In 2012, we invested in cutting-edge lithographic machinery — enabling bulk print runs at a scale
          previously unavailable locally. Today, we operate from two Harare locations, serving corporate clients,
          government, NGOs, and SMEs across the country.
        </p>
        <p class="dm-about-text">
          Now, we're expanding into <strong>digital marketing</strong> — bringing 15 years of brand expertise online.
        </p>
        <div class="dm-about-stats">
          <div class="dm-about-stat"><span class="dm-about-stat-num">2011</span><span class="dm-about-stat-label">Founded</span></div>
          <div class="dm-about-stat"><span class="dm-about-stat-num">15+</span><span class="dm-about-stat-label">Years of excellence</span></div>
          <div class="dm-about-stat"><span class="dm-about-stat-num">2</span><span class="dm-about-stat-label">Harare locations</span></div>
          <div class="dm-about-stat"><span class="dm-about-stat-num">1M+</span><span class="dm-about-stat-label">Prints/month</span></div>
        </div>
        <div class="dm-about-locations">
          <div class="dm-location">
            <div class="dm-location-icon">🏢</div>
            <div>
              <p class="dm-location-name">Head Office</p>
              <p class="dm-location-addr">21 Buckingham Road, Eastlea, Harare</p>
            </div>
          </div>
          <div class="dm-location">
            <div class="dm-location-icon">🏙️</div>
            <div>
              <p class="dm-location-name">CBD Branch</p>
              <p class="dm-location-addr">Africa House, 100 Jason Moyo Ave, Harare</p>
            </div>
          </div>
        </div>
      </div>

      <div class="dm-about-right">
        <!-- Testimonials -->
        <div class="dm-testimonials">
          <div class="dm-section-label">Client voices</div>
          <div class="dm-testimonial-card">
            {#key activeTestimonial}
              <div class="dm-testimonial-body" in:fade={{ duration: 400 }}>
                <div class="dm-testimonial-quote">"</div>
                <p class="dm-testimonial-text">{testimonials[activeTestimonial].quote}</p>
                <div class="dm-testimonial-author">
                  <div class="dm-testimonial-avatar">{testimonials[activeTestimonial].name[0]}</div>
                  <div>
                    <p class="dm-testimonial-name">{testimonials[activeTestimonial].name}</p>
                    <p class="dm-testimonial-role">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>
            {/key}
          </div>
          <div class="dm-testimonial-dots">
            {#each testimonials as _, i}
              <button
                class="dm-t-dot"
                class:active={activeTestimonial === i}
                on:click={() => { activeTestimonial = i; clearInterval(testimonialInterval); }}
                aria-label="Testimonial {i+1}"
              ></button>
            {/each}
          </div>
        </div>

        <!-- Values -->
        <div class="dm-values">
          {#each [
            { icon: '🎯', title: 'Precision', desc: 'Every print, every time — consistent colour and quality' },
            { icon: '🇿🇼', title: 'Zimbabwean', desc: 'Wholly local, deeply invested in our market' },
            { icon: '⚡', title: 'Speed', desc: 'Fast turnarounds without compromising quality' },
          ] as value}
            <div class="dm-value">
              <span class="dm-value-icon">{value.icon}</span>
              <div>
                <p class="dm-value-title">{value.title}</p>
                <p class="dm-value-desc">{value.desc}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── CTA Bar ──────────────────────────────────────────────────────────────── -->
<section class="dm-cta-bar">
  <div class="dm-container dm-cta-bar-inner">
    <div>
      <h2 class="dm-cta-bar-title">Ready to bring your brand to life?</h2>
      <p class="dm-cta-bar-sub">Use our AI wizard — get an estimate in under 2 minutes.</p>
    </div>
    <div class="dm-cta-bar-actions">
      <a href="#order" class="dm-btn-primary" id="cta-place-order">Place your order →</a>
      <a href="mailto:sales@dariromode.com" class="dm-btn-outline">Email us directly</a>
    </div>
  </div>
</section>

<style>
  /* ── Services ──────────────────────────────────────────────────────────── */
  .dm-services {
    padding: 120px 0;
    background: var(--dm-bg);
  }
  .dm-services-header { text-align: center; margin-bottom: 64px; }
  .dm-services-header .dm-section-label { justify-content: center; }
  .dm-services-header .dm-section-label::before { display: none; }
  .dm-services-title {
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 16px;
  }
  .dm-services-title-em { color: var(--dm-red); }
  .dm-services-sub { font-size: 16px; color: rgba(255,255,255,0.5); max-width: 480px; margin: 0 auto; }

  .dm-services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 48px;
  }
  .dm-service-card {
    background: var(--dm-surface);
    border: 1px solid var(--dm-border);
    border-radius: 16px;
    padding: 32px 28px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .dm-service-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--card-color);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  .dm-service-card:hover {
    border-color: rgba(255,255,255,0.12);
    transform: translateY(-4px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.4);
  }
  .dm-service-card:hover::before { transform: scaleX(1); }

  .dm-new-badge {
    position: absolute;
    top: 16px; right: 16px;
    background: var(--dm-red);
    color: white;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.1em;
    padding: 3px 8px;
    border-radius: 100px;
  }
  .dm-service-icon { font-size: 28px; margin-bottom: 8px; }
  .dm-service-stat { display: flex; align-items: baseline; gap: 6px; }
  .dm-stat-value {
    font-family: var(--dm-font-heading);
    font-size: 28px;
    font-weight: 800;
    color: var(--card-color);
  }
  .dm-stat-label { font-size: 11px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.08em; }
  .dm-service-title { font-family: var(--dm-font-heading); font-size: 18px; font-weight: 700; }
  .dm-service-tagline { font-size: 12px; color: var(--card-color); font-weight: 600; }
  .dm-service-desc { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.6; flex: 1; }
  .dm-service-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    color: rgba(255,255,255,0.5);
    font-size: 12px;
    font-weight: 600;
    padding: 8px 14px;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 8px;
    align-self: flex-start;
  }
  .dm-service-cta:hover { border-color: var(--card-color); color: var(--card-color); }

  .dm-services-cta-bar {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--dm-border);
    border-radius: 12px;
    padding: 24px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
  .dm-services-cta-bar p { color: rgba(255,255,255,0.55); font-size: 15px; }

  /* ── About ─────────────────────────────────────────────────────────────── */
  .dm-about {
    padding: 120px 0;
    background: var(--dm-surface);
  }
  .dm-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .dm-about-title {
    font-size: clamp(28px, 3.5vw, 44px);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 24px;
  }
  .dm-about-text { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.8; margin-bottom: 16px; }
  .dm-about-text strong { color: white; }
  .dm-about-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 36px 0;
    padding: 24px;
    background: var(--dm-surface-2);
    border-radius: 12px;
    border: 1px solid var(--dm-border);
  }
  .dm-about-stat { text-align: center; }
  .dm-about-stat-num { display: block; font-family: var(--dm-font-heading); font-size: 24px; font-weight: 800; color: var(--dm-red); }
  .dm-about-stat-label { font-size: 11px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.08em; }
  .dm-about-locations { display: flex; flex-direction: column; gap: 12px; }
  .dm-location { display: flex; align-items: flex-start; gap: 12px; background: var(--dm-surface-2); border: 1px solid var(--dm-border); border-radius: 10px; padding: 16px; }
  .dm-location-icon { font-size: 20px; flex-shrink: 0; }
  .dm-location-name { font-size: 13px; font-weight: 600; margin-bottom: 2px; }
  .dm-location-addr { font-size: 12px; color: rgba(255,255,255,0.4); }

  /* Testimonials */
  .dm-testimonials { margin-bottom: 32px; }
  .dm-testimonial-card {
    background: var(--dm-surface-2);
    border: 1px solid var(--dm-border);
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 16px;
    min-height: 220px;
  }
  .dm-testimonial-quote { font-size: 60px; line-height: 0.8; color: var(--dm-red); font-family: serif; margin-bottom: 8px; }
  .dm-testimonial-text { font-size: 15px; color: rgba(255,255,255,0.8); line-height: 1.7; margin-bottom: 20px; font-style: italic; }
  .dm-testimonial-author { display: flex; align-items: center; gap: 12px; }
  .dm-testimonial-avatar {
    width: 40px; height: 40px;
    background: var(--dm-red);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--dm-font-heading);
    font-weight: 700;
    font-size: 16px;
  }
  .dm-testimonial-name { font-weight: 600; font-size: 14px; }
  .dm-testimonial-role { font-size: 12px; color: rgba(255,255,255,0.4); }
  .dm-testimonial-dots { display: flex; gap: 8px; }
  .dm-t-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }
  .dm-t-dot.active { background: var(--dm-red); width: 24px; border-radius: 4px; }

  /* Values */
  .dm-values { display: flex; flex-direction: column; gap: 16px; }
  .dm-value {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    background: var(--dm-surface-2);
    border: 1px solid var(--dm-border);
    border-radius: 10px;
    padding: 16px;
  }
  .dm-value-icon { font-size: 20px; flex-shrink: 0; }
  .dm-value-title { font-weight: 600; font-size: 14px; margin-bottom: 2px; }
  .dm-value-desc { font-size: 12px; color: rgba(255,255,255,0.4); }

  /* CTA Bar */
  .dm-cta-bar {
    background: linear-gradient(135deg, #1a0505 0%, #0D0D0F 100%);
    border-top: 1px solid rgba(230,51,41,0.15);
    border-bottom: 1px solid rgba(230,51,41,0.15);
    padding: 80px 0;
  }
  .dm-cta-bar-inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
  .dm-cta-bar-title { font-size: clamp(24px, 3vw, 36px); font-weight: 800; margin-bottom: 8px; }
  .dm-cta-bar-sub { color: rgba(255,255,255,0.5); font-size: 15px; }
  .dm-cta-bar-actions { display: flex; gap: 12px; flex-shrink: 0; }

  @media (max-width: 1000px) {
    .dm-services-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 900px) {
    .dm-about-grid { grid-template-columns: 1fr; gap: 48px; }
    .dm-about-stats { grid-template-columns: repeat(2, 1fr); }
    .dm-cta-bar-inner { flex-direction: column; text-align: center; }
    .dm-services-cta-bar { flex-direction: column; text-align: center; }
  }
  @media (max-width: 600px) {
    .dm-services-grid { grid-template-columns: 1fr; }
    .dm-cta-bar-actions { flex-direction: column; }
  }
</style>
