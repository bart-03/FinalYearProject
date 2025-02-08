# from db import database
# from flask import Blueprint, Flask, jsonify, request
# from flask_cors import CORS
# import datetime
# import jwt

# signin = Blueprint("signin", __name__)

# @signin.route('/SignIn', methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")
    
#     results = database.SignIn.find_one({ "email": email, "password": password }, { "_id": 0 })
#     user_id = results.get("_id")     

#     expiry = (datetime.datetime.now() + datetime.timedelta(days=1)).timestamp()
#     payload = { "email": results['email'], "password": results['password'], "expiry": expiry,  "user_id": user_id  }

    
#     jwt_token = jwt.encode(payload=payload, key="XDetect", algorithm="HS256")
#     print(jwt_token)
#     print(results)
#     return jsonify(results, jwt_token)

from db import database
from flask import Blueprint, jsonify, request
import datetime
import jwt

signin = Blueprint("signin", __name__)

@signin.route('/SignIn', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    # Find the user by email and password
    results = database.SignIn.find_one({ "email": email, "password": password })

    if not results:
        return jsonify({"error": "Invalid credentials"}), 401  # If no user found, return an error
    
    user_id = results.get("_id")  # Assuming the user ID is stored as _id in the database
    
    # Set the JWT token expiry time (1 day from now)
    expiry = (datetime.datetime.now() + datetime.timedelta(days=1)).timestamp()
    
    # Prepare JWT payload (exclude password for security reasons)
    payload = { 
        "email": results['email'],
        "expiry": expiry, 
        "user_id": str(user_id)  # Include user_id as string to make it JSON serializable
    }

    # Generate JWT token
    jwt_token = jwt.encode(payload=payload, key="XDetect", algorithm="HS256")
    
    # Prepare the response data (do not send password or any sensitive information)
    response_data = {
        "user_id": str(user_id),  # You can send user_id back in the response
        "email": results['email'],  # Email can be included in the response
        "token": jwt_token  # Include the JWT token
    }
    
    
    return jsonify(response_data)  # Return the response with the user details and JWT token







