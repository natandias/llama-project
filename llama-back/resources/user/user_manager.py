from flask import jsonify
from flask_restful import Resource, reqparse
from resources.user.user_service import create_user, find_user, list_users, login
from validator import require_auth


class UserManager(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, help="Provide a name", required=True)
        parser.add_argument("email", type=str, help="Provide an email", required=True)
        parser.add_argument(
            "password", type=str, help="Provide a password", required=True
        )
        args = parser.parse_args(strict=True)

        user = {
            "name": args["name"],
            "email": args["email"],
            "password": args["password"],
        }

        insert_result_id = create_user(user)
        return {"success": True, "data": {"user_id": insert_result_id}}, 201


class UserFind(Resource):
    @require_auth(None)
    def get(self, user_id):
        user = find_user(user_id)
        return {"success": True, "data": user}, 200


class UserList(Resource):
    @require_auth(None)
    def get(self):
        users_list = list_users()
        return {"success": True, "data": users_list}, 200
