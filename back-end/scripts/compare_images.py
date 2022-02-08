from os import listdir
from os.path import isfile, join
import hashlib
import json

UNNAMED_DIR = ''
OBJECT_NUMBER_DIR = ''

unnamed_hashes = dict()
object_number_hashes = dict()

unnamed_images = [f for f in listdir(UNNAMED_DIR) if isfile(join(UNNAMED_DIR, f))]
object_number_images = [f for f in listdir(OBJECT_NUMBER_DIR) if isfile(join(OBJECT_NUMBER_DIR, f))]


def get_hash(path: str):
    with open(path, "rb") as f:
        f_read = f.read()
        hash = hashlib.sha256(f_read)
        return hash.hexdigest()

for unnamed_image in unnamed_images:
    unnamed_name = unnamed_image.split('.')[0]
    unnamed_hashes[unnamed_name] = get_hash(join(UNNAMED_DIR, unnamed_image))

for object_number_image in object_number_images:
    object_number = object_number_image.split('.')[0]
    object_number_hashes[object_number] = get_hash(join(OBJECT_NUMBER_DIR, object_number_image))

name_mapping = dict()

for idx in range(101):
    if idx == 0:
        unnamed_name = 'unnamed'
    else:
        unnamed_name = f'unnamed-{idx}'

    unnamed_hash = unnamed_hashes[unnamed_name]

    for object_number, object_number_hash in object_number_hashes.items():
        if unnamed_hash == object_number_hash:
            name_mapping[unnamed_name] = object_number
    
    if unnamed_name not in name_mapping:
        name_mapping[unnamed_name] = "???"

object_numbers = list(name_mapping.values())
length = len(set(object_numbers))
duplicates = set([x for x in object_numbers if object_numbers.count(x) > 1])

print(length, duplicates)

with open('./name_mapping_new.json', 'w') as fp:
    json.dump(name_mapping, fp)
