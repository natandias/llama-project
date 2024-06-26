from flask import send_file
from bson.objectid import ObjectId
from database import mongo
from bson import json_util, _dict_to_bson


def create_site(site_data):
    insert_result = mongo.db.sites.insert_one(site_data)
    createdId = str(insert_result.inserted_id)
    return createdId


def find_site(id):
    site = mongo.db.sites.find_one_or_404({"_id": ObjectId(id)})
    return json_util.json.loads(json_util.dumps(site, default=str))


def update_site(id, data):
    update_result = mongo.db.sites.update_one(
        {"_id": ObjectId(id)},
        {"$set": data},
    )
    return update_result


def delete_site(id):
    delete_site_result = mongo.db.sites.delete_one({"_id": ObjectId(id)})
    delete_conversations_result = mongo.db.conversations.delete_one({
                                                                    "site_id": id})
    return delete_site_result

def list_sites(filters={}):
    sites_from_db = mongo.db.sites.find(filters)
    sites = json_util.json.loads(json_util.dumps(sites_from_db, default=str))
    sites_list = [
        {
            "id": site["_id"]["$oid"],
            "name": site["name"],
            "primaryColor": site["primaryColor"],
            "secondaryColor": site["secondaryColor"],
            "step": site["step"]
        }
        for site in sites
    ]
    return json_util.json.loads(json_util.dumps(sites_list, default=str))


def download_site(id):
    site = find_site(id)
    return send_file(
        path_or_file=f'static/{id}.html',
        mimetype="application/octet-stream",
        as_attachment=True,
        download_name=site["name"]
    )
