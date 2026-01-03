#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'extraction avancé - Organigramme Decathlon
Extrait 550+ postes, construit la hiérarchie et détecte les prestataires.
"""

import re
import json
import html
from collections import defaultdict
from datetime import datetime

def extract_xml_content(html_file):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    match = re.search(r'data-mxgraph="({[^"]+})"', content)
    if not match: return None
    json_str = html.unescape(match.group(1))
    return json.loads(json_str).get('xml', '')

def is_prestataire(role, details):
    combined = f"{role} {details}".lower()
    keywords = ['service provider', 'onsite', 'externe', 'consultant', 'prestataire']
    return any(k in combined for k in keywords)

def classify_axis(role, details, id_to_name, children_map, current_id, root_id):
    # Base classification on role/details
    text = f"{role} {details}".lower()
    
    if any(k in text for k in ['president', 'ceo', 'chief executive', 'value chain officer']):
        return 'direction'
    
    # Check if descendant of known axis heads? (Too complex for now, stay with keywords)
    if any(k in text for k in ['process', 'engineer', 'test', 'laboratory', 'methods', 'metal', 'bikes', 'textile', 'footwear']):
        return 'process'
    
    if any(k in text for k in ['business unit', 'design', 'innovation', 'designer']):
        if 'process' not in text:
            return 'sports'
            
    if any(k in text for k in ['purchasing', 'supply', 'sustainability', 'office', 'assistant', 'is engineer', 'digital', 'it service', 'quality', 'data']):
        return 'transverse'
        
    return 'transverse'

def create_id(name):
    if not name: return "unknown"
    name_clean = name.lower()
    # Basic normalization
    for a, b in [('à','a'), ('é','e'), ('è','e'), ('ê','e'), ('ë','e'), ('î','i'), ('ï','i'), ('ô','o'), ('û','u'), ('ù','u'), ('ç','c')]:
        name_clean = name_clean.replace(a, b)
    name_clean = re.sub(r'[^a-z\s]', '', name_clean)
    parts = name_clean.split()
    if len(parts) >= 2:
        return f"{parts[-1]}-{parts[0][0]}"
    return name_clean or "unknown"

def main():
    print("Demarrage de l'extraction hierarchique...")
    xml_content = extract_xml_content('Oui.html')
    if not xml_content:
        print("Erreur: Impossible de lire le XML")
        return

    # 1. Map all UserObjects
    people_by_id = {}
    # Find all UserObjects - use a more flexible regex for attributes
    uo_matches = re.finditer(r'<UserObject([^>]+)>', xml_content)
    for match in uo_matches:
        uo_body = match.group(1)
        
        # Helper to get attribute safely
        def get_attr(attr):
            m = re.search(fr'{attr}="([^"]*)"', uo_body)
            return m.group(1) if m else ""

        uid = get_attr('id')
        name = get_attr('Name') or get_attr('label') # Fallback if Name missing
        if not uid or not name or name == "%Name%": continue
        
        # Clean labels from name if fallback used
        name = re.sub(r'<[^>]*>', '', name).strip()

        role = get_attr('Role')
        email = get_attr('Email')
        phone = get_attr('Phone')
        location = get_attr('Location')
        details = get_attr('Details')

        people_by_id[uid] = {
            'id': create_id(name),
            'raw_id': uid,
            'name': name,
            'title': role,
            'team': details if details else location,
            'department': details if details else 'AUTRES',
            'phone': phone,
            'email': email,
            'isTeamManager': 'manager' in role.lower() or 'director' in role.lower() or 'leader' in role.lower(),
            'isPrestataire': is_prestataire(role, details),
            'children': []
        }

    # 2. Extract relationships
    edge_matches = re.finditer(r'<mxCell[^>]*edge="1"[^>]*source="([^"]*)"[^>]*target="([^"]*)"[^>]*>', xml_content)
    for match in edge_matches:
        source_id = match.group(1)
        target_id = match.group(2)
        
        if source_id in people_by_id and target_id in people_by_id:
            people_by_id[source_id]['children'].append(people_by_id[target_id]['id'])

    # 3. Organize by Axes
    axes = {'direction': [], 'process': [], 'sports': [], 'transverse': []}
    
    # Sort IDs to keep deterministic output
    sorted_ids = sorted(people_by_id.keys())
    
    for uid in sorted_ids:
        person = people_by_id[uid]
        # Copy for output (remove raw_id)
        out_person = person.copy()
        raw_id = out_person.pop('raw_id')
        
        axis = classify_axis(person['title'], person['department'], None, None, None, None)
        axes[axis].append(out_person)

    # 4. Generate data.js
    total = sum(len(a) for a in axes.values())
    js_content = f"""// ==========================================
// 🌳 DATA.JS - ORGANIGRAMME HIÉRARCHIQUE
// Généré le {datetime.now().strftime('%d/%m/%Y %H:%M')}
// Total: {total} collaborateurs
// ==========================================

const ORG_DATA = {json.dumps(axes, indent=4, ensure_ascii=False)};

const orgConfig = {{
    version: "3.0",
    lastUpdate: "{datetime.now().strftime('%Y-%m-%d')}",
    totalEmployees: {total},
    departments: {{
        direction: {len(axes['direction'])},
        process: {len(axes['process'])},
        sports: {len(axes['sports'])},
        transverse: {len(axes['transverse'])}
    }}
}};
"""
    
    with open('../data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Extraction terminee: {total} personnes.")
    print(f"Stats: D={len(axes['direction'])} P={len(axes['process'])} S={len(axes['sports'])} T={len(axes['transverse'])}")

if __name__ == "__main__":
    main()
