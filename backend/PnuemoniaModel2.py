from flask import Blueprint, jsonify, request
from flask_cors import CORS
from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image
from io import BytesIO

# Define the Flask blueprint
PnuemoniaModel2 = Blueprint("PnuemoniaModel2", __name__)

# Load the pre-trained pneumonia model and processor
model_name = "lxyuan/vit-xray-pneumonia-classification"
processor = AutoImageProcessor.from_pretrained(model_name)
model = AutoModelForImageClassification.from_pretrained(model_name)

# Set the model to evaluation mode
model.eval()

# Route for predicting pneumonia from an image
@PnuemoniaModel2.route('/PnuemoniaPredict', methods=['POST'])
def predict():
    try:
        # Get the image from the POST request
        img = request.files['image'].read()

        # Convert the byte image to a PIL image
        image = Image.open(BytesIO(img))

        image = image.convert("RGB")
        inputs = processor(images=image, return_tensors="pt")

        # Perform inference
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits

        # Get the predicted class (0 for NORMAL, 1 for PNEUMONIA)
        predicted_class_idx = torch.argmax(logits, dim=-1).item()

        id2label = {0: "NORMAL", 1: "PNEUMONIA"}
        predicted_class = id2label[predicted_class_idx]


        return jsonify({'prediction': predicted_class})
    
    except Exception as e:
        return jsonify({'error': str(e)})
