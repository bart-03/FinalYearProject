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

  const questions = [
    { id: 1, text: "What is the patient’s age?", type: "input" },
    { id: 2, text: "What is the patient’s gender?", type: "input" },
    {
      id: 3,
      text: "What is the patient’s weight? (in kg or lbs)",
      type: "input",
    },
    {
      id: 4,
      text: "What is the patient’s height? (in cm or ft/in)",
      type: "input",
    },
    { id: 5, text: "Does the patient have a fever?", type: "checkbox" },
    { id: 6, text: "Is the patient experiencing a cough?", type: "checkbox" },
    {
      id: 7,
      text: "If productive, what is the color of the sputum?",
      type: "input",
    },
    {
      id: 8,
      text: "Is the patient experiencing shortness of breath?",
      type: "checkbox",
    },
    { id: 9, text: "Does the patient have chest pain?", type: "checkbox" },
    { id: 10, text: "Does the patient have wheezing?", type: "checkbox" },
    // Add remaining questions with their respective types
  ];

  const [answers, setAnswers] = useState({});

  const handleChange = (id) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: !prevAnswers[id],
    }));
  };

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
      {checked2 && !checked1 && (
        <div className="clinical-data">
          <div className="image-analysis-toolbar">
            <h1 className="clinical-data-title">Clinical Data Review</h1>

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
          </div>
          <div className="cd-content">
            <h1>Patient Questionnaire</h1>
            <form>
              {questions.map((question) => (
                <div key={question.id} style={{ marginBottom: "10px" }}>
                  <label>
                    {question.text}
                    {question.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={answers[question.id] || false}
                        onChange={(e) =>
                          handleChange(question.id, e.target.checked)
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        value={answers[question.id] || ""}
                        onChange={(e) =>
                          handleChange(question.id, e.target.value)
                        }
                      />
                    )}
                  </label>
                </div>
              ))}
            </form>
          </div>
          <button className="image-analysis-button2">Analyse</button>
        </div>
      )}
      {checked1 && checked2 && <div className="iaAndcd">george droid</div>}
    </div>
  );
};

export default Analysis;
