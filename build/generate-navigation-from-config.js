const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const configPath = path.join(projectRoot, 'data', 'site-map.config.json');
const outputPath = path.join(projectRoot, 'data', 'navigation.generated.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function safeReadDir(dirPath) {
  try {
    return fs.readdirSync(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }
}

function slugToTitle(slug) {
  return slug
    .replace(/^draft-/, '')
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function readHtmlTitle(filePath) {
  try {
    const source = fs.readFileSync(filePath, 'utf8');
    const titleMatch = source.match(/<title>([\s\S]*?)<\/title>/i);
    if (titleMatch) {
      return titleMatch[1].replace(/\s+/g, ' ').trim();
    }
  } catch {
    return null;
  }
  return null;
}

function readArticleMetadata(filePath, slugFallback) {
  const metadata = {
    navTitle: null,
    articleNumber: null,
    versionLabel: null,
    articleCode: null
  };

  try {
    const source = fs.readFileSync(filePath, 'utf8');

    function readMetaTag(name) {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const metaPattern = new RegExp(`<meta\\s+name=[\"']${escaped}[\"']\\s+content=[\"']([\\s\\S]*?)[\"']\\s*\\/?>`, 'i');
      const match = source.match(metaPattern);
      return match ? match[1].trim() : null;
    }

    function readPageField(fieldName) {
      const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`${escaped}\\s*:\\s*['\"]([\\s\\S]*?)['\"]`, 'i');
      const match = source.match(pattern);
      return match ? match[1].trim() : null;
    }

    metadata.navTitle = readMetaTag('article:navTitle') || readPageField('navTitle');
    metadata.articleNumber = readMetaTag('article:number') || readPageField('articleNumber');
    metadata.versionLabel = readMetaTag('article:version') || readPageField('versionLabel');
    metadata.articleCode = readMetaTag('article:code') || readPageField('articleCode');
  } catch {
    return {
      title: slugToTitle(slugFallback)
    };
  }

  return {
    title: metadata.navTitle || readHtmlTitle(filePath) || slugToTitle(slugFallback),
    navTitle: metadata.navTitle || null,
    articleNumber: metadata.articleNumber || null,
    versionLabel: metadata.versionLabel || null,
    articleCode: metadata.articleCode || null
  };
}

function getChildrenForSection(worldSlug, section) {
  if (!section.discoverChildren) return [];

  const sectionDir = path.join(projectRoot, worldSlug, section.slug);
  return safeReadDir(sectionDir)
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(sectionDir, entry.name, 'index.html')))
    .filter((entry) => !entry.name.startsWith('draft-'))
    .map((entry) => {
      const childPath = path.join(sectionDir, entry.name, 'index.html');
      const metadata = readArticleMetadata(childPath, entry.name);
      const child = {
        title: metadata.title,
        slug: `/${worldSlug}/${section.slug}/${entry.name}/`
      };
      if (metadata.navTitle) child.navTitle = metadata.navTitle;
      if (metadata.articleNumber) child.articleNumber = metadata.articleNumber;
      if (metadata.versionLabel) child.versionLabel = metadata.versionLabel;
      if (metadata.articleCode) child.articleCode = metadata.articleCode;
      return child;
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'en'));
}

function buildNavigation() {
  const config = readJson(configPath);

  return {
    generatedAt: new Date().toISOString(),
    worlds: config.worlds.map((world) => ({
      slug: world.slug,
      title: world.title,
      entry: world.entry,
      sections: world.sections.map((section) => ({
        slug: section.slug,
        title: section.title,
        entry: section.entry,
        children: getChildrenForSection(world.slug, section)
      }))
    }))
  };
}

function main() {
  const navigation = buildNavigation();
  fs.writeFileSync(outputPath, `${JSON.stringify(navigation, null, 2)}\n`, 'utf8');
  console.log(`Generated navigation: ${outputPath}`);
}

main();
