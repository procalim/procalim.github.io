#!/usr/bin/env python3
"""Google first «من جوجل» (the owner, 24 Nov: «ابحث عن طريق جوجل عن الوصفات، ومن جوجل الوصفات احنا بنصير نخترع الشكل
والافكار»): what people are searching for right now, matched to the book.

Google's autocomplete is live demand, free and needs no login: it lists what people type after «وصفة ترند», «ترند ال...»,
"viral recipe", on Google and on YouTube. Each trend term is matched to the book (book-index.tsv) through a small
Arabic-English food word list; the matches go to mixer.py for an object and to idea-lab for the score.

Google is reachable from the Higgsfield sandbox (this container's proxy blocks it), so it runs in two halves:
    sandbox:  python3 google_ideas.py --terms --deep > terms.json   # the live terms (--deep expands «ترند X» one level)
    here:     python3 google_ideas.py --from terms.json             # matched to book-index.tsv
Or both at once where Google and book-index.tsv are both reachable: python3 google_ideas.py --deep
"""
import csv, json, os, sys, urllib.parse, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
SEEDS = [("وصفة ترند ", "ar", ""), ("وصفة ترند", "ar", "yt"), ("ترند ال", "ar", ""), ("طريقة عمل ترند", "ar", ""),
         ("viral recipe", "en", ""), ("viral recipes right now", "en", ""), ("tiktok recipe", "en", ""),
         ("trend recipe", "en", "yt"), ("viral food", "en", "yt")]
# Arabic food words -> English words found in the book's titles
AR = {"بصل": ["onion"], "اندومي": ["ramen"], "نودلز": ["ramen", "noodle"], "شيتوس": ["cheetos", "takis"],
      "كوكيز": ["cookie", "crookie"], "خيار": ["cucumber"], "عسل": ["honey"], "ليمون": ["lemon"],
      "بطاطس": ["potato"], "بطاطا": ["potato"], "بطيخ": ["watermelon"], "دجاج": ["chicken"], "جبن": ["cheese"],
      "جبنة": ["cheese"], "فلفل": ["jalapeño", "pepper"], "ايسكريم": ["ice cream"], "بيض": ["egg"],
      "شوكولا": ["chocolate"], "شوكولاته": ["chocolate"], "فستق": ["pistachio"], "كنافة": ["kunafa"],
      "تمر": ["date"], "سلمون": ["salmon"], "روبيان": ["shrimp"], "باستا": ["pasta"], "معكرونة": ["pasta", "mac"],
      "كيك": ["cake"], "كيكة": ["cake"], "خبز": ["bread"], "توست": ["toast"], "بيتزا": ["pizza"], "تاكو": ["taco"],
      "برجر": ["burger"], "فراولة": ["strawberry"], "عنب": ["grape"], "زبادي": ["yogurt"], "قهوة": ["coffee"],
      "ارز": ["rice"], "رز": ["rice"], "فيتا": ["feta"], "حلوم": ["halloumi"], "ذرة": ["corn"], "بروكلي": ["broccoli"]}


def suggest(q, hl, ds=""):
    u = ("https://suggestqueries.google.com/complete/search?client=firefox&hl=" + hl + ("&ds=" + ds if ds else "")
         + "&q=" + urllib.parse.quote(q))
    try:
        return json.loads(urllib.request.urlopen(u, timeout=10).read().decode("utf-8", "ignore"))[1]
    except Exception:
        return []


def book():
    with open(os.path.join(HERE, "book-index.tsv"), encoding="utf-8") as f:
        return list(csv.DictReader(f, delimiter="\t"))


def match(term, recipes):
    """Per food word in the term, the first 3 book recipes whose title has it: «ترند البصل المحشي اندومي» gives the
    onion recipes and the ramen recipes side by side, which is where an invention starts."""
    t = term.lower()
    words = [w for k, v in AR.items() if k in t for w in v]
    words += [w for w in t.replace("-", " ").split() if len(w) > 3 and w.isascii() and w not in ("recipe", "recipes", "viral", "tiktok", "trend")]
    out = []
    for w in dict.fromkeys(words):
        hits = [f"N°{r['no']} {r['title']}" + (f" [{r['halal_note']}]" if r["halal_note"] else "")
                for r in recipes if w in r["title"].lower() and "meat swap" not in r["halal_note"]][:3]
        if hits:
            out.append(f"{w}: " + ", ".join(hits))
    return out


def main():
    deep = "--deep" in sys.argv
    if "--from" in sys.argv:
        terms = json.load(open(sys.argv[sys.argv.index("--from") + 1], encoding="utf-8"))
        report(terms, book()); return
    seen, terms = set(), []
    for q, hl, ds in SEEDS:
        for s in suggest(q, hl, ds):
            if s not in seen:
                seen.add(s); terms.append((s, "YouTube" if ds else "Google", hl))
    if deep:
        for s, src, hl in list(terms):
            if hl == "ar" and s.startswith(("ترند ال", "وصفة ترند ال", "وصفه ترند ال")):
                for s2 in suggest(s, "ar"):
                    if s2 not in seen:
                        seen.add(s2); terms.append((s2, "Google", "ar"))
    if "--terms" in sys.argv:
        print(json.dumps(terms, ensure_ascii=False)); return
    report(terms, book())


def report(terms, recipes):
    for s, src, hl in terms:
        hits = match(s, recipes)
        if hits:
            print(f"{src:7} {s}\n        -> " + "\n        -> ".join(hits))


if __name__ == "__main__":
    main()
