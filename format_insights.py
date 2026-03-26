#!/usr/bin/env python3
"""
Pathmaker Insights Article Formatter
Following FORMATERING.md skill rules.
"""

import os, re

DIR = "/Users/jonasthevathason/Pathmakers/content/insights"


def parse_fm(content):
    """Parse single-line or multi-line frontmatter."""
    parts = content.split("---", 2)
    if len(parts) < 3:
        return "", content.strip()
    fm_raw = parts[1].strip()
    body = parts[2].strip()

    # Normalize single-line frontmatter to multi-line
    fm_data = {}
    # Extract key: "value" pairs
    for m in re.finditer(r'(\w+):\s*"([^"]*)"', fm_raw):
        fm_data[m.group(1)] = m.group(2)

    if fm_data:
        lines = [f'{k}: "{v}"' for k, v in fm_data.items()]
        fm = "---\n" + "\n".join(lines) + "\n---"
    else:
        fm = f"---\n{fm_raw}\n---"

    return fm, body


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


def detect_sections(text):
    hits = []
    # ALL CAPS
    for m in re.finditer(
        r"(?:^|[.!?]\s)((?:[A-Z]{2,}\s+){1,5}[A-Z]{2,})(?:\s+[a-z]|\s*[.!]|$)", text
    ):
        cap = m.group(1).strip()
        if 3 < len(cap) < 60:
            hits.append((m.start(1), cap))
    # Topic patterns
    tpats = [
        r"(?:^|[.]\s)((?:The\s+(?:Nature|Foundation|Architecture|Structure|Mechanics|Role|Context|Future|Influence|Essence|Purpose|Philosophy|Framework|Dynamics|Path|Value|Challenge|Goal|Approach|Strategy|Method|Process|Position|Reality|Problem|Solution|Opportunity|Benefit|Cost|Calibration|Alignment|Covenant|Legacy|Mandate|Model|System|Art|Case|Stewardship|Regime|Partnership|Spiritual|Industrial|Historical|Operational|Structural|Moral|Current|Generational|Inverse|Counter))\b[^.]*\.)",
        r"(?:^|[.]\s)((?:Pathmaker|Hylt[eé]n|Covenant|Sovereign|Stewardship|Legacy|Capital|Wealth|Moral Authority|Private Credit|Asset Hardening|Fund.III|This brief|The mid.market|The question|The answer)\s+(?:as|is|has|was|operates|stands|represents|provides|defines|creates|treats)\s+[^.]{5,80}\.)",
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
    # Detect sections
    sections = detect_sections(body)

    # Split into chunks
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

    # Format
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
    out = re.sub(r"\n{4,}", "\n\n\n", out)
    out = "\n".join(l.rstrip() for l in out.split("\n"))
    return out.strip()


def process(fp):
    with open(fp) as f:
        content = f.read()
    fm, body = parse_fm(content)
    if not body or len(body) < 100:
        return False

    # Check if already has multiple headings and bold
    if len(re.findall(r"^# ", body, re.M)) >= 3 and "**" in body[:300]:
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
