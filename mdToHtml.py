import markdown2
import os

with open("Lawbook_Project_Report.md", "r", encoding="utf-8") as f:
    md_text = f.read()

# Convert to HTML
html_body = markdown2.markdown(md_text, extras=["fenced-code-blocks", "tables"])

# Wrap in HTML template
html_content = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page {{ margin: 20mm; }}
  body {{ font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.6; color: #000; text-align: justify; padding: 20px; }}
  h1 {{ font-size: 24pt; text-align: center; margin-top: 50px; page-break-before: always; }}
  h1:first-of-type {{ page-break-before: auto; }}
  h2 {{ font-size: 18pt; margin-top: 30px; }}
  h3 {{ font-size: 14pt; margin-top: 20px; }}
  .cover {{ text-align: center; margin-top: 100px; height: 90vh; page-break-after: always; }}
  .cover h1 {{ font-size: 36pt; margin-bottom: 20px; page-break-before: auto; }}
  .cover h2 {{ font-size: 20pt; font-weight: normal; margin-bottom: 50px; }}
  .cover p {{ font-size: 16pt; margin: 10px 0; }}
  .page-break {{ page-break-before: always; }}
  table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
  th, td {{ border: 1px solid #ccc; padding: 10px; text-align: left; }}
  pre {{ font-size: 10pt; line-height: 1.2; background: #f4f4f4; padding: 10px; border-radius: 5px; page-break-inside: avoid; white-space: pre-wrap; word-wrap: break-word; }}
  code {{ font-family: monospace; background: #f4f4f4; padding: 2px 4px; }}
</style>
</head>
<body>
{html_body}
</body>
</html>"""

# Fix page breaks for the cover (markdown2 converts the cover div nicely but let's ensure it)
with open("Lawbook_Project_Report.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("HTML generated successfully.")
