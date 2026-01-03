import re
import json
import html

def inspect_specifics():
    with open('extraction/Oui.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'data-mxgraph="({[^"]+})"', content)
    if not match: return
    
    json_str = html.unescape(match.group(1))
    data = json.loads(json_str)
    xml_content = data.get('xml', '')
    
    names = ["PROU", "LERNOULD"]
    for name in names:
        # Find the UserObject containing the name
        pattern = fr'<UserObject[^>]*Name="[^"]*{name}[^"]*"[^>]*>'
        matches = re.findall(pattern, xml_content)
        for m in matches:
            print(f"Found: {m}")
            # Also find the corresponding mxCell to check parent/id
            obj_id = re.search(r'id="([^"]*)"', m).group(1)
            cell_pattern = fr'<mxCell id="{obj_id}"[^>]*>'
            cell_matches = re.findall(cell_pattern, xml_content)
            for cm in cell_matches:
                print(f"  Cell: {cm}")

if __name__ == "__main__":
    inspect_specifics()
