import os
import json

import requests


def download_detailed_info() -> None:
    with open(os.environ['DATASET_PATH']) as f:
        data = json.load(f)

        detailed_infos = dict()

        for art_object in data['results']:
            resp = requests.get(f'https://www.rijksmuseum.nl/api/nl/collection/{art_object["objectNumber"]}?key={API_KEY}')
            detailed_info = resp.json()
            detailed_infos[art_object["objectNumber"]] = detailed_info['artObject']
            
            print()
            print(detailed_infos.keys())

        with open(os.environ['OUTPUT_PATH'], 'w') as f:
            json.dump(detailed_infos, f)

if __name__ == "__main__":
    download_detailed_info()
