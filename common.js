const content = window.PORTFOLIO_CONTENT;

if (!content) {
  throw new Error('Missing PORTFOLIO_CONTENT. Ensure content.js loads before common.js.');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function applySeo(title, description, ogTitle, ogDescription) {
  document.title = title;
  const metaDescription = document.querySelector('meta[name="description"]');
  const ogTitleEl = document.querySelector('meta[property="og:title"]');
  const ogDescriptionEl = document.querySelector('meta[property="og:description"]');

  if (metaDescription) metaDescription.setAttribute('content', description);
  if (ogTitleEl) ogTitleEl.setAttribute('content', ogTitle);
  if (ogDescriptionEl) ogDescriptionEl.setAttribute('content', ogDescription);
}

function renderHeader(navBase = '') {
  const brandName = document.getElementById('brand-name');
  const mainNav = document.getElementById('main-nav');
  const resumeLink = document.getElementById('resume-link');

  if (brandName) brandName.textContent = content.profile.name;
  if (resumeLink) resumeLink.setAttribute('href', content.profile.resumeHref);

  if (mainNav) {
    mainNav.innerHTML = content.nav
      .map((item) => `<a href="${escapeHtml(navBase + item.href)}">${escapeHtml(item.label)}</a>`)
      .join('');
  }
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
