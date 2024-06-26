from flask_restful import Resource, reqparse
import llama
from validator import require_auth
from resources.conversation.conversation_service import find_conversation
import asyncio


class ConversationManager(Resource):
    @require_auth(None)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "site_id",
            type=str,
            required=True,
            help="site_id é obrigatório",
            location="json",
        )
        parser.add_argument(
            "prompt",
            type=str,
            required=True,
            help="prompt é obrigatório",
            location="json",
        )
        args = parser.parse_args(strict=True)
        site_id = args["site_id"]
        prompt = args["prompt"]
        result = llama.chat(id=site_id, prompt=prompt)
        return result, 201


class ConversationFind(Resource):
    @require_auth(None)
    def get(self, site_id):
        print(site_id)
        conversation = find_conversation(site_id)
        return {
            "success": True,
            "data": conversation,
        }, 200


class ConversationExtract(Resource):
    @require_auth(None)
    def post(self, site_id):
        result = llama.generate_summary(site_id=site_id)
        return result, 201
