import os
import json

from database import art_objects_collection, votes_collection, art_objects_detailed_collection
from utils import get_models

def add_rijksmuseum_art_objects() -> None:
    with open(os.environ['DATASET_PATH']) as f:
        data = json.load(f)

        art_objects_collection.insert_many(data['results'])

        for art_object in data['results']:
            obj = {
                'objectNumber': art_object['objectNumber'],
            }
            for model in get_models():
                obj[model] = 0
            votes_collection.insert_one(obj)

        # for value in data.values():
        #     art_objects_detailed_collection.insert_one(value)

if __name__ == "__main__":
    add_rijksmuseum_art_objects()
