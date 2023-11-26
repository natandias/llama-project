from flask import jsonify
from flask_restful import Resource, reqparse
from resources.sites.sites_service import create_site

from validator import require_auth


class SiteManager(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, help="Provide a name", required=True)
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
        }

        insert_result_id = create_site(site)
        return {"success": True, "data": {"site_id": insert_result_id}}, 201
