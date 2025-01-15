// import React, { useState } from "react";
// import "../styles/Analysis.css";
// import Select from "react-select";

// const Analysis = () => {
//   const [message, setMessage] = useState("");
//   const [checked1, setChecked1] = useState(false);
//   const [checked2, setChecked2] = useState(false);

//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const options = [
//     { value: "angular", label: "Angular" },
//     { value: "react", label: "React.js" },
//     { value: "vue", label: "Vue.js" },
//     { value: "django", label: "Django" },
//     { value: "laravel", label: "Laravel" },
//     { value: "node", label: "Node.js" },
//   ];

//   const checkHandler1 = () => {
//     setChecked1(!checked1);
//   };

//   const checkHandler2 = () => {
//     setChecked2(!checked2);
//   };

//   return (
//     <div className="analysis">
//       <h1 className="title-analysis">Analysis</h1>
//       <div className="analysis-checbox">
//         <div className="checkbox1-Container">
//           <input
//             className="checkbox1"
//             type="checkbox"
//             checked={checked1}
//             onChange={checkHandler1}
//           />
//           <label className="checkbox-label1">Image Analysis</label>
//         </div>
//         <div className="checkbox2-Container">
//           <input
//             className="checkbox2"
//             type="checkbox"
//             checked={checked2}
//             onChange={checkHandler2}
//           />
//           <label className="checkbox-label2">Clinical Data</label>
//         </div>
//       </div>
//       {checked1 && !checked2 && (
//         <div className="image-analysis-container">
//           <div className="image-analysis-toolbar">
//             <h1 className="image-analysis-title">Image Analysis</h1>
//             {/* Multi-Select Dropdown */}
//             <div style={{ marginTop: "20px" }}>
//               <h5>Selected Options:</h5>
//               <div className="d-flex flex-wrap">
//                 {selectedOptions.map((option) => (
//                   <span
//                     key={option.value}
//                     className="badge bg-primary m-1"
//                     style={{ cursor: "pointer" }}
//                     onClick={() =>
//                       setSelectedOptions(
//                         selectedOptions.filter((o) => o.value !== option.value)
//                       )
//                     }
//                   >
//                     {option.label} <span className="ms-2">&times;</span>
//                   </span>
//                 ))}
//               </div>

//               <Select
//                 isMulti
//                 options={options}
//                 value={selectedOptions}
//                 onChange={setSelectedOptions}
//                 placeholder="Select options..."
//               />
//             </div>
//             <button className="image-analysis-button">Analyse</button>
//             <div></div>
//           </div>
//           <div className="content"></div>
//           <button className="image-analysis-button">Upload</button>
//         </div>
//       )}
//       {checked2 && !checked1 && <div className="clinical-data">SIGMA BOI</div>}
//       {checked1 && checked2 && <div className="iaAndcd">george droid</div>}
//     </div>
//   );
// };

// export default Analysis;

import React, { useState, useRef, useEffect } from "react";
import "../styles/Analysis.css";
import Select from "react-select";

const Analysis = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const options = [
    { value: "disease1", label: "Disease 1" },
    { value: "disease2", label: "Disease 2" },
    { value: "disease3", label: "Disease 3" },
    { value: "disease4", label: "Disease 4" },
  ];

  const checkHandler1 = () => setChecked1(!checked1);
  const checkHandler2 = () => setChecked2(!checked2);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="analysis">
      <h1 className="title-analysis">Analysis</h1>
      <div className="analysis-checbox">
        <div className="checkbox1-Container">
          <input
            className="checkbox1"
            type="checkbox"
            checked={checked1}
            onChange={checkHandler1}
          />
          <label className="checkbox-label1">Image Analysis</label>
        </div>
        <div className="checkbox2-Container">
          <input
            className="checkbox2"
            type="checkbox"
            checked={checked2}
            onChange={checkHandler2}
          />
          <label className="checkbox-label2">Clinical Data</label>
        </div>
      </div>
      {checked1 && !checked2 && (
        <div className="image-analysis-container">
          <div className="image-analysis-toolbar">
            <h1 className="image-analysis-title">Image Analysis</h1>

            <div
              className="dropdown"
              ref={dropdownRef}
              style={{ marginTop: "20px" }}
            >
              <Select
                isMulti
                options={options}
                value={selectedOptions}
                onChange={setSelectedOptions}
                placeholder="Select options..."
                menuIsOpen={isDropdownOpen}
                onMenuOpen={() => setIsDropdownOpen(true)}
              />
            </div>
            <div></div>
          </div>
          <div className="content">
            <button className="image-analysis-button1">Upload</button>
          </div>
          <button className="image-analysis-button2">Analyse</button>
        </div>
      )}
      {checked2 && !checked1 && <div className="clinical-data">SIGMA BOI</div>}
      {checked1 && checked2 && <div className="iaAndcd">george droid</div>}
    </div>
  );
};

export default Analysis;
