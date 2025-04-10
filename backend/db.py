
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = ""


try:
    client = MongoClient(uri, server_api=ServerApi('1'))
    client.admin.command('ping')
    print("Connection successful!")
    database = client["XDetect"]
except Exception as e:
    print(f"Connection failed: {e}")