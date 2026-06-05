import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const INSIGHTS_DIR = join(process.cwd(), 'content/insights');

const CORRUPTIONS = {
  // File: [find, replace]
  'the-tactical-vanguard-precision-financing-for-com.md': [
    ['This\n\n### Phase I:\n\ns where the asset', 'This is where the asset'],
    ['Corporate groups are reaching their\n\n# Phase LIMI: t. Operational sprawl', 'Corporate groups are reaching their limit. Operational sprawl'],
  ],
  'why-pe-funds-lose-to-prepared-sellers.md': [
    ['### Phase I: -\n\n# : THE STRUCTURAL DIAGNOSIS', '### Phase I: THE STRUCTURAL DIAGNOSIS'],
    ['### Phase I:\n\n- PRINCIPAL VOICE: DIRECT STATEMENTS FROM THE ANALYST CHAIR', '### Phase I: PRINCIPAL VOICE: DIRECT STATEMENTS FROM THE ANALYST CHAIR'],
  ],
  'strategic-liquidity-mid-market-ma-institutional-briefing.md': [
    ['### Phase I: n 2026', '### Phase I: In 2026'],
  ],
  'strategic-liquidity-in-ma-how-uhnwis-use-abl-to-close-faster.md': [
    ['### Phase I: diligence. This intimidates sellers.', '### Phase I: Due Diligence. This intimidates sellers.'],
  ],
  'the-pathmaker-approach-to-sovereign-financing-for-hnwi-and-uhnw-portfolios.md': [
    ['### Phase I: s where most deals fracture.', '### Phase I: This is where most deals fracture.'],
  ],
  'financing-operational-resilience-pathmaker-playbook.md': [
    ['### Phase I: s tactical. The next', '### Phase I: This is tactical. The next'],
  ],
  'precision-ma-using-abl-to-close-complex-deals.md': [
    ['### Phase I: nstead of concentrating it.', '### Phase I: Instead of concentrating it.'],
  ],
  'precision-financing-for-the-nordic-biotech-sector.md': [
    ['# Phase D: efined by an unforgiving cost of capital.', '# Phase D: Defined by an unforgiving cost of capital.'],
  ],
  'strategic-clarity-reduces-price-chipping.md': [
    ['### Phase I: s performance, not rehearsal.', '### Phase I: This is performance, not rehearsal.'],
  ],
  'stealth-deal-origination-uhnw-analysis.md': [
    ['### Phase I: -\n\n### Phase II:', '### Phase I:\n\n### Phase II:'],
  ],
  'off-market-sovereignty.md': [
    ['### Phase II:\n\n### Phase II:', '### Phase I:\n\n### Phase II:'],
  ],
  'mid-market-advantage-asset-based-finance.md': [
    ['### Phase I:\n\n### Phase I:', '### Phase I:\n\n### Phase II:'],
  ],
  'proactive-sell-side-diligence-competitive-advantage.md': [
    ['### Phase I: ) Private-structural-unfiltered.', '### Phase I: Private-Structural-Unfiltered.'],
  ],
  'strategic-carve-outs-nordic-liquidity-precision-structural-advantage.md': [
    ['Phase A: Pre‑Separation Desig n', 'Phase A: Pre‑Separation Design'],
    ['# Phase C: Market Positionin g', '# Phase C: Market Positioning'],
    ['# Phase D: Executio n', '# Phase D: Execution'],
  ],
};

let fixed = 0;

for (const [file, replacements] of Object.entries(CORRUPTIONS)) {
  const filepath = join(INSIGHTS_DIR, file);
  let content = readFileSync(filepath, 'utf-8');
  let changed = false;

  for (const [find, replace] of replacements) {
    if (content.includes(find)) {
      content = content.replace(find, replace);
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(filepath, content, 'utf-8');
    fixed++;
    console.log(`Fixed: ${file}`);
  }
}

console.log(`\nContent corruption fixes: ${fixed} files`);
