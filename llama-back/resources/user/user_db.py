from bson.objectid import ObjectId
from database import mongo
from bson import json_util, _dict_to_bson


def find_one_by_id(id):
    user = mongo.db.users.find_one_or_404({"_id": ObjectId(id)})
    return json_util.json.loads(json_util.dumps(user, default=str))


def find_one(filters={}):
    user = mongo.db.users.find_one_or_404(filters)
    return json_util.json.loads(json_util.dumps(user, default=str))


def find(filters={}):
    users = mongo.db.users.find(filters)
    return json_util.json.loads(json_util.dumps(users, default=str))


def create_one(data):
    insert_result = mongo.db.users.insert_one(data)
    createdId = str(insert_result.inserted_id)
    return createdId
