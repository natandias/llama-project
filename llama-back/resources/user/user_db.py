from bson.objectid import ObjectId
from database import mongo
from bson import json_util, _dict_to_bson


def find_one(id):
    user = mongo.db.users.find_one({"_id": ObjectId(id)})
    return json_util.json.loads(json_util.dumps(user, default=str))


def create_one(data):
    insert_result = mongo.db.users.insert_one(data)
    return insert_result
