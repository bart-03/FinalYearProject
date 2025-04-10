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
        "suspected_disease": data.get("suspectedDisease"),
        "findings": data.get("findings"),
        "name": data.get("name"),
        "surname": data.get("surname"),
        "age": data.get("age"),
        "sex": data.get("sex"),
        "additionalNotes": data.get("additionalNotes"),
       
    }
    elif data.get("reportType") == "Clinical Analysis":
        report_data = {
        "user_id": data.get("userID"),
        "date": data.get("date"),
        "QandAs": data.get("questionsAndAnswers"),
        "report_type": data.get("reportType"),
        "response": data.get("response"),
        
       
    }
    
    elif data.get("reportType") == "Combined Analysis":
        report_data = {
        "user_id": data.get("userID"),
        "image": data.get("image"),
        "report_type": data.get("reportType"),
        "date": data.get("date"),
        "suspected_disease": data.get("suspectedDisease"),
        "findings": data.get("findings"),
        "QandAs": data.get("questionsAndAnswers"),
        "report_type": data.get("reportType"),
        "response": data.get("response"),
        
       
    }
        
    print("Report Data:", report_data)
     
    try:
        insert_result = database.reports.insert_one(report_data)
        return jsonify({"message": "Report created successfully", "report_id": str(insert_result.inserted_id)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@reports.route('/get_reports', methods=['POST'])
def get_report():
    data = request.get_json()
    print("Received Data:", data) 
    user_id = data.get("user_id")


    results = database.reports.find({"user_id": user_id})
    reports_list = [doc for doc in results]
    
   
    for report in reports_list:
        report["_id"] = str(report.get("_id", ""))  
    
    print("Reports Retrieved:", reports_list)

    return jsonify({"data": reports_list})



