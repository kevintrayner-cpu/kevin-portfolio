const content = window.PORTFOLIO_CONTENT;

if (!content) {
  throw new Error('Missing PORTFOLIO_CONTENT. Ensure content.js loads before script.js.');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function applySeo() {
  document.title = content.seo.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');

  if (metaDescription) metaDescription.setAttribute('content', content.seo.description);
  if (ogTitle) ogTitle.setAttribute('content', content.seo.ogTitle);
  if (ogDescription) ogDescription.setAttribute('content', content.seo.ogDescription);
}

function renderHeader() {
  const brandName = document.getElementById('brand-name');
  const mainNav = document.getElementById('main-nav');
  const resumeLink = document.getElementById('resume-link');

  if (brandName) brandName.textContent = content.profile.name;
  if (resumeLink) resumeLink.setAttribute('href', content.profile.resumeHref);

  if (mainNav) {
    mainNav.innerHTML = content.nav
      .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
      .join('');
  }
}

function renderHero() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  hero.innerHTML = `
    <p class="eyebrow">${escapeHtml(content.hero.eyebrow)}</p>
    <h1>${escapeHtml(content.hero.headline)}</h1>
    <p class="hero-copy">${escapeHtml(content.hero.subhead)}</p>
    <div class="hero-cta">
      <a class="btn btn-primary" href="${escapeHtml(content.hero.primaryCta.href)}">${escapeHtml(content.hero.primaryCta.label)}</a>
      <a class="btn btn-text" href="${escapeHtml(content.hero.secondaryCta.href)}">${escapeHtml(content.hero.secondaryCta.label)}</a>
    </div>
    <div class="hero-signal" role="note" aria-label="Positioning signal for hiring managers">${escapeHtml(content.hero.signal)}</div>
  `;
}

function renderProofBar() {
  const proofBar = document.getElementById('proof-bar');
  if (!proofBar) return;

  proofBar.innerHTML = content.proofStats
    .map(
      (item) => `
      <article>
        <p class="metric">${escapeHtml(item.metric)}</p>
        <p class="label">${escapeHtml(item.label)}</p>
      </article>
    `
    )
    .join('');
}

function renderWork() {
  const work = document.getElementById('work');
  if (!work) return;

  work.innerHTML = `
    <div class="section-head">
      <p class="section-kicker">${escapeHtml(content.work.kicker)}</p>
      <h2>${escapeHtml(content.work.heading)}</h2>
    </div>
    <div class="card-grid">
      ${content.work.cases
        .map(
          (item) => `
          <article class="case-card">
            <p class="case-tag">${escapeHtml(item.tag)}</p>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.challenge)}</p>
            <ul>
              ${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}
            </ul>
            <a href="${escapeHtml(item.href)}">Read Case Study</a>
          </article>
        `
        )
        .join('')}
    </div>
  `;
}

function renderWorkingStyle() {
  const section = document.getElementById('working-style');
  if (!section) return;

  const profileSignals = Array.isArray(content.workingStyle.profileSignals)
    ? content.workingStyle.profileSignals
    : [];
  const topStrengths = Array.isArray(content.workingStyle.topStrengths)
    ? content.workingStyle.topStrengths
    : [];
  const collaborationNotes = Array.isArray(content.workingStyle.collaborationNotes)
    ? content.workingStyle.collaborationNotes
    : [];

  section.innerHTML = `
    <div class="section-head">
      <p class="section-kicker">${escapeHtml(content.workingStyle.kicker)}</p>
      <h2>${escapeHtml(content.workingStyle.heading)}</h2>
      <p class="section-intro">${escapeHtml(content.workingStyle.intro)}</p>
    </div>
    ${
      profileSignals.length
        ? `<div class="profile-signal-grid">
      ${profileSignals
        .map(
          (item) => `
          <article class="profile-signal-card">
            <p class="profile-signal-label">${escapeHtml(item.label)}</p>
            <h3>${escapeHtml(item.value)}</h3>
            <p>${escapeHtml(item.note)}</p>
          </article>
        `
        )
        .join('')}
    </div>`
        : ''
    }
    ${
      topStrengths.length
        ? `<div class="strengths-wrap" aria-label="Top strengths">
      <p class="strengths-title">Top CliftonStrengths</p>
      <div class="strength-chips">
        ${topStrengths.map((strength) => `<span class="strength-chip">${escapeHtml(strength)}</span>`).join('')}
      </div>
    </div>`
        : ''
    }
    <div class="leadership-grid leadership-grid-4">
      ${content.workingStyle.pillars
        .map(
          (item) => `
          <article>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.body)}</p>
          </article>
        `
        )
        .join('')}
    </div>
    ${
      collaborationNotes.length
        ? `<div class="working-notes">
      <h3>How This Shows Up In Collaboration</h3>
      <ul>
        ${collaborationNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}
      </ul>
    </div>`
        : ''
    }
    <div class="process-strip" aria-label="Process snapshot">
      ${content.workingStyle.process
        .map(
          (step, index) => `
          <div class="process-step">
            <span class="process-number">${index + 1}</span>
            <p>${escapeHtml(step)}</p>
          </div>
        `
        )
        .join('')}
    </div>
  `;
}

function renderTestimonials() {
  const section = document.getElementById('testimonials');
  if (!section) return;

  section.innerHTML = `
    <div class="section-head">
      <p class="section-kicker">Partner Feedback</p>
      <h2>Signals from cross-functional collaboration.</h2>
    </div>
    <div class="writing-list">
      ${content.testimonials
        .map(
          (item) => `
          <article class="testimonial-card">
            <p class="testimonial-quote">${escapeHtml(item.quote)}</p>
            <p class="testimonial-attribution">${escapeHtml(item.attribution)}</p>
          </article>
        `
        )
        .join('')}
    </div>
  `;
}

function renderWriting() {
  const section = document.getElementById('writing');
  if (!section) return;

  section.innerHTML = `
    <div class="section-head">
      <p class="section-kicker">${escapeHtml(content.writing.kicker)}</p>
      <h2>${escapeHtml(content.writing.heading)}</h2>
    </div>
    <div class="writing-list">
      ${content.writing.items
        .map(
          (item) => `
          <article>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary)}</p>
            <a href="${escapeHtml(item.href)}">View Item</a>
          </article>
        `
        )
        .join('')}
    </div>
  `;
}

function renderAboutPreview() {
  const section = document.getElementById('about');
  if (!section) return;

  section.innerHTML = `
    <div class="section-head">
      <p class="section-kicker">${escapeHtml(content.aboutPreview.kicker)}</p>
      <h2>Principal-level perspective on product and experience leadership.</h2>
    </div>
    <article class="about-card">
      <p>${escapeHtml(content.aboutPreview.body)}</p>
    </article>
  `;
}

function renderContact() {
  const kicker = document.getElementById('contact-kicker');
  const heading = document.getElementById('contact-heading');
  const links = document.getElementById('contact-links');

  if (kicker) kicker.textContent = content.contact.kicker;
  if (heading) heading.textContent = content.contact.heading;

  if (links) {
    links.innerHTML = `
      <a class="btn btn-primary" href="mailto:${escapeHtml(content.profile.email)}">${escapeHtml(content.contact.emailLabel)}</a>
      <a class="btn btn-ghost" href="${escapeHtml(content.profile.linkedin)}" target="_blank" rel="noreferrer">${escapeHtml(content.contact.linkedinLabel)}</a>
      <a class="btn btn-text" href="${escapeHtml(content.profile.scheduleLink)}">${escapeHtml(content.contact.scheduleLabel)}</a>
    `;
  }
}

function renderFooter() {
  const left = document.getElementById('footer-left');
  const right = document.getElementById('footer-right');

  if (left) left.textContent = content.footer.left;
  if (right) right.textContent = content.footer.right;
}

function setupReveal() {
  const revealedElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealedElements.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 70, 320)}ms`;
    observer.observe(el);
  });
}

function init() {
  applySeo();
  renderHeader();
  renderHero();
  renderProofBar();
  renderWork();
  renderWorkingStyle();
  renderTestimonials();
  renderWriting();
  renderAboutPreview();
  renderContact();
  renderFooter();
  setupReveal();
}

init();
