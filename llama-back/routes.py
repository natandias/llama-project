from resources.conversation.conversation_manager import (
    ConversationManager,
    ConversationFind,
)
from resources.user.user_manager import UserManager, UserFind, UserList
from resources.sites.sites_manager import SiteManager, SitesFind, SitesList

from code_completion import CodeCompletion


def define_routes(api):
    api.add_resource(UserManager, "/api/user/")
    api.add_resource(UserFind, "/api/user/<user_id>")
    api.add_resource(UserList, "/api/user/list")
    api.add_resource(SiteManager, "/api/site")
    api.add_resource(SitesFind, "/api/site/<id>")
    api.add_resource(SitesList, "/api/site/list")
    api.add_resource(ConversationManager, "/api/chat")
    api.add_resource(ConversationFind, "/api/chat/<site_id>")

    # api.add_resource(UserLogin, "/api/user/login")
    api.add_resource(CodeCompletion, "/api/code")
