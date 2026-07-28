function getCaseIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('case');
}

function renderNotFound() {
  const hero = document.getElementById('case-hero');
  if (!hero) return;

  hero.innerHTML = `
    <p class="eyebrow">Case Study</p>
    <h1>We couldn't find that case study.</h1>
    <p class="hero-copy">It may have moved. Head back to <a href="index.html#work">Selected Work</a> to browse available case studies.</p>
  `;

  ['case-context', 'case-approach', 'case-decisions', 'case-outcomes', 'case-reflection'].forEach((id) => {
    const section = document.getElementById(id);
    if (section) section.remove();
  });
}

function renderCaseHero(caseStudy, caseId) {
  const hero = document.getElementById('case-hero');
  if (!hero) return;

  hero.innerHTML = `
    <p class="eyebrow">Case Study</p>
    <h1 data-edit="caseStudies.${caseId}.title">${escapeHtml(caseStudy.title)}</h1>
    <p class="hero-copy" data-edit="caseStudies.${caseId}.subtitle">${escapeHtml(caseStudy.subtitle)}</p>
    <div class="hero-signal" role="note" aria-label="Role and timeline"><span data-edit="caseStudies.${caseId}.role">${escapeHtml(caseStudy.role)}</span> &middot; <span data-edit="caseStudies.${caseId}.timeline">${escapeHtml(caseStudy.timeline)}</span></div>
  `;
}

function renderCaseContext(caseStudy, caseId) {
  const section = document.getElementById('case-context');
  if (!section) return;

  section.innerHTML = `
    <div class="section-head">
      <p class="section-kicker">Context</p>
      <h2 data-edit="caseStudies.${caseId}.context">${escapeHtml(caseStudy.context)}</h2>
    </div>
    <article class="about-card">
      <p data-edit="caseStudies.${caseId}.problem">${escapeHtml(caseStudy.problem)}</p>
    </article>
  `;
}

function renderCaseApproach(caseStudy, caseId) {
  const section = document.getElementById('case-approach');
  if (!section) return;

  section.innerHTML = `
    <div class="section-head">
      <p class="section-kicker">Approach</p>
      <h2>How the work came together.</h2>
    </div>
    <div class="working-notes">
      <ul>
        ${caseStudy.approach
          .map(
            (step, index) =>
              `<li data-edit="caseStudies.${caseId}.approach[${index}]">${escapeHtml(step)}</li>`
          )
          .join('')}
      </ul>
    </div>
  `;
}

function renderCaseDecisions(caseStudy, caseId) {
  const section = document.getElementById('case-decisions');
  if (!section) return;

  section.innerHTML = `
    <div class="section-head">
      <p class="section-kicker">Key Decisions</p>
      <h2>Where the design point of view mattered most.</h2>
    </div>
    <div class="leadership-grid">
      ${caseStudy.decisions
        .map(
          (item, index) => `
          <article>
            <h3 data-edit="caseStudies.${caseId}.decisions[${index}].title">${escapeHtml(item.title)}</h3>
            <p data-edit="caseStudies.${caseId}.decisions[${index}].detail">${escapeHtml(item.detail)}</p>
          </article>
        `
        )
        .join('')}
    </div>
  `;
}

function renderCaseOutcomes(caseStudy, caseId) {
  const section = document.getElementById('case-outcomes');
  if (!section) return;

  section.innerHTML = `
    <div class="section-head">
      <p class="section-kicker">Outcomes</p>
      <h2>What changed as a result.</h2>
    </div>
    <div class="working-notes">
      <ul>
        ${caseStudy.outcomes
          .map(
            (item, index) =>
              `<li data-edit="caseStudies.${caseId}.outcomes[${index}]">${escapeHtml(item)}</li>`
          )
          .join('')}
      </ul>
    </div>
  `;
}

function renderCaseReflection(caseStudy, caseId) {
  const section = document.getElementById('case-reflection');
  if (!section) return;

  section.innerHTML = `
    <div class="section-head">
      <p class="section-kicker">Reflection</p>
      <h2>Lessons carried into the next program.</h2>
    </div>
    <article class="about-card">
      <p data-edit="caseStudies.${caseId}.reflection">${richText(caseStudy.reflection)}</p>
    </article>
    <p style="margin-top: 1.5rem;"><a class="btn btn-text" href="index.html#work">&larr; Back to Selected Work</a></p>
  `;
}

function init() {
  const caseId = getCaseIdFromQuery();
  const caseStudy = caseId ? content.caseStudies[caseId] : null;

  renderHeader('index.html');

  if (!caseStudy) {
    applySeo(
      'Case Study Not Found | ' + content.profile.name,
      'This case study could not be found.',
      'Case Study Not Found',
      'This case study could not be found.'
    );
    renderNotFound();
    renderContact();
    renderFooter();
    setupReveal();
    return;
  }

  applySeo(
    `${caseStudy.title} | ${content.profile.name}`,
    caseStudy.subtitle,
    caseStudy.title,
    caseStudy.subtitle
  );
  renderCaseHero(caseStudy, caseId);
  renderCaseContext(caseStudy, caseId);
  renderCaseApproach(caseStudy, caseId);
  renderCaseDecisions(caseStudy, caseId);
  renderCaseOutcomes(caseStudy, caseId);
  renderCaseReflection(caseStudy, caseId);
  renderContact();
  renderFooter();
  setupReveal();
}

init();
