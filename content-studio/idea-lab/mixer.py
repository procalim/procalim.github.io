#!/usr/bin/env python3
"""The idea mixer «خلّاط الأفكار»: ideas that do not come to mind, by forced connection (the owner, 24 Nov: «اعطيني اداة
ناخد منها الافكار او ناخد منها اشياء ما بتخطر على البال، تكون سهلة»).

Each line joins three things nobody joins: a trend recipe from the book (book-index.tsv), an object the video model
already knows (one silhouette, as the lantern), and a person to send it to with a reason. The owner says «ضرب افكار»;
Claude runs it, keeps the 2-3 combos that make sense as food, and puts them through idea-lab (the IG check, the score).

Usage: python3 mixer.py [count=8] [--dish potato] [--object box] [--seed 7]
"""
import csv, os, random, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))

# Objects the model draws right (one known silhouette) and the moment that shows them: frame one hides it, the last
# 25% opens it. (object, Arabic, the reveal)
OBJECTS = [
    ("ring box", "علبة خاتم", "the lid opens toward the lens"), ("book", "كتاب", "the pages fan open"),
    ("safe", "خزنة", "the door swings open"), ("envelope", "رسالة", "the flap opens on the letter"),
    ("gift box", "علبة هدية", "the bow pulls loose and the lid lifts"), ("treasure chest", "صندوق كنز", "the lid flips up"),
    ("lantern", "فانوس", "it opens in the oil"), ("zipper", "سحّاب", "it unzips tooth by tooth"),
    ("umbrella", "شمسية", "the ribs open"), ("birdcage", "قفص", "the bars break"), ("clam", "محارة", "the shell opens on a pearl"),
    ("hourglass", "ساعة رملية", "the last grain falls"), ("snow globe", "كرة تلج", "it shatters"),
    ("accordion", "أكورديون", "it stretches open"), ("folding fan", "مروحة", "it snaps open"), ("crown", "تاج", "it is lifted on"),
    ("rose", "وردة", "the petals open in the heat"), ("volcano", "بركان", "it erupts"), ("igloo", "إيغلو", "the door is cut open"),
    ("beehive", "خلية نحل", "honey runs from the cells"), ("nest", "عش", "the eggs inside are cracked"),
    ("wallet", "محفظة", "it opens on the notes inside"), ("suitcase", "شنطة سفر", "the clasps snap and it opens"),
    ("piano", "بيانو", "the keys are pressed one by one"), ("dice", "زهر", "it is rolled and lands"),
    ("rubik's cube", "مكعب روبيك", "the layers twist"), ("nesting dolls", "دمى روسية", "one opens inside another"),
    ("pinata", "بيناتا", "it is broken open"), ("pinwheel", "مروحة هوا", "it spins"), ("matchbox", "علبة كبريت", "the tray slides out"),
    ("lipstick", "أحمر شفايف", "it twists up"), ("light bulb", "لمبة", "it is cracked open"), ("egg", "بيضة", "it is cracked open"),
    ("tin can", "علبة معلّبات", "the lid is peeled back"), ("lunch box", "علبة لانش", "the clips snap open"),
    ("drawer", "جارور", "it slides out"), ("tent", "خيمة", "the flap is pulled open"), ("boat", "قارب", "it is launched"),
    ("candle", "شمعة", "it is lit and melts"), ("heart", "قلب", "it is broken in two"), ("mailbox", "صندوق بريد", "the flag goes up"),
]

# Send sentences: a real person and a reason (idea-lab step 1). (Arabic, English)
SENDS = [
    ("ابعتها لحبيبك لأنو لازم يعملها إلك", "Send it to your partner: they owe you this"),
    ("ابعتها لأمك لأنها رح تعملها الجمعة", "Send it to your mum for the family table"),
    ("ابعتها لصاحبك تبع الساعة 3 الصبح", "Send it to your 3 a.m. friend"),
    ("ابعتها لأختك اللي عم تعمل دايت", "Send it to your sister on a diet"),
    ("ابعتها لقروب العيلة قبل العزيمة", "Send it to the family group before the gathering"),
    ("ابعتها لأم بتدوّر على أكل للانش بوكس", "Send it to a mum who needs lunch box ideas"),
    ("ابعتها لصاحبك اللي بيحب الجبنة", "Send it to your cheese friend"),
    ("ابعتها للي عرسه قريب", "Send it to the one getting married"),
    ("ابعتها لزميلك اللي بياكل نفس الغدا كل يوم", "Send it to the coworker with the same lunch every day"),
    ("ابعتها لصاحبك اللي بيقول ما بيعرف يطبخ", "Send it to the friend who says they can't cook"),
    ("ابعتها لولادك وقلهم مين بيعملها أحسن", "Send it to your kids: who makes it better?"),
    ("ابعتها لصاحبك اللي بعيد عن البيت", "Send it to the friend far from home"),
]

USED = {("hot dog", "lantern"), ("hot dog", "zipper"), ("garlic bread", "clam"), ("hot chocolate", "safe"),
        ("tanghulu", "ice cube"), ("marry me chicken", "ring box"), ("15-hour potato", "book")}


def book():
    with open(os.path.join(HERE, "book-index.tsv"), encoding="utf-8") as f:
        return [r for r in csv.DictReader(f, delimiter="\t") if "meat swap" not in r["halal_note"]]


def main(argv):
    n, dish, obj, seed = 8, None, None, None
    a = list(argv)
    if a and a[0].isdigit():
        n = int(a.pop(0))
    while a:
        k = a.pop(0)
        if k == "--dish": dish = a.pop(0).lower()
        elif k == "--object": obj = a.pop(0).lower()
        elif k == "--seed": seed = int(a.pop(0))
    rnd = random.Random(seed)
    recipes = [r for r in book() if not dish or dish in r["title"].lower()]
    objects = [o for o in OBJECTS if not obj or obj in o[0]]
    if not recipes or not objects:
        print("nothing matches"); return
    out = 0
    while out < n:
        r, o, s = rnd.choice(recipes), rnd.choice(objects), rnd.choice(SENDS)
        if any(u[0] in r["title"].lower() and u[1] == o[0] for u in USED):
            continue
        note = f"  [{r['halal_note']}]" if r["halal_note"] else ""
        print(f"N°{r['no']} p{r['page']} {r['title']}  ×  {o[0]} «{o[1]}»: {o[2]}{note}")
        print(f"   frame one hides it; in the last 25% {o[2]}; the question: «شو جوّا؟» ({o[1]})")
        print(f"   send: {s[0]} / {s[1]}")
        out += 1


if __name__ == "__main__":
    main(sys.argv[1:])
