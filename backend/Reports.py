from db import database
from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS
import datetime


reports = Blueprint("reports", __name__)


@reports.route('/generate_report', methods=['POST'])
def generate_report():
    data = request.get_json()

    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400 
    
    report_data = {
        "user_id": user_id,
        "report_title": data.get("report_title", "Untitled Report"),
        "date_generated": datetime.datetime.now().strftime("%Y-%m-%d"),
        "content": data.get("content", ""),
        "metrics": data.get("metrics", {})
    }
     
     # Insert report into the "reports" collection
    try:
        insert_result = database.reports.insert_one(report_data)
        return jsonify({"message": "Report created successfully", "report_id": str(insert_result.inserted_id)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500