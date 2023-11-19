from flask import jsonify
from flask_restful import Resource, reqparse
from resources.user.user_db import find_one, create_one
from database import mongo


class UserManage(Resource):
    def get(self):
        # 65558728e036ca5db8aa78b5
        user = find_one("65558728e036ca5db8aa78b5")
        return jsonify(user)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("email", type=str, help="Provide an email", required=True)
        parser.add_argument(
            "password", type=str, help="Provide a password", required=True
        )
        args = parser.parse_args(strict=True)

        user = {
            "email": args["email"],
            "password": args["password"],
        }

        insert_result = create_one(user)
        return "true", 201


class UserList(Resource):
    def get(self):
        users = mongo.db.users.find({})
        users_list = [
            {
                "_id": str(user["_id"]),
                "name": user["name"],
            }
            for user in users
        ]
        return jsonify(users_list)


# def post(self):
#     parser = reqparse.RequestParser()
#     parser.add_argument(
#         "prompt",
#         type=str,
#         required=True,
#         help="Prompt é obrigatório",
#         location="json",
#     )
#     args = parser.parse_args()
#     prompt = args["prompt"]
#     print(prompt)
#     result = llama.code_completion(prompt)
#     return result, 201
