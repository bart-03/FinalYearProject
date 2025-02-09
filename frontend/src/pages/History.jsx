import React, { useState, useEffect } from "react";
import "../styles/History.css";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import axios from "axios";

const user_id = localStorage.getItem("user_id");



const History = () => {
  
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/get_reports",
          { user_id }, // Wrap in an object for proper JSON structure
          {
            headers: {
              "Content-Type": "application/json", // Correct header for JSON payload
            },
          }
        );
        console.log("Data successfully posted:", response.data);
        setReports(response.data.data);
      } catch (err) {
        console.error("Error posting data:", err);
      }
    };
  
    fetchReports();
  }, []);

  console.log(reports);
  return (
    <div className="history">
      <h1 className="title-history">History</h1>
      <h1 className="report-history">Report History</h1>
      <DataTable value={reports} className="datatable">
         <Column field="date" header="Date"></Column> 
         <Column field="report_type" header="Report Type"></Column> 
         <Column field="findings" header="Findings"></Column> 
         <Column field="name" header="Name"></Column> 
         <Column field="surname" header="Surname"></Column> 
         <Column field="age" header="Age"></Column>
         <Column field="sex" header="Sex"></Column>  
         <Column field="additionalNotes" header="Additional Notes"></Column> 
         <Column field="image" header="Image"></Column> 
         <Column field="questionAndAnswers" header="QandA's"></Column> 
         <Column field="responseCD" header="CD Response"></Column> 
      </DataTable>
    </div>
  );
};

export default History;
