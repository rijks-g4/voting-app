## Set up

The prerequisites are:
* Python
* Pip

To set up the back end:
* Create a venv: `python -m venv ./venv`
* Install dependencies: `pip install -r requirements.txt`
* Create a `.env` file containing the following variables:
    * `MONGO_DB_USERNAME`: The username to access the MongoDB database
    * `MONGO_DB_PASSWORD`: The password to access the MongoDB database
    * `MASKS_FOLDER`: The folder containing the masks
    * `FRONT_END_URL`: The URL to the front end (used to allow CORS)
* Create a folder structure inside `MASKS_FOLDER` with the top-level subdirectories named after the models. Each model subdirectory should contain the `.npy` model masks.

## Execution

To start the back end:
* run `export FLASK_APP=main`
* run `flask run`

## Other commands

### Add new Art Objects from the Rijksmuseum

Use the script `add_rijksmuseum_art_objects.py` to add new art objects. To use that script you need to:
* run `export DATASET_PATH=<put-path-to-json-here>` to specify the path to the dataset
* run `python add_rijksmuseum_art_objects.py` to add the new art objects
