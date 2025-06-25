import re
import json
from PyPDF2 import PdfReader

# --- STEP 1: Load PDF ---
pdf_path = "c:/Users/Ashutosh/Downloads/Astrology Class/toaz.info-jyotish-dasa-goravani-karakas-pdf-pr_8201e11270b1695b0f0760f0983c458a.pdf"
reader = PdfReader(pdf_path)

# --- STEP 2: Extract all text from all pages ---
full_text = ""
for page in reader.pages:
    full_text += page.extract_text() + "\n"

# --- STEP 3: Extract item + afflicted flag + karaka using regex ---
entry_pattern = re.compile(r'(?P<item>.+?)\s*(?:V)?\.*\s+(?P<karaka>[A-Za-z0-9\s]+)$', re.MULTILINE)

entries = []
for match in entry_pattern.finditer(full_text):
    item = match.group("item").strip()
    karaka = match.group("karaka").strip()
    afflicted = ' V' in match.group(0)
    entries.append({
        "item": item,
        "afflicted": afflicted,
        "karaka": karaka
    })

# --- STEP 4: Structure JSON grouped by karaka ---
karaka_json = {}
for entry in entries:
    karaka = entry["karaka"]
    category = "negative" if entry["afflicted"] else "positive"
    if karaka not in karaka_json:
        karaka_json[karaka] = {"positive": [], "negative": []}
    karaka_json[karaka][category].append(entry["item"])

# --- STEP 5: Save to JSON file ---
output_path = "all_karakas_extracted_full.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump({"karakas": karaka_json}, f, indent=2, ensure_ascii=False)

print(f"Karakas JSON saved to: {output_path}")
