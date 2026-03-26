# Article Formatting Skill

Reformats raw article text into clean, structured markdown following the Venture Studio visual architecture.

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
- Space after `#` required for ReactMarkdown rendering
- Cormorant Garamond font in CSS

### Paragraphs
- 3-5 sentences per paragraph, grouped by topic
- Two line breaks (one blank line) between every block
- Never one sentence per line — that's too choppy
- Sentences about the same idea stay together

### Bullet Lists
- `- item` with blank line between each item
- Preceded by an intro sentence ending with `:` or `.`
- Each item is a complete thought, not a fragment

### Bible Verses
- Isolated as their own block:
  ```
  "The verse text in italics and quotes"

  - Book Chapter:Verse
  ```

### Footer
- `---` separator
- Clean ending — no CTAs or "TECHNICAL MANDATE" blocks unless specified

### What to NEVER do
- Don't add content not in the original
- Don't rewrite sentences
- Don't use `#Heading` without space (breaks ReactMarkdown)
- Don't create one-sentence paragraphs
- Don't duplicate heading text in the paragraph below
- Don't add CTAs, technical mandates, or marketing blocks

## Detection Heuristics

### Section Boundaries
Look for these patterns to insert `#` headings:
- ALL CAPS phrases: `THE REGIME SHIFT` → `# The Regime Shift`
- Topic introducers: `The Nature of...`, `The Role of...`, `The Architecture of...`
- Concept statements: `Gnosjö was never merely...`, `Hyltén Invest operates on...`
- Question formats: `Why X matters...`, `How X works...`

### Paragraph Grouping
Break into new paragraph when:
- Cumulative length reaches 200+ characters
- 4+ sentences accumulated
- Next sentence introduces a new sub-topic
- Next sentence starts with "For [Company]...", "This is...", "In [context]..."

## Python Script Template

```python
# format_articles.py
# 1. Parse frontmatter (split on ---)
# 2. Fix Bible verses (regex for "quote" - Book Ch:V)
# 3. Detect section boundaries (pattern matching)
# 4. Split into sentences (respect abbreviations, refs)
# 5. Group into paragraphs (3-5 sentences, 200+ chars)
# 6. Remove duplicate heading text from following paragraph
# 7. Add bold ingress on first paragraph
# 8. Add # headings
# 9. Clean up excess blank lines
# 10. Write back with frontmatter
```

## Reference
Venture Studio article: `https://hylten.github.io/Venture-Studio/#/intelligence/vrdering-i-en-olinjr-marknad-varfr-ebitd`
