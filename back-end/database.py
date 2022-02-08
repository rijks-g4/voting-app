import os

from pymongo import MongoClient

# MongoDB
MONGO_URI = f'mongodb+srv://{os.environ["MONGO_DB_USERNAME"]}:{os.environ["MONGO_DB_PASSWORD"]}@cluster0.gjmmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
client = MongoClient(MONGO_URI)
db = client['Cluster0']
art_objects_collection = db['art_objects']
art_objects_detailed_collection = db['art_objects_detailed']
votes_collection = db['votes']
