from db import database
from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS
import datetime
import jwt

signin = Blueprint("signin", __name__)

@signin.route('/SignIn', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    results = database.SignIn.find_one({ "email": email, "password": password }, { "_id": 0 })

   
    
    expiry = (datetime.datetime.now() + datetime.timedelta(days=1)).timestamp()
    payload = { "email": results['email'], "password": results['password'], "expiry": expiry }

    
    jwt_token = jwt.encode(payload=payload, key="XDetect", algorithm="HS256")
    print(jwt_token)
    print(results)
    return jsonify(results, jwt_token)




