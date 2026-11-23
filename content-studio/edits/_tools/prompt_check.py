#!/usr/bin/env python3
"""Pre-flight check of a Seedance video prompt against reels-director's PROMPT MISTAKES.

Usage: python3 prompt_check.py prompts/<file>.txt
Every prompt in the file (from "A vertical 9:16" to its AVOID line) is checked. FAIL lines must be fixed before the
prompt goes to the owner; WARN lines are read and answered. The questions at the end are answered in the prompt file
("PRE-FLIGHT" section) before the prompt is sent: the cut-place mistake of 21 Nov was a question no script can answer.
"""
import re
import sys

SURFACES = ["oak", "parchment", "bokeh", "steel bowl", "stainless", "freezer", "oil", "oven", "air fryer", "plate",
            "tray", "stone counter", "range", "kitchen", "glass", "enamel", "daylight", "green background"]
ACTIONS = ["cut", "slice", "lift", "open", "pipe", "pipes", "set", "shut", "dunk", "whisk", "roll", "dip", "push",
           "pull", "fry", "lower", "brush", "pour", "press", "pinch", "braid", "thread", "unzip", "zip", "tilt",
           "knock", "skewer", "bite", "slide", "sprinkle", "fill"]
# The cliff (2026-11-23): ordinary prep after the hook. The ice cubes lost 32 points in 2 s on a white mug of sugar, the
# water and the microwave (B: 63% at 4 s, 31% at 6 s); the lantern lost 33 points on its batter at 3.7-8.1 s.
PREP = re.compile(r"\b(sugar|flour|water|milk|salt|oil|cocoa|eggs?|butter|batter|cream cheese|yogurt|spices?)\b[^.;:]{0,40}"
                  r"\b(pours?|poured|falls?|into|onto|mix(es|ed)?|whisk(s|ed)?)\b|\b(microwave|whisk(s|ed|ing)?|stir(s|red|ring)?)\b",
                  re.I)
AMBIGUOUS_PLACE = re.compile(r"\b(cut|cuts|slice|slices|sliced|split|splits)\b[^.;:]{0,60}\b(middle|centre|center)\b",
                             re.I)


def prompts(text):
    out, cur = [], None
    for line in text.splitlines():
        if line.startswith("A vertical 9:16"):
            cur = [line]
            continue
        if cur is not None:
            cur.append(line)
            if line.startswith("AVOID:"):
                out.append("\n".join(cur))
                cur = None
    return out


def shots(p):
    found = re.findall(r"^(?:SHOT \d+ — )?(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)s: (.*)$", p, re.M)
    return [(float(a), float(b), body) for a, b, body in found]


def check(p, n):
    fails, warns = [], []
    head = p.split("\n", 1)[0]
    avoid = p[p.rfind("AVOID:"):].lower()
    low = p.lower()
    # Rule 1: no book in the prompt.
    for w in ("the book", "word for word", "recipe:"):
        if w in low:
            fails.append(f"rule 1: '{w}' in the prompt")
    # Rule 2: the lenses.
    if "solid matte black" not in low or "no glow" not in low:
        fails.append("rule 2: the lens line (solid matte black, no glow) is missing")
    if "glowing" not in avoid:
        fails.append("rule 2: glowing sunglasses are not in AVOID")
    # Text, halal, completion.
    if "no text" not in low:
        fails.append("no 'no text' in the prompt")
    for w in ("pork", "alcohol"):
        if w not in avoid:
            fails.append(f"halal: '{w}' not in AVOID")
    sh = shots(p)
    m = re.search(r"exactly (\d+) seconds", head)
    if m and sh and abs(sh[-1][1] - float(m.group(1))) > 0.05:
        fails.append(f"the last shot ends at {sh[-1][1]} s, the film is {m.group(1)} s")
    for i in range(1, len(sh)):
        if abs(sh[i][0] - sh[i - 1][1]) > 0.05:
            fails.append(f"a gap or overlap between {sh[i-1][1]} s and {sh[i][0]} s")
    # Rule 3: a new background in every shot.
    prev = None
    for a, b, body in sh:
        s = {w for w in SURFACES if w in body.lower()}
        if prev is not None and s and prev and s == prev:
            warns.append(f"rule 3: the shot at {a} s has the same surfaces as the one before ({', '.join(sorted(s))})")
        prev = s
    # Rule 8: say where the knife goes on the food.
    body_only = p[:p.rfind("AVOID:")]
    for mm in AMBIGUOUS_PLACE.finditer(body_only):
        fails.append(f"rule 8: '{mm.group(0)}': name the part of the food (edge, side, top, end, front, back), "
                     "never 'middle' (it reads as a cut down through it)")
    # Rule 9: one action per shot.
    for a, b, body in sh:
        verbs = {v for v in ACTIONS if re.search(rf"\b{v}(s|es|ed|ing)?\b", body.lower())}
        if len(verbs) >= 3 and b - a <= 4.0:
            warns.append(f"rule 9: the shot at {a}-{b} s asks for {len(verbs)} actions ({', '.join(sorted(verbs))}) "
                         "in {:.1f} s; one action per shot, or split it".format(b - a))
    # Rule 10: no later-state image in an early shot.
    if sh:
        third = sh[0][0] + (sh[-1][1] - sh[0][0]) / 3
        for a, b, body in sh:
            for img in ("@Image3", "@Image4", "image_3", "image_4"):
                if img in body and a < third:
                    warns.append(f"rule 10: the shot at {a} s follows {img}, a finished state, in the first third")
    # The cliff: ordinary prep in the first half after the hook (completion engine rule 2).
    if sh:
        half = sh[0][0] + (sh[-1][1] - sh[0][0]) / 2
        for a, b, body in sh[1:]:
            mm = PREP.search(body)
            if mm and a < half:
                warns.append(f"the cliff: the shot at {a} s is ordinary prep ('{mm.group(0)}'); viewers left at 16 points a "
                             "second on the ice cubes' sugar, water and microwave; move it to the caption or make it a change")
    if "bite" in (sh[-1][2].lower() if sh else ""):
        warns.append("completion: the last shot has a bite; it ends on the peak")
    print(f"--- prompt {n}: {head[:80]}")
    for f in fails:
        print("FAIL", f)
    for w in warns:
        print("WARN", w)
    if not fails and not warns:
        print("OK  ", "no rule broken that a script can see")
    return len(fails)


QUESTIONS = """
Answer these in the prompt file (PRE-FLIGHT) before it goes to the owner:
1. Does anything show before the action that makes it (the ribs before the knife, the cheese before it goes in)?
2. Every cut and every placement: is its place named by a part of the food (edge, side, top, end, front, back)?
3. Read the prompt once in Arabic (Google Translate): does each sentence still mean one thing?
4. Is each shot one action the model can show in its seconds?
5. Which reference image does each shot follow, and is the food in that image in the same state as in the shot?
"""

if __name__ == "__main__":
    text = open(sys.argv[1], encoding="utf-8").read()
    total = sum(check(p, i + 1) for i, p in enumerate(prompts(text)))
    print(QUESTIONS)
    sys.exit(1 if total else 0)
