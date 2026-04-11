(function () {
  const currentPath = window.location.pathname.replace(/\/$/, '');
  const panel = document.querySelector('[data-floating-nav-panel]');
  const overlay = document.querySelector('[data-floating-nav-overlay]');
  const toggle = document.querySelector('[data-floating-nav-toggle]');
  const sectionButtons = Array.from(document.querySelectorAll('[data-nav-section-toggle]'));

  function openPanel() {
    panel.classList.add('is-open');
    overlay.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) closePanel();
    else openPanel();
  });

  overlay.addEventListener('click', closePanel);

  sectionButtons.forEach(function (button) {
    const children = document.getElementById(button.getAttribute('aria-controls'));
    const sectionEntry = button.getAttribute('data-section-entry');
    const links = Array.from(children.querySelectorAll('a'));
    const isCurrentSection = currentPath === sectionEntry || currentPath.startsWith(sectionEntry + '/');
    const activeLink = links.find(function (link) {
      return currentPath === link.getAttribute('href').replace(/\/$/, '');
    });

    if (isCurrentSection) {
      button.classList.add('is-current');
      button.setAttribute('aria-expanded', 'true');
      children.classList.add('is-open');
    }

    if (activeLink) {
      activeLink.classList.add('is-active');
    }

    button.addEventListener('click', function () {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      children.classList.toggle('is-open');
    });
  });
})();
