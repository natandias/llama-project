import base64
import json
from flask_restful import Resource, reqparse, request
import werkzeug
from resources.sites.sites_service import create_site, find_site, list_sites, update_site, delete_site, download_site
from authlib.integrations.flask_oauth2 import current_token
import uuid

import llama

from validator import require_auth
from uploader import uploadImage


class SiteManager(Resource):
    @require_auth(None)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "name", type=str, help="Provide a name", required=True)
        parser.add_argument(
            "primaryColor", type=str, help="Provide a primary color", required=True
        )
        parser.add_argument(
            "secondaryColor", type=str, help="Provide a secondary color", required=True
        )

        args = parser.parse_args(strict=True)

        site = {
            "name": args["name"],
            "primaryColor": args["primaryColor"],
            "secondaryColor": args["secondaryColor"],
            "template": None,
            "author": current_token.sub,
            "step": "chatting",
            "images": []
        }

        insert_site_id = create_site(site)
        llama.chat(
            id=insert_site_id,
            prompt=f'Oi. Preciso de ajuda para criar o site {args["name"]}',
        )

        return {"success": True, "data": {"site_id": insert_site_id}}, 201


class SitesActions(Resource):
    @require_auth(None)
    def get(self, id):
        site = find_site(id)
        return {"success": True, "data": site}, 200

    @require_auth(None)
    def patch(self, id):
        parser = reqparse.RequestParser()

        parser.add_argument("requirements", type=str,
                            help="Provide requirements", required=False, location='form')
        parser.add_argument(
            "content", type=str, help="Provide content", required=False, location='form')
        parser.add_argument(
            "template", type=str, help="Provide template", required=False, location='form')
        args = parser.parse_args(strict=False)

        data_to_save = args

        images = []
        if request.files is not None:
            for img in request.files.getlist('images'):
                image_data_binary = bytearray(img.read())
                imgName = str(uuid.uuid4()) + '-' + img.filename

                uploaded_img_url = uploadImage(image_data_binary, imgName)
                images.append(uploaded_img_url)
            data_to_save["images"] = images

        update_site(id, data_to_save)

        return {"success": True}, 200

    @require_auth(None)
    def delete(self, id):
        delete_site(id)
        return {"success": True}, 200


class SitesList(Resource):
    @require_auth(None)
    def get(self):
        sites_list = list_sites({"author": current_token.sub})
        return {"success": True, "data": sites_list}, 200

class SitesDownload(Resource):
    @require_auth(None)
    def get(self, id):
        return download_site(id)
