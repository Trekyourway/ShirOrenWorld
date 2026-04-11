(function () {
  const FALLBACK_NAV = {
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

  function normalizePath(input) {
    let value = String(input || '/').split('#')[0].split('?')[0];
    if (value !== '/' && value.endsWith('/index.html')) {
      value = value.replace(/index\.html$/, '');
    }
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
    return navigation.worlds.find((world) => currentPath === normalizePath(world.entry) || currentPath.startsWith(normalizePath(world.entry)));
  }

  function findCurrentSection(world, currentPath) {
    if (!world) return null;
    return world.sections.find((section) => currentPath === normalizePath(section.entry) || currentPath.startsWith(normalizePath(section.entry)));
  }

  function findCurrentChild(section, currentPath) {
    if (!section || !Array.isArray(section.children)) return null;
    return section.children.find((child) => currentPath === normalizePath(child.slug));
  }

  function renderLinks(items, currentPath, className) {
    return items
      .map((item) => {
        const isCurrent = currentPath === normalizePath(item.entry || item.slug);
        return `<a class="${className}${isCurrent ? ` ${className}--current` : ''}" href="${escapeHtml(item.entry || item.slug)}">${escapeHtml(item.title)}</a>`;
      })
      .join('');
  }

  function renderBreadcrumbs(world, section, child) {
    const crumbs = [
      { title: world.title, href: world.entry }
    ];

    if (section) {
      crumbs.push({ title: section.title, href: section.entry });
    }

    if (child) {
      crumbs.push({ title: child.title, href: child.slug });
    }

    return crumbs
      .map((crumb, index) => {
        const current = index === crumbs.length - 1;
        if (current) {
          return `<span class="site-shell__crumb site-shell__crumb--current">${escapeHtml(crumb.title)}</span>`;
        }
        return `<a class="site-shell__crumb" href="${escapeHtml(crumb.href)}">${escapeHtml(crumb.title)}</a>`;
      })
      .join('<span class="site-shell__separator">/</span>');
  }

  async function getNavigation() {
    try {
      const response = await fetch('/data/navigation.generated.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`Navigation request failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      return FALLBACK_NAV;
    }
  }

  async function init() {
    const mount = document.querySelector('[data-site-shell]');
    if (!mount) return;

    const navigation = await getNavigation();
    const currentPath = normalizePath(window.location.pathname);
    const world = findCurrentWorld(navigation, currentPath);

    if (!world) return;

    const section = findCurrentSection(world, currentPath);
    const child = findCurrentChild(section, currentPath);
    const childLinks = section && section.children && section.children.length
      ? `<nav class="site-shell__children" aria-label="ניווט פנימי">${renderLinks(section.children, currentPath, 'site-shell__child-link')}</nav>`
      : '';

    mount.innerHTML = `
      <header class="site-shell">
        <div class="site-shell__inner">
          <div class="site-shell__top">
            <div>
              <a class="site-shell__brand" href="${escapeHtml(world.entry)}">Shir Oren / ${escapeHtml(world.title)}</a>
              <div class="site-shell__eyebrow">World navigation built from the live site structure</div>
            </div>
            <a class="site-shell__main-link" href="/">לעולם הראשי</a>
          </div>

          <nav class="site-shell__sections" aria-label="Sections">
            ${renderLinks(world.sections, currentPath, 'site-shell__section-link')}
          </nav>

          ${childLinks}

          <div class="site-shell__breadcrumbs" aria-label="Breadcrumbs">
            ${renderBreadcrumbs(world, section, child)}
          </div>
        </div>
      </header>
    `;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
