from flask import Blueprint, jsonify, request
from flask_cors import CORS
from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image
from io import BytesIO


PnuemoniaModel2 = Blueprint("PnuemoniaModel2", __name__)


model_name = "lxyuan/vit-xray-pneumonia-classification"
processor = AutoImageProcessor.from_pretrained(model_name)
model = AutoModelForImageClassification.from_pretrained(model_name)

#evaluation mode
model.eval()


@PnuemoniaModel2.route('/PnuemoniaPredict', methods=['POST'])
def predict():
    try:

        img = request.files['image'].read()

        # Convert byte image to a PIL image
        image = Image.open(BytesIO(img))
        image = image.convert("RGB")
        inputs = processor(images=image, return_tensors="pt")
        
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits

        predicted_class_idx = torch.argmax(logits, dim=-1).item()

        id2label = {0: "NORMAL", 1: "PNEUMONIA"}
        predicted_class = id2label[predicted_class_idx]


        return jsonify({'prediction': predicted_class})
    
    except Exception as e:
        return jsonify({'error': str(e)})
