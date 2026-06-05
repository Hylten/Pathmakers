import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const INSIGHTS_DIR = join(process.cwd(), 'content/insights');
const FILES = readdirSync(INSIGHTS_DIR).filter(f => f.endsWith('.md'));

const TITLE_FIXES = {
  'tactical-due-diligence-hardening-assets-for-gp-ac.md': {
    title: 'Tactical Due Diligence: Hardening Assets for GP Acquisition',
    desc: 'An institutional briefing on tactical due diligence as the discipline of hardening mid-market assets for GP acquisition, covering structural alignment, covenant stewardship, and predictable execution.'
  },
  'tactical-intelligence-for-nordic-cross-border-acqu.md': {
    title: 'Tactical Intelligence for Nordic Cross-Border Acquisitions',
    desc: 'A high-density briefing on tactical intelligence for Nordic cross-border acquisitions in a structurally pivoting mid-market, covering valuation compression and liquidity engineering.'
  },
  'the-dark-arts-of-exit-readiness-a-generals-persp.md': {
    title: "The Dark Arts of Exit Readiness: A General's Perspective",
    desc: "A principal-grade intelligence briefing on exit readiness, operational hardening, and institutional buyer calibration for mid-market European and North American companies preparing for liquidity events."
  },
  'using-precision-abl-to-accelerate-ma-and-carve-ou.md': {
    title: 'Using Precision ABL to Accelerate M&A and Carve Outs in Tight Liquidity Cycles',
    desc: 'A technical institutional briefing on how precision asset-based lending restructures operational inertia, removes transaction friction, and accelerates carve-out velocity for mid-market acquirers.'
  },
  'friction-elimination-in-mid-market-carve-outs.md': {
    title: 'Friction Elimination in Mid-Market Carve Outs',
    desc: 'A principal-level intelligence briefing on friction elimination in mid-market carve outs, covering asset hardening, covenant stewardship, operational separation, and execution velocity.'
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

let fixed = 0;

for (const file of FILES) {
  if (!TITLE_FIXES[file]) continue;

  const filepath = join(INSIGHTS_DIR, file);
  let content = readFileSync(filepath, 'utf-8');

  const fix = TITLE_FIXES[file];

  // Handle both single-line and multi-line frontmatter
  const singleLineMatch = content.match(/^---\s+(.*?)\s+---\s*\n/);
  const multiLineMatch = content.match(/^---\n([\s\S]*?)\n---\n/);

  if (singleLineMatch) {
    const fmData = parseFrontmatterLine(singleLineMatch[1]);
    fmData.title = fix.title;
    fmData.description = fix.desc;
    const body = content.slice(singleLineMatch[0].length);
    const newContent = formatFrontmatter(fmData) + '\n' + body;
    writeFileSync(filepath, newContent, 'utf-8');
    fixed++;
    console.log(`Fixed (single-line): ${file}`);
  } else if (multiLineMatch) {
    const fmRaw = multiLineMatch[1];
    const fmData = {};
    const regex = /([\w-]+):\s*(?:"([^"]*)"|'([^']*)'|([^ \n\r]+))/g;
    let m;
    while ((m = regex.exec(fmRaw)) !== null) {
      fmData[m[1]] = m[2] || m[3] || m[4];
    }
    fmData.title = fix.title;
    fmData.description = fix.desc;
    const body = content.slice(multiLineMatch[0].length);
    const newContent = formatFrontmatter(fmData) + '\n' + body;
    writeFileSync(filepath, newContent, 'utf-8');
    fixed++;
    console.log(`Fixed (multi-line): ${file}`);
  } else {
    console.log(`Could not parse: ${file}`);
  }
}

console.log(`\nRound 2 complete: ${fixed} files fixed`);
