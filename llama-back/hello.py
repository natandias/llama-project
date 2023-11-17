import bson
from bson.objectid import ObjectId
from flask import jsonify
from flask_restful import Resource
from pymongo import MongoClient
from database import mongo


class HelloWorld(Resource):
    def get(self):
        # 65558728e036ca5db8aa78b5
        users = mongo.db.users.find({})
        users_list = [
            {
                "_id": str(user["_id"]),
                "name": user["name"],
            }  # Substitua field1, field2 pelos seus campos reais
            for user in users
        ]
        return jsonify(users_list)
