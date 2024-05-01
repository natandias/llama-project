import bcrypt
from resources.user.user_db import find, find_one_by_id, find_one, create_one
from bson.objectid import ObjectId


def create_user(user_data):
    bytes = user_data["password"].encode("utf-8")
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)
    user_data["password"] = hash.decode("utf-8")
    insert_result_id = create_one(user_data)
    return insert_result_id


def find_user(user_id):
    user = find_one_by_id(user_id)
    print(user)
    user["id"] = user["_id"]["$oid"]
    del user["password"]
    del user["_id"]
    return user


def list_users():
    users = find()
    users_list = [
        {
            "id": user["_id"]["$oid"],
            "name": user["name"],
            "email": user["email"],
        }
        for user in users
    ]
    return users_list


def login(user_data):
    filter = {"email": user_data["email"]}
    user_on_db = find_one(filter)
    password_bytes = user_data["password"].encode("utf-8")
    stored_password_bytes = user_on_db.get("password").encode("utf-8")

    if bcrypt.checkpw(password_bytes, stored_password_bytes):
        return True
    else:
        return False
