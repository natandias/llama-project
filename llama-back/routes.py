from resources.conversation.conversation_manager import (
    ConversationManager,
    ConversationFind,
    ConversationExtract
)
from resources.user.user_manager import UserManager, UserFind, UserList
from resources.sites.sites_manager import SiteManager, SitesActions, SitesList, SitesUpdate

from code_completion import CodeCompletion


def define_routes(api):
    api.add_resource(UserManager, "/api/user/")
    api.add_resource(UserFind, "/api/user/<user_id>")
    api.add_resource(UserList, "/api/user/list")
    api.add_resource(SiteManager, "/api/site")
    api.add_resource(SitesActions, "/api/site/<string:id>",
                     methods=['GET', 'PATCH', 'DELETE'])
    api.add_resource(SitesList, "/api/site/list")
    api.add_resource(ConversationManager, "/api/chat")
    api.add_resource(ConversationFind, "/api/chat/<site_id>")
    api.add_resource(ConversationExtract, "/api/chat/<site_id>/extract")
    api.add_resource(CodeCompletion, "/api/code/<site_id>")
