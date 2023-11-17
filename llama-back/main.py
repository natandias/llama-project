from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from dotenv import dotenv_values
from database import mongo


# from code_completion import CodeCompletion
from hello import HelloWorld

config = dotenv_values(".env")

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)


api.add_resource(HelloWorld, "/api/hello")
# api.add_resource(CodeCompletion, "/api/code")

if __name__ == "__main__":
    print("Running...")
    app.config["MONGO_URI"] = config["MONGO_URI"]
    mongo.init_app(app)
    app.run(debug=True)
