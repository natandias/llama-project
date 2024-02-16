from bson.objectid import ObjectId
from database import mongo
from bson import json_util, _dict_to_bson


def save_conversation(id, data):
    if id:
        conversation = mongo.db.conversations.find_one({"site_id": id})
        if conversation:
            conversations = conversation["conversations"]
            conversations.append(data)
            update_result = mongo.db.conversations.update_one(
                {"site_id": id}, {"$set": {"conversations": conversations}}
            )
            return update_result
        else:
            conversations = [data]
            insert_result = mongo.db.conversations.insert_one(
                dict(site_id=id, conversations=conversations)
            )
            createdId = str(insert_result.inserted_id)
            return createdId
    else:
        conversations = [data]
        insert_result = mongo.db.conversations.insert_one(
            dict(site_id=id, conversations=conversations)
        )
        createdId = str(insert_result.inserted_id)
        return createdId
