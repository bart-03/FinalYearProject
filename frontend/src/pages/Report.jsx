import React from "react";
import "../styles/Report.css";
import Copy from "../assets/copy.svg";
import html2canvas from "html2canvas";

export const captureScreenshot = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    alert("Element not found. Check the ID.");
    return;
  }

  html2canvas(element, { logging: true })
    .then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob && navigator.clipboard && window.ClipboardItem) {
          navigator.clipboard
            .write([new ClipboardItem({ "image/png": blob })])
            .then(() => alert("Screenshot copied to clipboard!"))
            .catch((err) => alert("Clipboard write failed: " + err));
        } else {
          alert("Clipboard API not supported or Blob creation failed.");
        }
      });
    })
    .catch((err) => {
      alert("Error capturing screenshot: " + err);
    });
};

const Report = ({
  checked1,
  checked2,
  iaButtonPressed,
  cdButtonPressed,
  bothButtonPressed,
}) => {
  let content = null;
  if (checked1 && checked2 && bothButtonPressed) {
    content = (
      <div className="report-main">
        <div className="both-ia-report-main">
          <div className="ia-report-toolbar">
            <h1 className="ia-report-title">Report</h1>
            <div
              className="copy-text"
              onClick={() => captureScreenshot("report3")}
            >
              <img src={Copy} alt="copy"></img>
              <p>Copy</p>
            </div>
          </div>
          <div id="report3">
            <div>
              <div className="ia-report-content">
                <div className="both-ia-left-box">Images</div>
                <div className="both-ia-right-box">Results</div>
              </div>
            </div>
            <div className="both-cd-report-main">
              <div className="cd-report-content">
                <div className="both-cd-left-box">Clinical Data Input</div>
                <div className="both-cd-right-box">Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (checked1 && iaButtonPressed && !checked2) {
    content = (
      <div className="ia-report-main">
        <div className="ia-report-toolbar">
          <h1 className="ia-report-title">Report</h1>
          <div
            className="copy-text"
            onClick={() => captureScreenshot("report1")}
          >
            <img src={Copy} alt="copy"></img>
            <p>Copy</p>
          </div>
        </div>
        <div className="ia-report-content" id="report1">
          <div className="ia-left-box">Images</div>
          <div className="ia-right-box">Results</div>
        </div>
      </div>
    );
  } else if (checked2 && cdButtonPressed && !checked1) {
    content = (
      <div className="cd-report-main">
        <div className="cd-report-toolbar">
          <h1 className="cd-report-title">Report</h1>
          <div
            className="copy-text"
            onClick={() => captureScreenshot("report2")}
          >
            <img src={Copy} alt="copy"></img>
            <p>Copy</p>
          </div>
        </div>
        <div className="cd-report-content" id="report2">
          <div className="cd-left-box">Clinical Data Input</div>
          <div className="cd-right-box">Response</div>
        </div>
      </div>
    );
  }

  return <div className="reusable-section">{content}</div>;
};

export default Report;
