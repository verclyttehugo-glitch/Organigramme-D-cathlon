import re
import json
import html
from collections import defaultdict

def analyze_hierarchy():
    with open('extraction/Oui.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'data-mxgraph="({[^"]+})"', content)
    if not match: return
    
    json_str = html.unescape(match.group(1))
    data = json.loads(json_str)
    xml_content = data.get('xml', '')
    
    # Map IDs to names for debugging
    id_to_name = {}
    user_objects = re.findall(r'<UserObject[^>]*Name="([^"]*)"[^>]*id="([^"]*)"[^>]*>', xml_content)
    # Some names might be in different attribute order
    all_uo = re.findall(r'<UserObject([^>]+)>', xml_content)
    for uo in all_uo:
        name_match = re.search(r'Name="([^"]*)"', uo)
        id_match = re.search(r'id="([^"]*)"', uo)
        if name_match and id_match:
            id_to_name[id_match.group(1)] = name_match.group(1)

    # Analyze edges
    edges = re.findall(r'<mxCell[^>]*edge="1"[^>]*source="([^"]*)"[^>]*target="([^"]*)"[^>]*>', xml_content)
    print(f"Total Edges: {len(edges)}")
    
    hierarchy = defaultdict(list)
    for source, target in edges:
        source_name = id_to_name.get(source, f"ID:{source}")
        target_name = id_to_name.get(target, f"ID:{target}")
        hierarchy[source_name].append(target_name)
    
    # Print some samples
    for manager, subs in list(hierarchy.items())[:10]:
        print(f"{manager} manages: {', '.join(subs[:5])}{'...' if len(subs) > 5 else ''}")

if __name__ == "__main__":
    analyze_hierarchy()
