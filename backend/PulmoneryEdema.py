from flask import Blueprint, jsonify, request
from flask_cors import CORS
import torch
from PIL import Image
from torchvision import transforms
from io import BytesIO
from transformers import AutoModelForImageClassification


PulmonaryEdema = Blueprint("PulmonaryEdema", __name__)

# Load the custom-trained model
model_path = "./model"
model = AutoModelForImageClassification.from_pretrained(model_path)

# Set the model to evaluation mode
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])

# Map labels
id2label = {0: "No Edema", 1: "Edema"}

# Route for predicting Edema from an image
@PulmonaryEdema.route('/EdemaPredict', methods=['POST'])
def predict():
    try:
        # Get the image from the POST request
        img = request.files['image'].read()

        # Convert the byte image to a PIL image
        image = Image.open(BytesIO(img)).convert("RGB")

        # Preprocess the image
        input_tensor = transform(image).unsqueeze(0)  # Add batch dimension

        # Perform inference
        with torch.no_grad():
            outputs = model(input_tensor)
            logits = outputs.logits

        # Get the predicted class
        predicted_class_idx = torch.argmax(logits, dim=-1).item()
        predicted_class = id2label[predicted_class_idx]

        # Return the prediction as a JSON response
        return jsonify({'prediction': predicted_class})

    except Exception as e:
        return jsonify({'error': str(e)})
