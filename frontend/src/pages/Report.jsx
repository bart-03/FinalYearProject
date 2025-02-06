// import React, { useState, useEffect, useContext } from "react";
// import "../styles/Report.css";
// import Copy from "../assets/copy.svg";
// import html2canvas from "html2canvas";
// import { MyContext } from "./MyContext";

// export const captureScreenshot = (elementId) => {
//   const element = document.getElementById(elementId);
//   if (!element) {
//     alert("Element not found. Check the ID.");
//     return;
//   }

//   html2canvas(element, { logging: true })
//     .then((canvas) => {
//       canvas.toBlob((blob) => {
//         if (blob && navigator.clipboard && window.ClipboardItem) {
//           navigator.clipboard
//             .write([new ClipboardItem({ "image/png": blob })])
//             .then(() => alert("Screenshot copied to clipboard!"))
//             .catch((err) => alert("Clipboard write failed: " + err));
//         } else {
//           alert("Clipboard API not supported or Blob creation failed.");
//         }
//       });
//     })
//     .catch((err) => {
//       alert("Error capturing screenshot: " + err);
//     });
// };

// const Report = ({
//   checked1,
//   checked2,
//   iaButtonPressed,
//   cdButtonPressed,
//   bothButtonPressed,
//   response,
//   // imageLocal,
//   imageReport,
//   dateTime,
//   // selectedOptions,
//   selectedOptionReport,
// }) => {
//   const [image, setImage] = useState(imageReport);
//   const { cdResponse } = useContext(MyContext);
//   useEffect(() => {
//     if (imageReport) {
//       setImage(imageReport); // Update only when there's a new valid image
//     }
//   }, [imageReport]);
//   let content = null;

//   // BOTH  VIEWS SELECTED OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//   if (checked1 && checked2 && bothButtonPressed) {
//     content = (
//       <div className="report-main">
//         <div className="both-ia-report-main">
//           <div className="ia-report-toolbar">
//             <h1 className="ia-report-title">Report</h1>
//             <div
//               className="copy-text"
//               onClick={() => captureScreenshot("report3")}
//             >
//               <img src={Copy} alt="copy"></img>
//               <p>Copy</p>
//             </div>
//           </div>
//           <div id="report3">
//             <div>
//               <div className="ia-report-content">
//                 <div className="both-ia-left-box">Images</div>
//                 <div className="both-ia-right-box">Results</div>
//               </div>
//             </div>
//             <div className="both-cd-report-main">
//               <div className="cd-report-content">
//                 <div className="both-cd-left-box">Clinical Data Input</div>
//                 <div className="both-cd-right-box">Response</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//     // ANALYSIS VIEW ONLY OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//   } else if (checked1 && iaButtonPressed && !checked2) {
//     content = (
//       <div className="ia-report-main">
//         <div className="ia-report-toolbar">
//           <h1 className="ia-report-title">Report</h1>
//           <div
//             className="copy-text"
//             onClick={() => captureScreenshot("report1")}
//           >
//             <img src={Copy} alt="copy"></img>
//             <p>Copy</p>
//           </div>
//         </div>
//         <div className="ia-report-content" id="report1">
//           <div className="ia-left-box">
//             <div className="image-box">
//               <img src={image} alt="placeholder" className="image-report" />
//               <label htmlFor="images">Image</label>
//             </div>
//             <button type="submit" className="button-append">
//               Append Data
//             </button>
//           </div>
//           <form>
//             <div className="ia-right-box">
//               <div className="label-box">
//                 <label className="report-label">Date:</label>
//                 <label className="report-label">Report ID:</label>
//                 <label className="report-label">Suspected Disease:</label>
//                 <label className="report-label">Findings:</label>

//                 <label className="report-label">Name:</label>
//                 <label className="report-label">Surname:</label>
//                 <label className="report-label">Age:</label>
//                 <label className="report-label">Sex:</label>
//                 <label className="report-label">Additional Notes:</label>
//               </div>
//               <div className="input-or-text-box">
//                 <div className="report-box"> {dateTime}</div>
//                 <div className="report-box"></div>
//                 <div className="report-box">{selectedOptionReport?.label || ""}</div>
//                 <div className="report-box">
//                   <p>
//                     {response ? response.prediction : "No findings available"}
//                   </p>
//                 </div>
//                 <div className="">
//                   <input type="text" className="custom-input"></input>
//                 </div>
//                 <div className="">
//                   <input type="text" className="custom-input"></input>
//                 </div>
//                 <div className="">
//                   <input type="number" className="custom-input"></input>
//                 </div>
//                 <div className="checkbox-group">
//                   <label>
//                     <input
//                       type="radio"
//                       className="radio-input"
//                       name="sex"
//                       value="Male"
//                     />
//                     Male
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       className="radio-input"
//                       name="sex"
//                       value="Female"
//                     />
//                     Female
//                   </label>
//                 </div>
//                 <div className="">
//                   <input type="text" className="custom-input-notes"></input>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//     // CLINICAL DATA VIEW ONLY OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//   } else if (checked2 && cdButtonPressed && !checked1) {
//     content = (
//       <div className="cd-report-main">
//         <div className="cd-report-toolbar">
//           <h1 className="cd-report-title">Report</h1>
//           <div
//             className="copy-text"
//             onClick={() => captureScreenshot("report2")}
//           >
//             <img src={Copy} alt="copy"></img>
//             <p>Copy</p>
//           </div>
//         </div>
//         <div className="cd-report-content" id="report2">

//           {/* <div className="cd-right-box">Response</div> */}
//           <div className="">{cdResponse}</div>
//         </div>
//       </div>
//     );
//   }

//   return <div className="reusable-section">{content}</div>;
// };

// export default Report;

import React, { useState, useEffect, useContext } from "react";
import "../styles/Report.css";
import Copy from "../assets/copy.svg";
import html2canvas from "html2canvas";
import { MyContext } from "./MyContext";

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
  response,
  imageReport,
  dateTime,
  selectedOptionReport,
}) => {
  const [image, setImage] = useState(imageReport);
  const { cdResponse } = useContext(MyContext);

  useEffect(() => {
    if (imageReport) {
      setImage(imageReport); // Update only when there's a new valid image
    }
  }, [imageReport]);

  // Function to parse the structured clinical data response
  const parseResponse = (response) => {
    if (!response) return null;

    const sections = response.split("@@Section:").filter(Boolean); // Split the sections using the marker

    return sections.map((section, index) => {
      const lines = section.trim().split("\n");
      const sectionTitle = lines.shift(); // The title of the section

      return (
        <div key={index} className="section">
          <br />
          <br />
          <h3 style={{ color: "#800080", fontSize: "24px" }}>{sectionTitle}</h3>
          <br />
          {lines.map((line, idx) => {
            if (line.startsWith("##")) {
              return (
                <ul key={idx} className="section-title">
                  <li>{line.replace("##", "").trim()}</li>
                </ul>
              );
            }
            if (line.startsWith("--")) {
              return (
                <>
                  <p key={idx}>{line.replace("--", "").trim()}</p>
                  <br />
                </>
              );
            }
            return <p key={idx}>{line.trim()}</p>;
          })}
        </div>
      );
    });
  };

  let content = null;

  if (checked1 && checked2 && bothButtonPressed) {
    content = (
      <div className="report-main">
        <div className="ia-report-main-combined">
          <div className="ia-report-toolbar">
            <h1 className="ia-report-title">
              Report - Image Analysis & Clinical Data
            </h1>
            <div
              className="copy-text"
              onClick={() => captureScreenshot("report1")}
            >
              <img src={Copy} alt="copy" />
              <p>Copy</p>
            </div>
          </div>
          <div className="ia-report-content-combined" id="report1">
            <div className="ia-left-box">
              <div className="image-box">
                <img src={image} alt="placeholder" className="image-report" />
                <label htmlFor="images">Image</label>
              </div>
              <button type="submit" className="button-append">
                Append Data
              </button>
            </div>
            <form>
              <div className="ia-right-box">
                <div className="label-box">
                  <label className="report-label">Date:</label>
                  <label className="report-label">Report ID:</label>
                  <label className="report-label">Suspected Disease:</label>
                  <label className="report-label">Findings:</label>
                  <label className="report-label">Name:</label>
                  <label className="report-label">Surname:</label>
                  <label className="report-label">Age:</label>
                  <label className="report-label">Sex:</label>
                  <label className="report-label">Additional Notes:</label>
                </div>
                <div className="input-or-text-box">
                  <div className="report-box">{dateTime}</div>
                  <div className="report-box"></div>
                  <div className="report-box">
                    {selectedOptionReport?.label || ""}
                  </div>
                  <div className="report-box">
                    <p>
                      {response ? response.prediction : "No findings available"}
                    </p>
                  </div>
                  <div className="">
                    <input type="text" className="custom-input" />
                  </div>
                  <div className="">
                    <input type="text" className="custom-input" />
                  </div>
                  <div className="">
                    <input type="number" className="custom-input" />
                  </div>
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="radio"
                        className="radio-input"
                        name="sex"
                        value="Male"
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        className="radio-input"
                        name="sex"
                        value="Female"
                      />
                      Female
                    </label>
                  </div>
                  <div className="">
                    <input type="text" className="custom-input-notes" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="both-ia-report-main">
          {/* <div className="ia-report-toolbar">
            <h1 className="ia-report-title">Report</h1>
            <div
              className="copy-text"
              onClick={() => captureScreenshot("report3")}
            >
              <img src={Copy} alt="copy" />
              <p>Copy</p>
            </div>
          </div> */}
          <div id="report3">
            <div className="both-cd-report-main">
              {/* <div className="cd-report-content">
                <div className="both-cd-left-box">Clinical Data Input</div>
                <div className="both-cd-right-box">Response</div>
              </div> */}
              <div className="cd-report-content" id="report2">
                {/* Render parsed clinical response */}
                <div className="clinical-response">
                  {parseResponse(cdResponse)}
                </div>
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
            <img src={Copy} alt="copy" />
            <p>Copy</p>
          </div>
        </div>
        <div className="ia-report-content" id="report1">
          <div className="ia-left-box">
            <div className="image-box">
              <img src={image} alt="placeholder" className="image-report" />
              <label htmlFor="images">Image</label>
            </div>
            <button type="submit" className="button-append">
              Append Data
            </button>
          </div>
          <form>
            <div className="ia-right-box">
              <div className="label-box">
                <label className="report-label">Date:</label>
                <label className="report-label">Report ID:</label>
                <label className="report-label">Suspected Disease:</label>
                <label className="report-label">Findings:</label>
                <label className="report-label">Name:</label>
                <label className="report-label">Surname:</label>
                <label className="report-label">Age:</label>
                <label className="report-label">Sex:</label>
                <label className="report-label">Additional Notes:</label>
              </div>
              <div className="input-or-text-box">
                <div className="report-box">{dateTime}</div>
                <div className="report-box"></div>
                <div className="report-box">
                  {selectedOptionReport?.label || ""}
                </div>
                <div className="report-box">
                  <p>
                    {response ? response.prediction : "No findings available"}
                  </p>
                </div>
                <div className="">
                  <input type="text" className="custom-input" />
                </div>
                <div className="">
                  <input type="text" className="custom-input" />
                </div>
                <div className="">
                  <input type="number" className="custom-input" />
                </div>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="radio"
                      className="radio-input"
                      name="sex"
                      value="Male"
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      className="radio-input"
                      name="sex"
                      value="Female"
                    />
                    Female
                  </label>
                </div>
                <div className="">
                  <input type="text" className="custom-input-notes" />
                </div>
              </div>
            </div>
          </form>
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
            <img src={Copy} alt="copy" />
            <p>Copy</p>
          </div>
        </div>
        <div className="cd-report-content" id="report2">
          {/* Render parsed clinical response */}
          <div className="clinical-response">{parseResponse(cdResponse)}</div>
        </div>
      </div>
    );
  }

  return <div className="reusable-section">{content}</div>;
};

export default Report;
