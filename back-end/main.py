import os

from flask import Flask, request
from flask_cors import CORS, cross_origin

from database import art_objects_collection, votes_collection
from utils import get_models, parse_json

# Flask
app = Flask(__name__)
CORS(app)
CORS_ALLOWED_URL = os.environ['FRONT_END_URL']

@app.route("/art_object")
@cross_origin([CORS_ALLOWED_URL])
def get_art_object():
    object_number = request.args.get('object_number')
    art_object = art_objects_collection.find_one({ "objectNumber": object_number })

    if art_object:
        return parse_json(art_object)
    else:
        return {
            'error': 'No or multiple art objects found.'
        }


@app.route("/art_objects")
@cross_origin([CORS_ALLOWED_URL])
def get_art_objects():
    art_objects = art_objects_collection.find()
    return {
        'art_objects': parse_json(list(art_objects))
    }


@app.route("/masks")
@cross_origin([CORS_ALLOWED_URL])
def get_masks():
    # TODO: Implement get_masks endpoint
    return {}


@app.route("/vote", methods=['GET', 'POST'])
@cross_origin([CORS_ALLOWED_URL])
def vote():
    object_number = request.args.get('object_number')

    if request.method == 'POST':
        body = request.get_json()
        model_name = body['model_name']
        votes_collection.update_one({ 'objectNumber': object_number }, { '$inc': { str(model_name): 1 } })

    art_object = votes_collection.find_one({ "objectNumber": object_number })

    if art_object:
        return parse_json(art_object)
    else:
        return {
            'error': 'No or multiple art objects found.'
        }


@app.route("/summary")
@cross_origin([CORS_ALLOWED_URL])
def summary():
    results = dict()
    for model in get_models():
        pipeline = [{'$group': {'_id': None, f'{model}': {'$sum': f'${model}'}}}]
        cursor = votes_collection.aggregate(pipeline)
        cursor = parse_json(cursor)
        results[model] = cursor[0][model]

    return results
