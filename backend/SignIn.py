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






