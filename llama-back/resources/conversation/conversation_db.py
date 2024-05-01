from bson.objectid import ObjectId
from database import mongo
from bson import json_util, _dict_to_bson


def save_conversation(id, data):
    summary = data.get("summary", "")
    if id:
        conversation = mongo.db.conversations.find_one({"site_id": id})
        if conversation:
            conversation_data = dict(prompt=data["prompt"], response=data["response"])
            conversations = conversation["conversations"]
            conversations.append(conversation_data)
            update_result = mongo.db.conversations.update_one(
                {"site_id": id},
                {"$set": {"conversations": conversations, "summary": summary}},
            )
            return update_result
        else:
            conversations = [data]
            insert_result = mongo.db.conversations.insert_one(
                dict(site_id=id, conversations=conversations, summary=summary)
            )
            createdId = str(insert_result.inserted_id)
            return createdId
    else:
        conversation_data = dict(prompt=data["prompt"], response=data["response"])
        conversations = [conversation_data]
        insert_result = mongo.db.conversations.insert_one(
            dict(site_id=id, conversations=conversations, summary=summary)
        )
        createdId = str(insert_result.inserted_id)
        return createdId
