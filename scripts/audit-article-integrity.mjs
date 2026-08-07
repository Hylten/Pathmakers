import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const root = process.cwd();
const contentRoots = [
  path.join(root, 'content', 'insights'),
  path.join(root, 'content', 'intelligence'),
];

const rules = [
  {
    name: 'intern meta-text eller promptläckage',
    pattern: /\b(?:internal tone|principal voice|the \d+% link rule|expanded analytical sectio\s*n|not a public explainer|vault document)\b/gi,
  },
  {
    name: 'felaktigt format på engelskt bindeord',
    pattern: /\b(?:pillar|step)\s+i:\s*s\b/gi,
  },
  {
    name: 'ordsplittring',
    pattern: /\bsectio\s+n\b/gi,
  },
];

function isContentFile(file) {
  const absolute = path.resolve(root, file);
  return absolute.endsWith('.md') && contentRoots.some((dir) => absolute.startsWith(`${dir}${path.sep}`));
}

function listMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((entry) => entry.endsWith('.md'))
    .map((entry) => path.join(dir, entry));
}

function changedContentFiles() {
  const status = execFileSync('git', ['status', '--porcelain', '--untracked-files=all'], {
    cwd: root,
    encoding: 'utf8',
  });

  return status
    .split('\n')
    .filter(Boolean)
    .map((line) => line.slice(3).replace(/^.* -> /, ''))
    .filter(isContentFile)
    .map((file) => path.resolve(root, file));
}

function lineNumber(content, offset) {
  return content.slice(0, offset).split('\n').length;
}

const auditAll = process.argv.includes('--all');
const files = auditAll
  ? contentRoots.flatMap(listMarkdown)
  : changedContentFiles();

if (files.length === 0) {
  console.log('✅ Article integrity: inga ändrade artiklar att granska.');
  process.exit(0);
}

const failures = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  for (const rule of rules) {
    rule.pattern.lastIndex = 0;
    for (const match of content.matchAll(rule.pattern)) {
      failures.push({
        file: path.relative(root, file),
        line: lineNumber(content, match.index),
        rule: rule.name,
        text: match[0],
      });
    }
  }

  const ctaPattern = /access is restricted to approved mandates\./gi;
  const ctas = [...content.matchAll(ctaPattern)];
  if (ctas.length > 1) {
    for (const match of ctas.slice(1)) {
      failures.push({
        file: path.relative(root, file),
        line: lineNumber(content, match.index),
        rule: 'duplicerad CTA eller kvalifikationsgräns',
        text: match[0],
      });
    }
  }
}

if (failures.length > 0) {
  console.error('❌ Article integrity blockerade publicering:');
  for (const failure of failures) {
    console.error(`- ${failure.file}:${failure.line}: ${failure.rule} → ${failure.text}`);
  }
  process.exit(1);
}

console.log(`✅ Article integrity: ${files.length} artikel/artiklar godkända.`);
