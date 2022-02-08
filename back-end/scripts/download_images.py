import os
import json
import requests

EXPORTS_PATH = ''

with open('', 'r') as f:
    data = json.load(f)

    for art_object in data['results']:
        img_data = requests.get(art_object['webImage']['url']).content
        new_path = os.path.join(EXPORTS_PATH, f'{art_object["objectNumber"]}.jpg')
        with open(new_path, 'wb') as handler:
            handler.write(img_data)
