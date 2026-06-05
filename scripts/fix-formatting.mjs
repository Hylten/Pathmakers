import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const INSIGHTS_DIR = join(process.cwd(), 'content/insights');
const FILES = readdirSync(INSIGHTS_DIR).filter(f => f.endsWith('.md'));

// Truncated title/description fixes
const TITLE_FIXES = {
  'ma-warfare-navigating-the-middle-market-credit-g.md': {
    title: 'M&A Warfare: Navigating The Middle Market Credit Gap',
    desc: 'A high-density institutional briefing on the middle-market credit gap, asset hardening, covenant stewardship, and tactical intelligence for owners preparing for GP-grade exit readiness.'
  },
  'operational-resilience-removing-human-friction-fr.md': {
    title: 'Operational Resilience: Removing Human Friction in M&A',
    desc: 'An institutional analysis of how human friction in mid-market M&A destroys valuation, transaction velocity, and institutional trust and the structural mandate to eliminate it.'
  },
  'pe-trench-report-why-healthcare-deals-collapse-in.md': {
    title: 'PE Trench Report: Why Healthcare Deals Collapse in 2026',
    desc: 'Field intelligence from the M&A trenches on why healthcare transactions collapse in 2026, with structural analysis of regulatory exposure, labor instability, and covenant failures.'
  },
  'the-negotiators-mandate-structural-certainty-in.md': {
    title: "The Negotiator's Mandate: Structural Certainty in Private Equity",
    desc: "An institutional analysis on M&A friction removal, exit readiness engineering, and off-market deal origination through tactical negotiation architecture for mid-market principals."
  },
  'the-tactical-vanguard-precision-financing-for-com.md': {
    title: 'The Tactical Vanguard: Precision Financing for Complex Spin-offs',
    desc: 'A high-density briefing on precision financing for complex mid-market spin-offs, covering asset hardening, covenant stewardship, and execution velocity for institutional-grade carve-outs.'
  },
  'strategic-asset-hardening-the-path-to-institution.md': {
    title: 'Strategic Asset Hardening: The Path to Institutional Valuation',
    desc: 'An institutional briefing on strategic asset hardening as the systematic removal of friction in financial, operational, and governance architecture for mid-market exit readiness.'
  }
};

function parseFrontmatterLine(line) {
  const data = {};
  const regex = /([\w-]+):\s*(?:"([^"]*)"|'([^']*)'|([^ \n\r]+))/g;
  let match;
  while ((match = regex.exec(line)) !== null) {
    data[match[1]] = match[2] || match[3] || match[4];
  }
  return data;
}

function formatFrontmatter(data) {
  let fm = '---\n';
  for (const key of ['title', 'description', 'date', 'author', 'slug']) {
    if (data[key]) {
      fm += `${key}: "${data[key]}"\n`;
    }
  }
  fm += '---';
  return fm;
}

// Phase 1: Fix THE MANDAT E in all files
let mandateFixed = 0;
for (const file of FILES) {
  const filepath = join(INSIGHTS_DIR, file);
  let content = readFileSync(filepath, 'utf-8');
  if (/THE\s+MANDAT\s+E/.test(content)) {
    content = content.replace(/THE\s+MANDAT\s+E\b/g, 'THE MANDATE');
    writeFileSync(filepath, content, 'utf-8');
    mandateFixed++;
  }
}
console.log(`Phase 1 - THE MANDAT E → THE MANDATE: ${mandateFixed} files fixed`);

// Phase 2: Fix frontmatter (truncated titles, desc==title, single-line → multi-line)
let frontmatterFixed = 0;
let truncatedFixed = 0;
let descFixed = 0;

for (const file of FILES) {
  const filepath = join(INSIGHTS_DIR, file);
  let content = readFileSync(filepath, 'utf-8');
  let modified = false;

  // Parse frontmatter from first line (single-line format)
  const firstLineRegex = /^---\s+(.*?)\s+---\s*\n/;
  const match = content.match(firstLineRegex);
  if (!match) continue;

  const fmData = parseFrontmatterLine(match[1]);
  const body = content.slice(match[0].length);

  // Fix truncated titles
  if (TITLE_FIXES[file]) {
    fmData.title = TITLE_FIXES[file].title;
    fmData.description = TITLE_FIXES[file].desc;
    truncatedFixed++;
    modified = true;
  }

  // Fix description == title (for articles not in the manual fix map)
  if (!TITLE_FIXES[file] && fmData.description === fmData.title) {
    const cleanBody = body
      .replace(/^#\s+.*\n/, '')
      .replace(/\*\*|__/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    const sentences = cleanBody.split(/(?<=\.)\s+/);
    const first = sentences[0]?.replace(/\n/g, ' ').trim();
    if (first && first.length > 30 && first.length < 200) {
      fmData.description = first.endsWith('.') ? first : first + '.';
      descFixed++;
      modified = true;
    }
  }

  if (modified) {
    const newFrontmatter = formatFrontmatter(fmData);
    const newContent = newFrontmatter + '\n' + body;
    writeFileSync(filepath, newContent, 'utf-8');
    frontmatterFixed++;
  }
}

console.log(`Phase 2 - Frontmatter fixes:`);
console.log(`  Truncated titles fixed: ${truncatedFixed}`);
console.log(`  Description == title fixed: ${descFixed}`);
console.log(`  Total frontmatter rewrites: ${frontmatterFixed}`);
console.log(`\nDone!`);
