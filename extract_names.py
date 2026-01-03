import re
import json
import html

def extract_all_names():
    with open('extraction/Oui.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'data-mxgraph="({[^"]+})"', content)
    if not match:
        print("No data-mxgraph found")
        return
    
    json_str = html.unescape(match.group(1))
    data = json.loads(json_str)
    xml_content = data.get('xml', '')
    
    # Extract names from UserObject Name attribute
    names = re.findall(r'Name="([^"]*)"', xml_content)
    
    # Extract names from labels if Name is missing (sometimes)
    # labels look like label="<b>%Name%</b><br>..." 
    # but the placeholders %Name% would refer to the attribute.
    # However, sometimes names are hardcoded in the label or in the 'value' of mxCell.
    values = re.findall(r'value="([^"]*)"', xml_content)
    
    all_potential_names = set(names)
    for v in values:
        # Clean HTML from value
        cleaned = re.sub(r'<[^>]*>', ' ', html.unescape(v)).strip()
        if cleaned and len(cleaned) < 100:
            all_potential_names.add(cleaned)
            
    with open('all_names.txt', 'w', encoding='utf-8') as f:
        for name in sorted(all_potential_names):
            f.write(f"{name}\n")
    
    print(f"Extracted {len(all_potential_names)} potential names to all_names.txt")

if __name__ == "__main__":
    extract_all_names()
