const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, 'data');
const outputFile = path.join(outputDir, 'toc.generated.json');

const supportedCollections = [
  { world: 'coaching', collection: 'articles', worldTitle: 'Coaching', collectionTitle: 'Articles' },
  { world: 'ai', collection: 'articles', worldTitle: 'AI', collectionTitle: 'Articles' },
  { world: 'treks', collection: 'articles', worldTitle: 'Treks', collectionTitle: 'Articles' }
];

function slugToTitle(slug) {
  return slug
    .replace(/^draft-/, '')
    .split(/[-_]+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function extractFirstMatch(content, regex) {
  const match = content.match(regex);
  return match ? cleanupText(match[1]) : null;
}

function cleanupText(text) {
  return text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitle(html, slug) {
  if (!html) return slugToTitle(slug);

  const h1 = extractFirstMatch(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return h1;

  const title = extractFirstMatch(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i);
  if (title) return title;

  return slugToTitle(slug);
}

function hasMeaningfulContent(html) {
  if (!html) return false;

  const withoutScripts = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');

  const bodyMatch = withoutScripts.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const relevant = bodyMatch ? bodyMatch[1] : withoutScripts;
  const text = cleanupText(relevant);

  return text.length >= 80;
}

function getArticleCandidates(baseDir) {
  if (!fs.existsSync(baseDir)) return [];

  return fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => ({
      slug: entry.name,
      dir: path.join(baseDir, entry.name),
      isDraft: entry.name.startsWith('draft-')
    }))
    .filter(entry => fs.existsSync(path.join(entry.dir, 'index.html')));
}

function buildCollectionNode(config) {
  const collectionPath = path.join(projectRoot, config.world, config.collection);
  const candidates = getArticleCandidates(collectionPath);

  const publishedArticles = candidates
    .map(candidate => {
      const htmlPath = path.join(candidate.dir, 'index.html');
      const html = readFileSafe(htmlPath);
      const title = extractTitle(html, candidate.slug);
      const meaningful = hasMeaningfulContent(html);

      return {
        title,
        slug: `/${config.world}/${config.collection}/${candidate.slug}/`,
        folderName: candidate.slug,
        draft: candidate.isDraft,
        hasContent: meaningful
      };
    })
    .filter(article => article.hasContent && !article.draft)
    .sort((a, b) => a.title.localeCompare(b.title));

  if (publishedArticles.length === 0) return null;

  return {
    title: config.collectionTitle,
    slug: `/${config.world}/${config.collection}/`,
    children: publishedArticles.map(({ title, slug }) => ({ title, slug }))
  };
}

function buildToc() {
  return supportedCollections
    .map(config => {
      const collectionNode = buildCollectionNode(config);
      if (!collectionNode) return null;

      return {
        title: config.worldTitle,
        slug: `/${config.world}/`,
        children: [collectionNode]
      };
    })
    .filter(Boolean);
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function main() {
  const toc = buildToc();
  ensureDir(outputDir);
  fs.writeFileSync(outputFile, `${JSON.stringify(toc, null, 2)}\n`, 'utf8');
  console.log(`Generated TOC: ${outputFile}`);
}

main();
