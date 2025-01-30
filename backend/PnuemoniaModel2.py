# # from flask import Blueprint, Flask, jsonify, request
# # from flask_cors import CORS
# # from transformers import ViTForImageClassification, ViTImageProcessor
# # import torch
# # from PIL import Image
# # from io import BytesIO

# # PnuemoniaModel = Blueprint("PnuemoniaModel", __name__)

# # # Load the pre-trained ViT model and processor
# # model_name = "google/vit-base-patch16-224-in21k"
# # model = ViTForImageClassification.from_pretrained(model_name)
# # processor = ViTImageProcessor.from_pretrained(model_name)

# # model.eval()  # Set to evaluation mode

# # # Route for predicting pneumonia from image
# # @PnuemoniaModel.route('/PnuemoniaPredict', methods=['POST'])
# # def predict():
# #     # Get the image from the POST request
# #     img = request.files['image'].read()

# #     # Convert the byte image to a PIL image
# #     image = Image.open(BytesIO(img))

# #     # Convert grayscale images to RGB
# #     if image.mode != 'RGB':
# #         image = image.convert("RGB")

# #     # Preprocess the image using the processor
# #     inputs = processor(images=image, return_tensors="pt")

# #     # Perform inference
# #     with torch.no_grad():
# #         outputs = model(**inputs)
# #         logits = outputs.logits

# #     # Get the predicted class (0 for NORMAL, 1 for PNEUMONIA)
# #     predicted_class_idx = torch.argmax(logits, dim=-1).item()

# #     # Map the predicted class index to the label (NORMAL or PNEUMONIA)
# #     id2label = {0: "NORMAL", 1: "PNEUMONIA"}
# #     predicted_class = id2label[predicted_class_idx]

# #     # Return the prediction as a JSON response
# #     return jsonify({'prediction': predicted_class})

# from flask import Blueprint, Flask, jsonify, request
# from flask_cors import CORS
# from transformers import ViTForImageClassification, ViTImageProcessor
# import torch
# from PIL import Image
# from io import BytesIO

# PnuemoniaModel2 = Blueprint("PnuemoniaModel2", __name__)

# # Specify the local directory containing the model and config files
# model_path = "./model2"  # Path to your local model folder

# # Load the pre-trained ViT model and processor from the local directory
# model = ViTForImageClassification.from_pretrained(model_path)
# processor = ViTImageProcessor.from_pretrained(model_path)

# model.eval()  # Set to evaluation mode

# # Route for predicting pneumonia from image
# @PnuemoniaModel2.route('/PnuemoniaPredict', methods=['POST'])
# def predict():
#     # Get the image from the POST request
#     img = request.files['image'].read()

#     # Convert the byte image to a PIL image
#     image = Image.open(BytesIO(img))

#     # Convert grayscale images to RGB
#     if image.mode != 'RGB':
#         image = image.convert("RGB")

#     # Preprocess the image using the processor
#     inputs = processor(images=image, return_tensors="pt")

#     # Perform inference
#     with torch.no_grad():
#         outputs = model(**inputs)
#         logits = outputs.logits

#     # Get the predicted class (0 for NORMAL, 1 for PNEUMONIA)
#     predicted_class_idx = torch.argmax(logits, dim=-1).item()

#     # Map the predicted class index to the label (NORMAL or PNEUMONIA)
#     id2label = {0: "NORMAL", 1: "PNEUMONIA"}
#     predicted_class = id2label[predicted_class_idx]

#     # Return the prediction as a JSON response
#     return jsonify({'predictionzino': predicted_class})

from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS
from transformers import ViTForImageClassification, ViTImageProcessor
import torch
from PIL import Image
from io import BytesIO

PnuemoniaModel2 = Blueprint("PnuemoniaModel2", __name__)

# Specify the local directory containing the model and config files
model_path = "./model2"  # Path to your local model folder

# Load the pre-trained ViT model and processor from the local directory
# model = ViTForImageClassification.from_pretrained(model_path)
# processor = ViTImageProcessor.from_pretrained(model_path)

model_name = "google/vit-base-patch16-224-in21k"
model = ViTForImageClassification.from_pretrained(model_name)

# Load the corresponding processor (this will handle image preprocessing)
processor = ViTImageProcessor.from_pretrained(model_name)

model.eval()  # Set to evaluation mode

# Route for predicting pneumonia from image
@PnuemoniaModel2.route('/PnuemoniaPredict', methods=['POST'])
def predict():
    # Get the image from the POST request
    img = request.files['image'].read()

    # Convert the byte image to a PIL image
    image = Image.open(BytesIO(img))

    # Convert grayscale images to RGB (preprocessor step)
   
    image = image.convert("RGB")

    # Preprocess the image using the processor (same as preprocessor code)
    inputs = processor(images=image, return_tensors="pt")

    # Perform inference
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits

    # Get the predicted class (0 for NORMAL, 1 for PNEUMONIA)
    predicted_class_idx = torch.argmax(logits, dim=-1).item()

    # Map the predicted class index to the label (NORMAL or PNEUMONIA)
    id2label = {0: "NORMAL", 1: "PNEUMONIA"}
    predicted_class = id2label[predicted_class_idx]

    # Return the prediction as a JSON response
    return jsonify({'predictionzino': predicted_class})
