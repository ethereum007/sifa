"""Render selected pages of the April 2026 PDF to PNG previews."""
import os
import pypdfium2 as pdfium

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, "public", "downloads", "SIF_April_2026_Performance.pdf")
OUT_DIR = os.path.join(ROOT, "public", "temp")
os.makedirs(OUT_DIR, exist_ok=True)

doc = pdfium.PdfDocument(PDF)
print(f"PDF has {len(doc)} pages")

# Render pages 1 (cover), 2 (exec summary), 4 (category leaders), 6 (mean reversion), 7 (long-short test)
pages_to_render = [1, 2, 4, 6, 7]
for pg in pages_to_render:
    page = doc[pg - 1]
    bitmap = page.render(scale=2.0)  # ~144 DPI
    pil = bitmap.to_pil()
    out = os.path.join(OUT_DIR, f"april_pdf_p{pg}.png")
    pil.save(out, "PNG", optimize=True)
    print(f"  page {pg} -> {out} ({os.path.getsize(out)/1024:.1f} KB)")
