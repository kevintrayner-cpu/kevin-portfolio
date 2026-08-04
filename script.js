function renderHero() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  hero.innerHTML = `
    <p class="eyebrow" data-edit="hero.eyebrow">${escapeHtml(content.hero.eyebrow)}</p>
    <h1 data-edit="hero.headline">${escapeHtml(content.hero.headline)}</h1>
    <p class="hero-copy" data-edit="hero.subhead">${escapeHtml(content.hero.subhead)}</p>
    <div class="hero-cta">
      <a class="btn btn-primary" href="${escapeHtml(content.hero.primaryCta.href)}" data-edit="hero.primaryCta.label">${escapeHtml(content.hero.primaryCta.label)}</a>
      <a class="btn btn-text" href="${escapeHtml(content.hero.secondaryCta.href)}" data-edit="hero.secondaryCta.label">${escapeHtml(content.hero.secondaryCta.label)}</a>
    </div>
  `;
}

function renderWork() {
  const work = document.getElementById('work');
  if (!work) return;

  work.innerHTML = `
    <div class="section-head">
      <p class="section-kicker" data-edit="work.kicker">${escapeHtml(content.work.kicker)}</p>
      <h2 data-edit="work.heading">${escapeHtml(content.work.heading)}</h2>
    </div>
    <div class="card-grid">
      ${content.work.cases
        .map(
          (item, index) => `
          <article class="case-card">
            <p class="case-tag" data-edit="work.cases[${index}].tag">${escapeHtml(item.tag)}</p>
            <h3 data-edit="work.cases[${index}].title">${escapeHtml(item.title)}</h3>
            <p data-edit="work.cases[${index}].challenge">${escapeHtml(item.challenge)}</p>
            <ul>
              ${item.bullets
                .map(
                  (bullet, bulletIndex) =>
                    `<li data-edit="work.cases[${index}].bullets[${bulletIndex}]">${escapeHtml(bullet)}</li>`
                )
                .join('')}
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
      <p class="section-kicker" data-edit="workingStyle.kicker">${escapeHtml(content.workingStyle.kicker)}</p>
      <h2 data-edit="workingStyle.heading">${escapeHtml(content.workingStyle.heading)}</h2>
      <p class="section-intro" data-edit="workingStyle.intro">${escapeHtml(content.workingStyle.intro)}</p>
    </div>
    ${
      profileSignals.length
        ? `<div class="profile-signal-grid">
      ${profileSignals
        .map(
          (item, index) => `
          <article class="profile-signal-card">
            <p class="profile-signal-label" data-edit="workingStyle.profileSignals[${index}].label">${escapeHtml(item.label)}</p>
            <h3 data-edit="workingStyle.profileSignals[${index}].value">${escapeHtml(item.value)}</h3>
            <p data-edit="workingStyle.profileSignals[${index}].note">${escapeHtml(item.note)}</p>
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
        ${topStrengths
          .map(
            (strength, index) =>
              `<span class="strength-chip" data-edit="workingStyle.topStrengths[${index}]">${escapeHtml(strength)}</span>`
          )
          .join('')}
      </div>
    </div>`
        : ''
    }
    <div class="leadership-grid leadership-grid-4">
      ${content.workingStyle.pillars
        .map(
          (item, index) => `
          <article>
            <h3 data-edit="workingStyle.pillars[${index}].title">${escapeHtml(item.title)}</h3>
            <p data-edit="workingStyle.pillars[${index}].body">${escapeHtml(item.body)}</p>
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
        ${collaborationNotes
          .map(
            (note, index) =>
              `<li data-edit="workingStyle.collaborationNotes[${index}]">${escapeHtml(note)}</li>`
          )
          .join('')}
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
            <p data-edit="workingStyle.process[${index}]">${escapeHtml(step)}</p>
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
          (item, index) => `
          <article class="testimonial-card">
            <p class="testimonial-quote" data-edit="testimonials[${index}].quote">${escapeHtml(item.quote)}</p>
            <p class="testimonial-attribution" data-edit="testimonials[${index}].attribution">${escapeHtml(item.attribution)}</p>
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
      <p class="section-kicker" data-edit="aboutPreview.kicker">${escapeHtml(content.aboutPreview.kicker)}</p>
      <h2>Principal-level perspective on product and experience leadership.</h2>
    </div>
    <article class="about-card">
      <p data-edit="aboutPreview.body">${escapeHtml(content.aboutPreview.body)}</p>
    </article>
  `;
}

function init() {
  applySeo(content.seo.title, content.seo.description, content.seo.ogTitle, content.seo.ogDescription);
  renderHeader();
  renderHero();
  renderWork();
  renderWorkingStyle();
  renderTestimonials();
  renderAboutPreview();
  renderContact();
  renderFooter();
  setupReveal();
}

init();
