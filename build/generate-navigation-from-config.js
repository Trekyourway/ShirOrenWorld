const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const configPath = path.join(projectRoot, 'data', 'site-map.config.json');
const outputPath = path.join(projectRoot, 'data', 'navigation.generated.json');
const variablesPath = path.join(projectRoot, 'data', 'site-shell.variables.json');

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

function getArticleMetaTitles() {
  try {
    const variables = readJson(variablesPath);
    const articleMeta = variables.worlds.ai.articleMeta || {};
    return Object.fromEntries(
      Object.entries(articleMeta)
        .filter(([, value]) => value && value.title)
        .map(([slug, value]) => [slug, value.title])
    );
  } catch {
    return {};
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

function getChildrenForSection(worldSlug, section, articleMetaTitles) {
  if (!section.discoverChildren) return [];

  const sectionDir = path.join(projectRoot, worldSlug, section.slug);
  return safeReadDir(sectionDir)
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(sectionDir, entry.name, 'index.html')))
    .filter((entry) => !entry.name.startsWith('draft-'))
    .map((entry) => {
      const childPath = path.join(sectionDir, entry.name, 'index.html');
      const dynamicTitle = worldSlug === 'ai' && section.slug === 'articles'
        ? articleMetaTitles[entry.name]
        : null;
      const title = dynamicTitle || readHtmlTitle(childPath) || slugToTitle(entry.name);
      return {
        title,
        slug: `/${worldSlug}/${section.slug}/${entry.name}/`
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'en'));
}

function buildNavigation() {
  const config = readJson(configPath);
  const articleMetaTitles = getArticleMetaTitles();

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
        children: getChildrenForSection(world.slug, section, articleMetaTitles)
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
