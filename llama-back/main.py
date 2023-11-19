from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from dotenv import dotenv_values
from database import mongo
from routes import define_routes

config = dotenv_values(".env")

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

define_routes(api)

# module_name, package_name, ClassName, method_name,
# ExceptionName, function_name, GLOBAL_CONSTANT_NAME,
# global_var_name, instance_var_name, function_parameter_name,
# local_var_name

if __name__ == "__main__":
    print("Running...")
    app.config["MONGO_URI"] = config["MONGO_URI"]
    mongo.init_app(app)
    app.run(debug=True)
