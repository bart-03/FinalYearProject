import requests
import time
import psutil
import os
from PIL import Image
from io import BytesIO


PNEUMONIA_URL = "http://127.0.0.1:5000/PnuemoniaPredict"
EDEMA_URL = "http://127.0.0.1:5000/EdemaPredict"
TB_URL = "http://127.0.0.1:5000/TBpredict"


test_image_path = "/Users/bartekfraczek/Desktop/Datasets/PulmonaryEdema/Edema/00000032_004.png" 
with open(test_image_path, "rb") as f:
    test_image = f.read()

# monitor memory usage 
def get_memory_usage():
    process = psutil.Process(os.getpid())
    memory_info = process.memory_info()
    return memory_info.rss / (1024 * 1024)  


def test_model(endpoint_url, image_data, model_name):
    try:
  
        initial_memory = get_memory_usage()
        
        start_time = time.time()  
        
    
        response = requests.post(endpoint_url, files={'image': image_data})
        
        end_time = time.time()
        time_taken = end_time - start_time  
        
        final_memory = get_memory_usage() 
        
        if response.status_code == 200:
            print(f"Prediction Response for {model_name}: {response.json()}")
        else:
            print(f"Error: {response.text}")
        
        print(f"\nTime taken for {model_name}: {time_taken:.4f} seconds")
        print(f"Memory usage for {model_name}: {final_memory - initial_memory:.2f} MB\n")
    
    except Exception as e:
        print(f"An error occurred with {model_name}: {e}")

# performance tests for each model
print("Starting performance test for Pneumonia Model...")
test_model(PNEUMONIA_URL, test_image, "Pneumonia Model")

print("Starting performance test for Pulmonary Edema Model...")
test_model(EDEMA_URL, test_image, "Pulmonary Edema Model")

print("Starting performance test for Tuberculosis Model...")
test_model(TB_URL, test_image, "Tuberculosis Model")
