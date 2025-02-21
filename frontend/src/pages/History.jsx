import React, { useState, useEffect, useContext } from "react";
import "../styles/History.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import axios from "axios";
import { MyContext } from "./MyContext"; 

const user_id = localStorage.getItem("user_id");

const History = () => {
  const [reports, setReports] = useState([]);
  const { navbarValue } = useContext(MyContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState(navbarValue);
  const [selectedContent, setSelectedContent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsNavbarOpen(navbarValue);
  }, [navbarValue]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.post("http://localhost:8080/get_reports", { user_id }, {
          headers: { "Content-Type": "application/json" },
        });
        setReports(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchReports();
  }, []);

  // Open modal with selected content
  const openModal = (content) => {
    setSelectedContent(content);
    setIsModalVisible(true);
  };

  // Conditional display template for long text
  const textTemplate = (rowData, field) => {
    const content = rowData[field] || "N/A";
    const displayContent = content.slice(0, 50) + (content.length > 50 ? "..." : "");

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
            onClick={() => openModal(content)}
          >
            View More
          </button>
        )}
      </div>
    );
  };

  // Define table columns
  const columns = [
    { field: "date", header: "Date", style: { width: "100px" }, sortable: true },
    { field: "report_type", header: "Report Type", sortable: true },
    { field: "suspected_disease", header: "Suspected Disease", sortable: true },
    { field: "findings", header: "Findings" },
    { field: "name", header: "Name" },
    { field: "surname", header: "Surname" },
    { field: "age", header: "Age", style: { width: "70px" }, sortable: true },
    { field: "sex", header: "Sex", style: { width: "70px" }, sortable: true },
    { field: "additionalNotes", header: "Additional Notes", style: { width: "100px" } },
    { field: "image", header: "Image", style: { width: "100px" } },
    { field: "QandAs", header: "QandA's", style: { width: "100px" } },
    { field: "response", header: "CD Response", style: { width: "100px" } },
  ];

  return (
    <div className={isNavbarOpen ? "history-blur" : "history"}>
      <h1 className="title-history">History</h1>
      <h1 className="report-history">Report History</h1>
      <InputText
        className="p-inputtextSearch"
        placeholder="Search"
        onInput={(e) =>
          setFilters({
            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
          })
        }
      />

      <DataTable value={reports} className="datatable" filters={filters} paginator rows={4} globalFilter={filters.global.value} emptyMessage="No records found">
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            style={col.style}
            body={(data) =>
              ["findings", "additionalNotes", "image", "QandAs", "response"].includes(col.field)
                ? textTemplate(data, col.field)
                : data[col.field]
            }
            sortable={col.sortable}
          />
        ))}
      </DataTable>

      {/* Modal for displaying full content */}
      <Dialog
        header="Detailed View"
        visible={isModalVisible}
        style={{ width: "50vw" }}
        onHide={() => setIsModalVisible(false)}
      >
        <p style={{ whiteSpace: "pre-wrap" }}>{selectedContent}</p>
      </Dialog>
    </div>
  );
};

export default History;

