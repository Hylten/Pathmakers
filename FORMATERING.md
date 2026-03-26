# Article Formatting Skill

Reformats raw article text into clean, structured markdown.

## Rules

### Frontmatter
- Multi-line YAML block with `---` delimiters
- Keys: title, description, date, author, slug
- Always on separate lines

### Ingress
- First paragraph wrapped in `**bold**` as a summary hook
- 1-3 sentences that capture the article's core thesis

### Headings
- `# Title Case` for main sections (H1)
- `## Title Case` for sub-sections (H2)
- Space after `#` REQUIRED for ReactMarkdown rendering
- Never `#Heading` without space

### Paragraphs
- 3-5 sentences per paragraph, grouped by topic
- Two line breaks (one blank line) between every block
- Never one sentence per line
- Sentences about the same idea stay together

### Bullet Lists
- `- item` with blank line between each item
- Preceded by an intro sentence ending with `:` or `.`

### Bible Verses
- Isolated as their own block:
  ```
  "The verse text"

  - Book Chapter:Verse
  ```

### Footer
- `---` separator at end
- NO CTAs, NO "TECHNICAL MANDATE", NO "Book a..." blocks
- NO marketing language at the end

## Content Cleanup Rules

### Remove These Patterns
- `TECHNICAL MANDATE` blocks and everything after them
- `Qualification Gates strictly observed...` / `Access is restricted...`
- `Minimum target size: $5M+`
- `Book a tactical consultation` / `Book a confidential briefing`
- `THE 25% LINK RULE (Triggered)` and similar CTA blocks
- `For founders preparing...Roials Capital...` (marketing cross-links)
- `INTERNAL TONE, PRINCIPAL VOICE` and similar meta-comments
- `Expanded analytical section - long-form technical breakdown` (meta-comments in parens)
- Any parenthetical meta-instructions like `(Triggered)`, `(Expanded...)`

### Fix Broken Headings
- `### Pillar I: s` → `## Pillar I` (strip `: s` artifact)
- `### Step I: s` → `## Step` (strip `: s` artifact)
- Any `### Word: s` pattern → `## Word`
- Clean up heading artifacts: strip trailing `: s`, `I: s`, numbers after colons

### Fix Author Line
- `•Author Name` → `Author Name` (strip leading bullet)
- `•Pathmaker Intelligence Unit` → `Pathmaker Intelligence Unit`

### Fix Numbered Lists
- Inline `1. Item text. 2. Item text.` → proper numbered list with line breaks
- Each item on its own line with blank line between

## What to NEVER Do
- Don't add content not in the original
- Don't rewrite sentences
- Don't use `#Heading` without space
- Don't create one-sentence paragraphs
- Don't duplicate heading text in the paragraph below
- Don't add CTAs, technical mandates, or marketing blocks

## Detection Heuristics

### Section Boundaries
- ALL CAPS phrases: `THE REGIME SHIFT` → `# The Regime Shift`
- Topic introducers: `The Nature of...`, `The Role of...`
- Concept statements: `Gnosjö was never merely...`
- Question formats: `Why X matters...`, `How X works...`

### Paragraph Grouping
- Break when cumulative length reaches 200+ characters
- Break after 4+ sentences
- Break when next sentence introduces new sub-topic

## Reference
Venture Studio: `https://hylten.github.io/Venture-Studio/#/intelligence/vrdering-i-en-olinjr-marknad-varfr-ebitd`
