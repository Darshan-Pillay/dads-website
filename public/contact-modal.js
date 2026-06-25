// Subpage "Connect with a specialist" modal.
//
// On every public/ subpage (services/* and pages/*), intercept clicks on
// .sp-cta__btn that point at ../index.html#contact and open an in-page
// modal instead of bouncing the reader back to the homepage.
//
// The form is a UX placeholder — submission shows a thank-you and closes.
// When the contact endpoint exists (see docs/adr/0003), POST FormData to it.

(function () {
  const DOMAINS = [
    'SAP', 'Microsoft', 'Oracle', 'IBM', 'AI',
    'Cloud Computing', 'Big Data & Analytics', 'Blockchain',
    'Mobile Development', 'Not sure yet',
  ];

  function makeModal() {
    const wrap = document.createElement('div');
    wrap.className = 'sp-modal';
    wrap.id = 'sp-modal';
    // No `hidden` attribute — visibility is driven by the `is-open` class so
    // both open and close ease via CSS transitions.
    wrap.innerHTML = `
      <div class="sp-modal__scrim" data-close></div>
      <div class="sp-modal__card" role="dialog" aria-modal="true" aria-labelledby="sp-modal-title">
        <button class="sp-modal__close" type="button" data-close aria-label="Close">&times;</button>

        <div class="sp-modal__form-pane">
          <p class="eyebrow">Connect with a specialist</p>
          <h2 class="sp-modal__title" id="sp-modal-title">
            Tell us about your transformation. We'll bring the experience.
          </h2>
          <form class="sp-modal__form" name="contact" novalidate>
            <div class="sp-modal__row">
              <label class="sp-modal__field">
                <span>Name</span>
                <input name="name" type="text" placeholder="Jordan Maré" autocomplete="name" required>
              </label>
              <label class="sp-modal__field">
                <span>Work email</span>
                <input name="email" type="email" placeholder="you@company.com" autocomplete="email" required>
              </label>
            </div>
            <label class="sp-modal__field">
              <span>What do you need help with?</span>
              <select name="domain">
                <option value="">Choose a technology area</option>
                ${DOMAINS.map((d) => `<option value="${d}">${d}</option>`).join('')}
              </select>
            </label>
            <label class="sp-modal__field">
              <span>What's on your mind?</span>
              <textarea name="message" rows="5" maxlength="1000" placeholder="A line about where you're headed…"></textarea>
              <small class="sp-modal__hint">Up to 1000 characters.</small>
            </label>
            <button type="submit" class="sp-cta__btn sp-modal__submit">
              Connect with a specialist
            </button>
          </form>
          <p class="sp-modal__note">No pitch. No agenda. Just honest direction.</p>
        </div>

        <div class="sp-modal__thanks-pane" hidden>
          <p class="eyebrow">We've got it.</p>
          <h2 class="sp-modal__title">
            A senior consultant will reach out within one business day.
          </h2>
          <p class="sp-modal__note">
            With a straight read on what you actually need. (Demo only — the form
            isn't wired to a backend yet.)
          </p>
          <button type="button" class="sp-cta__btn sp-modal__submit" data-close>Close</button>
        </div>
      </div>
    `;
    return wrap;
  }

  function init() {
    const modal = makeModal();
    document.body.appendChild(modal);

    const formPane = modal.querySelector('.sp-modal__form-pane');
    const thanksPane = modal.querySelector('.sp-modal__thanks-pane');
    const form = modal.querySelector('form');
    const textarea = modal.querySelector('textarea[name="message"]');
    const hint = modal.querySelector('.sp-modal__hint');
    const MESSAGE_MAX = parseInt(textarea?.getAttribute('maxlength') || '1000', 10);
    let lastTrigger = null;

    function updateHint() {
      if (hint && textarea) hint.textContent = `${textarea.value.length} / ${MESSAGE_MAX}`;
    }
    textarea?.addEventListener('input', updateHint);
    updateHint();

    function open(trigger) {
      lastTrigger = trigger || null;
      formPane.hidden = false;
      thanksPane.hidden = true;
      form.reset();
      updateHint(); // reset counter to 0 / 1000 after form.reset()
      modal.classList.add('is-open');
      document.body.classList.add('sp-modal-open');
      // Focus the first field on next frame so the open transition can run.
      requestAnimationFrame(() => modal.querySelector('input[name="name"]')?.focus());
    }

    function close() {
      modal.classList.remove('is-open');
      document.body.classList.remove('sp-modal-open');
      lastTrigger?.focus?.();
    }

    // Intercept the "Connect with a specialist" CTAs on subpages.
    document.addEventListener('click', (e) => {
      const closeTarget = e.target.closest('[data-close]');
      if (closeTarget && modal.contains(closeTarget)) { close(); return; }

      const link = e.target.closest('a.sp-cta__btn, .sp-nav__cta a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (!/#contact$/.test(href)) return;
      e.preventDefault();
      open(link);
    });

    // Escape closes.
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });

    // Form submit → swap to thanks pane.
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // TODO: POST new FormData(form) to /api/contact when the endpoint lands.
      formPane.hidden = true;
      thanksPane.hidden = false;
      thanksPane.querySelector('[data-close]')?.focus();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
