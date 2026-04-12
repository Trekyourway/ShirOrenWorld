(function () {
  const NAVIGATION_FALLBACK = {
    worlds: [
      {
        slug: 'ai',
        title: 'AI',
        entry: '/ai/',
        sections: [
          { slug: 'articles', title: 'Articles', entry: '/ai/articles/', children: [] },
          { slug: 'learn', title: 'Learn', entry: '/ai/learn/', children: [] },
          { slug: 'tools', title: 'Tools', entry: '/ai/tools/', children: [] }
        ]
      }
    ]
  };

  const WORLD_VARIABLES_FALLBACK = {
    worlds: {
      ai: {
        entry: '/ai/',
        brand: { label: 'עולם הבינה המלאכותית', logoText: 'AI' },
        homeLink: { href: '/', label: 'חזרה לאתר הראשי' },
        sectionTitles: { articles: 'מאמרים', learn: 'למידה', tools: 'כלים' },
        mobileMenuTitle: 'ניווט עולם AI'
      }
    }
  };

  function normalizePath(input) {
    let value = String(input || '/').split('#')[0].split('?')[0];
    if (value !== '/' && value.endsWith('/index.html')) value = value.replace(/index\.html$/, '');
    if (!value.startsWith('/')) value = `/${value}`;
    if (value !== '/' && !value.endsWith('/')) value = `${value}/`;
    return value;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function findCurrentWorld(navigation, currentPath) {
    return navigation.worlds.find((world) => currentPath.startsWith(normalizePath(world.entry)));
  }

  function findCurrentSection(world, currentPath) {
    if (!world) return null;
    return world.sections.find((section) => currentPath.startsWith(normalizePath(section.entry)));
  }

  function findCurrentChild(section, currentPath) {
    if (!section || !Array.isArray(section.children)) return null;
    return section.children.find((child) => currentPath === normalizePath(child.slug));
  }

  function sectionDisplayTitle(section, worldVariables) {
    if (!section) return '';
    const overrides = (worldVariables && worldVariables.sectionTitles) || {};
    return overrides[section.slug] || section.title;
  }

  function childDisplayTitle(child) {
    return child.title;
  }

  async function readJsonOrFallback(url, fallback) {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      return await response.json();
    } catch {
      return fallback;
    }
  }

  function buildDesktopSectionItem(section, isCurrentSection, isCurrentChild, worldVariables) {
    const title = escapeHtml(sectionDisplayTitle(section, worldVariables));
    const sectionHref = escapeHtml(section.entry);
    const hasChildren = Array.isArray(section.children) && section.children.length > 0;

    if (!hasChildren) {
      return `
        <li class="site-shell__item">
          <a class="site-shell__top-link${isCurrentSection ? ' is-current' : ''}" href="${sectionHref}">${title}</a>
        </li>
      `;
    }

    const dropdownId = `site-shell-dropdown-${escapeHtml(section.slug)}`;
    const childrenHtml = section.children
      .map((child) => {
        const isCurrent = isCurrentChild && normalizePath(child.slug) === normalizePath(isCurrentChild.slug);
        return `
          <a class="site-shell__dropdown-link${isCurrent ? ' is-current' : ''}" href="${escapeHtml(child.slug)}">
            ${escapeHtml(childDisplayTitle(child))}
          </a>
        `;
      })
      .join('');

    return `
      <li class="site-shell__item site-shell__item--dropdown${isCurrentSection ? ' is-current-parent' : ''}" data-dropdown-item>
        <button
          type="button"
          class="site-shell__top-button${isCurrentSection ? ' is-current' : ''}"
          aria-expanded="false"
          aria-controls="${dropdownId}"
          data-dropdown-toggle
        >
          <span>${title}</span>
          <span class="site-shell__caret" aria-hidden="true">▾</span>
        </button>
        <div class="site-shell__dropdown" id="${dropdownId}" role="menu">
          ${childrenHtml}
          <a class="site-shell__dropdown-link site-shell__dropdown-link--section" href="${sectionHref}">לכל ${title}</a>
        </div>
      </li>
    `;
  }

  function buildMobileSectionItem(section, isCurrentSection, isCurrentChild, worldVariables, index) {
    const title = escapeHtml(sectionDisplayTitle(section, worldVariables));
    const hasChildren = Array.isArray(section.children) && section.children.length > 0;

    if (!hasChildren) {
      return `<li><a class="site-shell__mobile-link${isCurrentSection ? ' is-current' : ''}" href="${escapeHtml(section.entry)}">${title}</a></li>`;
    }

    const groupId = `site-shell-mobile-group-${index}`;
    const childLinks = section.children
      .map((child) => {
        const isCurrent = isCurrentChild && normalizePath(child.slug) === normalizePath(isCurrentChild.slug);
        return `<a class="site-shell__mobile-child-link${isCurrent ? ' is-current' : ''}" href="${escapeHtml(child.slug)}">${escapeHtml(childDisplayTitle(child))}</a>`;
      })
      .join('');

    return `
      <li class="site-shell__mobile-group${isCurrentSection ? ' is-current-parent' : ''}">
        <button type="button" class="site-shell__mobile-group-toggle${isCurrentSection ? ' is-current' : ''}" aria-expanded="false" aria-controls="${groupId}" data-mobile-group-toggle>
          <span>${title}</span>
          <span class="site-shell__caret" aria-hidden="true">▾</span>
        </button>
        <div class="site-shell__mobile-group-content" id="${groupId}">
          <a class="site-shell__mobile-child-link site-shell__mobile-child-link--section" href="${escapeHtml(section.entry)}">לכל ${title}</a>
          ${childLinks}
        </div>
      </li>
    `;
  }

  function wireDesktopDropdowns(root) {
    const dropdownItems = Array.from(root.querySelectorAll('[data-dropdown-item]'));
    let openItem = null;

    function closeAll() {
      dropdownItems.forEach((item) => {
        const button = item.querySelector('[data-dropdown-toggle]');
        item.classList.remove('is-open');
        if (button) button.setAttribute('aria-expanded', 'false');
      });
      openItem = null;
    }

    dropdownItems.forEach((item) => {
      const button = item.querySelector('[data-dropdown-toggle]');
      if (!button) return;

      button.addEventListener('click', function () {
        const isOpen = item.classList.contains('is-open');
        closeAll();
        if (!isOpen) {
          item.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
          openItem = item;
        }
      });
    });

    document.addEventListener('click', function (event) {
      if (!openItem) return;
      if (openItem.contains(event.target)) return;
      closeAll();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeAll();
    });
  }

  function wireMobileMenu(root) {
    const menuButton = root.querySelector('[data-mobile-menu-toggle]');
    const closeButton = root.querySelector('[data-mobile-menu-close]');
    const overlay = root.querySelector('[data-mobile-menu-overlay]');
    const panel = root.querySelector('[data-mobile-menu]');
    const groupToggles = Array.from(root.querySelectorAll('[data-mobile-group-toggle]'));

    if (!menuButton || !overlay || !panel) return;

    function closeMobileMenu() {
      menuButton.setAttribute('aria-expanded', 'false');
      panel.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.classList.remove('site-shell-mobile-open');
    }

    function openMobileMenu() {
      menuButton.setAttribute('aria-expanded', 'true');
      panel.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.classList.add('site-shell-mobile-open');
    }

    menuButton.addEventListener('click', function () {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      if (isExpanded) closeMobileMenu();
      else openMobileMenu();
    });

    overlay.addEventListener('click', closeMobileMenu);
    if (closeButton) closeButton.addEventListener('click', closeMobileMenu);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMobileMenu();
    });

    groupToggles.forEach((toggle) => {
      const content = root.querySelector(`#${toggle.getAttribute('aria-controls')}`);
      if (!content) return;
      toggle.addEventListener('click', function () {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isExpanded));
        content.classList.toggle('is-open');
      });
    });
  }

  async function init() {
    const mount = document.querySelector('[data-site-shell]');
    if (!mount) return;

    const [navigation, variables] = await Promise.all([
      readJsonOrFallback('/data/navigation.generated.json', NAVIGATION_FALLBACK),
      readJsonOrFallback('/data/site-shell.variables.json', WORLD_VARIABLES_FALLBACK)
    ]);

    const currentPath = normalizePath(window.location.pathname);
    const world = findCurrentWorld(navigation, currentPath);
    if (!world || world.slug !== 'ai') return;

    const worldVariables = (variables.worlds && variables.worlds[world.slug]) || WORLD_VARIABLES_FALLBACK.worlds.ai;
    const section = findCurrentSection(world, currentPath);
    const child = findCurrentChild(section, currentPath);

    const desktopItems = world.sections
      .map((item) => buildDesktopSectionItem(item, section && item.slug === section.slug, child, worldVariables))
      .join('');

    const mobileItems = world.sections
      .map((item, index) => buildMobileSectionItem(item, section && item.slug === section.slug, child, worldVariables, index))
      .join('');

    mount.innerHTML = `
      <header class="site-shell" dir="rtl">
        <div class="site-shell__inner">
          <a class="site-shell__brand" href="${escapeHtml(worldVariables.entry || world.entry)}" aria-label="${escapeHtml(worldVariables.brand.label)}">
            <span class="site-shell__brand-logo" aria-hidden="true">${escapeHtml(worldVariables.brand.logoText)}</span>
            <span class="site-shell__brand-text">${escapeHtml(worldVariables.brand.label)}</span>
          </a>

          <button class="site-shell__hamburger" type="button" aria-label="פתיחת תפריט" aria-expanded="false" data-mobile-menu-toggle>
            <span></span>
          </button>

          <nav class="site-shell__desktop-nav" aria-label="ניווט ראשי">
            <ul class="site-shell__desktop-list">
              ${desktopItems}
            </ul>
          </nav>

          <a class="site-shell__home-link" href="${escapeHtml(worldVariables.homeLink.href)}">${escapeHtml(worldVariables.homeLink.label)}</a>
        </div>
      </header>

      <div class="site-shell__mobile-overlay" data-mobile-menu-overlay></div>
      <aside class="site-shell__mobile-panel" data-mobile-menu aria-label="${escapeHtml(worldVariables.mobileMenuTitle || 'ניווט')}">
        <div class="site-shell__mobile-head">
          <strong>${escapeHtml(worldVariables.mobileMenuTitle || 'ניווט')}</strong>
          <button type="button" class="site-shell__mobile-close" aria-label="סגירה" data-mobile-menu-close>✕</button>
        </div>
        <ul class="site-shell__mobile-list">
          ${mobileItems}
        </ul>
      </aside>
    `;

    wireDesktopDropdowns(mount);
    wireMobileMenu(mount);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
