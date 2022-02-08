import os
import io
from base64 import encodebytes

from flask import Flask, request, render_template, send_from_directory
from flask_cors import CORS
from PIL import Image
import numpy as np

from database import art_objects_detailed_collection, votes_collection
from utils import get_models, parse_json, MASKS_FOLDER

# Flask
app = Flask(__name__, static_folder="build/static", template_folder="build")
CORS(app)

models = get_models()

# Serve React App
@app.route('/')
def serve():
    return render_template('index.html')


@app.route("/manifest.json")
def manifest():
    return send_from_directory('./build', 'manifest.json')


@app.route('/favicon.ico')
def favicon():
    return send_from_directory('./build', 'favicon.ico')


@app.route('/logo192.png')
def logo192():
    return send_from_directory('./build', 'logo192.png')


@app.route('/logo512.png')
def logo512():
    return send_from_directory('./build', 'logo512.png')


@app.route('/cover.png')
def cover():
    return send_from_directory('./build', 'cover.png')


@app.errorhandler(404)
def not_found(e):
    return render_template('index.html')


@app.route("/healthcheck")
def healthcheck():
    return { 'healthcheck': True }


@app.route("/art_object")
def get_art_object():
    object_number = request.args.get('object_number')
    art_object = art_objects_detailed_collection.find_one({ "objectNumber": object_number })

    if art_object:
        return parse_json(art_object)
    else:
        return {
            'error': 'No or multiple art objects found.'
        }


@app.route("/art_objects")
def get_art_objects():
    art_objects = art_objects_detailed_collection.find()
    return {
        'art_objects': parse_json(list(art_objects))
    }


@app.route("/masks")
def get_masks():
    object_number = request.args.get('object_number')

    response = dict()

    for model in models:
        print(model)
        # full_mask_path = os.path.join(MASKS_FOLDER, model, f'{object_number}.png')
        full_mask_path = os.path.join(MASKS_FOLDER, model, f'{object_number}.txt')
        if os.path.exists(full_mask_path):
            # response[model] = get_response_image(full_mask_path)
            with open(full_mask_path, 'r') as f:
                response[model] = f.read()

    return response


@app.route("/vote", methods=['GET', 'POST'])
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
def summary():
    results = dict()
    for model in get_models():
        pipeline = [{'$group': {'_id': None, f'{model}': {'$sum': f'${model}'}}}]
        cursor = votes_collection.aggregate(pipeline)
        cursor = parse_json(cursor)
        results[model] = cursor[0][model]

    return results


def get_response_image(image_path):
    pil_img = Image.open(image_path, mode='r') # reads the PIL image
    print('read image')
    byte_arr = io.BytesIO()
    print('created byte arr')
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    print('saved image to byte array')
    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    print('encoded into base64')
    return encoded_img


if __name__ == '__main__':
    app.run(host="127.0.0.1", debug=True)
