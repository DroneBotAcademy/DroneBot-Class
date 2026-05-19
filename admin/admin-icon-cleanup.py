from pathlib import Path
import re

base = Path(__file__).parent

def replace_in_file(path, pattern, replacement, name=None, count=0):
    text = path.read_text(encoding='utf-8')
    new_text, num = re.subn(pattern, replacement, text, count=count, flags=re.S)
    if num:
        path.write_text(new_text, encoding='utf-8')
        print(f'{path.name}: replaced {num} occurrence(s)')
    else:
        print(f'{path.name}: no match for {name or pattern}')

# adminstudent: remove duplicate icon block after theme dropdown
replace_in_file(
    base / 'adminstudent.html',
    r'<svg xmlns="http://www.w3.org/2000/svg" class="d-none">.*?</svg>\s*<!-- ส่วน Header -->',
    '    <!-- ส่วน Header -->',
    name='adminstudent icon block',
    count=1,
)

# adminclass: remove broken duplicate symbol block before theme toggle
replace_in_file(
    base / 'adminclass.html',
    r'<symbol id="check2".*?</svg>\s*<div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle"',
    '  <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle"',
    name='adminclass symbol block',
    count=1,
)

# adminpage: remove duplicate icon block after icons-placeholder
replace_in_file(
    base / 'adminpage.html',
    r'<div id="icons-placeholder"></div>\s*<svg xmlns="http://www.w3.org/2000/svg" class="d-none">.*?</svg>\s*<div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle"',
    '<div id="icons-placeholder"></div>\n  <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle"',
    name='adminpage icon block',
    count=1,
)

# adminlog: add admin-common.js script if missing
path = base / 'adminlog.html'
text = path.read_text(encoding='utf-8')
if 'admin-common.js' not in text:
    text = text.replace(
        '<script src="../assets/js/color-modes.js"></script>',
        '<script src="../assets/js/color-modes.js"></script>\n    <script src="../js/config.js"></script>\n    <script src="admin-common.js"></script>',
        1,
    )
    path.write_text(text, encoding='utf-8')
    print('adminlog: added admin-common.js script')
else:
    print('adminlog: admin-common.js already present')

# adminlog: replace theme icon block with icons placeholder and add loadComponent init
text = path.read_text(encoding='utf-8')
new_text, num = re.subn(
    r'<svg xmlns="http://www.w3.org/2000/svg" class="d-none">.*?</svg>\s*<div\s+class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle"',
    '    <div id="icons-placeholder"></div>\n    <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle"',
    text,
    count=1,
    flags=re.S,
)
if num:
    path.write_text(new_text, encoding='utf-8')
    print('adminlog: replaced theme icon block with icons placeholder')
else:
    print('adminlog: no theme icon block match')

# adminlog: add loadComponent run script after bootstrap bundle if not present
text = path.read_text(encoding='utf-8')
if 'loadComponent("icons-placeholder", "admin-icons.html")' not in text:
    text = text.replace(
        '<script src="../assets/dist/js/bootstrap.bundle.min.js"></script>\n\n    <!-- เขียนโค้ดควบคุมแยกต่างหากเพื่อให้ทำงานได้ -->',
        '<script src="../assets/dist/js/bootstrap.bundle.min.js"></script>\n    <script>\n      document.addEventListener("DOMContentLoaded", function () {\n        if (typeof loadComponent === "function") {\n          loadComponent("icons-placeholder", "admin-icons.html");\n        }\n      });\n    </script>\n\n    <!-- เขียนโค้ดควบคุมแยกต่างหากเพื่อให้ทำงานได้ -->',
        1,
    )
    path.write_text(text, encoding='utf-8')
    print('adminlog: added icons load script')
else:
    print('adminlog: load script already exists')
