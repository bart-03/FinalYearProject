
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://bartekkfraczek:r72bAncR4pGNeus@xdetect.r3l2c.mongodb.net/?retryWrites=true&w=majority&appName=XDetect"

# client = MongoClient(uri, server_api=ServerApi('1'))
# client.admin.command('ping')
# database = client["XDetect"]

try:
    client = MongoClient(uri, server_api=ServerApi('1'))
    client.admin.command('ping')
    print("Connection successful!")
    database = client["XDetect"]
except Exception as e:
    print(f"Connection failed: {e}")