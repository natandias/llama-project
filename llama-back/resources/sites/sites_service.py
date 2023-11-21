from bson.objectid import ObjectId
from database import mongo
from bson import json_util, _dict_to_bson


def create_site(site_data):
    insert_result = mongo.db.sites.insert_one(site_data)
    createdId = str(insert_result.inserted_id)
    return createdId
