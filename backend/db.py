
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://bartekkfraczek:r72bAncR4pGNeus@xdetect.r3l2c.mongodb.net/?retryWrites=true&w=majority&appName=XDetect"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection

client.admin.command('ping')
database = client["XDetect"]

# print("Pinged your deployment. You successfully connected to MongoDB!")
# print(f"Database: {database.SignIn}")

