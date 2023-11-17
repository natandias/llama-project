from flask_restful import Resource, reqparse
import llama

parser = reqparse.RequestParser()
parser.add_argument(
    "prompt", type=str, required=True, help="Prompt é obrigatório", location="json"
)

class CodeCompletion(Resource):
    def post(self):
        args = parser.parse_args()
        prompt = args["prompt"]
        print(prompt)
        result = llama.code_completion(prompt)
        return result, 201
