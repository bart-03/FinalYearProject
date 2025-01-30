# from db import database
# from flask import Blueprint, Flask, jsonify, request
# from flask_cors import CORS
# from transformers import ViTForImageClassification
# from PIL import Image
# import torch
# from io import BytesIO
# from torchvision import transforms

# PnuemoniaModel = Blueprint("PnuemoniaModel", __name__)

# # Load the best model
# model_path = "./model"
# model = ViTForImageClassification.from_pretrained(model_path)
# model.eval()  # Set to evaluation mode
# print(model.config)
# print(model.config.num_labels , "num_labels")
# # Define the custom preprocessing pipeline (same as during training)
# transform = transforms.Compose([
#     transforms.Resize((224, 224)), 
#     transforms.ToTensor(),         
#     transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])  # Normalization for RGB images
# ])

# @PnuemoniaModel.route('/PnuemoniaPredict', methods=['POST'])
# def predict():
#     # Get image from POST request
#     img = request.files['image'].read()

#     # Convert byte image to PIL image
#     image = Image.open(BytesIO(img))

#     # Convert grayscale images to RGB
#     if image.mode != 'RGB':
#         image = image.convert("RGB")

#     # Preprocess the image using the custom transform
#     image = transform(image)
    
#     # Add a batch dimension (needed for the model)
#     image = image.unsqueeze(0)  # Shape: (1, 3, 224, 224)

#     # Perform inference
#     with torch.no_grad():
#         outputs = model(image)
#         logits = outputs.logits

#     # Get the predicted class (e.g., 0 for normal, 1 for pneumonia)
#     predicted_class = logits.argmax(-1).item()

#     # Return the prediction as a JSON response
#     return jsonify({'prediction': predicted_class})
