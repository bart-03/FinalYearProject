# from openai import OpenAI
 
# client = OpenAI(
#   api_key="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"
# )
 
# completion = client.chat.completions.create(
#     model="gpt-4o-mini",
#     store=True,
#     messages=[
#         {
#             "role": "developer", 
#             "content": """You are an advanced medical assistant tasked with helping healthcare professionals assess thoracic diseases and conditions. Based on the patient information provided:  

# 1. Estimate the most likely diagnosis and provide a percentage likelihood for each suspected disease.  
# 2. Suggest alternative diagnoses that should be considered.  
# 3. Recommend additional examinations, diagnostic tests, or medical referrals necessary to confirm or rule out the suspected conditions.  
# 4. If the information is inconclusive, suggest questions or further information that could aid diagnosis."""
#         },
#         {
#             "role": "user",
#             "content": """Patient information:"""
#             }
#     ]
# )

 
# print(completion.choices[0].message);

from flask import Blueprint, jsonify, request
# from flask_cors import CORS
import openai

# Define the Flask blueprint
OpenAI = Blueprint("OpenAI", __name__)

# Set up OpenAI API key
api_key = "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"
openai.api_key = api_key

# Route for generating medical diagnostic suggestions
@OpenAI.route('/OpenAI', methods=['POST'])
def diagnose():
    try:
        # Get patient information from the request body
        data = request.get_json()
        print(data["formattedData"])
     
        patient_info = data.get("formattedData", "No information provided.")

        

        # OpenAI API call to generate completion
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "developer",
                    "content": """You are an advanced medical assistant tasked with helping healthcare professionals assess thoracic diseases and conditions. Based on the patient information provided:

1. Estimate the most likely diagnosis and provide a percentage likelihood for each suspected disease.  
2. Suggest alternative diagnoses that should be considered.  
3. Recommend additional examinations, diagnostic tests, or medical referrals necessary to confirm or rule out the suspected conditions.  
4. If the information is inconclusive, suggest questions or further information that could aid diagnosis."""
                },
                {
                    "role": "user",
                    "content": f"Patient information: {patient_info}"
                }
            ]
        )

        # Extract the generated response from OpenAI
        # result = response['choices'][0]['message']['content']
        result = response.choices[0].message.content

        # Return the response as a JSON object
        return jsonify({'diagnosis': result})

    except Exception as e:
        return jsonify({'error': str(e)})
