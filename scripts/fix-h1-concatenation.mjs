import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const INSIGHTS_DIR = join(process.cwd(), 'content/insights');
const FILES = readdirSync(INSIGHTS_DIR).filter(f => f.endsWith('.md'));

function parseFrontmatterLine(line) {
  const data = {};
  const regex = /([\w-]+):\s*(?:"([^"]*)"|'([^']*)'|([^ \n\r]+))/g;
  let match;
  while ((match = regex.exec(line)) !== null) {
    data[match[1]] = match[2] || match[3] || match[4];
  }
  return data;
}

function parseMultiLineFrontmatter(block) {
  const data = {};
  const regex = /([\w-]+):\s*(?:"([^"]*)"|'([^']*)'|([^ \n\r]+))/g;
  let match;
  while ((match = regex.exec(block)) !== null) {
    data[match[1]] = match[2] || match[3] || match[4];
  }
  return data;
}

// Remove trailing punctuation for comparison
function stripTrailingPunctuation(word) {
  return word.replace(/[.,;:!?'"]+$/, '');
}

function findSplitIndex(h1Text, fmTitle) {
  const h1Words = h1Text.split(/\s+/);
  const fmWords = fmTitle.split(/\s+/);

  let matchCount = 0;
  for (let i = 0; i < Math.min(h1Words.length, fmWords.length); i++) {
    if (stripTrailingPunctuation(h1Words[i]) === stripTrailingPunctuation(fmWords[i])) {
      matchCount++;
    } else {
      break;
    }
  }

  if (matchCount === 0) return 0;

  // Find character position after the matched words
  let pos = 0;
  for (let i = 0; i < matchCount; i++) {
    pos += h1Words[i].length + 1; // +1 for the space
  }
  // Remove trailing space
  if (pos > 0) pos--;

  return pos;
}

let fixed = 0;
let skipped = 0;
let errors = 0;

for (const file of FILES) {
  const filepath = join(INSIGHTS_DIR, file);
  let content = readFileSync(filepath, 'utf-8');

  // Parse frontmatter
  const singleLineMatch = content.match(/^---\s+(.*?)\s+---\s*\n/);
  const multiLineMatch = !singleLineMatch && content.match(/^---\n([\s\S]*?)\n---\n/);

  let fmTitle = null;
  let bodyStart = 0;

  if (singleLineMatch) {
    const fmData = parseFrontmatterLine(singleLineMatch[1]);
    fmTitle = fmData.title;
    bodyStart = singleLineMatch[0].length;
  } else if (multiLineMatch) {
    const fmData = parseMultiLineFrontmatter(multiLineMatch[1]);
    fmTitle = fmData.title;
    bodyStart = multiLineMatch[0].length;
  } else {
    errors++;
    console.log(`❌ Could not parse frontmatter: ${file}`);
    continue;
  }

  if (!fmTitle) {
    errors++;
    console.log(`❌ No title in frontmatter: ${file}`);
    continue;
  }

  // Find the H1 line (first non-empty line after frontmatter that starts with #)
  const body = content.slice(bodyStart);
  const bodyLines = body.split('\n');
  let h1LineIdx = -1;
  for (let i = 0; i < bodyLines.length; i++) {
    if (bodyLines[i].trim().startsWith('# ')) {
      h1LineIdx = i;
      break;
    }
  }

  if (h1LineIdx === -1) {
    skipped++;
    console.log(`⚠️ No H1 found: ${file}`);
    continue;
  }

  const h1Line = bodyLines[h1LineIdx];
  const h1Text = h1Line.trim().slice(2).trim(); // Remove "# " prefix

  // Check if the H1 has body text appended (significantly longer than the title)
  if (h1Text.length <= fmTitle.length + 15) {
    skipped++;
    continue;
  }

  // Find split point between title and body text
  const splitIdx = findSplitIndex(h1Text, fmTitle);

  if (splitIdx <= 0) {
    skipped++;
    continue;
  }

  const bodyText = h1Text.slice(splitIdx).trim();

  if (!bodyText) {
    skipped++;
    continue;
  }

  // Build new content
  const newH1 = `# ${fmTitle}`;
  bodyLines[h1LineIdx] = newH1 + '\n\n' + bodyText;

  const newBody = bodyLines.join('\n');
  const newContent = content.slice(0, bodyStart) + newBody;
  writeFileSync(filepath, newContent, 'utf-8');
  fixed++;
  console.log(`✅ Fixed: ${file}`);
}

console.log(`\nResults: ${fixed} fixed, ${skipped} skipped, ${errors} errors`);
