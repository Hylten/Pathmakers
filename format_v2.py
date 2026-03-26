#!/usr/bin/env python3
"""
Pathmaker Insights Article Formatter v2
Following FORMATERING.md rules - handles broken headings, CTAs, meta-comments.
"""

import os, re

DIR = "/Users/jonasthevathason/Pathmakers/content/insights"


def parse_fm(content):
    parts = content.split("---", 2)
    if len(parts) < 3:
        return "", content.strip()
    fm_raw = parts[1].strip()
    body = parts[2].strip()
    fm_data = {}
    for m in re.finditer(r'(\w+):\s*"([^"]*)"', fm_raw):
        fm_data[m.group(1)] = m.group(2)
    # Fix author line - strip leading bullet
    if "author" in fm_data:
        fm_data["author"] = re.sub(r"^[•·]\s*", "", fm_data["author"]).strip()
    if fm_data:
        lines = [f'{k}: "{v}"' for k, v in fm_data.items()]
        fm = "---\n" + "\n".join(lines) + "\n---"
    else:
        fm = f"---\n{fm_raw}\n---"
    return fm, body


def remove_ctas_and_meta(text):
    """Remove CTA blocks, meta-comments, and marketing content."""
    # Remove TECHNICAL MANDATE blocks (with or without # prefix) and everything after
    text = re.sub(r"\n*#?\s*TECHNICAL MANDATE\s*\n.*$", "", text, flags=re.DOTALL)
    text = re.sub(r"\n*#?\s*TECHNICAL MANDATE\s*$", "", text)

    # Remove "Book a tactical consultation" / "Book a confidential briefing" / "Book a..."
    text = re.sub(r"Book a [^.]+\.\s*", "", text)
    text = re.sub(r"Access is restricted to approved mandates\.\s*", "", text)
    text = re.sub(r"Qualification [Gg]ates? strictly observed[^.]*\.?\s*", "", text)
    text = re.sub(r"Minimum target size: [^.]*\.?\s*", "", text)

    # Remove THE 25% LINK RULE block and cross-marketing
    text = re.sub(
        r"THE 25% LINK RULE\s*.*?(?=\n#|\n\n[A-Z]|\Z)", "", text, flags=re.DOTALL
    )
    text = re.sub(
        r"For founders preparing.*?Roials Capital.*?\.", "", text, flags=re.DOTALL
    )
    text = re.sub(
        r"Many founders study structuring.*?Roials Capital.*?\.",
        "",
        text,
        flags=re.DOTALL,
    )

    # Remove meta-comments in parentheses
    text = re.sub(r"\(Expanded analytical section[^)]*\)", "", text)
    text = re.sub(r"\(long-form technical breakdown\)", "", text)
    text = re.sub(r"\(Triggered\)", "", text)

    # Remove INTERNAL TONE meta-blocks
    text = re.sub(r"INTERNAL TONE[^.]*VOICE\s*", "", text)
    text = re.sub(r"PRINCIPAL VOICE\s*", "", text)
    text = re.sub(r"A Principal states the architecture\.\s*", "", text)
    text = re.sub(
        r"A Principal does not persuade\.\s*A Principal clarifies\.\s*", "", text
    )
    text = re.sub(
        r"Not a public explainer\.\s*Not a marketing gloss\.\s*A vault document\.\s*",
        "",
        text,
    )
    text = re.sub(r"The following is the internal brief\.\s*", "", text)

    # Remove trailing CTA sentences
    text = re.sub(r"If you are preparing for an exit[^.]*your next[^.]*\.\s*", "", text)

    # Fix broken inline headings: ### Step I: s → ## Step
    text = re.sub(r"#{1,3}\s*(?:Step|Pillar|Phase)\s+[IVX\d]+:\s*s\s*", "## ", text)

    # Fix inline bullet lists: "- Item one - Item two - Item three" all on one line
    def fix_inline_dash(m):
        line = m.group(0)
        if line.count(" - ") >= 2:
            parts = re.split(r"\s+-\s+", line)
            parts = [p.strip() for p in parts if p.strip()]
            if len(parts) >= 2:
                # First part might have leading text before first dash
                # Check if first part starts with dash content
                return "\n\n- " + "\n\n- ".join(parts) + "\n\n"
        return line

    text = re.sub(r"[^\n]*(?:\s-\s+[A-Z][^\n]{5,}){2,}[^\n]*", fix_inline_dash, text)

    # Fix inline numbered lists
    def fix_inline_numbered(m):
        items = re.findall(r"(\d+)\.\s+([A-Z][^.]+\.)", m.group(0))
        if len(items) >= 2:
            return "\n\n" + "\n\n".join(f"{n}. {t}" for n, t in items) + "\n\n"
        return m.group(0)

    text = re.sub(r"(?:\d+\.\s+[A-Z][^.]+\.\s*){2,}", fix_inline_numbered, text)

    text = re.sub(r"\n{4,}", "\n\n\n", text)
    return text.strip()


def fix_headings(text):
    """Fix broken heading patterns."""
    # Fix ### Pillar I: s → ## Pillar
    text = re.sub(
        r"^#{1,3}\s*(?:Pillar|Step|Phase)\s+[IVX]+:\s*s\s*(.*)",
        r"## \1",
        text,
        flags=re.MULTILINE,
    )
    # Fix ### Word: s → ## Word
    text = re.sub(
        r"^#{1,3}\s*(\w[\w\s]+?):\s*s\s*$", r"## \1", text, flags=re.MULTILINE
    )
    # Fix ### heading without space
    text = re.sub(r"^(#{1,3})([^\s#])", r"\1 \2", text, flags=re.MULTILINE)
    return text


def split_sentences(text):
    text = re.sub(r"\s+", " ", text).strip()
    sents, buf = [], []
    i = 0
    while i < len(text):
        buf.append(text[i])
        if text[i] in ".!?" and i + 1 < len(text) and text[i + 1] == " ":
            rest = text[i + 2 :]
            if not rest:
                break
            if rest[0].islower():
                i += 1
                continue
            word = "".join(buf).split()[-1].rstrip(".!?")
            if word.lower() in ("e.g", "i.e", "dr", "mr", "mrs", "vs", "etc"):
                i += 1
                continue
            if re.search(r"\d+:\d+$", word):
                i += 1
                continue
            sents.append("".join(buf).strip())
            buf = []
        i += 1
    if buf:
        sents.append("".join(buf).strip())
    return [s for s in sents if s]


def group_paragraphs(sents):
    if not sents:
        return []
    paras, buf, blen = [], [], 0
    for i, s in enumerate(sents):
        buf.append(s)
        blen += len(s)
        nxt = sents[i + 1] if i + 1 < len(sents) else ""
        break_now = False
        if len(buf) >= 4:
            break_now = True
        elif len(buf) >= 3 and blen >= 200:
            break_now = True
        elif len(buf) >= 2 and blen >= 350:
            break_now = True
        elif nxt and re.search(
            r"(?:following|include|prioritize|emphasize)[.:]\s*$", nxt, re.I
        ):
            break_now = True
        if break_now:
            paras.append(" ".join(buf))
            buf, blen = [], 0
    if buf:
        paras.append(" ".join(buf))
    return paras


def fix_numbered_lists(text):
    """Convert inline numbered items to proper list format."""

    # Pattern: "1. Text. 2. Text. 3. Text."
    def repl(m):
        items = re.findall(r"(\d+)\.\s+([A-Z][^.]+\.(?:\s+[^.]+\.)*)", m.group(0))
        if len(items) >= 2:
            lines = []
            for num, content in items:
                lines.append(f"{num}. {content.strip()}")
            return "\n\n" + "\n\n".join(lines) + "\n\n"
        return m.group(0)

    text = re.sub(r"(\d+\.\s+[A-Z][^.]+\.\s*(?:\d+\.\s+[A-Z][^.]+\.\s*)+)", repl, text)
    return text


def detect_sections(text):
    hits = []
    # ALL CAPS (2-6 words)
    for m in re.finditer(
        r"(?:^|[.!?]\s)((?:[A-Z]{2,}\s+){1,5}[A-Z]{2,})(?:\s+[a-z]|\s*[.!]|$)", text
    ):
        cap = m.group(1).strip()
        if 3 < len(cap) < 60 and cap not in ("THE", "AND", "FOR", "NOT", "BUT"):
            hits.append((m.start(1), cap))
    # Topic patterns
    tpats = [
        r"(?:^|[.]\s)((?:The\s+(?:Nature|Foundation|Architecture|Structure|Mechanics|Role|Context|Future|Influence|Essence|Purpose|Philosophy|Framework|Dynamics|Path|Value|Challenge|Goal|Approach|Strategy|Method|Process|Position|Reality|Problem|Solution|Opportunity|Benefit|Cost|Calibration|Alignment|Legacy|Mandate|Model|System|Art|Case|Stewardship|Regime|Partnership|Spiritual|Industrial|Operational|Structural|Moral|Generational|Inverse|Counter|Buy-Side|Deal|Final|Principal))\b[^.]*\.)",
        r"(?:^|[.]\s)((?:Pathmaker|Hylt[eé]n|Covenant|Sovereign|Stewardship|Legacy|Capital|Wealth|Private Credit|This brief|The mid.market|The question|The answer)\s+(?:as|is|has|was|operates|stands|represents|provides|defines|creates|treats)\s+[^.]{5,80}\.)",
        r"(?:^|[.]\s)((?:Why|How)\s+[A-Z][^.]{5,70}\.)",
    ]
    for pat in tpats:
        for m in re.finditer(pat, text, re.IGNORECASE):
            phrase = m.group(1).strip().rstrip(".")
            if 10 < len(phrase) < 120 and not phrase.startswith(
                ("This is", "It is", "These are")
            ):
                hits.append((m.start(1), phrase))

    hits.sort(key=lambda x: x[0])
    seen, unique = set(), []
    for pos, h in hits:
        key = h.lower()[:35]
        if key not in seen and not any(abs(pos - p) < 120 for p, _ in unique):
            seen.add(key)
            unique.append((pos, h))
    return unique


def format_body(body):
    # Step 1: Remove CTAs and meta
    body = remove_ctas_and_meta(body)

    # Step 2: Fix broken headings in-place
    body = fix_headings(body)

    # Step 3: Fix numbered lists
    body = fix_numbered_lists(body)

    # Step 4: Detect sections (only in text that doesn't already have # headings)
    existing_headings = re.findall(r"^#{1,3}\s", body, re.MULTILINE)
    if len(existing_headings) < 3:
        sections = detect_sections(body)
    else:
        sections = []

    # Step 5: Split by sections and format
    if sections:
        chunks = []
        last = 0
        for pos, heading in sections:
            if pos > last:
                chunk = body[last:pos].strip().lstrip(".").strip()
                if chunk:
                    chunks.append(("text", chunk))
            chunks.append(("heading", heading))
            last = pos
        if last < len(body):
            rem = body[last:].strip()
            if rem:
                chunks.append(("text", rem))
    else:
        # Already has headings - split by them
        parts = re.split(r"\n(#{1,3}\s+[^\n]+)\n", body)
        chunks = []
        for p in parts:
            p = p.strip()
            if not p:
                continue
            if re.match(r"^#{1,3}\s", p):
                chunks.append(("heading", re.sub(r"^#{1,3}\s+", "", p)))
            else:
                chunks.append(("text", p))

    # Step 6: Format each chunk
    parts = []
    first = True
    for i, (kind, content) in enumerate(chunks):
        if kind == "heading":
            parts.append(f"\n\n# {content}\n")
        else:
            # Remove duplicate heading text
            if i > 0 and chunks[i - 1][0] == "heading":
                h = chunks[i - 1][1]
                if content.startswith(h):
                    content = content[len(h) :].strip().lstrip(".").strip()
            if not content:
                continue
            sents = split_sentences(content)
            paras = group_paragraphs(sents)
            txt = "\n\n".join(paras)
            if first:
                end = txt.find("\n\n")
                if end > 0:
                    txt = f"**{txt[:end]}**{txt[end:]}"
                else:
                    txt = f"**{txt}**"
                first = False
            parts.append(txt)

    out = "\n".join(parts)
    # Final cleanup - remove any remaining CTA/meta
    out = re.sub(r"\n*#?\s*TECHNICAL MANDATE\s*.*$", "", out, flags=re.DOTALL)
    out = re.sub(
        r"THE 25% LINK RULE\s*.*?(?=\n#|\n\n[A-Z]|\Z)", "", out, flags=re.DOTALL
    )
    out = re.sub(
        r"For founders preparing.*?Roials Capital.*?\.", "", out, flags=re.DOTALL
    )
    out = re.sub(r"Many founders study.*?Roials Capital.*?\.", "", out, flags=re.DOTALL)
    out = re.sub(r"Book a [^.]+\.\s*", "", out)

    # Fix inline bullet lists on single lines
    def fix_dash_list(line):
        if " - " in line and line.count(" - ") >= 2:
            parts = re.split(r"\s+-\s+", line)
            parts = [p.strip() for p in parts if len(p.strip()) > 3]
            if len(parts) >= 2:
                return "\n\n- " + "\n\n- ".join(parts) + "\n\n"
        return line

    lines = out.split("\n")
    fixed = []
    for line in lines:
        fixed.append(fix_dash_list(line))
    out = "\n".join(fixed)
    out = re.sub(r"\n{4,}", "\n\n\n", out)
    out = "\n".join(l.rstrip() for l in out.split("\n"))
    return out.strip()


def process(fp):
    with open(fp) as f:
        content = f.read()
    fm, body = parse_fm(content)
    if not body or len(body) < 100:
        return False

    formatted = format_body(body)
    with open(fp, "w") as f:
        f.write(f"{fm}\n\n{formatted}\n")
    return True


def main():
    files = sorted(f for f in os.listdir(DIR) if f.endswith(".md"))
    done = skip = 0
    for fn in files:
        if process(os.path.join(DIR, fn)):
            done += 1
            print(f"  ✓ {fn}")
        else:
            skip += 1
    print(f"\nDone: {done} formatted, {skip} skipped")


if __name__ == "__main__":
    main()
