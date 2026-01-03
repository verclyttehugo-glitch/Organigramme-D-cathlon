import re
import json
import html

def debug_find():
    with open('extraction/Oui.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'data-mxgraph="({[^"]+})"', content)
    if not match:
        print("No data-mxgraph found")
        return
    
    json_str = html.unescape(match.group(1))
    data = json.loads(json_str)
    xml_content = data.get('xml', '')
    
    print(f"XML length: {len(xml_content)}")
    
    # Search for names
    names_to_find = ["Prau", "Lernould", "Jean", "Christophe"]
    for name in names_to_find:
        count = xml_content.count(name)
        print(f"Found '{name}': {count} times")
        
        if count > 0:
            # Show context
            index = xml_content.find(name)
            print(f"  Context: {xml_content[index-50:index+100]}")

    # Check for UserObject structure
    user_objects = re.findall(r'<UserObject[^>]*>', xml_content)
    print(f"Total UserObjects: {len(user_objects)}")
    if user_objects:
        print(f"Sample UserObject: {user_objects[0]}")

if __name__ == "__main__":
    debug_find()
