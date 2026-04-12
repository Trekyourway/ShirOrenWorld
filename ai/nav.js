(function () {
  function injectShellMount() {
    if (document.querySelector('[data-site-shell]')) return;

    const mount = document.createElement('div');
    mount.setAttribute('data-site-shell', '');

    const main = document.querySelector('main');
    if (main) {
      main.classList.add('page');
      main.parentNode.insertBefore(mount, main);
    } else {
      document.body.insertBefore(mount, document.body.firstChild);
    }
  }

  function loadSharedShell() {
    if (document.querySelector('script[data-ai-site-shell]')) return;
    const script = document.createElement('script');
    script.src = '/assets/js/site-shell.js';
    script.defer = true;
    script.setAttribute('data-ai-site-shell', 'true');
    document.body.appendChild(script);
  }

  function cleanLegacyNav() {
    const sideNav = document.getElementById('side-nav');
    const navToggle = document.getElementById('nav-toggle');
    if (sideNav) sideNav.style.display = 'none';
    if (navToggle) navToggle.style.display = 'none';
  }

  function tagArticleMeta() {
    const article = document.querySelector('article');
    if (!article) return;

    const h1 = article.querySelector('h1');
    const firstParagraph = article.querySelector('p');
    if (h1) h1.classList.add('page-title');
    if (firstParagraph) firstParagraph.classList.add('lede');
  }

  document.addEventListener('DOMContentLoaded', function () {
    cleanLegacyNav();
    injectShellMount();
    tagArticleMeta();
    loadSharedShell();
  });
})();
