from db import database
from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS
import datetime


reports = Blueprint("reports", __name__)


@reports.route('/generate_report', methods=['POST'])
def generate_report():
    data = request.get_json()
    print("Received Data:", data) 
   
    if data.get("reportType") == "Image Analysis":
        report_data = {
        "user_id": data.get("userID"),
        "image": data.get("image"),
        "report_type": data.get("reportType"),
        "date": data.get("date"),
        "findings": data.get("findings")
       
    }
    elif data.get("reportType") == "Clinical Analysis":
        report_data = {
        "user_id": data.get("userID"),
        "QandAs": data.get("questionsAndAnswers"),
        "report_type": data.get("reportType"),
        "response": data.get("response"),
        
       
    }
        
    print("Report Data:", report_data)
        

    # report_data = {
    #     "user_id": data.get("userID"),
    #     "image": data.get("image"),
    #     "report_type": data.get("reportType"),
    #     "date": data.get("date"),
    #     "findings": data.get("findings")
       
    # }
     
    try:
        insert_result = database.reports.insert_one(report_data)
        return jsonify({"message": "Report created successfully", "report_id": str(insert_result.inserted_id)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500