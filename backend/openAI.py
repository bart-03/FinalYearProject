from flask import Blueprint, jsonify, request
import openai

OpenAI = Blueprint("OpenAI", __name__)

api_key = "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"
openai.api_key = api_key

@OpenAI.route('/OpenAI', methods=['POST'])
def diagnose():
    try:
       
        data = request.get_json()
        print(data["formattedData"])
     
        patient_info = data.get("formattedData", "No information provided.")

        

        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "developer",
                    "content": """You are an advanced medical assistant tasked with helping healthcare professionals assess thoracic diseases and conditions. Based on the patient information provided:

1. Estimate the most likely diagnosis and provide a percentage likelihood for each suspected disease, give top 5 suspected, very important for the percentages to sum to 100%.  
2. Suggest alternative diagnoses that should be considered.  
3. Recommend additional examinations, diagnostic tests, or medical referrals necessary to confirm or rule out the suspected conditions.  
4. If the information is inconclusive, suggest questions or further information that could aid diagnosis.

I need the response to be 4 seperate sections, no intros or conclusions.
Please provide the assessment with structured formatting using these markers:
- Use `@@Section:` for major sections titles.
- Use `##` for bold labels within a section.
- Use `--` for list items.
- Provide a double newline between sections for clear separation.
  
Example:
@@Section: Estimated Diagnosis and Likelihoods
## Pneumonia (bacterial or viral): 40%
-- Symptoms: fever, chills, shortness of breath.
  
@@Section: Alternative Diagnoses to Consider
## Pulmonary Embolism
-- Particularly given the history of smoking and sharp chest pain.
"""
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
