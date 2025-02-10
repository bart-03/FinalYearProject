import React, { useState, useEffect } from "react";
import "../styles/History.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import {InputText} from "primereact/inputtext";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import axios from "axios";

const user_id = localStorage.getItem("user_id");

const History = () => {
  const [reports, setReports] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  const[filters, setFilters] = useState({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/get_reports",
          { user_id },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setReports(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchReports();
  }, []);

  // Handle row expansion toggles
  const toggleViewMore = (rowData, field) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [rowData.id + field]: !prevState[rowData.id + field],
    }));
  };

  // Conditional display template for long text
  const textTemplate = (rowData, field) => {
    const isExpanded = expandedRows[rowData.id + field];
    const content = rowData[field] || "N/A";
    const displayContent = isExpanded
      ? content
      : content.slice(0, 50) + (content.length > 50 ? "..." : "");

    return (
      <div>
        <p style={{ whiteSpace: "pre-wrap" }}>{displayContent}</p>
        {content.length > 30 && (
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

  // Dynamically generate columns and apply templates where necessary
  const columns = [
    { field: "date", header: "Date", style: { width: "100px" }, sortable: true  },
    { field: "report_type", header: "Report Type", sortable: true },
    { field: "suspected_disease", header: "Suspected Disease", sortable: true },
    { field: "findings", header: "Findings" },
    { field: "name", header: "Name" },
    { field: "surname", header: "Surname" },
    { field: "age", header: "Age", style: { width: "70px" }, sortable: true },
    { field: "sex", header: "Sex", style: { width: "70px" }, sortable: true },
    { field: "additionalNotes", header: "Additional Notes", style: { width: "100px" }  },
    { field: "image", header: "Image", style: { width: "100px" } },
    { field: "QandAs", header: "QandA's", style: { width: "100px" }  },
    { field: "response", header: "CD Response", style: { width: "100px" }  },
  ];

  return (
    <div className="history">
      <h1 className="title-history">History</h1>
      <h1 className="report-history">Report History</h1>
      <InputText className="p-inputtextSearch" placeholder="Search"
      onInput={(e) =>
        setFilters({
          global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
        })
       }/>

      <DataTable value={reports} className="datatable" filters={filters} paginator rows={4}  globalFilter={filters.global.value} emptyMessage="No records found">
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            style={col.style}
            body={(data) =>
              ["findings", "additionalNotes", "image", "QandAs", "response"].includes(col.field)
                ? textTemplate(data, col.field)
                : data[col.field]}
            sortable = {col.sortable}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default History;
