(function () {
  async function loadTocData() {
    const response = await fetch('/data/toc.generated.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load TOC data: ${response.status}`);
    }
    return response.json();
  }

  function createLink(title, slug) {
    const link = document.createElement('a');
    link.href = slug;
    link.textContent = title;
    return link;
  }

  function createItem(node, level) {
    const li = document.createElement('li');
    li.className = `toc-level-${level}`;
    li.appendChild(createLink(node.title, node.slug));

    if (Array.isArray(node.children) && node.children.length > 0) {
      const childList = document.createElement('ul');
      node.children.forEach(child => childList.appendChild(createItem(child, level + 1)));
      li.appendChild(childList);
    }

    return li;
  }

  function renderToc(data) {
    const mountPoint = document.querySelector('[data-auto-toc]');
    if (!mountPoint) return;

    mountPoint.innerHTML = '';
    const rootList = document.createElement('ul');
    rootList.className = 'auto-toc-root';

    data.forEach(node => rootList.appendChild(createItem(node, 1)));
    mountPoint.appendChild(rootList);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const data = await loadTocData();
      renderToc(data);
    } catch (error) {
      console.error(error);
    }
  });
})();
