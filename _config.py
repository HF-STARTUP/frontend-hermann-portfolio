#!/usr/bin/env python3
import os
import sys

def add_use_client_if_missing(file_path):
    """
    Ouvre le fichier .tsx, vérifie si la première ligne contient 'use client'
    Si non, insère 'use client'; au début et réécrit le fichier.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    if not lines:
        # Fichier vide : on ajoute directement la ligne
        lines.insert(0, '"use client";\n\n')
    else:
        first_line = lines[0].strip()
        # Vérifie si la 1re ligne commence par "use client" ou 'use client'
        if not (first_line.startswith('"use client"') or first_line.startswith("'use client'")):
            # Si pas présent, on insère en haut de fichier
            lines.insert(0, '"use client";\n\n')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)

def main():
    if len(sys.argv) < 2:
        print("Usage: python add_use_client.py <repertoire_racine>")
        sys.exit(1)

    base_dir = sys.argv[1]

    # Parcours récursif du répertoire
    for root, dirs, files in os.walk(base_dir):
        for file_name in files:
            if file_name.endswith(".tsx") and file_name != "layout.tsx":
                file_path = os.path.join(root, file_name)
                add_use_client_if_missing(file_path)

    print("Traitement terminé.")

if __name__ == "__main__":
    main()
