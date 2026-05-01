"""
SIF Performance Report — April 2026
Generates a branded PDF report covering all 15 SIFs across 4 categories.

Run:  python scripts/generate_april_2026_report.py
Out:  public/downloads/SIF_April_2026_Performance.pdf

Source data: lib/sifData.ts (post 2026-05-01 update with real AMFI EoM NAVs).
Narrative source: memory/april_2026_performance_analysis.md
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, Image,
)

# ─── Brand ────────────────────────────────────────────────────────────────────

BRAND_ORANGE = colors.HexColor("#c85a1a")
BRAND_ORANGE_LIGHT = colors.HexColor("#fbe9dd")
INK = colors.HexColor("#0f172a")
INK_MUTED = colors.HexColor("#475569")
INK_FAINT = colors.HexColor("#94a3b8")
BG_SUBTLE = colors.HexColor("#f8fafc")
LINE = colors.HexColor("#e2e8f0")
GAIN = colors.HexColor("#059669")
LOSS = colors.HexColor("#dc2626")
NEUTRAL = colors.HexColor("#64748b")

# ─── Styles ───────────────────────────────────────────────────────────────────

styles = getSampleStyleSheet()

H1 = ParagraphStyle(
    "H1", parent=styles["Heading1"],
    fontName="Helvetica-Bold", fontSize=28, leading=34,
    textColor=INK, spaceAfter=8,
)
H2 = ParagraphStyle(
    "H2", parent=styles["Heading2"],
    fontName="Helvetica-Bold", fontSize=18, leading=24,
    textColor=INK, spaceAfter=6, spaceBefore=14,
)
H3 = ParagraphStyle(
    "H3", parent=styles["Heading3"],
    fontName="Helvetica-Bold", fontSize=13, leading=18,
    textColor=INK, spaceAfter=4, spaceBefore=10,
)
EYEBROW = ParagraphStyle(
    "Eyebrow", parent=styles["Normal"],
    fontName="Helvetica-Bold", fontSize=9, leading=12,
    textColor=BRAND_ORANGE, spaceAfter=2,
)
BODY = ParagraphStyle(
    "Body", parent=styles["Normal"],
    fontName="Helvetica", fontSize=10, leading=14,
    textColor=INK, spaceAfter=6, alignment=TA_LEFT,
)
BODY_JUSTIFY = ParagraphStyle(
    "BodyJustify", parent=BODY, alignment=TA_JUSTIFY,
)
LEAD = ParagraphStyle(
    "Lead", parent=BODY,
    fontSize=11, leading=16, textColor=INK_MUTED,
)
SMALL = ParagraphStyle(
    "Small", parent=styles["Normal"],
    fontName="Helvetica", fontSize=8, leading=11,
    textColor=INK_MUTED,
)
TINY = ParagraphStyle(
    "Tiny", parent=styles["Normal"],
    fontName="Helvetica", fontSize=7.5, leading=10,
    textColor=INK_FAINT, alignment=TA_LEFT,
)
COVER_TITLE = ParagraphStyle(
    "CoverTitle", parent=H1,
    fontSize=36, leading=42, textColor=INK,
)
COVER_SUB = ParagraphStyle(
    "CoverSub", parent=BODY,
    fontSize=14, leading=20, textColor=INK_MUTED,
    spaceAfter=12,
)
TAKEAWAY = ParagraphStyle(
    "Takeaway", parent=BODY,
    fontSize=10, leading=15, textColor=INK,
)

# ─── Helpers ──────────────────────────────────────────────────────────────────

def fmt_pct(v, force_sign=True):
    if v is None:
        return "—"
    if isinstance(v, str):
        return v
    sign = "+" if v > 0 and force_sign else ("" if v >= 0 else "")
    return f"{sign}{v:.2f}%"

def color_for(v):
    if v is None:
        return NEUTRAL
    if v > 0:
        return GAIN
    if v < 0:
        return LOSS
    return NEUTRAL

def color_cell(value, bold=False):
    """Return a Paragraph styled by sign for use inside a Table cell."""
    txt = fmt_pct(value)
    c = color_for(value)
    weight = "Bold" if bold else ""
    style = ParagraphStyle(
        f"colored_{c.hexval()}_{bold}",
        fontName=f"Helvetica-{weight}" if bold else "Helvetica",
        fontSize=9, leading=11, textColor=c, alignment=TA_RIGHT,
    )
    return Paragraph(txt, style)

def h_rule(width=170*mm, color=LINE, thickness=0.5):
    from reportlab.platypus import HRFlowable
    return HRFlowable(width=width, color=color, thickness=thickness,
                      spaceBefore=4, spaceAfter=8)

# ─── Data ─────────────────────────────────────────────────────────────────────
# Mirrors src/lib/sifData.ts (post 2026-05-01 update). Source: AMFI Direct Growth.

# (shortName, amc, category, inception, m1_apr, m3, si, mar, end_nav, inception_nav)
FUNDS = [
    # Hybrid Long-Short
    ("Altiva Hybrid L-S",     "Edelweiss",       "Hybrid Long-Short",        "24-Oct-25", 3.17,  2.32,  5.35, -1.53,  10.5455, 10.0102),
    ("Magnum Hybrid L-S",     "SBI",             "Hybrid Long-Short",        "29-Oct-25", 2.28,  0.84,  1.85, -2.16,  10.2218, 10.0357),
    ("qSIF Hybrid L-S",       "Quant",           "Hybrid Long-Short",        "20-Oct-25", 6.94,  6.48,  5.10, -0.91,  10.5297, 10.0189),
    ("Titanium Hybrid L-S",   "Tata",            "Hybrid Long-Short",        "17-Dec-25", 5.51, -0.35, -0.74, -6.87,   9.9291, 10.0029),
    ("Arudha Hybrid L-S",     "Bandhan",         "Hybrid Long-Short",        "04-Feb-26", 0.38,  None,  0.95,  0.12,  10.1290, 10.0340),
    ("iSIF Hybrid L-S",       "ICICI Prudential","Hybrid Long-Short",        "05-Feb-26", 7.45,  None, -0.99, -7.31,   9.9185, 10.0179),
    ("Apex Hybrid L-S",       "ABSL",            "Hybrid Long-Short",        "30-Mar-26", 0.40,  None,  0.40,  0.00,  10.0600, 10.0200),
    # Equity Long-Short
    ("qSIF Equity L-S",       "Quant",           "Equity Long-Short",        "08-Oct-25",13.68,  4.35,  1.44, -8.95,  10.1492, 10.0054),
    ("DynaSIF Equity L-S",    "360 ONE",         "Equity Long-Short",        "27-Feb-26", 6.59,  None,  1.92, -4.39,  10.1990, 10.0072),
    ("Arudha Equity L-S",     "Bandhan",         "Equity Long-Short",        "30-Mar-26", 3.42,  None,  3.43,  0.01,  10.1630,  9.8260),
    ("Diviniti Equity L-S",   "ITI",             "Equity Long-Short",        "03-Dec-25", 0.71, -3.64, -4.58, -2.99, 955.1524,1000.953),
    # Equity Ex-Top 100
    ("qSIF Ex-Top 100",       "Quant",           "Equity Ex-Top 100",        "13-Nov-25",15.38,  5.65, -0.79, -7.60,   9.9324, 10.0111),
    ("iSIF Ex-Top 100",       "ICICI Prudential","Equity Ex-Top 100",        "05-Feb-26", 8.87,  None, -1.70, -8.61,   9.8200,  9.9900),
    # Active Asset Allocator
    ("DynaSIF AAA",           "360 ONE",         "Active Asset Allocator",   "30-Mar-26", 1.02,  None,  1.03,  0.01,  10.1242, 10.0209),
    ("qSIF AAA",              "Quant",           "Active Asset Allocator",   "24-Apr-26", None,  None, -0.04,  None,  10.0072, 10.0110),
]

NIFTY_INDICES = [
    ("Nifty 50",            7.49,  -5.15, -0.28),
    ("Nifty 500",          10.52,  -1.59,  3.96),
    ("Nifty Midcap 150",   13.24,   2.52, 11.40),
    ("Nifty Smallcap 250", 17.10,   6.23,  9.56),
    ("Nifty Total Market", 10.93,  -1.24,  4.19),
]

# ─── Page templates ───────────────────────────────────────────────────────────

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm

def header_footer(canvas, doc):
    canvas.saveState()
    # Footer: brand bar at very bottom
    canvas.setFillColor(BRAND_ORANGE)
    canvas.rect(0, 0, PAGE_W, 4*mm, fill=1, stroke=0)
    # Footer line 1 (closer to brand bar): contact info
    canvas.setFillColor(INK_MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(MARGIN, 7*mm, "info@sifprime.com  ·  +91 90329 99466  ·  sifprime.com")
    canvas.drawRightString(PAGE_W - MARGIN, 7*mm, f"Page {doc.page}")
    # Footer line 2 (above): wordmark + report title
    canvas.setFillColor(BRAND_ORANGE)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(MARGIN, 11*mm, "SIFPrime")
    canvas.setFillColor(INK_FAINT)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(MARGIN + 17*mm, 11*mm, "·  April 2026 SIF Performance Report")
    canvas.drawRightString(PAGE_W - MARGIN, 11*mm, "Monthly Report")
    # Top header rule (skip on cover, page 1)
    if doc.page > 1:
        canvas.setStrokeColor(LINE)
        canvas.setLineWidth(0.5)
        canvas.line(MARGIN, PAGE_H - 12*mm, PAGE_W - MARGIN, PAGE_H - 12*mm)
        canvas.setFillColor(INK_FAINT)
        canvas.setFont("Helvetica", 7.5)
        canvas.drawString(MARGIN, PAGE_H - 9*mm, "SIFPRIME · MONTHLY SIF REPORT")
        canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 9*mm, "April 2026 · As of 30-Apr-2026")
    canvas.restoreState()

def cover_decoration(canvas, doc):
    # Cover page top brand band
    canvas.saveState()
    canvas.setFillColor(BRAND_ORANGE)
    canvas.rect(0, PAGE_H - 14*mm, PAGE_W, 14*mm, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 12)
    canvas.drawString(MARGIN, PAGE_H - 9*mm, "SIFPrime")
    canvas.setFont("Helvetica", 9)
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 9*mm, "Monthly SIF Performance Report · April 2026")
    canvas.restoreState()
    header_footer(canvas, doc)

# ─── Story builders ───────────────────────────────────────────────────────────

def cover():
    s = []
    s.append(Spacer(1, 28*mm))
    s.append(Paragraph("APRIL 2026 · INDIA SIF UNIVERSE", EYEBROW))
    s.append(Spacer(1, 4*mm))
    s.append(Paragraph("The Recovery<br/>Month", COVER_TITLE))
    s.append(Spacer(1, 6*mm))
    s.append(Paragraph(
        "Every Specialised Investment Fund with a full April reading "
        "closed positive after India's worst monthly drawdown in years. "
        "The long-short strategy was stress-tested in March — and bounced back "
        "with conviction in April. Quant strategies swept the leaderboard.",
        COVER_SUB,
    ))
    s.append(Spacer(1, 8*mm))

    # Key takeaways box
    box_style = TableStyle([
        ("BACKGROUND",  (0,0), (-1,-1), BRAND_ORANGE_LIGHT),
        ("BOX",         (0,0), (-1,-1), 0.5, BRAND_ORANGE),
        ("LEFTPADDING", (0,0), (-1,-1), 10),
        ("RIGHTPADDING",(0,0), (-1,-1), 10),
        ("TOPPADDING",  (0,0), (-1,-1), 8),
        ("BOTTOMPADDING",(0,0), (-1,-1), 8),
        ("VALIGN",      (0,0), (-1,-1), "TOP"),
    ])
    takeaways = [[
        Paragraph("<b>Top fund (April)</b><br/>qSIF Ex-Top 100 <font color='#059669'><b>+15.38%</b></font><br/>by Quant Mutual Fund", TAKEAWAY),
        Paragraph("<b>Top by SI return</b><br/>Altiva Hybrid <font color='#059669'><b>+5.35%</b></font><br/>by Edelweiss Mutual Fund", TAKEAWAY),
    ],[
        Paragraph("<b>Best March → April recovery</b><br/>qSIF Ex-Top 100 swung <b>22.98 pts</b><br/>(−7.60% → +15.38%)", TAKEAWAY),
        Paragraph("<b>Best March hedger</b><br/>Arudha Hybrid stayed <b>flat</b> while<br/>Nifty 50 lost −11.30%", TAKEAWAY),
    ]]
    box = Table(takeaways, colWidths=[80*mm, 80*mm])
    box.setStyle(box_style)
    s.append(box)

    s.append(Spacer(1, 10*mm))
    s.append(Paragraph(
        "<b>Coverage:</b> 15 SIFs across all four SEBI categories — Hybrid Long-Short, "
        "Equity Long-Short, Equity Ex-Top 100, and Active Asset Allocator.",
        BODY,
    ))
    s.append(Paragraph(
        "<b>Source:</b> AMFI (Association of Mutual Funds in India) Direct Growth NAVs, "
        "01 October 2025 to 30 April 2026. NSE Indices for benchmark returns.",
        BODY,
    ))
    s.append(Spacer(1, 4*mm))
    s.append(Paragraph(
        "<b>Important:</b> Past performance is not indicative of future returns. "
        "Specialised Investment Funds carry higher risk than mutual funds — "
        "minimum investment ₹10 lakh per scheme. Read scheme documents carefully.",
        SMALL,
    ))
    s.append(PageBreak())
    return s

def executive_summary():
    s = []
    s.append(Paragraph("EXECUTIVE SUMMARY", EYEBROW))
    s.append(Paragraph("April 2026 in one page", H1))
    s.append(Spacer(1, 4*mm))

    s.append(Paragraph(
        "April delivered a textbook V-shaped recovery. The Nifty 50 rallied +7.49% "
        "after its −11.30% March drawdown; small/mid-caps led harder still — "
        "Smallcap 250 +17.10%, Midcap 150 +13.24%. Inside the SIF universe, the funds that took "
        "the deepest March hits posted the steepest April bounces — classic mean reversion at "
        "extremes. Funds with effective March hedges, by definition, had less to recover, but they "
        "compounded steadily through both legs.",
        BODY_JUSTIFY,
    ))
    s.append(Paragraph(
        "<b>The headline number:</b> qSIF Ex-Top 100 (Quant) returned +15.38% — the largest single-month "
        "return any SIF has posted since the category was launched. Across all four categories, the "
        "qSIF series was either the top fund or near-top in April, suggesting Quant's quantitative "
        "model captured the regime change aggressively.",
        BODY_JUSTIFY,
    ))
    s.append(Paragraph(
        "<b>The since-inception leader:</b> Altiva (Edelweiss) holds at +5.35% over 188 days, narrowly "
        "ahead of qSIF Hybrid +5.10% over 192 days. Altiva's signature is smaller drawdowns and smaller "
        "bounces — a steady compounder with the strongest long-term track record so far.",
        BODY_JUSTIFY,
    ))
    s.append(Paragraph(
        "<b>The persistent laggard:</b> Diviniti (ITI) at −4.58% SI; only +0.71% in April after −2.99% in "
        "March. Stock selection appears to have diverged from the broad rally. Worth watching whether the "
        "next two months bring convergence or further dispersion.",
        BODY_JUSTIFY,
    ))

    s.append(PageBreak())
    return s

def market_context():
    s = []
    s.append(Paragraph("MARKET CONTEXT", EYEBROW))
    s.append(Paragraph("Where the indices went in April", H1))
    s.append(Spacer(1, 3*mm))
    s.append(Paragraph(
        "Small and mid-cap indices outperformed broad-cap by ~7–10 percentage points. "
        "This dispersion is the single most important number to keep in mind when reading "
        "the SIF returns below — strategies with mid/small-cap exposure had a much bigger "
        "river to fish in.",
        BODY,
    ))

    rows = [["Index", "1M (April)", "3M (Feb–Apr)", "1 Year"]]
    for name, m1, m3, y1 in NIFTY_INDICES:
        rows.append([
            Paragraph(f"<b>{name}</b>", BODY),
            color_cell(m1, bold=True),
            color_cell(m3),
            color_cell(y1),
        ])
    t = Table(rows, colWidths=[60*mm, 32*mm, 32*mm, 32*mm], hAlign="LEFT", repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND",   (0,0), (-1,0), INK),
        ("TEXTCOLOR",    (0,0), (-1,0), colors.white),
        ("FONTNAME",     (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE",     (0,0), (-1,0), 9),
        ("ALIGN",        (1,0), (-1,-1), "RIGHT"),
        ("ALIGN",        (0,0), (0,-1),  "LEFT"),
        ("VALIGN",       (0,0), (-1,-1), "MIDDLE"),
        ("FONTSIZE",     (0,1), (-1,-1), 9),
        ("BOTTOMPADDING",(0,0), (-1,-1), 6),
        ("TOPPADDING",   (0,0), (-1,-1), 6),
        ("LEFTPADDING",  (0,0), (-1,-1), 8),
        ("RIGHTPADDING", (0,0), (-1,-1), 8),
        ("ROWBACKGROUNDS",(0,1),(-1,-1), [colors.white, BG_SUBTLE]),
        ("LINEBELOW",    (0,0), (-1,0),  0.5, INK),
        ("LINEBELOW",    (0,-1),(-1,-1), 0.5, LINE),
    ]))
    s.append(t)
    s.append(Spacer(1, 4*mm))
    s.append(Paragraph(
        "<i>Source: NSE Indices (niftyindices.com), as of 30-Apr-2026. The benchmark "
        "for hybrid funds — Nifty 50 Hybrid Composite Debt 50:50 — was estimated at ~+4.05% "
        "for April based on the equity-debt mix; NSE has not yet published the official figure.</i>",
        SMALL,
    ))

    s.append(Spacer(1, 6*mm))
    s.append(Paragraph("What this means for the SIF report", H3))
    s.append(Paragraph(
        "When you see qSIF Ex-Top 100 at +15.38%, remember its index (Nifty Midcap 150 at +13.24%) was "
        "already up double-digits — the fund captured the rally with a small additional alpha layer. When "
        "you see hybrid funds at +2–7%, remember their benchmark Nifty 50 Hybrid 50:50 was up only an "
        "estimated +4–5% — so even +3% was respectable in context. <b>Absolute returns mislead without "
        "benchmark context.</b>",
        BODY_JUSTIFY,
    ))
    s.append(PageBreak())
    return s

def category_winners():
    s = []
    s.append(Paragraph("CATEGORY LEADERS — APRIL 2026", EYEBROW))
    s.append(Paragraph("Who topped each category this month", H1))
    s.append(Spacer(1, 4*mm))

    # Build per-category table
    by_cat = {}
    for f in FUNDS:
        by_cat.setdefault(f[2], []).append(f)

    cat_order = [
        "Hybrid Long-Short",
        "Equity Long-Short",
        "Equity Ex-Top 100",
        "Active Asset Allocator",
    ]
    cat_intros = {
        "Hybrid Long-Short": "Multi-asset hedged strategies. Designed for capital protection in down months and steady participation in up months.",
        "Equity Long-Short": "Pure equity with hedging overlay. Higher beta to broad-cap indices than hybrids; bigger swings both ways.",
        "Equity Ex-Top 100": "Mid/small-cap focus, beyond the Nifty 100. Highest beta in the universe; tracked Smallcap 250 and Midcap 150 in April.",
        "Active Asset Allocator": "Dynamic multi-asset mandate with up to 25% short. Most flexible category — both funds launched in March/April so track record is thin.",
    }

    for cat in cat_order:
        funds = sorted(by_cat[cat], key=lambda x: (x[4] is None, -(x[4] or -999)))  # by April desc
        s.append(Paragraph(cat.upper(), H3))
        s.append(Paragraph(cat_intros[cat], SMALL))
        s.append(Spacer(1, 2*mm))

        rows = [["Fund", "AMC", "April", "3M", "SI"]]
        for short, amc, _, incept, m1, m3, si, _, _, _ in funds:
            rows.append([
                Paragraph(f"<b>{short}</b><br/><font color='#94a3b8' size='7'>incept {incept}</font>", BODY),
                Paragraph(f"<font size='8'>{amc}</font>", BODY),
                color_cell(m1, bold=True),
                color_cell(m3),
                color_cell(si),
            ])
        t = Table(rows, colWidths=[55*mm, 40*mm, 22*mm, 22*mm, 22*mm], hAlign="LEFT", repeatRows=1)
        t.setStyle(TableStyle([
            ("BACKGROUND",   (0,0), (-1,0), INK),
            ("TEXTCOLOR",    (0,0), (-1,0), colors.white),
            ("FONTNAME",     (0,0), (-1,0), "Helvetica-Bold"),
            ("FONTSIZE",     (0,0), (-1,0), 8.5),
            ("ALIGN",        (2,0), (-1,-1),"RIGHT"),
            ("ALIGN",        (0,0), (1,-1), "LEFT"),
            ("VALIGN",       (0,0), (-1,-1),"MIDDLE"),
            ("BOTTOMPADDING",(0,0), (-1,-1),5),
            ("TOPPADDING",   (0,0), (-1,-1),5),
            ("LEFTPADDING",  (0,0), (-1,-1),6),
            ("RIGHTPADDING", (0,0), (-1,-1),6),
            ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white, BG_SUBTLE]),
            ("LINEBELOW",    (0,0), (-1,0), 0.5, INK),
        ]))
        # Highlight category leader (row 1)
        t.setStyle(TableStyle([
            ("BACKGROUND",  (0,1), (-1,1), BRAND_ORANGE_LIGHT),
        ]))
        s.append(t)
        s.append(Spacer(1, 5*mm))

    s.append(PageBreak())
    return s

def overall_si_leaderboard():
    s = []
    s.append(Paragraph("OVERALL LEADERBOARD — SINCE INCEPTION", EYEBROW))
    s.append(Paragraph("Ranked by SI return as of 30-Apr-2026", H1))
    s.append(Spacer(1, 3*mm))
    s.append(Paragraph(
        "This is the ranking that matters most for long-term capital. April's bounce reshuffled the "
        "middle of the table, but the top three have been consistent — Altiva, qSIF Hybrid, and "
        "Arudha Equity (with the latter helped by its low-base inception).",
        BODY,
    ))
    s.append(Spacer(1, 3*mm))

    sorted_funds = sorted(FUNDS, key=lambda x: (x[6] is None, -(x[6] or -999)))
    rows = [["#", "Fund", "AMC", "Category", "Inception", "April", "SI"]]
    for i, (short, amc, cat, incept, m1, m3, si, _mar, _end, _ic) in enumerate(sorted_funds, 1):
        rank_color = INK
        rank_bg = colors.white
        rows.append([
            Paragraph(f"<b>{i}</b>", BODY),
            Paragraph(f"<b>{short}</b>", BODY),
            Paragraph(f"<font size='8'>{amc}</font>", BODY),
            Paragraph(f"<font size='7.5' color='#475569'>{cat}</font>", BODY),
            Paragraph(f"<font size='8'>{incept}</font>", BODY),
            color_cell(m1),
            color_cell(si, bold=True),
        ])
    t = Table(rows, colWidths=[8*mm, 38*mm, 30*mm, 36*mm, 22*mm, 18*mm, 22*mm], hAlign="LEFT", repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND",   (0,0), (-1,0), INK),
        ("TEXTCOLOR",    (0,0), (-1,0), colors.white),
        ("FONTNAME",     (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE",     (0,0), (-1,0), 8.5),
        ("ALIGN",        (5,0), (-1,-1),"RIGHT"),
        ("ALIGN",        (0,0), (4,-1), "LEFT"),
        ("ALIGN",        (0,0), (0,-1), "CENTER"),
        ("VALIGN",       (0,0), (-1,-1),"MIDDLE"),
        ("BOTTOMPADDING",(0,0), (-1,-1),5),
        ("TOPPADDING",   (0,0), (-1,-1),5),
        ("LEFTPADDING",  (0,0), (-1,-1),5),
        ("RIGHTPADDING", (0,0), (-1,-1),5),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white, BG_SUBTLE]),
        ("LINEBELOW",    (0,0), (-1,0), 0.5, INK),
        # Highlight top 3
        ("BACKGROUND",   (0,1), (-1,1), BRAND_ORANGE_LIGHT),
        ("BACKGROUND",   (0,2), (-1,2), colors.HexColor("#fff4ed")),
        ("BACKGROUND",   (0,3), (-1,3), colors.HexColor("#fffaf5")),
    ]))
    s.append(t)

    s.append(Spacer(1, 5*mm))
    s.append(Paragraph(
        "<i>Note: SI = Since Inception (cumulative absolute return, not annualised). Funds under 90 days "
        "have very limited statistical meaning — Apex Hybrid, Arudha Equity, DynaSIF AAA, qSIF AAA all "
        "launched in February–April 2026.</i>",
        SMALL,
    ))
    s.append(PageBreak())
    return s

def crash_recovery_section():
    s = []
    s.append(Paragraph("MARCH → APRIL: THE MEAN-REVERSION TEST", EYEBROW))
    s.append(Paragraph("Which funds fell hardest, which bounced back hardest", H1))
    s.append(Spacer(1, 3*mm))
    s.append(Paragraph(
        "March was the cleanest stress test the SIF universe has had since launch. Nifty 50 fell "
        "−11.30%; how each fund handled that, and how it then participated in April's recovery, "
        "tells you almost everything about its strategy under the hood.",
        BODY_JUSTIFY,
    ))
    s.append(Spacer(1, 3*mm))

    # Build crash/recovery table
    rows_data = []
    for short, _amc, _cat, _inc, m1, _m3, _si, mar, _end, _ic in FUNDS:
        if mar is None or m1 is None:
            continue
        delta = m1 - mar  # how much the fund swung from March to April
        net = ((1 + mar/100) * (1 + m1/100) - 1) * 100  # compounded 2-month return
        rows_data.append((short, mar, m1, delta, net))

    # Sort by delta (biggest swing first)
    rows_data.sort(key=lambda x: -x[3])

    rows = [["Fund", "March", "April", "Swing (Apr − Mar)", "Net (Mar+Apr)"]]
    for short, mar, m1, delta, net in rows_data:
        rows.append([
            Paragraph(f"<b>{short}</b>", BODY),
            color_cell(mar),
            color_cell(m1),
            color_cell(delta, bold=True),
            color_cell(net, bold=True),
        ])
    t = Table(rows, colWidths=[56*mm, 22*mm, 22*mm, 38*mm, 32*mm], hAlign="LEFT", repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND",   (0,0), (-1,0), INK),
        ("TEXTCOLOR",    (0,0), (-1,0), colors.white),
        ("FONTNAME",     (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE",     (0,0), (-1,0), 8.5),
        ("ALIGN",        (1,0), (-1,-1),"RIGHT"),
        ("VALIGN",       (0,0), (-1,-1),"MIDDLE"),
        ("BOTTOMPADDING",(0,0), (-1,-1),5),
        ("TOPPADDING",   (0,0), (-1,-1),5),
        ("LEFTPADDING",  (0,0), (-1,-1),6),
        ("RIGHTPADDING", (0,0), (-1,-1),6),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white, BG_SUBTLE]),
        ("LINEBELOW",    (0,0), (-1,0), 0.5, INK),
    ]))
    s.append(t)

    s.append(Spacer(1, 5*mm))
    reading_block = [
        Paragraph("Reading the table", H3),
        Paragraph(
            "<b>The biggest swingers</b> — qSIF Ex-Top 100 (22.98 pts) and qSIF Equity (22.63 pts) — "
            "are the funds with the highest net-long equity exposure. They got punished hardest in "
            "March, then snapped back hardest. High beta to small/mid caps cuts both ways.",
            BODY_JUSTIFY,
        ),
        Paragraph(
            "<b>The smart-hedge winners</b> — qSIF Hybrid and Altiva — show up positive in the rightmost "
            "column. They didn't just recover; they compounded forward through both months. That's the "
            "long-short value proposition working as designed.",
            BODY_JUSTIFY,
        ),
        Paragraph(
            "<b>The drawdown survivors</b> — iSIF Hybrid and iSIF Ex-Top 100 — fell hard, recovered "
            "hard, but the net is roughly flat over two months. Investor experience: high volatility, "
            "no compounding gain. Whether that's acceptable depends on time horizon.",
            BODY_JUSTIFY,
        ),
        Paragraph(
            "<b>Diviniti is the outlier</b> — fell only −2.99% in March (good defence) but then captured "
            "almost none of the rally (+0.71% in April vs Nifty 500 +10.52%). Net 2-month return −2.30%. "
            "Stock selection seems to have diverged from broader trends.",
            BODY_JUSTIFY,
        ),
    ]
    s.append(KeepTogether(reading_block))
    s.append(PageBreak())
    return s

def long_short_analysis():
    s = []
    s.append(Paragraph("DID THE LONG-SHORT STRATEGY ACTUALLY WORK?", EYEBROW))
    s.append(Paragraph("Two stress tests, two answers", H1))
    s.append(Spacer(1, 3*mm))
    s.append(Paragraph(
        "Long-short funds make two implicit promises: cushion the downside in crashes (via the short "
        "book and hedges), and capture most of the upside in rallies (via the long book). March 2026 "
        "stress-tested promise #1; April stress-tested promise #2.",
        BODY_JUSTIFY,
    ))
    s.append(Spacer(1, 3*mm))

    s.append(Paragraph("TEST 1 — March crash (downside protection)", H3))
    rows1 = [
        ["Fund", "March return", "Benchmark", "Bench return", "Capital protected"],
        [Paragraph("<b>Arudha Hybrid</b>", BODY),  color_cell(0.12),   "Hybrid 50:50", color_cell(-6.35),  Paragraph("<b><font color='#059669'>~100%</font></b>", BODY)],
        [Paragraph("<b>Altiva Hybrid</b>", BODY),  color_cell(-1.53),  "Hybrid 50:50", color_cell(-6.35),  Paragraph("<font color='#059669'><b>~76%</b></font>", BODY)],
        [Paragraph("<b>Magnum Hybrid</b>", BODY),  color_cell(-2.16),  "Hybrid 50:50", color_cell(-6.35),  Paragraph("<font color='#059669'><b>~66%</b></font>", BODY)],
        [Paragraph("<b>qSIF Hybrid</b>", BODY),    color_cell(-0.91),  "Hybrid 50:50", color_cell(-6.35),  Paragraph("<font color='#059669'><b>~86%</b></font>", BODY)],
        [Paragraph("<b>qSIF Equity</b>", BODY),    color_cell(-8.95),  "Nifty 500",    color_cell(-11.36), Paragraph("<font color='#0ea5e9'><b>~21% alpha</b></font>", BODY)],
        [Paragraph("<b>qSIF Ex-Top 100</b>", BODY),color_cell(-7.60),  "Midcap 150",   color_cell(-11.06), Paragraph("<font color='#0ea5e9'><b>~31% alpha</b></font>", BODY)],
        [Paragraph("<b>iSIF Hybrid</b>", BODY),    color_cell(-7.31),  "Hybrid 50:50", color_cell(-6.35),  Paragraph("<font color='#dc2626'><b>under-protected</b></font>", BODY)],
        [Paragraph("<b>Titanium Hybrid</b>", BODY),color_cell(-6.87),  "Hybrid 50:50", color_cell(-6.35),  Paragraph("<font color='#dc2626'><b>under-protected</b></font>", BODY)],
    ]
    t1 = Table(rows1, colWidths=[42*mm, 24*mm, 30*mm, 26*mm, 38*mm], hAlign="LEFT", repeatRows=1)
    t1.setStyle(TableStyle([
        ("BACKGROUND",   (0,0), (-1,0), INK),
        ("TEXTCOLOR",    (0,0), (-1,0), colors.white),
        ("FONTNAME",     (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE",     (0,0), (-1,0), 8.5),
        ("ALIGN",        (1,0), (-1,-1),"RIGHT"),
        ("ALIGN",        (2,0), (2,-1), "LEFT"),
        ("VALIGN",       (0,0), (-1,-1),"MIDDLE"),
        ("BOTTOMPADDING",(0,0), (-1,-1),5),
        ("TOPPADDING",   (0,0), (-1,-1),5),
        ("LEFTPADDING",  (0,0), (-1,-1),6),
        ("RIGHTPADDING", (0,0), (-1,-1),6),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white, BG_SUBTLE]),
    ]))
    s.append(t1)
    s.append(Paragraph(
        "<b>Verdict on March:</b> The hybrid funds that designed for downside protection (Arudha, Altiva, "
        "qSIF Hybrid, Magnum) absorbed 65–100% of benchmark losses. The long-short equity funds (qSIF "
        "Equity, qSIF Ex-Top 100) added 21–31% relative alpha by hedging part of the equity book. iSIF "
        "Hybrid and Titanium Hybrid did <i>not</i> meaningfully protect — both fell more than the hybrid "
        "benchmark, suggesting net-long exposure too high for what \"hybrid long-short\" implies. The "
        "short book wasn't doing its job in those funds.",
        BODY_JUSTIFY,
    ))

    s.append(Spacer(1, 4*mm))
    s.append(Paragraph("TEST 2 — April rally (upside capture)", H3))
    rows2 = [
        ["Fund", "April", "Benchmark", "Bench Apr", "Upside captured"],
        [Paragraph("<b>qSIF Ex-Top 100</b>", BODY), color_cell(15.38),"Smallcap 250", color_cell(17.10), Paragraph("<font color='#059669'><b>~90%</b></font>", BODY)],
        [Paragraph("<b>qSIF Equity</b>", BODY),     color_cell(13.68),"Nifty 500",    color_cell(10.52), Paragraph("<font color='#0ea5e9'><b>130% (alpha!)</b></font>", BODY)],
        [Paragraph("<b>iSIF Ex-Top 100</b>", BODY), color_cell(8.87), "Midcap 150",   color_cell(13.24), Paragraph("<font color='#f59e0b'><b>~67%</b></font>", BODY)],
        [Paragraph("<b>iSIF Hybrid</b>", BODY),     color_cell(7.45), "Hybrid 50:50e",color_cell(4.05),  Paragraph("<font color='#0ea5e9'><b>184% (alpha!)</b></font>", BODY)],
        [Paragraph("<b>qSIF Hybrid</b>", BODY),     color_cell(6.94), "Hybrid 50:50e",color_cell(4.05),  Paragraph("<font color='#0ea5e9'><b>171% (alpha!)</b></font>", BODY)],
        [Paragraph("<b>Titanium Hybrid</b>", BODY), color_cell(5.51), "Hybrid 50:50e",color_cell(4.05),  Paragraph("<font color='#059669'><b>~136%</b></font>", BODY)],
        [Paragraph("<b>Altiva Hybrid</b>", BODY),   color_cell(3.17), "Hybrid 50:50e",color_cell(4.05),  Paragraph("<font color='#f59e0b'><b>~78%</b></font>", BODY)],
        [Paragraph("<b>Magnum Hybrid</b>", BODY),   color_cell(2.28), "Hybrid 50:50e",color_cell(4.05),  Paragraph("<font color='#f59e0b'><b>~56%</b></font>", BODY)],
        [Paragraph("<b>Diviniti</b>", BODY),        color_cell(0.71), "Nifty 500",    color_cell(10.52), Paragraph("<font color='#dc2626'><b>~7%</b></font>", BODY)],
    ]
    t2 = Table(rows2, colWidths=[42*mm, 22*mm, 30*mm, 22*mm, 44*mm], hAlign="LEFT", repeatRows=1)
    t2.setStyle(TableStyle([
        ("BACKGROUND",   (0,0), (-1,0), INK),
        ("TEXTCOLOR",    (0,0), (-1,0), colors.white),
        ("FONTNAME",     (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE",     (0,0), (-1,0), 8.5),
        ("ALIGN",        (1,0), (-1,-1),"RIGHT"),
        ("ALIGN",        (2,0), (2,-1), "LEFT"),
        ("VALIGN",       (0,0), (-1,-1),"MIDDLE"),
        ("BOTTOMPADDING",(0,0), (-1,-1),5),
        ("TOPPADDING",   (0,0), (-1,-1),5),
        ("LEFTPADDING",  (0,0), (-1,-1),6),
        ("RIGHTPADDING", (0,0), (-1,-1),6),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white, BG_SUBTLE]),
    ]))
    s.append(t2)
    s.append(Paragraph(
        "<i>'e' = NSE Indices figure not yet published; estimated proportional to Nifty 50 +7.49% "
        "with ~50% debt cushion.</i>",
        SMALL,
    ))
    s.append(Spacer(1, 2*mm))
    s.append(Paragraph(
        "<b>Verdict on April:</b> Five funds out of nine generated <i>positive alpha</i> over their benchmark — "
        "qSIF Equity, iSIF Hybrid, qSIF Hybrid, Titanium, qSIF Ex-Top 100. Two captured a healthy 60–90% "
        "without alpha. Only Diviniti notably failed to participate. <b>The long-short framework worked "
        "more often than it didn't this month.</b>",
        BODY_JUSTIFY,
    ))

    s.append(Spacer(1, 4*mm))
    s.append(Paragraph("Combined verdict — the strategy is doing its job", H3))
    s.append(Paragraph(
        "Three SIFs passed both tests with flying colours: <b>qSIF Hybrid</b> (capital-protected in March, "
        "alpha-positive in April), <b>Altiva Hybrid</b> (76% protection in March, 78% capture in April), and "
        "<b>Arudha Hybrid</b> (perfect March hedge, modest but positive April). These are the funds whose "
        "behaviour most closely matches the textbook long-short pitch.",
        BODY_JUSTIFY,
    ))
    s.append(Paragraph(
        "Two SIFs failed the March test — iSIF Hybrid and Titanium Hybrid. Both are sold as \"hybrid "
        "long-short\" but their March drawdowns suggest net-long equity exposure closer to a long-only "
        "fund than a hedged one. Investors should look at category exposure documents carefully.",
        BODY_JUSTIFY,
    ))
    s.append(PageBreak())
    return s

def detailed_table():
    s = []
    s.append(Paragraph("FULL FUND PERFORMANCE TABLE", EYEBROW))
    s.append(Paragraph("Every SIF in coverage, all numbers in one place", H1))
    s.append(Spacer(1, 4*mm))

    rows = [["Fund", "AMC", "Inception", "End NAV", "April", "3M", "SI"]]
    # Sort by category then SI desc within category
    sorted_funds = sorted(FUNDS, key=lambda x: (x[2], x[6] is None, -(x[6] or -999)))
    last_cat = None
    for short, amc, cat, incept, m1, m3, si, _mar, end, _ic in sorted_funds:
        if cat != last_cat:
            rows.append([
                Paragraph(f"<b><font color='#c85a1a'>{cat.upper()}</font></b>", BODY),
                "", "", "", "", "", "",
            ])
            last_cat = cat
        nav_str = f"{end:,.4f}" if end >= 100 else f"{end:.4f}"
        rows.append([
            Paragraph(f"<b>{short}</b>", BODY),
            Paragraph(f"<font size='8'>{amc}</font>", BODY),
            Paragraph(f"<font size='8'>{incept}</font>", BODY),
            Paragraph(f"<font size='9'>₹{nav_str}</font>", BODY),
            color_cell(m1, bold=True),
            color_cell(m3),
            color_cell(si, bold=True),
        ])

    t = Table(rows, colWidths=[42*mm, 32*mm, 22*mm, 24*mm, 18*mm, 18*mm, 18*mm], hAlign="LEFT", repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND",   (0,0), (-1,0), INK),
        ("TEXTCOLOR",    (0,0), (-1,0), colors.white),
        ("FONTNAME",     (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE",     (0,0), (-1,0), 8.5),
        ("ALIGN",        (3,0), (-1,-1),"RIGHT"),
        ("VALIGN",       (0,0), (-1,-1),"MIDDLE"),
        ("BOTTOMPADDING",(0,0), (-1,-1),4),
        ("TOPPADDING",   (0,0), (-1,-1),4),
        ("LEFTPADDING",  (0,0), (-1,-1),5),
        ("RIGHTPADDING", (0,0), (-1,-1),5),
        ("LINEBELOW",    (0,0), (-1,0), 0.5, INK),
    ]))
    # Highlight category header rows
    cat_rows = [i for i, r in enumerate(rows) if r[1] == ""]
    for i in cat_rows:
        t.setStyle(TableStyle([
            ("BACKGROUND", (0,i), (-1,i), BRAND_ORANGE_LIGHT),
            ("SPAN",       (0,i), (-1,i)),
        ]))
    s.append(t)

    s.append(Spacer(1, 6*mm))
    s.append(Paragraph(
        "<i>April = monthly return for the period 01-Apr-2026 to 30-Apr-2026. "
        "3M = three-month return measured from end-Jan-2026 (or inception, whichever is later); shown as "
        "\"—\" for funds with less than 90 days of history. SI = since inception, cumulative absolute "
        "return. All values use Direct Growth Plan NAVs from AMFI.</i>",
        SMALL,
    ))
    s.append(PageBreak())
    return s

def insights():
    s = []
    s.append(Paragraph("INVESTOR INSIGHTS", EYEBROW))
    s.append(Paragraph("Six things worth thinking about", H1))
    s.append(Spacer(1, 4*mm))

    insights_list = [
        ("1. Quant ran the table.",
         "All four Quant SIFs were either category leaders or near-leaders in April. qSIF Ex-Top 100 +15.38%, qSIF Equity +13.68%, qSIF Hybrid +6.94%, qSIF AAA only had 6 days. Same model, different mandates, consistent capture. If you've been waiting to evaluate Quant's quantitative approach across categories, this month gives you a clean read."),
        ("2. The 'hybrid long-short' label is not uniform.",
         "Two of the seven hybrid funds — iSIF Hybrid and Titanium — fell more than their hybrid benchmark in March. They behave more like long-only equity than hedged hybrids. If you're picking from this category for capital protection, the March data separated the genuine hedgers (Arudha, Altiva, qSIF Hybrid, Magnum) from the long-biased outliers."),
        ("3. Mid/small-cap exposure dominated April performance.",
         "Smallcap 250 +17.10% and Midcap 150 +13.24% drove the rally. Funds with that exposure (qSIF Ex-Top 100, iSIF Ex-Top 100, qSIF Equity) topped the April leaderboard. Funds tracking large-cap or hybrid benchmarks had less upside available even when they performed well in relative terms."),
        ("4. Altiva's consistency is starting to show.",
         "Across six months of returns now (Oct '25 to Apr '26), Altiva has the smallest worst month (−1.53%) AND the best since-inception return (+5.35%) of any fund. Lower vol + better cumulative — that's the holy grail of long-short investing. For risk-averse HNI capital, this profile remains the gold standard so far."),
        ("5. Diviniti needs explanation.",
         "Almost no participation in April's broad rally (+0.71% vs Nifty 500's +10.52%) is the kind of dispersion that warrants a question to the AMC. Stock selection diverged from market. SI return now −4.58% — by far the worst in the universe. Worth watching whether the next quarter brings convergence."),
        ("6. Active Asset Allocator category needs more time.",
         "Both DynaSIF AAA (launched 30-Mar) and qSIF AAA (launched 24-Apr) are too new to evaluate. DynaSIF AAA's first month +1.02% is roughly in line with a balanced multi-asset profile. Real read on whether dynamic allocation works will come in Q3 2026 once these have a proper drawdown-recovery cycle to study."),
    ]

    for title, body in insights_list:
        s.append(KeepTogether([
            Paragraph(f"<b>{title}</b>", H3),
            Paragraph(body, BODY_JUSTIFY),
            Spacer(1, 3*mm),
        ]))

    s.append(PageBreak())
    return s

def disclaimer():
    s = []
    s.append(Paragraph("METHODOLOGY & DISCLAIMERS", EYEBROW))
    s.append(Paragraph("Notes for the careful reader", H1))
    s.append(Spacer(1, 4*mm))

    s.append(Paragraph("Methodology", H3))
    s.append(Paragraph(
        "Returns are absolute (not annualised), measured month-end to month-end on Direct Plan Growth NAVs "
        "published by AMFI on amfiindia.com. April monthly return = (30-Apr NAV ÷ 31-Mar NAV − 1) × 100. "
        "3-month return = (30-Apr NAV ÷ 30-Jan NAV − 1) × 100, marked \"—\" where the fund's inception is "
        "fewer than 90 days before period end. Since-inception return = (30-Apr NAV ÷ first-day inception "
        "NAV − 1) × 100. Where no NAV was published on a calendar month-end, the most recent prior trading "
        "day's NAV is used.",
        BODY_JUSTIFY,
    ))

    s.append(Paragraph("Benchmark estimates", H3))
    s.append(Paragraph(
        "NSE Indices had not yet published April 2026 figures for Nifty 50 Hybrid Composite Debt 50:50 "
        "and Nifty 50 Hybrid Composite Debt 65:35 at time of writing. April returns for those benchmarks "
        "are estimated as a 50/50 (or 65/35) weighted combination of Nifty 50 (+7.49%) and a representative "
        "money-market debt return. Capital-protection and upside-capture figures using these estimates carry "
        "a small uncertainty band.",
        BODY_JUSTIFY,
    ))

    s.append(Paragraph("Anomalies acknowledged", H3))
    s.append(Paragraph(
        "<b>Arudha Equity</b> first AMFI NAV (30-Mar-2026) was 9.826, not 10.00. SI returns calculated against "
        "9.826. <b>iSIF Ex-Top 100</b> first NAV (05-Feb-2026) was 9.99 — inception NAV used as 9.99. "
        "<b>Diviniti</b> is on a ₹1,000 face value (NAV around ₹950–1,003), not ₹10 like other SIFs. "
        "<b>qSIF Active Asset Allocator</b> launched on 24-Apr-2026 — only six trading days of data. Its "
        "April return is reported as not meaningful.",
        BODY_JUSTIFY,
    ))

    s.append(Paragraph("Important risk disclaimer", H3))
    s.append(Paragraph(
        "Specialised Investment Funds are a SEBI-regulated category sitting between mutual funds and PMS. "
        "Minimum investment is ₹10 lakh per scheme. SIFs are permitted to take short positions in derivatives "
        "and may use leverage within prescribed limits — they carry materially higher risk than traditional "
        "mutual funds and may experience larger drawdowns. Returns shown above are past performance and are "
        "not indicative of future returns. Read the Scheme Information Document and Statement of Additional "
        "Information for each fund carefully before investing. This report is for informational purposes only "
        "and does not constitute investment advice or a recommendation to buy, hold, or sell any security.",
        BODY_JUSTIFY,
    ))

    s.append(Paragraph("Sources", H3))
    s.append(Paragraph(
        "AMFI (amfiindia.com) — fund NAV history, Direct Growth Plan, October 2025 to 30-April-2026. "
        "NSE Indices (niftyindices.com) — benchmark monthly and trailing returns. "
        "AMC scheme documents — strategy descriptions, expense ratios, and inception details. "
        "Compiled and authored by SIFPrime, May 2026. For corrections or methodology questions, contact "
        "info@sifprime.com.",
        SMALL,
    ))

    s.append(Spacer(1, 8*mm))
    s.append(Paragraph(
        "<b>Visit sifprime.com</b> for a live, sortable scorecard of all SIFs, monthly heatmaps, "
        "fund-by-fund analysis, and the partner platform for distributors.",
        BODY,
    ))
    return s

# ─── Build ────────────────────────────────────────────────────────────────────

def build_pdf(out_path):
    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=18*mm,
        bottomMargin=18*mm,
        title="SIF Performance Report — April 2026",
        author="SIFPrime",
        subject="Monthly performance analysis of all 15 Specialised Investment Funds in India",
        creator="SIFPrime · sifprime.com",
    )

    story = []
    story += cover()
    story += executive_summary()
    story += market_context()
    story += category_winners()
    story += overall_si_leaderboard()
    story += crash_recovery_section()
    story += long_short_analysis()
    story += detailed_table()
    story += insights()
    story += disclaimer()

    # First page uses cover decoration; rest use header_footer
    doc.build(story, onFirstPage=cover_decoration, onLaterPages=header_footer)


if __name__ == "__main__":
    import os
    out = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "public", "downloads", "SIF_April_2026_Performance.pdf",
    )
    os.makedirs(os.path.dirname(out), exist_ok=True)
    build_pdf(out)
    size_kb = os.path.getsize(out) / 1024
    print(f"OK · wrote {out} ({size_kb:.1f} KB)")
