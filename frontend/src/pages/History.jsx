import React, { useState, useEffect } from "react";
import "../styles/History.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import axios from "axios";

const user_id = localStorage.getItem("user_id");

const History = () => {
  const [reports, setReports] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/get_reports",
          { user_id },
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        setReports(response.data.data);
      } catch (err) {
        console.error("Error posting data:", err);
      }
    };

    fetchReports();
  }, []);

  // Handle row expansion toggles
  const toggleViewMore = (rowData, field) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [rowData.id + field]: !prevState[rowData.id + field]
    }));
  };

  // Conditional display template for long text
  const textTemplate = (rowData, field) => {
    const isExpanded = expandedRows[rowData.id + field];
    const content = rowData[field] || "N/A";
    const displayContent = isExpanded ? content : content.slice(0, 50) + (content.length > 50 ? "..." : "");

    return (
      <div>
        <p style={{ whiteSpace: "pre-wrap" }}>{displayContent}</p>
        {content.length > 50 && (
          <button
            style={{
              background: "none",
              border: "none",
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => toggleViewMore(rowData, field)}
          >
            {isExpanded ? "View Less" : "View More"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="history">
      <h1 className="title-history">History</h1>
      <h1 className="report-history">Report History</h1>
      <DataTable value={reports} className="datatable">
        <Column field="date" header="Date" style={{ width: "100px" }} />
        <Column field="report_type" header="Report Type" />
        <Column field="suspected_disease" header="Suspected Disease" />
        <Column field="findings" header="Findings" />
        <Column field="name" header="Name" />
        <Column field="surname" header="Surname" />
        <Column field="age" header="Age" style={{ width: "70px" }} />
        <Column field="sex" header="Sex" style={{ width: "70px" }} />
        <Column field="additionalNotes" header="Additional Notes" />
        <Column 
          field="image" 
          header="Image" 
          body={(data) => textTemplate(data, "image")} 
        />
        <Column 
          field="QandAs" 
          header="QandA's" 
          body={(data) => textTemplate(data, "QandAs")} 
        />
        <Column 
          field="response" 
          header="CD Response" 
          body={(data) => textTemplate(data, "response")} 
        />
      </DataTable>
    </div>
  );
};

export default History;
