import React from "react";
import "../styles/Report.css";

const Report = ({ checked1, checked2 }) => {
  let content = null;

  if (checked1 && checked2) {
    content = (
      <div className="report-main">
        <div className="both-ia-report-main">
          <div className="ia-report-toolbar">
            <h1 className="ia-report-title">Report</h1>
            <img src="" alt="copy"></img>
          </div>
          <div className="ia-report-content">
            <div className="both-ia-left-box">Images</div>
            <div className="both-ia-right-box">Results</div>
          </div>
        </div>
        <div className="both-cd-report-main">
          <div className="cd-report-toolbar"></div>
          <div className="cd-report-content">
            <div className="both-cd-left-box">Clinical Data Input</div>
            <div className="both-cd-right-box">Response</div>
          </div>
        </div>
      </div>
    );
  } else if (checked1) {
    content = (
      <div className="ia-report-main">
        <div className="ia-report-toolbar">
          <h1 className="ia-report-title">Report</h1>
          <img src="" alt="copy"></img>
        </div>
        <div className="ia-report-content">
          <div className="ia-left-box">Images</div>
          <div className="ia-right-box">Results</div>
        </div>
      </div>
    );
  } else if (checked2) {
    content = (
      <div className="cd-report-main">
        <div className="cd-report-toolbar">
          <h1 className="cd-report-title">Report</h1>
          <img src="" alt="copy"></img>
        </div>
        <div className="cd-report-content">
          <div className="cd-left-box">Clinical Data Input</div>
          <div className="cd-right-box">Response</div>
        </div>
      </div>
    );
  }

  return <div className="reusable-section">{content}</div>;
};

export default Report;
