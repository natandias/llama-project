from resources.user.user_manager import UserManage, UserList

# from code_completion import CodeCompletion


def define_routes(api):
    api.add_resource(UserManage, "/api/user/")
    api.add_resource(UserList, "/api/user/list")
    # api.add_resource(CodeCompletion, "/api/code")


# api.add_resource(CodeCompletion, "/api/code")
