"""Rebuild the local 2.5D prop assets; requires ImageMagick's convert.
Run from the repository root. No network, package installs, or academic edits.
"""
import hashlib
import json
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parents[2]
records = json.loads((root / 'docs/living-garden/depth-v2/asset-provenance.json').read_text())
output = root / 'prototype/src/assets/scene-parts'
output.mkdir(exist_ok=True, parents=True)
for record in records:
    source = root / 'docs/living-garden/depth-v2/source-atlases' / (record['atlas'] + '.png')
    assert hashlib.sha256(source.read_bytes()).hexdigest() == record['sourceSha256']
    x, y, width, height = record['crop']
    destination = output / (record['name'] + '.webp')
    subprocess.run(['convert', str(source), '-crop', f'{width}x{height}+{x}+{y}',
                    '+repage', '-trim', '+repage', '-bordercolor', 'none', '-border', '6',
                    '-quality', '86', str(destination)], check=True)
    assert hashlib.sha256(destination.read_bytes()).hexdigest() == record['sha256'], destination
print(f'Validated {len(records)} local scene props')
