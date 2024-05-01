from flask_restful import Resource, reqparse
import llama

parser = reqparse.RequestParser()

# parser.add_argument(
#     "site_id",
#     type=str,
#     required=True,
#     help="site_id é obrigatório",
#     location="json",
# )

class CodeCompletion(Resource):
    def post(self, site_id):
        # parser = reqparse.RequestParser()
        # parser.add_argument(
        #     "site_id",
        #     type=str,
        #     required=True,
        #     help="site_id é obrigatório",
        #     location="json",
        # )
        # args = parser.parse_args()
        # site_id = args["site_id"]
        result = llama.create_site_code(site_id=site_id)
        return result, 201
