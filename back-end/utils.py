import os
import json
from bson import json_util

# IO
MASKS_FOLDER = os.environ['MASKS_FOLDER']

def get_models():
    models = [name for name in os.listdir(MASKS_FOLDER) if os.path.isdir(os.path.join(MASKS_FOLDER, name))]
    return models

def parse_json(data):
    return json.loads(json_util.dumps(data))
