from bson.objectid import ObjectId
from database import mongo
from bson import json_util, _dict_to_bson


def find_conversation(site_id):
    conversation = mongo.db.conversations.find_one({"site_id": site_id})
    return json_util.json.loads(json_util.dumps(conversation, default=str))
