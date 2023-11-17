import bson

from flask_pymongo import PyMongo
from werkzeug.local import LocalProxy

from pymongo.errors import DuplicateKeyError, OperationFailure
from bson.objectid import ObjectId
from bson.errors import InvalidId


mongo = PyMongo()
