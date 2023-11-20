from resources.user.user_manager import UserManager, UserFind, UserList

# from code_completion import CodeCompletion


def define_routes(api):
    api.add_resource(UserManager, "/api/user/")
    api.add_resource(UserFind, "/api/user/<user_id>")
    api.add_resource(UserList, "/api/user/list")
    # api.add_resource(UserLogin, "/api/user/login")
    # api.add_resource(CodeCompletion, "/api/code")


# api.add_resource(CodeCompletion, "/api/code")
