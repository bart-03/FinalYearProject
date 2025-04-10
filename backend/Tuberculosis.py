from flask import Blueprint, jsonify, request
from flask_cors import CORS
import torch
import torch.nn as nn
from PIL import Image
from torchvision import transforms
from io import BytesIO


Tuberculosis = Blueprint("Tuberculosis", __name__)

class CNNModel(nn.Module):
    def __init__(self, num_classes=3):
        super(CNNModel, self).__init__()
        self.conv_layers = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2)
        )
        self.fc_layers = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 28 * 28, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, num_classes)
        )

    def forward(self, x):
        x = self.conv_layers(x)
        x = self.fc_layers(x)
        return x


checkpoint_path = "./TBModel/disease_classification_cnn.pth"


model = CNNModel(num_classes=3)
model.load_state_dict(torch.load(checkpoint_path, map_location=torch.device('cpu')))
model.eval()  # evaluation mode

# image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])


id2label = {0: "Normal", 1: "Tuberculosis", 2: "Unknown"}


@Tuberculosis.route('/TBpredict', methods=['POST'])
def predict():
    try:
      
        img = request.files['image'].read()
        image = Image.open(BytesIO(img)).convert("RGB")
        input_tensor = transform(image).unsqueeze(0) 

     
        with torch.no_grad():
            outputs = model(input_tensor)
            _, predicted_class_idx = torch.max(outputs, 1)
        
        predicted_class = id2label[predicted_class_idx.item()]

        return jsonify({'prediction': predicted_class})

    except Exception as e:
        return jsonify({'error': str(e)})
