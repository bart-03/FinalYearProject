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

# evaluation mode
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])


id2label = {0: "No Edema", 1: "Edema"}

@PulmonaryEdema.route('/EdemaPredict', methods=['POST'])
def predict():
    try:
        
        img = request.files['image'].read()
        image = Image.open(BytesIO(img)).convert("RGB")     
        input_tensor = transform(image).unsqueeze(0) 
        
        with torch.no_grad():
            outputs = model(input_tensor)
            logits = outputs.logits

        predicted_class_idx = torch.argmax(logits, dim=-1).item()
        predicted_class = id2label[predicted_class_idx]

        return jsonify({'prediction': predicted_class})

    except Exception as e:
        return jsonify({'error': str(e)})
