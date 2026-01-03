#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'extraction des données d'organigramme Decathlon depuis Oui.html
Extrait les 542 postes et génère data.js structuré par axes métiers
"""

import re
import json
import html
from collections import defaultdict
from datetime import datetime

def extract_xml_from_html(html_file):
    """Extrait le XML depuis le fichier HTML draw.io"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraire le JSON du data-mxgraph
    match = re.search(r'data-mxgraph="({[^"]+})"', content)
    if not match:
        print("❌ Impossible de trouver data-mxgraph")
        return None
    
    json_str = html.unescape(match.group(1))
    data = json.loads(json_str)
    
    # Extraire le XML
    if 'xml' in data:
        return data['xml']
    
    print("❌ Pas de XML dans le JSON")
    return None

def classify_by_axis(role, details):
    """Classifie un poste par axe métier selon son rôle et détails"""
    role_lower = role.lower()
    details_lower = details.lower()
    combined = f"{role_lower} {details_lower}"
    
    # Direction
    if any(keyword in combined for keyword in [
        'president', 'chief executive officer', 'chief value chain officer', 'ceo'
    ]):
        return 'direction'
    
    # Process
    if any(keyword in combined for keyword in [
        'process director', 'methods engineer', 'technical director',
        'product engineer', 'component and tech engineer', 'test engineer',
        'laboratory manager', 'mechanical design engineer', 'materials engineer',
        'industrial process quality', 'numerical simulation engineer',
        'packaging engineer', 'component manager', 'emission factor manager',
        'process', 'plastic composite', 'pack', 'electronics', 'metal', 'bikes',
        'textile', 'footwear', 'soft equipment', 'coe engineering', 'protection',
        'foam', 'raw materials'
    ]):
        return 'process'
    
    # Sports / Marques
    if any(keyword in combined for keyword in [
        'business unit manager', 'design director', 'designer',
        'innovation manager', 'designer leader', 'design team leader',
        'apprentice', 'team manager'
    ]) and 'process' not in combined and 'pack' not in combined:
        return 'sports'
    
    # Transverse
    if any(keyword in combined for keyword in [
        'global purchasing manager', 'global strategic buyer',
        'procurement', 'supply chain manager', 'supply planner',
        'sustainability director', 'sustainability project manager',
        'office manager', 'executive assistant', 'project manager',
        'is engineer', 'software development engineer', 'digital product manager',
        'business intelligence', 'it service provider', 'component offer director',
        'component supply chain', 'quality', 'data', 'digital'
    ]):
        return 'transverse'
    
    # Par défaut: transverse
    return 'transverse'

def create_id(name):
    """Crée un ID unique depuis un nom"""
    # Enlever accents et caractères spéciaux
    name_clean = name.lower()
    name_clean = re.sub(r'[àáâãäå]', 'a', name_clean)
    name_clean = re.sub(r'[èéêë]', 'e', name_clean)
    name_clean = re.sub(r'[ìíîï]', 'i', name_clean)
    name_clean = re.sub(r'[òóôõö]', 'o', name_clean)
    name_clean = re.sub(r'[ùúûü]', 'u', name_clean)
    name_clean = re.sub(r'[ýÿ]', 'y', name_clean)
    name_clean = re.sub(r'[ç]', 'c', name_clean)
    name_clean = re.sub(r'[^a-z\s]', '', name_clean)
    
    parts = name_clean.split()
    if len(parts) >= 2:
        return f"{parts[-1]}-{parts[0][0]}"
    elif len(parts) == 1:
        return parts[0]
    return "unknown"

def extract_people(xml_content):
    """Extrait toutes les personnes depuis le XML"""
    # Pattern pour extraire les UserObject
    pattern = r'<UserObject[^>]*Name="([^"]*)"[^>]*Role="([^"]*)"[^>]*Email="([^"]*)"[^>]*Phone="([^"]*)"[^>]*Location="([^"]*)"[^>]*Details="([^"]*)"'
    
    matches = re.findall(pattern, xml_content)
    
    people = []
    for match in matches:
        name, role, email, phone, location, details = match
        
        # Ignorer les entrées vides ou invalides
        if not name or not role:
            continue
        
        person = {
            'id': create_id(name),
            'name': name,
            'title': role,
            'team': details if details else location,
            'department': details if details else 'AUTRES',
            'phone': phone,
            'email': email,
            'isTeamManager': 'team manager' in role.lower() or 'manager' in role.lower(),
            'children': []
        }
        
        # Classifier par axe
        axis = classify_by_axis(role, details)
        person['axis'] = axis
        
        people.append(person)
    
    return people

def generate_data_js(people, output_file):
    """Génère le fichier data.js"""
    
    # Grouper par axe
    by_axis = defaultdict(list)
    for person in people:
        axis = person.pop('axis')
        by_axis[axis].append(person)
    
    # Statistiques
    stats = {
        'direction': len(by_axis['direction']),
        'process': len(by_axis['process']),
        'sports': len(by_axis['sports']),
        'transverse': len(by_axis['transverse'])
    }
    
    total = sum(stats.values())
    
    # Générer le contenu JavaScript
    js_content = f"""// ==========================================
// 🌳 DATA.JS - ORGANIGRAMME DECATHLON
// Généré automatiquement le {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
// {total} Collaborateurs - Extraction depuis HTML de référence
// ==========================================

const ORG_DATA = {{
    // 🔵 DIRECTION GÉNÉRALE
    direction: {json.dumps(by_axis['direction'], indent=4, ensure_ascii=False)},
    
    // 🏭 AXE PROCESS & ENGINEERING
    process: {json.dumps(by_axis['process'], indent=4, ensure_ascii=False)},
    
    // 🏂 AXE SPORTS / MARQUES
    sports: {json.dumps(by_axis['sports'], indent=4, ensure_ascii=False)},
    
    // 🔄 AXE TRANSVERSE
    transverse: {json.dumps(by_axis['transverse'], indent=4, ensure_ascii=False)}
}};

const orgConfig = {{
    version: "2.0",
    lastUpdate: "{datetime.now().strftime('%Y-%m-%d')}",
    totalEmployees: {total},
    departments: {{
        direction: {stats['direction']},
        process: {stats['process']},
        sports: {stats['sports']},
        transverse: {stats['transverse']}
    }}
}};
"""
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    return stats, total

def main():
    """Fonction principale"""
    print("Extraction des données de l'organigramme Decathlon")
    print("=" * 60)
    
    input_file = "Oui.html"
    output_file = "../data.js"
    
    # Étape 1: Extraire le XML
    print("\nLecture du fichier HTML...")
    xml_content = extract_xml_from_html(input_file)
    
    if not xml_content:
        print("Echec de l'extraction du XML")
        return
    
    print(f"XML extrait ({len(xml_content)} caractères)")
    
    # Étape 2: Extraire les personnes
    print("\nExtraction des collaborateurs...")
    people = extract_people(xml_content)
    print(f"{len(people)} collaborateurs extraits")
    
    # Étape 3: Générer data.js
    print("\nGénération de data.js...")
    stats, total = generate_data_js(people, output_file)
    
    print(f"Fichier {output_file} généré avec succès!")
    print("\nStatistiques:")
    print(f"   . Direction:   {stats['direction']:3d} postes")
    print(f"   . Process:     {stats['process']:3d} postes")
    print(f"   . Sports:      {stats['sports']:3d} postes")
    print(f"   . Transverse:  {stats['transverse']:3d} postes")
    print(f"   . TOTAL:       {total:3d} postes")
    print("\nExtraction terminée avec succès!")

if __name__ == "__main__":
    main()
