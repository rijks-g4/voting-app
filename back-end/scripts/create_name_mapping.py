import os
import json


def create_name_mapping() -> None:
    exports_path = os.environ['EXPORT_PATH']

    name_mapping = dict()
    with open(os.path.join(exports_path, 'export.json')) as f:
        data = json.load(f)

        print(len(data['results']))

        for idx, art_object in enumerate(data['results']):
            if idx == 0:
                filename = 'unnamed.jpg'
            else:
                filename = f'unnamed-{idx}.jpg'

            name_mapping[filename] = art_object['objectNumber']
            old_path = os.path.join(exports_path, filename)
            new_path = os.path.join(exports_path, f'{art_object["objectNumber"]}.jpg')
            os.rename(old_path, new_path)

    with open(os.path.join(exports_path, 'name_mapping.json'), 'w') as json_file:
        json.dump(name_mapping, json_file)


if __name__ == "__main__":
    create_name_mapping()
