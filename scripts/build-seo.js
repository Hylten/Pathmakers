import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'insights');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const INSIGHTS_DIST_DIR = path.join(DIST_DIR, 'insights');

const ensureDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

async function generateSEO() {
    console.log('Generating SEO Static HTML for Pathmaker Insights...');

    if (!fs.existsSync(DIST_DIR)) {
        console.error('dist directory not found. Please run npm run build first.');
        process.exit(1);
    }

    const indexHtmlPath = path.join(DIST_DIR, 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
        console.error('dist/index.html not found. Please run npm run build first.');
        process.exit(1);
    }

    const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

    ensureDir(INSIGHTS_DIST_DIR);

    const files = fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md')) : [];

    // 1. Generate Index Page with Pre-rendered list (Fallback for JS failure)
    let listHtml = '<div class="space-y-8">';
    for (const file of files) {
        const filePath = path.join(CONTENT_DIR, file);
        const rawContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(rawContent);
        const slug = data.slug || file.replace('.md', '');
        const title = data.title || 'Untitled';
        const description = data.description || '';

        listHtml += `
            <div style="padding: 2rem 0; border-bottom: 1px solid rgba(255,255,255,0.1)">
                <a href="/Pathmakers/insights/${slug}/" style="text-decoration: none; color: inherit;">
                    <h2 style="font-family: serif; font-size: 1.5rem; color: #e5e5e5; margin-bottom: 0.5rem;">${title}</h2>
                    <p style="font-size: 0.875rem; color: #A1A1AA;">${description}</p>
                </a>
            </div>`;
    }
    listHtml += '</div>';

    const indexHtml = baseHtml
        .replace(/<title>.*?<\/title>/, '<title>Insights | Pathmaker</title>')
        .replace(/<meta name="description" content=".*?">/, '<meta name="description" content="Strategic insights on Nordic M&A, cross-border transactions, and middle-market advisory from Pathmaker.">')
        .replace('<div id="root"></div>', `<div id="root">${listHtml}</div>`);

    fs.writeFileSync(path.join(INSIGHTS_DIST_DIR, 'index.html'), indexHtml);
    console.log('✅ Generated /dist/insights/index.html');

    // 2. Generate Article Pages
    for (const file of files) {
        const filePath = path.join(CONTENT_DIR, file);
        const rawContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(rawContent);

        const slug = data.slug || file.replace('.md', '');
        const title = data.title || 'Insights Article';
        const description = data.description || '';

        const articleDir = path.join(INSIGHTS_DIST_DIR, slug);
        ensureDir(articleDir);

        // Simple markdown pre-render (very basic)
        const contentHtml = `<div style="padding: 4rem 1rem; max-width: 800px; margin: 0 auto;">
            <h1 style="font-family: serif; font-size: 3rem; margin-bottom: 2rem;">${title}</h1>
            <div style="line-height: 1.8; font-size: 1.1rem; color: #e5e5e5;">
                ${content.split('\n').map(p => `<p>${p}</p>`).join('')}
            </div>
        </div>`;

        const articleHtml = baseHtml
            .replace(/<title>.*?<\/title>/, `<title>${title} | Pathmaker</title>`)
            .replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${description}">`)
            .replace('<div id="root"></div>', `<div id="root">${contentHtml}</div>`);

        fs.writeFileSync(path.join(articleDir, 'index.html'), articleHtml);
        console.log(`✅ Generated /dist/insights/${slug}/index.html`);
    }

    // 3. Generate sitemap.xml
    const SITE_URL = 'https://hylten.github.io/Pathmakers';
    const today = new Date().toISOString().split('T')[0];

    let sitemapUrls = `  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/insights/</loc>
    <lastmod>${today}</lastmod>
    <priority>0.9</priority>
  </url>`;

    for (const file of files) {
        const filePath = path.join(CONTENT_DIR, file);
        const rawContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(rawContent);
        const slug = data.slug || file.replace('.md', '');
        const date = data.date || today;

        sitemapUrls += `
  <url>
    <loc>${SITE_URL}/insights/${slug}/</loc>
    <lastmod>${date}</lastmod>
    <priority>0.8</priority>
  </url>`;
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>`;

    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
    console.log('✅ Generated /dist/sitemap.xml');

    // 4. Generate robots.txt
    const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

    fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
    console.log('✅ Generated /dist/robots.txt');

    console.log('SEO Generation Complete!');
}

generateSEO().catch(console.error);
