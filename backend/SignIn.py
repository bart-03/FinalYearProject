# from db import database
# from flask import Blueprint, jsonify, request
# import datetime
# import jwt

# signin = Blueprint("signin", __name__)

# @signin.route('/SignIn', methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")
    
#     # Find the user by email and password
#     results = database.SignIn.find_one({ "email": email, "password": password })

#     if not results:
#         return jsonify({"error": "Invalid credentials"}), 401  # If no user found, return an error
    
#     user_id = results.get("_id")  # Assuming the user ID is stored as _id in the database
    
#     # Set the JWT token expiry time (1 day from now)
#     expiry = (datetime.datetime.now() + datetime.timedelta(days=1)).timestamp()
    
#     # Prepare JWT payload (exclude password for security reasons)
#     payload = { 
#         "email": results['email'],
#         "expiry": expiry, 
#         "user_id": str(user_id)  # Include user_id as string to make it JSON serializable
#     }

#     # Generate JWT token
#     jwt_token = jwt.encode(payload=payload, key="XDetect", algorithm="HS256")
    
#     # Prepare the response data (do not send password or any sensitive information)
#     response_data = {
#         "user_id": str(user_id),  # You can send user_id back in the response
#         "email": results['email'],  # Email can be included in the response
#         "token": jwt_token  # Include the JWT token
#     }
    
    
#     return jsonify(response_data)  # Return the response with the user details and JWT token

import os
import bcrypt
import datetime
import jwt
from flask import Blueprint, jsonify, request
from db import database

signin = Blueprint("signin", __name__)

@signin.route('/SignIn', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    
    user = database.SignIn.find_one({"email": email})
    
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    stored_hashed_pw = user.get("password")
    
    # password checking
    if not bcrypt.checkpw(password.encode('utf-8'), stored_hashed_pw.encode('utf-8')):
        return jsonify({"error": "Invalid credentials"}), 401

    user_id = str(user.get("_id"))
    
    # JWT token expiry
    payload = {
        "email": user['email'],
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }

    # Get JWT secret from environment variable, or use a default value (only in dev version, remove if deplpoying)
    jwt_secret = os.environ.get("JWT_SECRET", "default_secret")  
    
    token = jwt.encode(payload, jwt_secret, algorithm="HS256")

    return jsonify({
        "user_id": user_id,
        "email": user['email'],
        "token": token
    })






